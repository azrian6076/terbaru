import express from 'express';
import authenticateToken from '../middleware/authenticate.js';
import authorizeRole from '../middleware/authorizeRole.js';
import { getStudentDashboard } from '../controllers/studentController.js';

const router = express.Router();

router.get('/dashboard',
  authenticateToken,
  authorizeRole(['student']),
  getStudentDashboard
);

export default router;
