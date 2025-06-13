const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'capstone_portofolio mahasiswa',
  password: '1234',  // ganti sesuai config-mu
  port: 5432
});

module.exports = pool;
