// routes/portfolio.js
import express from 'express';
import { authenticateToken } from '../middleware/authenticate.js';
import {
  createCertification,
  createActivity,
  createProject
} from '../controllers/portfolioController.js';

const router = express.Router();

router.post('/certifications', authenticateToken, createCertification);
router.post('/activities', authenticateToken, createActivity);
router.post('/projects', authenticateToken, createProject);

export default router;
