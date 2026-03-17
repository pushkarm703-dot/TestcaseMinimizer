## Test Case Minimizer - Presentation Outline

### 1. Title & Introduction (1–2 min)

- **Title**: Test Case Minimizer – Minimize Test Suites While Maintaining Coverage  
- **You**: Name, Reg. No., Course (CSE3253 DevOps [PE6])  
- **Problem**:
  - Modern CI/CD pipelines run **hundreds or thousands of tests**.
  - This leads to **slow feedback**, higher compute cost, and delayed releases.
  - Many tests are **redundant** (cover the same requirements).
- **Goal**:
  - Build a tool that picks the **smallest set of tests** that still covers all required features.

### 2. Motivation & Use Case (1–2 min)

- **Why this matters in DevOps**:
  - Faster pipelines → more frequent deployments.
  - Less resource usage → cost savings.
  - Clear visibility into **which tests are critical** for coverage.
- **Example scenario**:
  - A microservice with 50 tests, but only 15 are needed to cover all requirements.
  - Your minimizer finds those 15 and shows that coverage is still satisfied.

### 3. High-Level Architecture (2–3 min)

- Show a simple architecture diagram (from `docs/designdocument.md` or slide):
  - **Client (Web UI)** → **Express API** → **Minimization Service**.
- Briefly explain each component:
  - **Web UI** (`/`): Lets user enter requirements & tests and see results instantly.
  - **API** (`/api/minimize`): Receives JSON, runs algorithm, returns minimized set.
  - **Minimization Service**: Implements greedy set-cover.
  - **DevOps Layer**: Docker, docker-compose, GitHub Actions, Jenkinsfile.

### 4. Data Model & Algorithm (3–4 min)

- **Data model**:
  - Requirement: string (e.g., `R1`, `login`, `checkout`).
  - Test case: `{ id: "T1", covers: ["R1", "R2"] }`.
- **Algorithm (Greedy Set Cover)**:
  1. Start with **all requirements uncovered**.
  2. Repeatedly pick the **test that covers the most uncovered requirements**.
  3. Mark those requirements as covered and add the test to the result.
  4. Continue until:
     - All requirements are covered → success.
     - Or no remaining test can cover new requirements → report uncovered ones.
- Emphasize:
  - This is a **classic approximation algorithm** for the set cover problem.
  - Perfect minimality is NP-hard, but greedy gives a **good and fast approximation**.

### 5. Live Demo Plan (5–6 min)

Use the UI at `http://localhost:8080` and the API.

#### Demo 1 – Simple coverage example

- Requirements: `R1,R2,R3,R4`  
- Tests:
  - `T1`: covers `R1, R2`
  - `T2`: covers `R2, R3`
  - `T3`: covers `R3, R4`
  - `T4`: covers `R1, R4`
- Expected explanation:
  - Many combinations cover everything, but the minimizer will pick a **small set**.
  - Show the selected tests and explain how each contributes to coverage.

#### Demo 2 – Redundant tests

- Requirements: `login,signup,profile`  
- Tests:
  - `Tlogin-full`: covers `login, signup, profile`
  - `Tlogin-only`: covers `login`
  - `Tsignup-only`: covers `signup`
  - `Tprofile-only`: covers `profile`
- Expected result:
  - Minimizer chooses **only `Tlogin-full`** (1 test instead of 3–4).
  - Explain: This shows **elimination of redundancy** in the test suite.

#### Demo 3 – Impossible full coverage

- Requirements: `R1,R2,R3`  
- Tests:
  - `T1`: covers `R1`
  - `T2`: covers `R1,R2`
- Expected result:
  - `coverageSatisfied = false`
  - `uncoveredRequirements = ["R3"]`
  - Explain: The tool can **detect gaps in test coverage** and report them.

### 6. DevOps Aspects (2–3 min)

- **Docker & Docker Compose**:
  - Show `Dockerfile` (Node 18, production install).
  - Show `docker-compose.yml` to run the app quickly.
- **CI/CD**:
  - Show GitHub Actions workflow:
    - Checkout → Install → Run tests → Build Docker image.
  - Show Jenkinsfile stages:
    - Checkout → Install → Test → Build Docker image.
- **Testing**:
  - Explain unit tests (`minimizerService`) and integration tests (API).

### 7. Results & Benefits (1–2 min)

- Summarize:
  - Able to **reduce test suite size** while preserving coverage (when possible).
  - Provides **fast feedback** for developers.
  - Helps teams **focus on critical tests**.
- Mention any performance notes:
  - Greedy algorithm is fast for realistic suite sizes.

### 8. Challenges & Learnings (1–2 min)

- Possible talking points:
  - Designing input format for requirements and tests.
  - Balancing simplicity vs. flexibility in the UI.
  - Understanding and implementing the greedy set-cover algorithm.
  - Integrating Node.js with DevOps tools (Docker, CI/CD).

### 9. Conclusion & Q&A (1–2 min)

- Restate the main idea:
  - *“This project demonstrates how we can use algorithmic optimization in DevOps to speed up CI/CD by minimizing test suites while maintaining coverage.”*
- Invite questions and be ready to:
  - Walk through one of the demo examples again.
  - Explain the algorithm with a small whiteboard/table example.

