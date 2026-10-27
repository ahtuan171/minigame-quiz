import { useEffect, useRef } from "react";
import { Gift, Heart, RotateCcw, Sparkles } from "lucide-react";
import { Sprite } from "./Sprite";
import type { RewardSettings } from "../types/game";
export function TreasureChest({
  opened,
  reward,
  onOpen,
  onRestart,
}: {
  opened: boolean;
  reward: RewardSettings;
  onOpen: () => void;
  onRestart: () => void;
}) {
  const title = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (opened) title.current?.focus({ preventScroll: true });
  }, [opened]);
  return (
    <section
      className={`ending-card treasure-card ${opened ? "chest-opened" : ""}`}
    >
      <p className="ending-eyebrow">
        <Sparkles size={14} /> QUA ẢI RỒI, NHẬN QUÀ THÔI
      </p>
      {!opened ? (
        <>
          <h2>Rương này không ra câu đố.</h2>
          <p>
            Qua đủ 10 cửa rồi.
            <br />
            Bấm mở rương, không cần trả lời thêm.
          </p>
          <button
            className="chest-button"
            onClick={onOpen}
            aria-label="Mở rương báu"
            aria-expanded={false}
            aria-controls="reward-reveal"
          >
            <Sprite kind="chestClosed" />
            <span>
              <Gift size={17} />
              Mở rương báu
            </span>
          </button>
        </>
      ) : (
        <>
          <div className="treasure-open-art">
            <Sprite kind="chestOpen" />
          </div>
          <div id="reward-reveal" className="reward-reveal">
            <h2 ref={title} tabIndex={-1}>
              Chúc mừng! Giải cứu thành công.
            </h2>
            <p className="reward-congratulations">
              Công chúa tự do, lính gác hết câu hỏi. Giờ nhận quà thôi!
            </p>
            <h3 className="reward-title">
              {reward.title || "Phần thưởng của bạn"}
            </h3>
            <p>{reward.message}</p>
            {reward.giftCode && (
              <div className="gift-code">
                <span>MÃ QUÀ TẶNG</span>
                <code>{reward.giftCode}</code>
              </div>
            )}
            {reward.sender && (
              <p className="reward-sender">
                <Heart size={13} />
                Từ {reward.sender}
              </p>
            )}
          </div>
          <div className="confetti" aria-hidden="true">
            {Array.from({ length: 12 }, (_, index) => (
              <i
                key={index}
                style={{
                  left: `${8 + index * 7.5}%`,
                  animationDelay: `${index * 55}ms`,
                }}
              />
            ))}
          </div>
        </>
      )}
      <button className="replay-link" onClick={onRestart}>
        <RotateCcw size={15} />
        Chơi lại hành trình
      </button>
    </section>
  );
}
