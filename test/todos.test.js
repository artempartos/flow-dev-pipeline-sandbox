import { test } from "node:test";
import assert from "node:assert/strict";
import { addTodo, countTodos, formatSummary, removeTodo, summaryText, toggleTodo } from "../todos.js";

test("addTodo appends a trimmed, open todo", () => {
  const todos = addTodo([], "  Buy milk ");
  assert.equal(todos.length, 1);
  assert.equal(todos[0].title, "Buy milk");
  assert.equal(todos[0].done, false);
});

test("addTodo ignores blank titles", () => {
  assert.deepEqual(addTodo([], "   "), []);
});

test("toggleTodo flips only the matching todo", () => {
  const todos = [{ id: 1, title: "a", done: false }, { id: 2, title: "b", done: false }];
  assert.deepEqual(toggleTodo(todos, 2).map((t) => t.done), [false, true]);
});

test("removeTodo drops the matching todo", () => {
  const todos = [{ id: 1, title: "a", done: false }, { id: 2, title: "b", done: false }];
  assert.deepEqual(removeTodo(todos, 1).map((t) => t.id), [2]);
});

test("countTodos counts an empty list as 0 of 0", () => {
  assert.deepEqual(countTodos([]), { done: 0, total: 0 });
});

test("countTodos counts done and total as todos are checked and unchecked", () => {
  const todos = [{ id: 1, title: "a", done: false }, { id: 2, title: "b", done: false }];
  assert.deepEqual(countTodos(todos), { done: 0, total: 2 });
  const checked = toggleTodo(todos, 1);
  assert.deepEqual(countTodos(checked), { done: 1, total: 2 });
  assert.deepEqual(countTodos(toggleTodo(checked, 1)), { done: 0, total: 2 });
});

test("countTodos follows removeTodo", () => {
  const todos = [{ id: 1, title: "a", done: true }, { id: 2, title: "b", done: false }];
  assert.deepEqual(countTodos(removeTodo(todos, 1)), { done: 0, total: 1 });
  assert.deepEqual(countTodos(removeTodo(todos, 2)), { done: 1, total: 1 });
  assert.deepEqual(countTodos(removeTodo([{ id: 1, title: "a", done: true }], 1)), { done: 0, total: 0 });
});

test("countTodos counts all done", () => {
  const todos = [{ id: 1, title: "a", done: true }, { id: 2, title: "b", done: true }];
  assert.deepEqual(countTodos(todos), { done: 2, total: 2 });
  assert.equal(formatSummary(countTodos(todos)), "2 of 2 done");
});

test("countTodos is unchanged by a blank title", () => {
  assert.deepEqual(countTodos(addTodo([], "   ")), { done: 0, total: 0 });
  const two = [{ id: 1, title: "a", done: true }, { id: 2, title: "b", done: false }];
  assert.deepEqual(countTodos(addTodo(two, "  ")), countTodos(two));
});

test("formatSummary renders \"N of M done\"", () => {
  assert.equal(formatSummary({ done: 0, total: 2 }), "0 of 2 done");
  assert.equal(formatSummary({ done: 1, total: 2 }), "1 of 2 done");
  assert.equal(formatSummary({ done: 0, total: 1 }), "0 of 1 done");
  assert.equal(formatSummary({ done: 1, total: 1 }), "1 of 1 done");
});

test("summaryText is empty for an empty list", () => {
  assert.equal(summaryText([]), "");
  assert.equal(summaryText(addTodo([], "   ")), "");
});

test("summaryText is empty again after the last todo is removed", () => {
  assert.equal(summaryText(removeTodo([{ id: 1, title: "a", done: true }], 1)), "");
  assert.equal(summaryText(removeTodo([{ id: 1, title: "a", done: false }], 1)), "");
});

test("summaryText renders \"N of M done\" for a non-empty list", () => {
  const todos = [{ id: 1, title: "a", done: false }, { id: 2, title: "b", done: false }];
  assert.equal(summaryText(todos), "0 of 2 done");
  assert.equal(summaryText(toggleTodo(todos, 1)), "1 of 2 done");
  assert.equal(summaryText([{ id: 1, title: "a", done: false }]), "0 of 1 done");
});
