const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const pool = require('./db');
const studentRoutes = require('./routes/student');
const portfolioRoutes = require('./routes/portfolio');
const authenticateToken = require('./middleware/authenticate');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = 'your_jwt_secret_key';

app.use(cors());
app.use(express.json());
app.use('/api/student', studentRoutes);
app.use('/api/portfolio', portfolioRoutes);

// REGISTER
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role, avatar } = req.body;
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (id, name, email, password, role, avatar) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [uuidv4(), name, email, hashedPassword, role, avatar || 'https://via.placeholder.com/150']
    );

    const { password: _, ...userData } = newUser.rows[0];
    const token = jwt.sign({ id: userData.id, email: userData.email, role: userData.role }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Register successful', token, user: userData });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// LOGIN
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const { password: _, ...userData } = user;
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token, user: userData });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PROFILE PROTECTED
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, email, role, avatar FROM users WHERE id = $1', [req.user.id]);
    res.json({ user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
