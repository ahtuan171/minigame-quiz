import { MoonStar, Sparkles } from "lucide-react";
import { Sprite } from "./Sprite";
import type { Enemy } from "../types/game";

export function EnemyCard({ enemy }: { enemy: Enemy }) {
  return (
    <section className="enemy-card" aria-label="Người gác tầng hiện tại">
      <div className="enemy-scenery" aria-hidden="true">
        <MoonStar className="enemy-moon" size={54} />
        <span className="enemy-star one">✦</span>
        <span className="enemy-star two">✧</span>
        <div className="enemy-arch" />
        <div className="enemy-pedestal" />
      </div>
      <div className="enemy-portrait">
        <Sprite kind={enemy.sprite} />
        <span className="sleep-mark" aria-hidden="true">
          z<span>z</span>
        </span>
      </div>
      <div className="enemy-copy">
        <span className="enemy-kicker">
          <Sparkles size={12} /> NGƯỜI GÁC TẦNG 01
        </span>
        <h2>{enemy.name}</h2>
        <p>“{enemy.dialogue}”</p>
      </div>
    </section>
  );
}
