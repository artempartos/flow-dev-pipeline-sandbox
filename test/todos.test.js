import { test } from "node:test";
import assert from "node:assert/strict";
import { addTodo, removeTodo, toggleTodo } from "../todos.js";

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
