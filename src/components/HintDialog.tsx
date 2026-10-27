import { useEffect, useRef } from "react";
import { Phone, X } from "lucide-react";

export function HintDialog({
  hint,
  onClose,
}: {
  hint: string;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement;
    element?.showModal();
    return () => {
      element?.close();
      if (previousFocus instanceof HTMLElement)
        previousFocus.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="hint-card"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      aria-labelledby="hint-title"
    >
      <button
        className="hint-close icon-button"
        onClick={onClose}
        aria-label="Đóng gợi ý"
        title="Đóng gợi ý"
      >
        <X size={19} />
      </button>
      <span className="hint-phone">
        <Phone size={27} />
      </span>
      <span className="tiny-label">TÍN HIỆU TỪ MỘT NGƯỜI BẠN</span>
      <h2 id="hint-title">A lô, mình nghe đây!</h2>
      <p>{hint}</p>
      <button className="primary-button" onClick={onClose}>
        Cảm ơn bạn, mình biết rồi!
      </button>
    </dialog>
  );
}
