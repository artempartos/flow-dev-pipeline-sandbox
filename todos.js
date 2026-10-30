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
