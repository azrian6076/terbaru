import db from '../db.js';

export const getStudentStats = async (req, res) => {
  try {
    const { userId } = req.params;

    const sertifikat = await db.query(
      'SELECT COUNT(*) FROM portofolio WHERE user_id = $1 AND kategori = $2',
      [userId, 'sertifikat']
    );
    const proyek = await db.query(
      'SELECT COUNT(*) FROM portofolio WHERE user_id = $1 AND kategori = $2',
      [userId, 'project']
    );
    const organisasi = await db.query(
      'SELECT COUNT(*) FROM portofolio WHERE user_id = $1 AND kategori = $2',
      [userId, 'organisasi']
    );

    res.json({
      sertifikat: parseInt(sertifikat.rows[0].count),
      proyek: parseInt(proyek.rows[0].count),
      organisasi: parseInt(organisasi.rows[0].count),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal mengambil data statistik' });
  }
};
