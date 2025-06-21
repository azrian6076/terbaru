// server/controllers/portfolioController.js

const pool = require('../db.js');

// Fungsi untuk membuat Sertifikasi
const createCertification = async (req, res) => {
  const { certificate_name, issuer, date } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'File sertifikat wajib diunggah.' });
  }

  const filePath = file.path;

  try {
    const result = await pool.query(
      'INSERT INTO certifications (user_id, certificate_name, issuer, date, file_path) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, certificate_name, issuer, date, filePath]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error saat menyimpan sertifikasi:', err);
    res.status(500).json({ message: 'Error saving certification' });
  }
};

// Fungsi untuk membuat Proyek
const createProject = async (req, res) => {
  const { nama_project, deskripsi, link_project } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: 'File hasil proyek wajib diunggah.' });
  }

  const filePath = file.path;

  try {
    const result = await pool.query(
      'INSERT INTO projects (user_id, nama_project, deskripsi, link_project, file_path) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, nama_project, deskripsi, link_project, filePath]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error saat menyimpan proyek:', err);
    res.status(500).json({ message: 'Error saving project' });
  }
};

// Ekspor kedua fungsi dalam satu objek
module.exports = {
  createCertification,
  createProject,
};