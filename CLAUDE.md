# Todos sandbox

A static single-page todo list (no build step, no dependencies), used as a sandbox
for an agentic delivery pipeline.

- Logic lives in `todos.js` as pure functions; `app.js` only wires them to the DOM.
- Tests: `npm test` (Node's built-in `node --test`). Every behaviour change in
  `todos.js` gets a test in `test/`. There is no linter.
- Branches: work branches from `develop`, PRs target `develop`. `staging` deploys
  to GitHub Pages (workflow `deploy-staging`). `main` is released by a person only.
- Staging: https://blog.partos.me/flow-dev-pipeline-sandbox/ — no login, no data
  persists (state is in memory and resets on reload).
- Commits: Conventional Commits.
