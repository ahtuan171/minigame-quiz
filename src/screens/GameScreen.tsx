import { Flag } from "lucide-react";
import { HintDialog } from "../components/HintDialog";
import { GameWorld } from "../components/GameWorld";
import { GameHUD } from "../components/GameHUD";
import { QuestionCard } from "../components/QuestionCard";
import { LifelineBar } from "../components/LifelineBar";
import { GameOverScreen } from "../components/GameOverScreen";
import { PrincessRescueScene } from "../components/PrincessRescueScene";
import { TreasureChest } from "../components/TreasureChest";
import { questions } from "../data/questions";
import { enemies, regions } from "../data/enemies";
import { playFeedback } from "../lib/sound";
import type { GameController } from "../hooks/useGame";
import type { RewardSettings } from "../types/game";

export function GameScreen({
  game,
  settings,
  onMute,
}: {
  game: GameController;
  settings: RewardSettings;
  onMute: () => void;
}) {
  const { state } = game,
    question = questions[state.currentEncounter],
    enemy = enemies[question.enemyId];
  const region = regions[Math.min(3, Math.floor(state.currentEncounter / 3))];
  const answering = state.phase === "answering";
  const reunion = ["arrival", "rescue", "victory"].includes(state.phase);
  const status = {
    ready: "Hiệp sĩ đã khởi động. Còn bạn thì sao?",
    running: "Đang đi. Chưa lạc. Tạm thời là vậy.",
    encounter: enemy.isBoss
      ? "Trùm cuối tới rồi. Hy vọng không hỏi quá khó."
      : "Lại một người gác cổng muốn hỏi chuyện…",
    answering: "Trả lời đúng là được đi. Nội quy hơi lạ.",
    hurt: "Mất một tim rồi. Đổi đáp án thử nhé!",
    resolving: "Lính gác chịu thua. Xin mời đi tiếp!",
    onward: "Qua cửa này, lại có cửa khác. Đi thôi!",
    gameOver: "Hết tim, chưa hết cách. Thử lại nào.",
    arrival: "Cổng lâu đài còn đóng. Công chúa ở bên trong.",
    rescue: "Cổng mở rồi. Công chúa đang ra ngoài!",
    victory: "Giải cứu xong! Giờ đến phần mở quà.",
  }[state.phase];
  return (
    <main className="game-screen side-scroll-screen full-adventure">
      <div className="adventure-heading">
        <div>
          <div className="eyebrow">
            <Flag size={13} />
            {region.chapter}
          </div>
          <h1>
            {reunion
              ? "Đón công chúa, rồi nhận quà"
              : "Hiệp sĩ lên đường, bạn lo câu đố"}
          </h1>
        </div>
        <span className="journey-chip">
          {enemy.isBoss && !reunion
            ? "Trận chiến cuối cùng"
            : `${String(state.currentEncounter + 1).padStart(2, "0")} / 10`}
        </span>
      </div>
      <GameHUD
        completed={state.completedEncounters.length}
        current={state.currentEncounter}
        health={state.health}
        remaining={3 - state.usedLifelines.length}
        muted={!settings.soundEnabled}
        onMute={onMute}
      />
      {reunion ? (
        <PrincessRescueScene phase={state.phase} paused={game.paused} />
      ) : (
        <GameWorld
          reactionKey={state.reaction}
          phase={state.phase}
          enemy={enemy}
          hurt={state.phase === "hurt" || state.phase === "gameOver"}
          currentEncounter={state.currentEncounter}
          paused={game.paused}
          onStart={() => game.send({ type: "start" })}
        />
      )}
      <div className="journey-status" role="status" aria-live="polite">
        <span className="journey-status-dot" />
        <span>{status}</span>
        <span className="encounter-count">
          {String(state.completedEncounters.length).padStart(2, "0")} / 10
        </span>
      </div>
      {(answering || state.phase === "resolving" || state.phase === "hurt") && (
        <div className="encounter-panel">
          <QuestionCard
            key={question.id}
            question={question}
            selected={
              state.eliminatedOptions.includes(state.selectedAnswer ?? "")
                ? null
                : state.selectedAnswer
            }
            eliminated={state.eliminatedOptions}
            incorrectAnswers={state.wrongAnswers}
            feedback={state.feedback}
            locked={!answering || game.paused}
            onSelect={(answerId) => {
              if (game.send({ type: "answer", answerId }))
                playFeedback(
                  settings.soundEnabled,
                  answerId === question.correctAnswerId,
                );
            }}
          />
          <LifelineBar
            used={state.usedLifelines}
            disabled={!answering || game.paused}
            onUse={game.useLifeline}
          />
        </div>
      )}
      {state.phase === "gameOver" && (
        <GameOverScreen
          completed={state.completedEncounters.length}
          onRestart={game.restart}
        />
      )}
      {state.phase === "victory" && (
        <TreasureChest
          opened={state.chestOpened}
          reward={settings}
          onOpen={() => game.send({ type: "openChest" })}
          onRestart={game.restart}
        />
      )}
      {game.storageError && (
        <p className="storage-warning" role="status">
          Trình duyệt không cho phép lưu tiến trình. Bạn vẫn có thể chơi trong
          phiên này.
        </p>
      )}
      {game.hintOpen && (
        <HintDialog hint={question.hint} onClose={game.closeHint} />
      )}
    </main>
  );
}
