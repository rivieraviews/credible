import { Response } from 'express';
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

export const getCardById = async (req: AuthenticatedRequest, res: Response) => {
    //this function retrieves a specific credit card by its ID
    const { id } = req.params;

    try {
        const card = await prisma.creditCard.findFirst({
            where: {
                id,
                userId: req.userId,
            },
            include: { loungeCredits: true},
        });

        if (!card) {
            return res.status(404).json({ error: 'Card not found.' });
        }

        res.json(card);
    } catch (error) {
        console.error('Error fetching card: ', error);
        res.status(500).json({ error: 'Failed to fetch card.' });
    }
};

export const updateCardById = async (req: AuthenticatedRequest, res: Response) => {
    //this function updates a specific card by its ID
    const { id } = req.params;
    const {
        cardName,
        issuer,
        lastFourDigits,
        billingDay,
        paymentDay,
        expiresOn,
        isPaid,
        annualFee,
        status,
    } = req.body;

    try {
        //ensuring the card belongs to the authenticated user
        const existingCard = await prisma.creditCard.findFirst({
            where : {
                id,
                userId: req.userId,
            },
        });

        if (!existingCard) {
            return res.status(404).json({ error: 'Card not found.' });
        }

        const updatedCard = await prisma.creditCard.update({
            where: { id },
            data: {
                cardName,
                issuer,
                lastFourDigits,
                billingDay,
                paymentDay,
                expiresOn: new Date(expiresOn), //ensuring that the date is formatted correctly
                isPaid,
                annualFee,
                status,
            },
        });

        res.json(updatedCard);
    } catch (error) {
        console.error('Error updating card: ', error);
        res.status(500).json({ error: 'Failed to update card.' });
    }
};

export const deleteCardById = async (req: AuthenticatedRequest, res: Response) => {
    const { id } = req.params;

    try {
        const card = await prisma.creditCard.findFirst({
            where: {
                id,
                userId: req.userId,
            },
        });

        if (!card) {
            return res.status(404).json({ error: 'Card not found.' });
        }

        await prisma.creditCard.delete({
            where: { id },
        });

        res.status(204).send(); //no content to return after deletion
    } catch (error) {
        console.error('Error deleting card: ', error);
        res.status(500).json({ error: 'Failed to delete card.' });
    }
};