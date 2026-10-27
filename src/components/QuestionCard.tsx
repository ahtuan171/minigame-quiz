import { useEffect, useRef } from "react";
import { Check, Feather, MousePointer2, X } from "lucide-react";
import type { Question } from "../types/game";

interface QuestionCardProps {
  question: Question;
  selected: string | null;
  eliminated: string[];
  onSelect: (id: string) => void;
  feedback?: "wrong" | "correct" | null;
  locked?: boolean;
  incorrectAnswers?: string[];
}

export function QuestionCard({
  question,
  selected,
  eliminated,
  onSelect,
  feedback = null,
  locked = false,
  incorrectAnswers = [],
}: QuestionCardProps) {
  const card = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
    card.current?.scrollIntoView({
      block: "end",
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }, []);
  const message =
    feedback === "correct"
      ? "Chính xác! Hiệp sĩ đang mở lối đi tiếp."
      : feedback === "wrong"
        ? "Bạn mất một tim rồi. Đừng nản nhé, hãy chọn đáp án khác!"
        : "Chọn đáp án để giúp hiệp sĩ vượt qua người gác cổng.";
  return (
    <section
      ref={card}
      className="question-card"
      aria-labelledby="encounter-question"
    >
      <div className="question-topline">
        <span>
          <Feather size={15} />{" "}
          {question.floor === 10
            ? "CÂU ĐỐ CUỐI CÙNG"
            : "THỬ THÁCH CỦA NGƯỜI GÁC CỔNG"}
        </span>
        <span>{String(question.floor).padStart(2, "0")} / 10</span>
      </div>
      <h2 id="encounter-question" ref={heading} tabIndex={-1}>
        {question.question}
      </h2>
      <p className="question-instruction">
        Dùng trí thông minh để mở lối, thay vì sức mạnh.
      </p>
      <div className="answers" role="group" aria-label="Chọn một câu trả lời">
        {question.options.map((option) => (
          <button
            key={option.id}
            className={`answer ${selected === option.id ? `selected ${feedback ?? ""}` : ""} ${eliminated.includes(option.id) ? "eliminated" : ""} ${incorrectAnswers.includes(option.id) ? "failed-answer" : ""}`}
            disabled={
              locked ||
              eliminated.includes(option.id) ||
              incorrectAnswers.includes(option.id)
            }
            aria-pressed={selected === option.id}
            onClick={() => onSelect(option.id)}
          >
            <span className="answer-letter">{option.id.toUpperCase()}</span>
            <span>{option.text}</span>
            {selected === option.id &&
              (feedback === "wrong" ? <X size={18} /> : <Check size={18} />)}
          </button>
        ))}
      </div>
      <div className="answer-guidance" role="status">
        <MousePointer2 size={14} />
        <span>{message}</span>
      </div>
    </section>
  );
}
