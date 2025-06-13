import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid'; // install dengan: npm install uuid

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database
const users = [
  {
    id: '1',
    name: 'alex',
    email: 'student@example.com',
    password: '$2a$10$X/4Zo.A1v5IutBL8NVVHfeqLIBJzn4jmEFwSKQnvpvl5iMU9phPL.', // password123
    role: 'student',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg'
  },
  {
    id: '2',
    name: 'Dr. sutjamoko',
    email: 'lecturer@example.com',
    password: '$2a$10$X/4Zo.A1v5IutBL8NVVHfeqLIBJzn4jmEFwSKQnvpvl5iMU9phPL.', // password123
    role: 'lecturer',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg'
  },
  {
    id: '3',
    name: 'Prodi Admin',
    email: 'prodi@example.com',
    password: '$2a$10$X/4Zo.A1v5IutBL8NVVHfeqLIBJzn4jmEFwSKQnvpvl5iMU9phPL.', // password123
    role: 'prodi',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
  },
  {
    id: '4',
    name: 'Industry',
    email: 'industry@example.com',
    password: '$2a$10$X/4Zo.A1v5IutBL8NVVHfeqLIBJzn4jmEFwSKQnvpvl5iMU9phPL.', // password123
    role: 'industry',
    avatar: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
  },
  {
    id: '5',
    name: 'System Admin',
    email: 'admin@example.com',
    password: '$2a$10$X/4Zo.A1v5IutBL8NVVHfeqLIBJzn4jmEFwSKQnvpvl5iMU9phPL.', // password123
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg'
  }
];

// JWT Secret
const JWT_SECRET = 'your_jwt_secret_key';

// LOGIN endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _, ...userData } = user;

    res.json({
      message: 'Login successful',
      token,
      user: userData
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// REGISTER endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role, avatar } = req.body;

    const existingUser = users.find(u => u.email === email);
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
      role,
      avatar: avatar || 'https://via.placeholder.com/150'
    };

    users.push(newUser);

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const { password: _, ...userData } = newUser;

    res.status(201).json({
      message: 'Register successful',
      token,
      user: userData
    });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Protected Profile Endpoint
app.get('/api/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

// Middleware JWT Validator
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'No token provided' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
