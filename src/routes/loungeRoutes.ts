import express from 'express';
import { authenticate } from '../middleware/authMiddleware';
import { getLoungeCredits, useLoungeCredit, resetLoungeCredits } from '../controllers/loungeController';

const router = express.Router();

router.use(authenticate);

router.get('/:cardId/lounge', getLoungeCredits);
router.post('/:cardId/lounge/use', useLoungeCredit);
router.put('/:cardId/lounge/reset', resetLoungeCredits);

export default router;