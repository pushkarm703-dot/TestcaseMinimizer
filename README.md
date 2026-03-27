Test Case Minimizer - DevOps Project
====================================

Student Name: Pushkar Punit Mishra
Registration No: 23FE10CSE00502
Course: CSE3253 DevOps [PE6]
Semester: VI (2025-2026)
Project Type: Jenkins & CI/CD, Containerization, Monitoring
Difficulty: Intermediate

## Project Overview

**Problem Statement**  
Modern software projects often accumulate large test suites, which increase build times and slow down CI/CD pipelines. This project provides a **Test Case Minimizer** service that selects the smallest subset of test cases while preserving coverage of all required features or code areas.

## Objectives

- [ ] Build a Node.js-based service to minimize test suites while maintaining coverage.
- [ ] Expose the minimization logic via a REST API (and optional simple UI).
- [ ] Containerize the application using Docker and orchestrate via Docker Compose.
- [ ] Integrate CI/CD (GitHub Actions and/or Jenkins) to run tests and build images.
- [ ] Provide basic monitoring hooks/placeholders for future integration (e.g., Nagios).

## Key Features

- **Test case modeling**: Represent test cases and covered requirements in JSON.
- **Minimization engine**: Greedy set-cover based algorithm to find a small covering subset.
- **REST API**: Endpoint to submit test suites and retrieve minimized suites.
- **Interactive web UI**: Landing page where you can paste requirements and tests and see the minimized suite instantly.
- **DevOps integrations**: Dockerfile, docker-compose, sample CI/CD pipelines.

## Technology Stack

**Core Technologies**
- **Programming Language**: Node.js (JavaScript)
- **Framework**: Express
- **Database**: None (in-memory processing; can be extended later)

**DevOps Tools**
- **Version Control**: Git
- **CI/CD**: GitHub Actions (sample workflow), Jenkins (Jenkinsfile template)
- **Containerization**: Docker
- **Orchestration**: Docker Compose (Kubernetes manifests placeholders)
- **Monitoring**: Nagios configuration placeholders

## Getting Started

### Prerequisites

- [ ] Node.js 18+ and npm
- [ ] Docker Desktop v20.10+ (for containerized run)
- [ ] Git 2.30+

### Installation (Local, without Docker)

```bash
git clone https://github.com/[username]/devopsproject-testcaseminimizer.git
cd devopsproject-testcaseminimizer
npm install
npm run dev
```

The application will start on `http://localhost:8080`.

### Installation (With Docker & Docker Compose)

```bash
docker compose up --build
```

Access:
- Web Interface (UI): `http://localhost:8080`
- API: `http://localhost:8080/api/minimize`

## API Overview

- **POST** `/api/minimize`  
  Request body:
  ```json
  {
    "requirements": ["R1", "R2", "R3"],
    "tests": [
      { "id": "T1", "covers": ["R1", "R2"] },
      { "id": "T2", "covers": ["R2", "R3"] },
      { "id": "T3", "covers": ["R3"] }
    ]
  }
  ```
  Response:
  ```json
  {
    "selectedTests": ["T1", "T2"],
    "coverageSatisfied": true
  }
  ```

## Project Structure

The repository follows the recommended DevOps project layout:

- `src/` – Source code  
  - `main/` – Main implementation (Express app, minimizer logic, config)  
  - `test/` – Test files (unit and integration)  
  - `scripts/` – Utility scripts (if needed)  
- `docs/` – Documentation (project plan, design, user guide, API docs)  
- `infrastructure/` – Infrastructure as Code (Docker, Kubernetes, etc.)  
- `pipelines/` – CI/CD pipeline definitions (Jenkinsfile, GitHub Actions)  
- `tests/` – Test suites (unit, integration, E2E, test data)  
- `monitoring/` – Monitoring configs (Nagios, alerts, dashboards)  
- `presentations/` – Slide deck, demo script  
- `deliverables/` – Final report, demo video, self-assessment  

## CI/CD

A starter GitHub Actions workflow is included under `.github/workflows/cicd.yml` to:
- Install dependencies
- Run tests
- Build and scan a Docker image

A Jenkinsfile template is also provided under `pipelines/Jenkinsfile` for Jenkins-based CI/CD.

## Future Enhancements

- Support for different coverage criteria (statement/branch/path).
- Historical storage of minimization runs and reports.
- Integration with real test runners (e.g., triggering Jest/Mocha suites).
- Richer monitoring dashboards and alerts.

## License

This project is licensed under the MIT License. See `LICENSE` for details.

