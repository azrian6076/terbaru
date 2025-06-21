require('dotenv').config({ path: __dirname + '/../.env' }); // sesuaikan kalau .env ada di root project

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use('/api', authRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
  console.log('✅ JWT_SECRET =', process.env.JWT_SECRET); // Debug log
});
