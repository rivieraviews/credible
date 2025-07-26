//this file will store Prisma-related logic for card management

import { Request, Response } from 'express';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(); 

export const getAllCards = async (req: Request, res: Response) => {
    //this function retrieves all credit cards from the database
    //it uses Prisma to query the database and returns the results as JSON  
    try {
        const cards = await prisma.creditCard.findMany({
            include: { loungeCredits: true },   //including lounge credits associated with each card
        });
        res.json(cards);    //responding with the retrieved cards in JSON format
    } catch (error) {
        console.error('Error fetching cards: ', error);
        res.status(500).json({ error: "Failed to fetch cards" });
    }
}

export const createCard = async (req: Request, res: Response) => {
    //to add a new credit card to the database
    try {
        const {
            userId,
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
        
        const newCard = await prisma.creditCard.create({
            data: {
                userId,
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