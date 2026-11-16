# AGENTS.md

Small Node.js library used to test an agent team end to end.

- Source lives in `src/`, tests in `test/`. Plain ES modules, no dependencies.
- Run tests with `npm test` (Node's built-in test runner). All tests must pass before a pull request.
- Every new exported function gets JSDoc and tests, including invalid-input cases.
- Work on a branch and open a pull request against `main`. Never push to `main` directly.
