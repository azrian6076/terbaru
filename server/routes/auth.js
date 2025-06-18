const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authenticateToken = require('../middleware/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/profile', authenticateToken, async (req, res) => {
  const pool = require('../db');
  const result = await pool.query('SELECT id, name, email, role, avatar FROM users WHERE id = $1', [req.user.id]);
  res.json({ user: result.rows[0] });
});

module.exports = router;
