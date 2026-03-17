const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

const minimizerRouter = require('./routes/minimizer');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static UI
app.use(express.static(path.join(__dirname, '..', '..', 'public')));

app.use('/api', minimizerRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Test Case Minimizer running on http://localhost:${PORT}`);
});

module.exports = app;

