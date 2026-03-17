## User Guide - Test Case Minimizer

### Running the Application

#### Local (without Docker)

```bash
npm install
npm run dev
```

Open `http://localhost:8080` in a browser or call the API.

#### With Docker Compose

```bash
docker compose up --build
```

### Using the API

- **Endpoint**: `POST /api/minimize`
- **Body**:

```json
{
  "requirements": ["R1", "R2"],
  "tests": [
    { "id": "T1", "covers": ["R1"] },
    { "id": "T2", "covers": ["R1", "R2"] }
  ]
}
```

- **Response**:

```json
{
  "selectedTests": ["T2"],
  "coverageSatisfied": true,
  "uncoveredRequirements": []
}
```

### Using the Web UI

1. With the app running, open `http://localhost:8080` in your browser.
2. Enter your **requirements** as a comma-separated list.
3. Paste or edit the **tests JSON** to reflect which requirements each test covers.
4. Click **"Minimize Test Suite"**.

The page will show:
- The **selected minimal set of tests**.
- Whether **coverage is still satisfied**.
- Any **uncovered requirements** if full coverage is impossible.

