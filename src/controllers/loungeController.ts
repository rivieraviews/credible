import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getLoungeCredits = async (req: AuthenticatedRequest, res: Response) => {
    //to retrieve lounge credits for a specific card associated with the user
    const { cardId } = req.params;

    try {
        const card = await prisma.creditCard.findFirst({
            where: {
                id: cardId,
                userId: req.userId,
            },
            include: {
                loungeCredits: true,
            },
        });

        if (!card) {
            return res.status(404).json({ error: 'Credit card not found.' });
        }

        res.json(card.loungeCredits);
    } catch (error) {
        console.error('Error fetching lounge credits:', error);
        res.status(500).json({ error: 'Failed to retrieve lounge credits.' });
    }
};

export const useLoungeCredit = async (req: AuthenticatedRequest, res: Response) => {
    const { cardId } = req.params;

    try {
        const card = await prisma.creditCard.findFirst({
            where: {
                id: cardId,
                userId: req.userId,
            },
            include: {
                loungeCredits: true,
            },
        });

        if (!card || !card.loungeCredits) {
            return res.status(404).json({ error: 'Credit card or lounge credits not found.' });
        }

        const { usedCredits, totalCredits } = card.loungeCredits;

        if (usedCredits >= totalCredits) {
            return res.status(400).json({ error: 'No lounge credits remaining.' });
        }

        const updatedLounge = await prisma.loungeCredit.update({
            where: { id: card.loungeCredits.id },
            data: {
                usedCredits: usedCredits + 1,
            },
        });

        res.status(200).json({updatedLounge});
    } catch (error) {
        console.error('Error using lounge credit:', error);
        res.status(500).json({ error: 'Failed to use lounge credit.' });
    }
};