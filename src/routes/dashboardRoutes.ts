import express from 'express';
import { getDashboardSummary } from '../controllers/dashboardController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', authenticate, getDashboardSummary);

export default router;