## API Documentation - Test Case Minimizer

### POST /api/minimize

- **Description**: Minimize a given test suite while maintaining coverage of all specified requirements (if possible).
- **Request Body**:

```json
{
  "requirements": ["R1", "R2", "R3"],
  "tests": [
    { "id": "T1", "covers": ["R1", "R2"] },
    { "id": "T2", "covers": ["R2", "R3"] }
  ]
}
```

- **Responses**:

**200 OK** (successful or best-effort):

```json
{
  "selectedTests": ["T1", "T2"],
  "coverageSatisfied": true,
  "uncoveredRequirements": []
}
```

If not all requirements can be covered:

```json
{
  "selectedTests": ["T1"],
  "coverageSatisfied": false,
  "uncoveredRequirements": ["R3"]
}
```

**400 Bad Request**: Invalid payload.

