## Demo Script - Test Case Minimizer

This script helps you give a smooth, step-by-step demo showing the full working of the project.

---

### 0. Setup (before you start speaking)

1. In a terminal:
   ```bash
   cd D:\DevOpsProj2
   npm install      # if not already done
   npm run dev
   ```
2. Open browser tabs:
   - `http://localhost:8080` (Web UI).
   - Optionally `http://localhost:8080/api/minimize` in a tool like Postman or VS Code REST client.

---

### 1. Intro (what you will show)

Say:

- *“I will show how my Test Case Minimizer takes a list of requirements and tests, and automatically finds a smaller test suite that still covers all the requirements. This is useful in DevOps to speed up CI/CD pipelines.”*

Point at the UI:

- Requirements input (left).
- Tests JSON (right).
- Result box at the bottom.

---

### 2. Demo 1 – Simple coverage example

**Goal**: Show that the system can find a minimal set of tests.

1. In the UI at `http://localhost:8080`, set:
   - Requirements:  
     `R1,R2,R3,R4`
   - Tests JSON:
     ```json
     [
       { "id": "T1", "covers": ["R1", "R2"] },
       { "id": "T2", "covers": ["R2", "R3"] },
       { "id": "T3", "covers": ["R3", "R4"] },
       { "id": "T4", "covers": ["R1", "R4"] }
     ]
     ```
2. Click **“Minimize Test Suite”**.
3. Explain the output:
   - Show the **selectedTests** list (e.g., it might pick 2 or 3 tests depending on coverage).
   - Explain how these tests together cover all R1–R4.

Talking points:

- *“Each requirement must appear in at least one selected test. The algorithm tries to cover as many new requirements as possible with each chosen test, so we end up with fewer tests overall.”*

---

### 3. Demo 2 – Removing redundant tests

**Goal**: Show how redundant tests are dropped.

1. Change inputs to:
   - Requirements:  
     `login,signup,profile`
   - Tests JSON:
     ```json
     [
       { "id": "Tlogin-full", "covers": ["login", "signup", "profile"] },
       { "id": "Tlogin-only", "covers": ["login"] },
       { "id": "Tsignup-only", "covers": ["signup"] },
       { "id": "Tprofile-only", "covers": ["profile"] }
     ]
     ```
2. Click **“Minimize Test Suite”**.
3. Explain the output:
   - The minimizer should pick only **`Tlogin-full`**.

Talking points:

- *“Here, one test case already covers all requirements. Running the extra three tests doesn’t add coverage, so the minimizer shows that we can run just one test instead of four.”*
- *“In a CI/CD pipeline, this kind of reduction can save a lot of time.”*

---

### 4. Demo 3 – Detecting missing coverage

**Goal**: Show that the tool can detect when not all requirements can be covered.

1. Change inputs to:
   - Requirements:  
     `R1,R2,R3`
   - Tests JSON:
     ```json
     [
       { "id": "T1", "covers": ["R1"] },
       { "id": "T2", "covers": ["R1", "R2"] }
     ]
     ```
2. Click **“Minimize Test Suite”**.
3. Explain the output:
   - **`coverageSatisfied`** is `false`.
   - `uncoveredRequirements` contains `["R3"]`.

Talking points:

- *“This shows that our current test suite is incomplete; there is no test that covers R3.”*
- *“The tool not only minimizes tests, it also helps us find coverage gaps.”*

---

### 5. Show the API (optional but good)

If asked about the backend/API, demonstrate:

1. Open Postman or any REST client.
2. Send a `POST` request to:
   - URL: `http://localhost:8080/api/minimize`
   - Body (JSON), you can reuse one of the examples:
     ```json
     {
       "requirements": ["R1", "R2", "R3"],
       "tests": [
         { "id": "T1", "covers": ["R1", "R2"] },
         { "id": "T2", "covers": ["R2", "R3"] }
       ]
     }
     ```
3. Show that the response matches what you saw in the UI.

Talking points:

- *“This API can be integrated into CI/CD pipelines or other tools to automatically compute a minimized test set before running tests.”*

---

### 6. Connect to the code and DevOps parts

Briefly show files in your IDE:

- `src/main/services/minimizerService.js`
  - Explain that this contains the **greedy set-cover algorithm**.
- `src/main/routes/minimizer.js`
  - Show how the API route receives the JSON and calls the service.
- `infrastructure/docker/Dockerfile`
  - Mention containerization.
- `.github/workflows/cicd.yml` and `pipelines/Jenkinsfile`
  - Mention automated tests and Docker build in CI/CD.

You do not need to read every line — just point to where each responsibility lives.

---

### 7. Closing statement

End with something like:

- *“In summary, my Test Case Minimizer helps DevOps teams run fewer tests while still keeping coverage, leading to faster and more efficient CI/CD pipelines. It provides a simple web UI, a reusable API, and fits well into containerized, automated environments.”*

