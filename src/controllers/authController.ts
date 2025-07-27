import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';    
import jwt from 'jsonwebtoken'; 
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { Request, Response } from 'express';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export const signup = async (req: Request, res: Response) => { //signup function to handle user registration
    const { name, email, password } = req.body; 

    try {
        const existingUser = await prisma.user.findUnique({ 
            where: { email } 
        });

        if (existingUser) {
            return res.status(400).json({error: 'A user with this email already exists.'});
        }

        if (password.length < 6 || password.length > 20) {
            return res.status(400).json({error: 'Password must be between 6 and 20 characters.'});
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: passwordHash,
            },
        });

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email }});
    } catch (error) {
        console.error('Signup error: ', error);
        res.status(500).json({error: 'Failed to create user.'});
    }
};

export const login = async (req: Request, res: Response) => { //login function to handle user authentication
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const passwordValid = await bcrypt.compare(password, user.passwordHash);
        if (!passwordValid) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { id: user.id , name: user.name, email: user.email } });
    } catch (error) {
        console.error('Login error: ', error);
        res.status(500).json({ error: 'Failed to login.' });
    }
};

export const getMe = async (req: AuthenticatedRequest, res: Response) => {   //getMe function to retrieve the authenticated user's details
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
            select: { id: true, name: true, email: true }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error in /auth/me: ', error);
        res.status(500).json({ error: 'Failed to retrieve user.' });
    }
}