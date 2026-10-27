import { test } from "node:test";
import assert from "node:assert/strict";
import { newGame, gameReducer as reduce } from "../src/lib/game.ts";
import {
  serializeProgress as serialize,
  deserializeProgress as restore,
  loadSettings,
  saveSettings,
  saveProgress,
  clearProgress,
  PROGRESS_KEY,
  SETTINGS_KEY,
  defaultSettings,
} from "../src/lib/storage.ts";
const answering = () =>
  ["start", "arrive", "openQuestion"].reduce(
    (s, type) => reduce(s, { type }),
    newGame(),
  );
const memory = () => {
  const values = new Map();
  return {
    getItem: (k) => values.get(k) ?? null,
    setItem: (k, v) => values.set(k, v),
    removeItem: (k) => values.delete(k),
  };
};
test("restore keeps lost hearts, wrong choices, elimination, and lifeline usage", () => {
  let state = answering();
  state = reduce(reduce(state, { type: "answer", answerId: "a" }), {
    type: "retry",
  });
  state = reduce(state, {
    type: "lifeline",
    id: "fifty",
    eliminated: ["a", "d"],
  });
  state = reduce(state, { type: "lifeline", id: "friend" });
  const loaded = restore(serialize(state));
  assert.equal(loaded.health, 2);
  assert.deepEqual(loaded.wrongAnswers, ["a"]);
  assert.deepEqual(loaded.eliminatedOptions, ["a", "d"]);
  assert.deepEqual(loaded.usedLifelines, ["fifty", "friend"]);
  assert.equal(loaded.phase, "answering");
  assert.equal(loaded.selectedAnswer, null);
  assert.equal(reduce(loaded, { type: "lifeline", id: "friend" }), loaded);
});
test("reload during hurt never refunds health or repeats damage", () => {
  const hurt = reduce(answering(), { type: "answer", answerId: "a" });
  const loaded = restore(serialize(hurt));
  assert.equal(loaded.phase, "answering");
  assert.equal(loaded.health, 2);
  assert.equal(reduce(loaded, { type: "answer", answerId: "a" }), loaded);
});
test("reload during defeat or onward safely advances exactly once", () => {
  const won = reduce(answering(), { type: "answer", answerId: "b" });
  for (const state of [won, reduce(won, { type: "resume" })]) {
    const loaded = restore(serialize(state));
    assert.equal(loaded.currentEncounter, 1);
    assert.equal(loaded.phase, "ready");
    assert.deepEqual(loaded.completedEncounters, [0]);
    assert.equal(reduce(loaded, { type: "resume" }), loaded);
  }
});
test("travel reload returns to a safe ready state without animation timers", () => {
  const running = reduce(newGame(), { type: "start" });
  const raw = serialize(running);
  assert(!raw.includes("running"));
  assert(!raw.includes("reaction"));
  assert.equal(restore(raw).phase, "ready");
});
test("game over and opened victory chest persist", () => {
  let state = answering();
  for (const id of ["a", "c", "d"]) {
    state = reduce(state, { type: "answer", answerId: id });
    if (state.phase === "hurt") state = reduce(state, { type: "retry" });
  }
  assert.equal(restore(serialize(state)).phase, "gameOver");
  const victory = {
    ...newGame(),
    currentEncounter: 9,
    completedEncounters: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    phase: "victory",
    chestOpened: true,
  };
  assert.equal(restore(serialize(victory)).chestOpened, true);
});
test("malformed, incompatible, and impossible progress starts cleanly", () => {
  for (const raw of [
    null,
    "oops",
    "null",
    "{}",
    JSON.stringify({ version: 1, ...newGame(), health: -2 }),
    JSON.stringify({ version: 1, ...newGame(), completedEncounters: [3] }),
    JSON.stringify({
      version: 1,
      ...newGame(),
      usedLifelines: ["skip", "skip"],
    }),
    JSON.stringify({ version: 1, ...newGame(), phase: "victory" }),
  ])
    assert.equal(restore(raw), null);
});
test("resetting progress preserves host rewards and sound preference", () => {
  const store = memory(),
    settings = {
      ...defaultSettings,
      title: "Một buổi hẹn",
      message: "Đi ngắm sao nhé!",
      giftCode: "THU-2026",
      sender: "Người thương",
      soundEnabled: true,
    };
  assert(saveSettings(settings, store));
  assert(saveProgress(answering(), store));
  assert(clearProgress(store));
  assert.equal(store.getItem(PROGRESS_KEY), null);
  assert.deepEqual(loadSettings(store), settings);
  assert(store.getItem(SETTINGS_KEY));
});
test("blocked browser storage fails gracefully", () => {
  const blocked = {
    getItem() {
      throw Error("blocked");
    },
    setItem() {
      throw Error("blocked");
    },
    removeItem() {
      throw Error("blocked");
    },
  };
  assert.equal(saveProgress(newGame(), blocked), false);
  assert.equal(clearProgress(blocked), false);
  assert.equal(saveSettings(defaultSettings, blocked), false);
  assert.deepEqual(loadSettings(blocked), defaultSettings);
});
