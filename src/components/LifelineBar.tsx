import {
  ArrowRightToLine,
  Check,
  Phone,
  Scissors,
  Sparkles,
} from "lucide-react";

import type { LifelineId } from "../types/game";
export type { LifelineId } from "../types/game";

export function LifelineBar({
  used,
  onUse,
  disabled = false,
}: {
  used: LifelineId[];
  onUse: (id: LifelineId) => void;
  disabled?: boolean;
}) {
  const lifelines = [
    {
      id: "fifty" as const,
      title: "Phép 50/50",
      description: "Bớt hai lựa chọn",
      icon: Scissors,
    },
    {
      id: "skip" as const,
      title: "Bước nhảy kỳ diệu",
      description: "Mở lối đi tiếp",
      icon: ArrowRightToLine,
    },
    {
      id: "friend" as const,
      title: "Gọi bạn đồng hành",
      description: "Một lời gợi ý nhỏ",
      icon: Phone,
    },
  ];
  return (
    <section className="lifeline-panel" aria-label="Phép trợ giúp">
      <div className="lifeline-heading">
        <span>
          <Sparkles size={14} /> TÚI PHÉP THUẬT
        </span>
        <span>Mỗi phép dùng một lần</span>
      </div>
      <div className="lifelines">
        {lifelines.map(({ id, title, description, icon: Icon }) => (
          <button
            key={id}
            disabled={disabled || used.includes(id)}
            onClick={() => onUse(id)}
            className={`lifeline ${id}`}
          >
            <span className="lifeline-icon">
              {used.includes(id) ? <Check size={19} /> : <Icon size={19} />}
            </span>
            <span>
              <strong>{title}</strong>
              <small>{used.includes(id) ? "Đã dùng" : description}</small>
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
