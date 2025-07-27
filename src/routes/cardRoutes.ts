import express from 'express';
import { createCard, getAllCards } from '../controllers/cardController';

const router = express.Router();

router.get('/', getAllCards);

router.post('/', createCard);

export default router;