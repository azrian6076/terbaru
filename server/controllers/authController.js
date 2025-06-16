const bcrypt = require('bcrypt');
const pool = require('../db');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Cari user berdasarkan email
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Email tidak ditemukan' });
    }

    const user = userResult.rows[0];

    // 2. Cek password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Password salah' });
    }

    // 3. Ambil data mahasiswa jika role-nya student
    let profileData = null;
    if (user.role === 'student') {
      const profileResult = await pool.query(
        'SELECT * FROM mahasiswa WHERE user_id = $1',
        [user.id]
      );
      profileData = profileResult.rows[0];
    }

    // 4. Buat token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      'rahasia_jwt_key',
      { expiresIn: '2h' }
    );

    // 5. Kirim response
    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.name, // ganti ke `user.username` jika pakai itu
        role: user.role,
        profile: profileData // ← ini bisa dipakai di frontend
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};
