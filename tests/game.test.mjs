import { test } from "node:test";
import assert from "node:assert/strict";
import {
  gameReducer as reduce,
  newGame,
  chooseEliminations,
} from "../src/lib/game.ts";
import { questions } from "../src/data/questions.ts";
import { enemies } from "../src/data/enemies.ts";
const answering = (state = newGame()) =>
  ["start", "arrive", "openQuestion"].reduce(
    (s, type) => reduce(s, { type }),
    state,
  );
const correct = (state) =>
  reduce(state, {
    type: "answer",
    answerId: questions[state.currentEncounter].correctAnswerId,
  });
const wrongId = (state) =>
  questions[state.currentEncounter].options.find(
    (o) =>
      o.id !== questions[state.currentEncounter].correctAnswerId &&
      !state.wrongAnswers.includes(o.id),
  ).id;
const next = (state) =>
  reduce(reduce(correct(answering(state)), { type: "resume" }), {
    type: "advance",
  });

test("data contains exactly ten valid questions and only the final enemy is a boss", () => {
  assert.equal(questions.length, 10);
  questions.forEach((q, i) => {
    assert.equal(q.floor, i + 1);
    assert.equal(q.options.length, 4);
    assert.equal(new Set(q.options.map((o) => o.id)).size, 4);
    assert(q.options.some((o) => o.id === q.correctAnswerId));
    assert(q.hint.length > 15);
    assert.equal(enemies[q.enemyId].isBoss, i === 9);
  });
});
test("scripted milestones guard out-of-order travel and quiz events", () => {
  const fresh = newGame();
  assert.equal(reduce(fresh, { type: "answer", answerId: "b" }), fresh);
  const running = reduce(fresh, { type: "start" });
  assert.equal(running.phase, "running");
  assert.equal(reduce(running, { type: "openQuestion" }), running);
  assert.equal(reduce(running, { type: "arrive" }).phase, "encounter");
  assert.equal(answering().phase, "answering");
});
test("a wrong answer costs exactly one heart, locks rapid submissions, and stays disabled", () => {
  const initial = answering(),
    id = wrongId(initial);
  const hurt = reduce(initial, { type: "answer", answerId: id });
  assert.equal(hurt.health, 2);
  assert.equal(hurt.phase, "hurt");
  assert.equal(reduce(hurt, { type: "answer", answerId: id }), hurt);
  const retry = reduce(hurt, { type: "retry" });
  assert.equal(retry.phase, "answering");
  assert.equal(reduce(retry, { type: "answer", answerId: id }), retry);
  assert.equal(correct(retry).health, 2);
});
test("three distinct mistakes end the adventure and late events cannot revive it", () => {
  let state = answering();
  for (let i = 0; i < 3; i++) {
    state = reduce(state, { type: "answer", answerId: wrongId(state) });
    if (i < 2) state = reduce(state, { type: "retry" });
  }
  assert.equal(state.health, 0);
  assert.equal(state.phase, "gameOver");
  assert.deepEqual(state.completedEncounters, []);
  assert.equal(correct(state), state);
  assert.equal(reduce(state, { type: "resume" }), state);
  assert.deepEqual(reduce(state, { type: "restart" }), newGame());
});
test("correct answer completes once, locks submissions, and health never regenerates", () => {
  let state = answering();
  state = reduce(reduce(state, { type: "answer", answerId: wrongId(state) }), {
    type: "retry",
  });
  const won = correct(state);
  assert.equal(won.phase, "resolving");
  assert.deepEqual(won.completedEncounters, [0]);
  assert.equal(correct(won), won);
  const onward = reduce(won, { type: "resume" });
  assert.equal(onward.phase, "onward");
  const advanced = reduce(onward, { type: "advance" });
  assert.equal(advanced.currentEncounter, 1);
  assert.equal(advanced.phase, "running");
  assert.equal(advanced.health, 2);
  assert.deepEqual(advanced.wrongAnswers, []);
  assert.equal(reduce(advanced, { type: "advance" }), advanced);
});
test("50/50 removes exactly two wrong choices even after one or two mistakes", () => {
  for (const wrongCount of [0, 1, 2]) {
    let state = answering();
    for (let i = 0; i < wrongCount; i++)
      state = reduce(
        reduce(state, { type: "answer", answerId: wrongId(state) }),
        { type: "retry" },
      );
    const removed = chooseEliminations(
      questions[0],
      state.wrongAnswers,
      () => 0.5,
    );
    assert.equal(removed.length, 2);
    assert.equal(new Set(removed).size, 2);
    assert(!removed.includes(questions[0].correctAnswerId));
    assert(state.wrongAnswers.every((id) => removed.includes(id)));
    const used = reduce(state, {
      type: "lifeline",
      id: "fifty",
      eliminated: removed,
    });
    assert.equal(used.health, state.health);
    assert.equal(
      reduce(used, { type: "lifeline", id: "fifty", eliminated: removed }),
      used,
    );
    assert.equal(
      questions[0].options.filter(
        (o) =>
          !used.eliminatedOptions.includes(o.id) &&
          !used.wrongAnswers.includes(o.id),
      ).length,
      2,
    );
  }
});
test("invalid answers and invalid 50/50 events cannot corrupt the encounter", () => {
  const state = answering();
  assert.equal(reduce(state, { type: "answer", answerId: "oops" }), state);
  assert.equal(
    reduce(state, { type: "lifeline", id: "fifty", eliminated: ["b", "a"] }),
    state,
  );
});
test("friend and skip can each be used only once for the entire adventure", () => {
  let state = answering();
  state = reduce(state, { type: "lifeline", id: "friend" });
  assert.equal(reduce(state, { type: "lifeline", id: "friend" }), state);
  state = reduce(state, { type: "lifeline", id: "skip" });
  assert.equal(state.phase, "resolving");
  assert.equal(state.health, 3);
  state = reduce(
    reduce(reduce(state, { type: "resume" }), { type: "advance" }),
    { type: "arrive" },
  );
  state = reduce(state, { type: "openQuestion" });
  assert.equal(reduce(state, { type: "lifeline", id: "skip" }), state);
  assert.deepEqual(state.usedLifelines, ["friend", "skip"]);
});
test("all ten encounters lead through castle arrival and rescue to an unopened chest", () => {
  let state = newGame();
  for (let stage = 0; stage < 10; stage++) {
    if (state.phase === "running")
      state = reduce(reduce(state, { type: "arrive" }), {
        type: "openQuestion",
      });
    else state = answering(state);
    assert.equal(state.currentEncounter, stage);
    state = correct(state);
    state = reduce(state, { type: "resume" });
    if (stage < 9) state = reduce(state, { type: "advance" });
  }
  assert.equal(state.phase, "arrival");
  assert.equal(state.completedEncounters.length, 10);
  state = reduce(state, { type: "reunite" });
  assert.equal(state.phase, "rescue");
  state = reduce(state, { type: "celebrate" });
  assert.equal(state.phase, "victory");
  assert.equal(state.chestOpened, false);
  state = reduce(state, { type: "openChest" });
  assert.equal(state.chestOpened, true);
  assert.equal(reduce(state, { type: "openChest" }), state);
});
test("skip also defeats the final boss without costing health", () => {
  let state = newGame();
  for (let i = 0; i < 9; i++) {
    state =
      state.phase === "running"
        ? reduce(reduce(state, { type: "arrive" }), { type: "openQuestion" })
        : answering(state);
    state = reduce(reduce(correct(state), { type: "resume" }), {
      type: "advance",
    });
  }
  state = reduce(reduce(state, { type: "arrive" }), { type: "openQuestion" });
  state = reduce(state, { type: "lifeline", id: "skip" });
  assert.equal(state.completedEncounters.length, 10);
  assert.equal(state.health, 3);
  assert.equal(reduce(state, { type: "resume" }).phase, "arrival");
});
