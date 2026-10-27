import { Check, Crown, Heart, Volume2, VolumeX } from "lucide-react";
export function GameHUD({
  completed,
  current,
  health,
  remaining,
  muted,
  onMute,
}: {
  completed: number;
  current: number;
  health: number;
  remaining: number;
  muted: boolean;
  onMute: () => void;
}) {
  return (
    <div className="game-hud">
      <div
        key={health}
        className="hud-hearts"
        role="status"
        aria-label={`Còn ${health} trên 3 trái tim`}
      >
        {[0, 1, 2].map((index) => (
          <Heart
            key={index}
            fill={index < health ? "currentColor" : "none"}
            className={index >= health ? "heart-empty" : ""}
            size={19}
          />
        ))}
      </div>
      <ol
        className="encounter-progress"
        aria-label={`${completed} trên 10 cuộc chạm trán đã vượt qua`}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <li
            key={index}
            className={
              index < completed
                ? "marker-completed"
                : index === current
                  ? "marker-current"
                  : "marker-locked"
            }
            aria-label={`Chạm trán ${index + 1}: ${index < completed ? "đã vượt qua" : index === current ? "hiện tại" : "chưa khám phá"}`}
            aria-current={
              index === current && index >= completed ? "step" : undefined
            }
          >
            {index === 9 ? (
              <Crown size={12} />
            ) : index < completed ? (
              <Check size={12} />
            ) : (
              <span />
            )}
          </li>
        ))}
      </ol>
      <div className="hud-actions">
        <span className="hud-magic" title="Số phép trợ giúp còn lại">
          ✦ <span>{remaining}/3</span>
        </span>
        <button
          className="icon-button"
          onClick={onMute}
          aria-label={muted ? "Bật âm thanh" : "Tắt âm thanh"}
        >
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
        </button>
      </div>
    </div>
  );
}
