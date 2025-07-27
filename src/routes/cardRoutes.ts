import express from 'express';
import { createCard, getAllCards, getCardById, updateCardById, deleteCardById } from '../controllers/cardController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.post('/', createCard);
router.get('/', getAllCards);
router.get('/:id', getCardById);
router.put('/:id', updateCardById);
router.delete('/:id', deleteCardById);

export default router;