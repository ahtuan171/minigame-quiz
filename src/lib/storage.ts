import type { GameState, RewardSettings } from "../types/game.ts";
import { questions } from "../data/questions.ts";
import { newGame } from "./game.ts";
export const PROGRESS_KEY = "red-princess.adventure.v1";
export const SETTINGS_KEY = "red-princess.reward.v1";
export const defaultSettings: RewardSettings = {
  title: "Quà qua ải",
  message: "Đội lính gác đã hết câu hỏi. Còn bạn thì có quà!",
  giftCode: "",
  sender: "",
  soundEnabled: false,
};
export function serializeProgress(state: GameState): string {
  let phase: "ready" | "answering" | "gameOver" | "arrival" | "victory" =
    state.phase === "gameOver"
      ? "gameOver"
      : state.phase === "victory"
        ? "victory"
        : state.phase === "arrival" || state.phase === "rescue"
          ? "arrival"
          : state.phase === "answering" || state.phase === "hurt"
            ? "answering"
            : "ready";
  const completedCount = state.completedEncounters.length;
  const advanced = completedCount > state.currentEncounter;
  if (advanced && completedCount === 10 && phase !== "victory")
    phase = "arrival";
  return JSON.stringify({
    version: 1,
    currentEncounter: Math.min(
      9,
      advanced ? completedCount : state.currentEncounter,
    ),
    completedEncounters: state.completedEncounters,
    health: state.health,
    usedLifelines: state.usedLifelines,
    eliminatedOptions: advanced ? [] : state.eliminatedOptions,
    wrongAnswers: advanced ? [] : state.wrongAnswers,
    phase,
    chestOpened: state.chestOpened,
  });
}
export function deserializeProgress(raw: string | null): GameState | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    if (
      !data ||
      data.version !== 1 ||
      !Number.isInteger(data.currentEncounter) ||
      data.currentEncounter < 0 ||
      data.currentEncounter > 9 ||
      !Number.isInteger(data.health) ||
      data.health < 0 ||
      data.health > 3
    )
      return null;
    const count = data.completedEncounters?.length;
    if (
      !Array.isArray(data.completedEncounters) ||
      count > 10 ||
      !data.completedEncounters.every(
        (value: unknown, index: number) => value === index,
      )
    )
      return null;
    if (
      !Array.isArray(data.usedLifelines) ||
      new Set(data.usedLifelines).size !== data.usedLifelines.length ||
      data.usedLifelines.some(
        (id: unknown) => !["fifty", "skip", "friend"].includes(String(id)),
      )
    )
      return null;
    if (
      !["ready", "answering", "gameOver", "arrival", "victory"].includes(
        data.phase,
      ) ||
      typeof data.chestOpened !== "boolean"
    )
      return null;
    if (
      (data.health === 0 && data.phase !== "gameOver") ||
      (data.health > 0 && data.phase === "gameOver")
    )
      return null;
    if (
      data.phase === "arrival" || data.phase === "victory"
        ? count !== 10 || data.currentEncounter !== 9
        : count !== data.currentEncounter
    )
      return null;
    if (data.chestOpened && data.phase !== "victory") return null;
    const wrongIds = questions[data.currentEncounter].options
      .filter(
        (option) =>
          option.id !== questions[data.currentEncounter].correctAnswerId,
      )
      .map((option) => option.id);
    for (const array of [data.wrongAnswers, data.eliminatedOptions])
      if (
        !Array.isArray(array) ||
        new Set(array).size !== array.length ||
        array.some((id: string) => !wrongIds.includes(id))
      )
        return null;
    if (
      data.wrongAnswers.length > 3 - data.health ||
      data.eliminatedOptions.length > 2 ||
      (data.eliminatedOptions.length > 0 &&
        (data.eliminatedOptions.length !== 2 ||
          !data.usedLifelines.includes("fifty")))
    )
      return null;
    return {
      ...newGame(),
      currentEncounter: data.currentEncounter,
      completedEncounters: data.completedEncounters,
      health: data.health,
      usedLifelines: data.usedLifelines,
      eliminatedOptions: data.eliminatedOptions,
      wrongAnswers: data.wrongAnswers,
      phase: data.phase,
      chestOpened: data.chestOpened,
    };
  } catch {
    return null;
  }
}
export function loadProgress(storage?: Storage): GameState | null {
  try {
    return deserializeProgress(
      (storage ?? window.localStorage).getItem(PROGRESS_KEY),
    );
  } catch {
    return null;
  }
}
export function saveProgress(state: GameState, storage?: Storage): boolean {
  try {
    (storage ?? window.localStorage).setItem(
      PROGRESS_KEY,
      serializeProgress(state),
    );
    return true;
  } catch {
    return false;
  }
}
export function clearProgress(storage?: Storage): boolean {
  try {
    (storage ?? window.localStorage).removeItem(PROGRESS_KEY);
    return true;
  } catch {
    return false;
  }
}
export function loadSettings(storage?: Storage): RewardSettings {
  try {
    const raw = (storage ?? window.localStorage).getItem(SETTINGS_KEY);
    if (!raw) return { ...defaultSettings };
    const data = JSON.parse(raw);
    return {
      title:
        typeof data.title === "string"
          ? data.title.slice(0, 80)
          : defaultSettings.title,
      message:
        typeof data.message === "string"
          ? data.message.slice(0, 600)
          : defaultSettings.message,
      giftCode:
        typeof data.giftCode === "string" ? data.giftCode.slice(0, 100) : "",
      sender: typeof data.sender === "string" ? data.sender.slice(0, 80) : "",
      soundEnabled: data.soundEnabled === true,
    };
  } catch {
    return { ...defaultSettings };
  }
}
export function saveSettings(
  settings: RewardSettings,
  storage?: Storage,
): boolean {
  try {
    (storage ?? window.localStorage).setItem(
      SETTINGS_KEY,
      JSON.stringify(settings),
    );
    return true;
  } catch {
    return false;
  }
}
