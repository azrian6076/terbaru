const bcrypt = require('bcrypt');
const pool = require('../db');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
 
    const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Email tidak ditemukan' });
    }

    const user = userResult.rows[0];

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Password salah' });
    }

    let profileData = null;
    if (user.role === 'student') {
      const profileResult = await pool.query(
        'SELECT * FROM mahasiswa WHERE user_id = $1',
        [user.id]
      );
      profileData = profileResult.rows[0];
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      'rahasia_jwt_key',
      { expiresIn: '2h' }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.name, 
        role: user.role,
        profile: profileData 
      }
    });
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Terjadi kesalahan server' });
  }
};
