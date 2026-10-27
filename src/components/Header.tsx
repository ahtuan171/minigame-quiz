import { ArrowLeft, Castle, Settings2, Volume2, VolumeX } from "lucide-react";

interface HeaderProps {
  playing: boolean;
  muted: boolean;
  onHome: () => void;
  onMute: () => void;
  onSettings: () => void;
}

export function Header({
  playing,
  muted,
  onHome,
  onMute,
  onSettings,
}: HeaderProps) {
  return (
    <header className="site-header">
      <button
        className="brand"
        onClick={onHome}
        aria-label="Về trang chào mừng"
      >
        <span className="brand-icon">
          <Castle size={21} />
        </span>
        <span>
          một chuyện cổ tích
          <span className="brand-subtitle">PHIÊU LƯU NHỎ, CÂU ĐỐ TO</span>
        </span>
      </button>
      <div className="header-actions">
        {playing && (
          <button className="back-link" onClick={onHome}>
            <ArrowLeft size={15} />
            <span>Trang đầu</span>
          </button>
        )}
        <span className="header-divider" />
        <button
          className="icon-button"
          onClick={onMute}
          aria-label={muted ? "Bật âm thanh" : "Tắt âm thanh"}
        >
          {muted ? <VolumeX size={19} /> : <Volume2 size={19} />}
        </button>
        <button
          className="icon-button"
          onClick={onSettings}
          aria-label="Mở cài đặt"
        >
          <Settings2 size={19} />
        </button>
      </div>
    </header>
  );
}
