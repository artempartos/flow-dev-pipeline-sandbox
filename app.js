import { addTodo, countTodos, formatSummary, removeTodo, toggleTodo } from "./todos.js";

let todos = [];

const form = document.querySelector("#new-todo");
const input = document.querySelector("#title");
const list = document.querySelector("#todos");
const summary = document.querySelector("#summary");

function render() {
  list.replaceChildren(
    ...todos.map((todo) => {
      const item = document.createElement("li");
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = todo.done;
      checkbox.addEventListener("change", () => {
        todos = toggleTodo(todos, todo.id);
        render();
      });
      label.append(checkbox, ` ${todo.title}`);
      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "Remove";
      remove.setAttribute("aria-label", `Remove ${todo.title}`);
      remove.addEventListener("click", () => {
        todos = removeTodo(todos, todo.id);
        render();
      });
      item.append(label, remove);
      if (todo.done) item.classList.add("done");
      return item;
    })
  );
  const counts = countTodos(todos);
  summary.hidden = counts.total === 0;
  summary.textContent = counts.total === 0 ? "" : formatSummary(counts);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  todos = addTodo(todos, input.value);
  input.value = "";
  render();
});

render();
