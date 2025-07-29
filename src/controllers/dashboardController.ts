import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

export const getDashboardSummary = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId;

        //1. total number of cards
        const totalCards = await prisma.creditCard.count({
            where: {
                userId: userId,
            },
        });

        //2. unpaid cards due this month
        const now = dayjs();
        const startOfMonth = now.startOf('month').toDate();
        const endOfMonth = now.endOf('month').toDate();

        const dueThisMonth = await prisma.creditCard.count({
            where: {
                userId: userId,
                isPaid: false,
                paymentDay: {
                    gte: startOfMonth.getDate(),
                    lte: endOfMonth.getDate(),
                },
            },
        });

        //3. total remaining lounge credits
        const loungeCredits = await prisma.loungeCredit.findMany({
            where: {
                card: {
                    userId: userId,
                },
            },
        });

        const totalLoungeCredits = loungeCredits.reduce((sum, entry) => {
            return sum + (entry.totalCredits - entry.usedCredits);
        }, 0);

        //4. nearest upcoming payment date (among unpaid cards)
        const allUserCards = await prisma.creditCard.findMany({
            where: {
                userId,
                isPaid: false,
            },
        });

        //calculate the next payment date for each card
        const upcomingDates = allUserCards.map(card => {
            // Set the payment date for the current month
            let target = dayjs().set('date', card.paymentDay);

            // If the payment date has already passed this month, move to next month
            if (target.isBefore(dayjs())) {
                target = target.add(1, 'month');
            }

            return target.toDate();
        });

        // Find the earliest upcoming payment date
        const nextPaymentDate = upcomingDates.length > 0
            ? upcomingDates.reduce((min, date) => date < min ? date : min, upcomingDates[0])
            : null;

        return res.status(200).json({
            totalCards,
            dueThisMonth,
            totalLoungeCredits, 
            nextPaymentDate,
        });
    } catch (error) {
        console.error('Error fetching dashboard summary:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}