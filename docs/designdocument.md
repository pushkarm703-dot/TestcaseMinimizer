## Design Document - Test Case Minimizer

### Architecture

- Node.js + Express backend
- Core minimization service implementing greedy set-cover algorithm
- REST API layer exposing `/api/minimize`
- Static web UI served from `/` to demonstrate minimization interactively

### Data Model

- Requirement: string identifier (e.g., `R1`, `Login`, `FeatureX`).
- TestCase: `{ id: string, covers: string[] }`.

### Algorithm

- Greedy set-cover:
  - While uncovered requirements exist, pick the test that covers the maximum number of uncovered requirements.
  - Add it to selected tests and mark its requirements as covered.
  - Stop when no test can improve coverage or all are covered.

This directly supports the main purpose of the project: **reducing the number of tests run in a CI/CD pipeline while still covering all specified requirements**, which shortens feedback cycles and saves compute resources.

