const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../db');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

// Cek jika .env tidak memiliki secret
if (!process.env.JWT_SECRET) {
  console.warn('⚠️ JWT_SECRET belum didefinisikan di .env!');
}

const allowedRoles = ['admin', 'student', 'lecturer', 'prodi', 'industry'];

exports.register = async (req, res) => {
  const { name, email, password, role = 'student', avatar = null } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Nama, email, dan password harus diisi.' });
  }

  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: 'Role tidak valid.' });
  }

  try {
    // Cek apakah email sudah digunakan
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ message: 'Email sudah terdaftar.' });
    }

    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert ke tabel users
    const newUserResult = await pool.query(
      `INSERT INTO users (id, name, email, password, role, avatar)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, role, avatar`,
      [userId, name, email, hashedPassword, role, avatar]
    );
    const newUser = newUserResult.rows[0];

    // Map role ke nama tabel
    const roleTableMap = {
      student: 'mahasiswa',
      lecturer: 'dosen',
      prodi: 'prodi',
      industry: 'industri'
    };

    // Insert ke tabel role jika ada
    if (roleTableMap[role]) {
      const roleTable = roleTableMap[role];
      const roleTableId = uuidv4(); // ID khusus untuk tabel mahasiswa/dosen/etc

      await pool.query(
        `INSERT INTO ${roleTable} (id, user_id, nama, email) VALUES ($1, $2, $3, $4)`,
        [roleTableId, userId, name, email]
      );
    }

    // Buat JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(201).json({
      message: 'Registrasi berhasil!',
      token,
      user: newUser
    });
  } catch (err) {
    console.error('Register error:', err.message);
    res.status(500).json({ message: 'Terjadi kesalahan saat registrasi.' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email dan password harus diisi.' });
  }

  try {
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    const user = userResult.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Email atau password salah.' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Terjadi kesalahan saat login.' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, email, role, avatar FROM users WHERE id = $1',
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
    }

    res.status(200).json({ user: result.rows[0] });
  } catch (err) {
    console.error('Get profile error:', err.message);
    res.status(500).json({ message: 'Gagal mengambil profil pengguna.' });
  }
};
