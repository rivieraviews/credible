import express from 'express';
import { createCard, getAllCards } from '../controllers/cardController';
import { authenticate } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticate);

router.get('/', getAllCards);
router.post('/', createCard);

export default router;