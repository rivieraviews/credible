import express from 'express';
import { createCard, getAllCards, getCardById } from '../controllers/cardController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.post('/', createCard);
router.get('/', getAllCards);
router.get('/:id', getCardById);

export default router;