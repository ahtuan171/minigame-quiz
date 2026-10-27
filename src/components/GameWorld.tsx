import { ArrowRight, Check, Flag, Sparkles } from "lucide-react";
import { Knight } from "./Knight";
import { ParallaxBackground } from "./ParallaxBackground";
import { Sprite } from "./Sprite";
import type { Enemy } from "../types/game";
import type { GamePhase } from "../types/game";
import { regions } from "../data/enemies";

interface GameWorldProps {
  phase: GamePhase;
  enemy: Enemy;
  hurt: boolean;
  reactionKey: number;
  onStart: () => void;
  currentEncounter: number;
  paused: boolean;
}

export function GameWorld({
  phase,
  enemy,
  hurt,
  reactionKey,
  onStart,
  currentEncounter,
  paused,
}: GameWorldProps) {
  const stopped =
    phase === "encounter" || phase === "answering" || phase === "hurt";
  const region = regions[Math.min(3, Math.floor(currentEncounter / 3))];
  return (
    <section
      className={`game-world phase-${phase} region-${Math.min(3, Math.floor(currentEncounter / 3))} ${enemy.isBoss ? "boss-world" : ""}`}
      aria-label={`Hiệp sĩ phiêu lưu tại ${region.name}`}
      data-phase={phase}
      data-paused={paused}
      data-encounter={currentEncounter + 1}
    >
      <ParallaxBackground />
      <div className="world-location">
        <span className="location-icon">
          <Flag size={15} />
        </span>
        <div>
          <h2>{region.name}</h2>
          <p>Trên đường đến Tháp Ánh Trăng</p>
        </div>
      </div>
      <div className="world-path-sign" aria-hidden="true">
        <span>THÁP ÁNH TRĂNG →</span>
        <i />
      </div>
      <Knight key={`knight-${reactionKey}`} phase={phase} hurt={hurt} />
      <div key={`enemy-${currentEncounter}`} className="world-enemy-arrival">
        <div className="forest-gateway" aria-hidden="true">
          <span />
          <span />
          <i />
        </div>
        <div className="world-enemy">
          <span className="character-shadow" aria-hidden="true" />
          <span className="world-enemy-art">
            <Sprite kind={enemy.sprite} />
          </span>
          <span className="encounter-alert" aria-hidden="true">
            !
          </span>
          <span className="defeat-spark" aria-hidden="true">
            ✦
          </span>
        </div>
      </div>
      {stopped && (
        <div className="enemy-speech">
          <strong>{enemy.name}</strong>
          <p>“{enemy.dialogue}”</p>
        </div>
      )}
      {phase === "ready" && (
        <div className="world-ready">
          <span className="world-ready-kicker">
            <Sparkles size={14} /> {region.chapter}
          </span>
          <h3>
            {currentEncounter === 0 ? (
              <>
                Kiếm sẵn rồi.
                <br />
                Não khởi động chưa?
              </>
            ) : (
              <>
                Nghỉ đủ rồi.
                <br />
                Đi tiếp thôi nào.
              </>
            )}
          </h3>
          <button className="primary-button" onClick={onStart}>
            {currentEncounter === 0
              ? "Đi thôi, hiệp sĩ!"
              : "Tiếp tục hành trình"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
      )}
      {phase === "resolving" && (
        <div className="world-victory-note">
          <Check size={18} />
          <span>Đúng rồi! Lính gác hết câu hỏi.</span>
        </div>
      )}
      {(phase === "running" || phase === "onward") && (
        <div className="world-travel-caption">
          <span />
          {phase === "onward"
            ? "Còn sức, còn đi. Còn lính gác nữa."
            : "Hiệp sĩ đi bộ. Bạn phụ trách suy nghĩ."}
        </div>
      )}
      <div className="world-vignette" aria-hidden="true" />
    </section>
  );
}
