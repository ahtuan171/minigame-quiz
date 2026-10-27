import { Sparkles } from "lucide-react";
import { Knight } from "./Knight";
import { Sprite } from "./Sprite";
import { ParallaxBackground } from "./ParallaxBackground";
import type { GamePhase } from "../types/game";

export function PrincessRescueScene({
  phase,
  paused,
}: {
  phase: GamePhase;
  paused: boolean;
}) {
  const arriving = phase === "arrival";
  return (
    <section
      className={`game-world reunion-scene phase-${phase}`}
      data-phase={phase}
      data-paused={paused}
      aria-label={
        arriving
          ? "Công chúa bị giữ trong lâu đài. Hiệp sĩ tiến đến cổng."
          : "Công chúa bước ra từ cổng lâu đài, tiến về phía hiệp sĩ."
      }
    >
      <ParallaxBackground />
      <div className="reunion-message">
        <Sparkles size={16} />
        <h2>
          {arriving
            ? "Đến nơi rồi. Công chúa ở trong lâu đài!"
            : phase === "rescue"
              ? "Cổng mở rồi. Ra ngoài thôi, công chúa!"
              : "Giải cứu xong. Vừa kịp giờ ăn bánh."}
        </h2>
      </div>
      <div className="rescue-castle" aria-label="Lâu đài nơi công chúa bị giam">
        <div className="rescue-turret left" />
        <div className="rescue-turret right" />
        <div className="rescue-keep">
          <span className="rescue-window" />
          <div className="castle-gate">
            <i />
            <i />
          </div>
        </div>
        <span className="castle-banner" />
      </div>
      <Knight phase={phase} hurt={false} />
      <div className="rescued-princess">
        <Sprite
          className="princess-facing-knight"
          kind="princess"
          pose={phase === "victory" ? "victory" : "idle"}
        />
      </div>
      <div className="world-vignette" aria-hidden="true" />
    </section>
  );
}
