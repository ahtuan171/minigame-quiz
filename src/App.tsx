import { useRef, useState } from "react";
import { Heart, Sparkles } from "lucide-react";
import { Header } from "./components/Header";
import { SettingsPanel } from "./components/SettingsPanel";
import { StartScreen } from "./screens/StartScreen";
import { GameScreen } from "./screens/GameScreen";
import { useGame } from "./hooks/useGame";
import { useSettings } from "./hooks/useSettings";

export default function App() {
  const [screen, setScreen] = useState<"welcome" | "playing">("welcome");
  const [settingsOpen, setSettingsOpen] = useState(false);
  const main = useRef<HTMLDivElement>(null);
  const game = useGame(screen !== "playing" || settingsOpen);
  const host = useSettings();
  function navigate(next: "welcome" | "playing") {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "instant" });
    requestAnimationFrame(() => main.current?.focus({ preventScroll: true }));
  }
  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Đến nội dung chính
      </a>
      <div className="ambient-stars" aria-hidden="true">
        <span>✦</span>
        <span>·</span>
        <span>✧</span>
        <span>·</span>
        <span>✦</span>
        <span>·</span>
      </div>
      <Header
        playing={screen === "playing"}
        muted={!host.settings.soundEnabled}
        onHome={() => navigate("welcome")}
        onMute={host.toggleSound}
        onSettings={() => setSettingsOpen(true)}
      />
      <div id="main-content" ref={main} tabIndex={-1} className="main-content">
        {screen === "welcome" ? (
          <StartScreen
            hasProgress={game.hasProgress}
            onContinue={() => navigate("playing")}
            onStart={() => {
              game.restart();
              navigate("playing");
            }}
          />
        ) : (
          <GameScreen
            game={game}
            settings={host.settings}
            onMute={host.toggleSound}
          />
        )}
      </div>
      <footer className="site-footer">
        <span>
          Một chuyến phiêu lưu vừa đủ vui <Heart size={11} />
        </span>
        <span>
          <Sparkles size={12} />
          Lính gác nhiều chuyện · Công chúa sốt ruột
        </span>
      </footer>
      {settingsOpen && (
        <SettingsPanel
          settings={host.settings}
          onSave={host.update}
          storageError={host.error}
          onClose={() => setSettingsOpen(false)}
          onReset={() => {
            game.reset();
            setSettingsOpen(false);
            navigate("welcome");
          }}
        />
      )}
    </div>
  );
}
