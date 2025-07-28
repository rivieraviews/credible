import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { getLoungeCredits } from '../controllers/loungeController';

const router = express.Router();

router.use(authenticate);

router.get('/:cardId/lounge', getLoungeCredits);

export default router;