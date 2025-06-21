// server/routes/portfolioRoutes.js

const express = require('express');
const multer = require('multer');
const path = require('path');
// Impor fungsi dari controller dengan destructuring
const { createCertification, createProject } = require('../controllers/portfolioController.js');
const authenticate = require('../middleware/authenticate.js');

const router = express.Router();

// Konfigurasi Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Rute untuk Project
router.post(
    '/projects', 
    authenticate, 
    upload.single('hasil'),
    createProject
);

// Rute untuk Certification
router.post(
    '/certifications', 
    authenticate, 
    upload.single('file'),
    createCertification
);

// Ekspor router agar bisa digunakan di index.js
module.exports = router;