import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { getLoungeCredits, useLoungeCredit } from '../controllers/loungeController';

const router = express.Router();

router.use(authenticate);

router.get('/:cardId/lounge', getLoungeCredits);
router.post('/:cardId/lounge/use', useLoungeCredit);

export default router;