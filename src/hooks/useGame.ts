import { useCallback, useEffect, useRef, useState } from "react";
import { chooseEliminations, gameReducer, newGame } from "../lib/game";
import type { GameAction } from "../lib/game";
import { loadProgress, saveProgress, clearProgress } from "../lib/storage";
import { questions } from "../data/questions";
import type { LifelineId } from "../types/game";

const milestones = {
  running: { delay: 3800, type: "arrive" },
  encounter: { delay: 900, type: "openQuestion" },
  hurt: { delay: 650, type: "retry" },
  resolving: { delay: 1500, type: "resume" },
  onward: { delay: 1600, type: "advance" },
  arrival: { delay: 2600, type: "reunite" },
  rescue: { delay: 3300, type: "celebrate" },
} as const;

export function useGame(externallyPaused: boolean) {
  const [saved] = useState(loadProgress);
  const [state, setState] = useState(() => saved ?? newGame());
  const stateRef = useRef(state);
  const [hasProgress, setHasProgress] = useState(!!saved);
  const [storageError, setStorageError] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [hidden, setHidden] = useState(document.hidden);
  const paused = externallyPaused || hintOpen || hidden;
  const remaining = useRef({ phase: state.phase, ms: 0 });

  // Save synchronously with each accepted event. Refreshes cannot refund hearts or lifelines.
  const send = useCallback((action: GameAction) => {
    const next = gameReducer(stateRef.current, action);
    if (next === stateRef.current) return false;
    stateRef.current = next;
    setStorageError(!saveProgress(next));
    setHasProgress(true);
    setState(next);
    return true;
  }, []);

  useEffect(() => {
    const onVisibility = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);
  useEffect(() => {
    if (!(state.phase in milestones)) return;
    const milestone = milestones[state.phase as keyof typeof milestones];
    if (remaining.current.phase !== state.phase || remaining.current.ms <= 0)
      remaining.current = { phase: state.phase, ms: milestone.delay };
    if (paused) return;
    const started = performance.now();
    const timer = window.setTimeout(
      () => send({ type: milestone.type }),
      remaining.current.ms,
    );
    return () => {
      window.clearTimeout(timer);
      remaining.current.ms = Math.max(
        0,
        remaining.current.ms - (performance.now() - started),
      );
    };
  }, [state.phase, state.currentEncounter, paused, send]);

  function useLifeline(id: LifelineId) {
    const current = stateRef.current;
    const eliminated =
      id === "fifty"
        ? chooseEliminations(
            questions[current.currentEncounter],
            current.wrongAnswers,
          )
        : undefined;
    if (send({ type: "lifeline", id, eliminated }) && id === "friend")
      setHintOpen(true);
  }
  function restart() {
    setHintOpen(false);
    send({ type: "restart" });
    remaining.current = { phase: "ready", ms: 0 };
  }
  function reset() {
    restart();
    setStorageError(!clearProgress());
    setHasProgress(false);
  }
  return {
    state,
    send,
    paused,
    hintOpen,
    closeHint: () => setHintOpen(false),
    useLifeline,
    restart,
    reset,
    hasProgress,
    storageError,
  };
}
export type GameController = ReturnType<typeof useGame>;
