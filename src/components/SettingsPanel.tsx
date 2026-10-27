import { useEffect, useRef, useState } from "react";
import { Check, RotateCcw, Volume2, X } from "lucide-react";
import type { RewardSettings } from "../types/game";
export function SettingsPanel({
  settings,
  onSave,
  onClose,
  onReset,
  storageError,
}: {
  settings: RewardSettings;
  onSave: (settings: RewardSettings) => void;
  onClose: () => void;
  onReset: () => void;
  storageError: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [draft, setDraft] = useState(settings),
    [saved, setSaved] = useState(false);
  useEffect(() => {
    const element = dialog.current,
      previous = document.activeElement;
    element?.showModal();
    return () => {
      element?.close();
      if (previous instanceof HTMLElement)
        previous.focus({ preventScroll: true });
    };
  }, []);
  function edit(field: keyof RewardSettings, value: string | boolean) {
    setDraft((current) => ({ ...current, [field]: value }));
    setSaved(false);
  }
  return (
    <dialog
      ref={dialog}
      className="settings-dialog reward-settings"
      aria-labelledby="settings-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="settings-top">
        <h2 id="settings-title">Cài đặt & phần thưởng</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label="Đóng cài đặt"
        >
          <X size={20} />
        </button>
      </div>
      <p>Chọn quà cho người vượt qua đủ 10 cửa ải.</p>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSave({
            ...draft,
            title: draft.title.trim(),
            message: draft.message.trim(),
            giftCode: draft.giftCode.trim(),
            sender: draft.sender.trim(),
          });
          setSaved(true);
        }}
      >
        <label>
          Tên phần thưởng
          <input
            name="rewardTitle"
            value={draft.title}
            onChange={(event) => edit("title", event.target.value)}
            maxLength={80}
            required
            pattern=".*\S.*"
          />
        </label>
        <label>
          Lời nhắn
          <textarea
            name="rewardMessage"
            value={draft.message}
            onChange={(event) => edit("message", event.target.value)}
            maxLength={600}
            rows={3}
            required
          />
        </label>
        <div className="settings-field-row">
          <label>
            Mã quà tặng <small>(không bắt buộc)</small>
            <input
              name="giftCode"
              value={draft.giftCode}
              onChange={(event) => edit("giftCode", event.target.value)}
              maxLength={100}
            />
          </label>
          <label>
            Người gửi <small>(không bắt buộc)</small>
            <input
              name="sender"
              value={draft.sender}
              onChange={(event) => edit("sender", event.target.value)}
              maxLength={80}
            />
          </label>
        </div>
        <div className="sound-setting">
          <span>
            <Volume2 size={18} />
            Âm báo nhẹ
          </span>
          <button
            type="button"
            className={`toggle ${draft.soundEnabled ? "on" : ""}`}
            role="switch"
            aria-checked={draft.soundEnabled}
            aria-label="Âm thanh"
            onClick={() => edit("soundEnabled", !draft.soundEnabled)}
          >
            <span />
          </button>
        </div>
        <p className="settings-note">
          Phần thưởng chỉ lưu trên trình duyệt và thiết bị này. Đây không phải
          nơi lưu mã quà bí mật hay hệ thống phần thưởng bảo mật.
        </p>
        <button className="primary-button" type="submit">
          <Check size={17} />
          Lưu món quà
        </button>
        <p
          className={`settings-save-status ${storageError ? "save-error" : ""}`}
          role="status"
        >
          {storageError
            ? "Trình duyệt không cho phép lưu. Thay đổi chỉ có trong phiên này."
            : saved
              ? "Đã lưu món quà trên trình duyệt này."
              : "Bạn có thể thay đổi món quà bất cứ lúc nào."}
        </p>
      </form>
      <button className="reset-progress" onClick={onReset}>
        <RotateCcw size={14} />
        Chơi lại từ đầu · Giữ nguyên món quà
      </button>
    </dialog>
  );
}
