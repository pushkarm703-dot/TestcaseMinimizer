const { minimizeTestSuite } = require('../../main/services/minimizerService');

describe('minimizeTestSuite', () => {
  test('returns minimal covering set for simple case', () => {
    const requirements = ['R1', 'R2', 'R3'];
    const tests = [
      { id: 'T1', covers: ['R1', 'R2'] },
      { id: 'T2', covers: ['R2', 'R3'] },
      { id: 'T3', covers: ['R3'] }
    ];

    const result = minimizeTestSuite(requirements, tests);

    expect(result.coverageSatisfied).toBe(true);
    expect(result.selectedTests.length).toBe(2);
    expect(result.selectedTests).toEqual(expect.arrayContaining(['T1', 'T2']));
  });

  test('reports uncovered requirements when impossible', () => {
    const requirements = ['R1', 'R2'];
    const tests = [
      { id: 'T1', covers: ['R1'] }
    ];

    const result = minimizeTestSuite(requirements, tests);

    expect(result.coverageSatisfied).toBe(false);
    expect(result.uncoveredRequirements).toContain('R2');
  });
});

