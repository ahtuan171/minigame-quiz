export type SpriteId =
  "princess" | "guard" | "boss" | "knight" | "chestClosed" | "chestOpen";

export interface QuizOption {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  floor: number;
  question: string;
  options: QuizOption[];
  correctAnswerId: string;
  hint: string;
  enemyId: string;
}

export interface Enemy {
  id: string;
  name: string;
  dialogue: string;
  sprite: SpriteId;
  isBoss: boolean;
}

export type LifelineId = "fifty" | "skip" | "friend";
export type GamePhase =
  | "ready"
  | "running"
  | "encounter"
  | "answering"
  | "hurt"
  | "resolving"
  | "onward"
  | "gameOver"
  | "arrival"
  | "rescue"
  | "victory";
export interface GameState {
  currentEncounter: number;
  completedEncounters: number[];
  health: number;
  usedLifelines: LifelineId[];
  eliminatedOptions: string[];
  wrongAnswers: string[];
  selectedAnswer: string | null;
  feedback: "wrong" | "correct" | null;
  phase: GamePhase;
  chestOpened: boolean;
  reaction: number;
}
export interface RewardSettings {
  title: string;
  message: string;
  giftCode: string;
  sender: string;
  soundEnabled: boolean;
}
