/**
 * Greedy set-cover style minimization.
 * requirements: array of requirement IDs (e.g., ['R1', 'R2'])
 * tests: array of { id: string, covers: string[] }
 */
function minimizeTestSuite (requirements, tests) {
  const remaining = new Set(requirements);
  const selected = [];

  const testsCopy = tests.map(t => ({
    id: t.id,
    covers: Array.isArray(t.covers) ? t.covers : []
  }));

  while (remaining.size > 0) {
    let bestTest = null;
    let bestGain = 0;

    for (const t of testsCopy) {
      const gain = t.covers.filter(r => remaining.has(r)).length;
      if (gain > bestGain) {
        bestGain = gain;
        bestTest = t;
      }
    }

    if (!bestTest || bestGain === 0) {
      // Cannot cover all remaining requirements
      return {
        selectedTests: selected,
        coverageSatisfied: false,
        uncoveredRequirements: Array.from(remaining)
      };
    }

    selected.push(bestTest.id);
    for (const r of bestTest.covers) {
      remaining.delete(r);
    }
  }

  return {
    selectedTests: selected,
    coverageSatisfied: true,
    uncoveredRequirements: []
  };
}

module.exports = {
  minimizeTestSuite
};

