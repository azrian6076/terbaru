import express from 'express';
import { getStudentStats } from '../controllers/studentController.js';

const router = express.Router();

router.get('/stats/:userId', getStudentStats);

export default router;
