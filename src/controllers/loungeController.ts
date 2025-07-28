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