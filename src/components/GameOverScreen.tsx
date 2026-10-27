import { useEffect, useRef } from "react";
import { Heart, RotateCcw } from "lucide-react";
export function GameOverScreen({
  completed,
  onRestart,
}: {
  completed: number;
  onRestart: () => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    heading.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, []);
  return (
    <section className="ending-card game-over-card">
      <Heart size={25} />
      <p className="ending-eyebrow">NGHỈ CHÂN MỘT CHÚT NHÉ</p>
      <h2 ref={heading} tabIndex={-1}>
        Hiệp sĩ cần nghỉ giải lao.
      </h2>
      <p>
        Bạn đã vượt qua <strong>{completed} / 10</strong> cuộc chạm trán.
        <br />
        Hết tim chứ chưa hết cơ hội. Uống ngụm nước rồi thử lại nhé.
      </p>
      <button className="primary-button" onClick={onRestart}>
        <RotateCcw size={17} />
        Thử lại từ đầu
      </button>
    </section>
  );
}
