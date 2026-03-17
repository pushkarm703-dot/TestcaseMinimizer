const express = require('express');
const { minimizeTestSuite } = require('../services/minimizerService');

const router = express.Router();

router.post('/minimize', (req, res) => {
  const { requirements, tests } = req.body || {};

  if (!Array.isArray(requirements) || !Array.isArray(tests)) {
    return res.status(400).json({
      error: 'Invalid payload. Expected { requirements: string[], tests: { id, covers[] }[] }'
    });
  }

  try {
    const result = minimizeTestSuite(requirements, tests);
    return res.json(result);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Minimization error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

