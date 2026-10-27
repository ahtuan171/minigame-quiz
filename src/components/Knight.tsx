import { Sprite } from "./Sprite";
import type { GamePhase } from "../types/game";

export function Knight({ phase, hurt }: { phase: GamePhase; hurt: boolean }) {
  const movement =
    phase === "running" || phase === "onward" || phase === "arrival"
      ? "running"
      : phase === "resolving"
        ? "attack"
        : phase === "victory" || phase === "rescue"
          ? "victory"
          : "idle";
  return (
    <div
      className={`world-knight knight-${movement} ${hurt ? "knight-hurt" : ""}`}
    >
      <span className="character-shadow" aria-hidden="true" />
      <div className="knight-body">
        <Sprite kind="knight" pose={hurt ? "hurt" : movement} />
      </div>
      <span className="attack-arc" aria-hidden="true" />
      <span className="running-dust" aria-hidden="true" />
    </div>
  );
}
