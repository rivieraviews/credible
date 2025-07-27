import express from 'express';
import { createCard, getAllCards, getCardById, updateCardById } from '../controllers/cardController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.post('/', createCard);
router.get('/', getAllCards);
router.get('/:id', getCardById);
router.put('/:id', updateCardById);

export default router;