import pool from '../db.js';

export const createCertification = async (req, res) => {
  const { certificate_name, issuer, date, file_path } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO certifications (user_id, certificate_name, issuer, date, file_path) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, certificate_name, issuer, date, file_path]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error saving certification' });
  }
};

export const createActivity = async (req, res) => {
  const { nama_kegiatan, jenis_kegiatan, deskripsi, tempat, tanggal, file_path } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO activities (user_id, nama_kegiatan, jenis_kegiatan, deskripsi, tempat, tanggal, file_path) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [req.user.id, nama_kegiatan, jenis_kegiatan, deskripsi, tempat, tanggal, file_path]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error saving activity' });
  }
};

export const createProject = async (req, res) => {
  const { nama_project, deskripsi, link_project, file_path } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO projects (user_id, nama_project, deskripsi, link_project, file_path) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [req.user.id, nama_project, deskripsi, link_project, file_path]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error saving project' });
  }
};
