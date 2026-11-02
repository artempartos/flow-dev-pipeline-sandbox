export function addTodo(todos, title) {
  const trimmed = title.trim();
  if (trimmed === "") return todos;
  return [...todos, { id: Date.now() + Math.random(), title: trimmed, done: false }];
}

export function toggleTodo(todos, id) {
  return todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo));
}

export function removeTodo(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

export function countTodos(todos) {
  return { done: todos.filter((todo) => todo.done).length, total: todos.length };
}

export function formatSummary({ done, total }) {
  return `${done} of ${total} done`;
}

export function summaryText(todos) {
  if (todos.length === 0) return "";
  return formatSummary(countTodos(todos));
}
