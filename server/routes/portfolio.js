const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticate');

router.get('/', authenticateToken, (req, res) => {
  res.json({ message: 'Portfolio route - protected' });
});

module.exports = router;
