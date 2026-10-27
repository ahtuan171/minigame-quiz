import type { GameState, LifelineId, Question } from "../types/game.ts";
import { questions } from "../data/questions.ts";
export type GameAction =
  | {
      type:
        | "start"
        | "arrive"
        | "openQuestion"
        | "retry"
        | "resume"
        | "advance"
        | "reunite"
        | "celebrate"
        | "openChest"
        | "restart";
    }
  | { type: "answer"; answerId: string }
  | { type: "lifeline"; id: LifelineId; eliminated?: string[] };
export function newGame(): GameState {
  return {
    currentEncounter: 0,
    completedEncounters: [],
    health: 3,
    usedLifelines: [],
    eliminatedOptions: [],
    wrongAnswers: [],
    selectedAnswer: null,
    feedback: null,
    phase: "ready",
    chestOpened: false,
    reaction: 0,
  };
}
export function chooseEliminations(
  question: Question,
  wrongAnswers: string[],
  random = Math.random,
): string[] {
  const candidates = question.options
    .filter(
      (option) =>
        option.id !== question.correctAnswerId &&
        !wrongAnswers.includes(option.id),
    )
    .map((option) => option.id);
  for (let index = candidates.length - 1; index > 0; index--) {
    const swap = Math.floor(random() * (index + 1));
    [candidates[index], candidates[swap]] = [
      candidates[swap],
      candidates[index],
    ];
  }
  return [...wrongAnswers, ...candidates].slice(0, 2);
}
function completeEncounter(state: GameState): GameState {
  return {
    ...state,
    phase: "resolving",
    feedback: "correct",
    completedEncounters: [...state.completedEncounters, state.currentEncounter],
  };
}
export function gameReducer(state: GameState, action: GameAction): GameState {
  if (action.type === "restart") return newGame();
  if (action.type === "start" && state.phase === "ready")
    return { ...state, phase: "running" };
  if (action.type === "arrive" && state.phase === "running")
    return { ...state, phase: "encounter" };
  if (action.type === "openQuestion" && state.phase === "encounter")
    return { ...state, phase: "answering" };
  if (action.type === "retry" && state.phase === "hurt")
    return { ...state, phase: "answering" };
  if (action.type === "resume" && state.phase === "resolving")
    return {
      ...state,
      phase:
        state.currentEncounter === questions.length - 1 ? "arrival" : "onward",
    };
  if (action.type === "advance" && state.phase === "onward")
    return {
      ...state,
      phase: "running",
      currentEncounter: state.currentEncounter + 1,
      selectedAnswer: null,
      feedback: null,
      wrongAnswers: [],
      eliminatedOptions: [],
    };
  if (action.type === "reunite" && state.phase === "arrival")
    return { ...state, phase: "rescue" };
  if (action.type === "celebrate" && state.phase === "rescue")
    return { ...state, phase: "victory" };
  if (
    action.type === "openChest" &&
    state.phase === "victory" &&
    !state.chestOpened
  )
    return { ...state, chestOpened: true };
  if (state.phase !== "answering") return state;
  const question = questions[state.currentEncounter];
  if (action.type === "answer") {
    if (
      !question.options.some((option) => option.id === action.answerId) ||
      state.wrongAnswers.includes(action.answerId) ||
      state.eliminatedOptions.includes(action.answerId)
    )
      return state;
    const answered = {
      ...state,
      selectedAnswer: action.answerId,
      reaction: state.reaction + 1,
    };
    if (action.answerId === question.correctAnswerId)
      return completeEncounter(answered);
    const health = state.health - 1;
    return {
      ...answered,
      health,
      wrongAnswers: [...state.wrongAnswers, action.answerId],
      feedback: "wrong",
      phase: health === 0 ? "gameOver" : "hurt",
    };
  }
  if (action.type === "lifeline") {
    if (state.usedLifelines.includes(action.id)) return state;
    let eliminated = state.eliminatedOptions;
    if (action.id === "fifty") {
      if (
        !action.eliminated ||
        action.eliminated.length !== 2 ||
        new Set(action.eliminated).size !== 2 ||
        action.eliminated.some(
          (id) =>
            id === question.correctAnswerId ||
            !question.options.some((o) => o.id === id),
        ) ||
        !state.wrongAnswers.every((id) => action.eliminated?.includes(id))
      )
        return state;
      eliminated = action.eliminated;
    }
    const used = {
      ...state,
      usedLifelines: [...state.usedLifelines, action.id],
      eliminatedOptions: eliminated,
    };
    if (action.id === "skip")
      return completeEncounter({
        ...used,
        selectedAnswer: null,
        reaction: state.reaction + 1,
      });
    return used;
  }
  return state;
}
