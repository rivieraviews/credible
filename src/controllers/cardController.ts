import { Request, Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); 

export const getAllCards = async (req: AuthenticatedRequest, res: Response) => {
    //this function retrieves all credit cards from the database 
    try {
        const cards = await prisma.creditCard.findMany({
            where: { userId: req.userId },
            include: { loungeCredits: true },
        });

        res.json(cards);
    } catch (error) {
        console.error('Error fetching cards: ', error);
        res.status(500).json({ error: "Failed to fetch cards" });
    }
}

export const createCard = async (req: AuthenticatedRequest, res: Response) => {
    //to add a new credit card to the database
    try {
        const {
            cardName,
            issuer,
            lastFourDigits,
            expiresOn,
            billingDay,
            paymentDay,
            isPaid,
            annualFee,
            status,
            } = req.body;
        
        if (!req.userId) {
            return res.status(400).json({ error: 'User ID is required.' });
        }

        const newCard = await prisma.creditCard.create({
            data: {
                userId: req.userId,
                cardName,
                issuer,
                lastFourDigits,
                expiresOn: new Date(expiresOn), //ensuring that the date is formatted correctly
                billingDay,
                paymentDay,
                isPaid,
                annualFee,
                status,
            }
        });
        res.status(201).json(newCard);  //responding with the newly created card
    } catch (error) {
        console.error('Error creating card: ', error);
        res.status(500).json({ error: 'Failed to create card' });
    }
};