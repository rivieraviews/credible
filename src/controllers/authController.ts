import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';    //bcrypt is used for hashing passwords
import jwt from 'jsonwebtoken'; //jsonwebtoken is used for creating JWT tokens
import { Request, Response } from 'express';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
/*JWT_SECRET is contained in environment variables for security
We are loading env variables using dotenv in index.ts
dotenv is a zero-dependency module that loads environment variables from a .env file into process.env*/

export const signup = async (req: Request, res: Response) => {  //signup function to handle user registration
    const { name, email, password } = req.body; //extracting name, email, pwd from the request body

    try {
        const existingUser = await prisma.user.findUnique({ 
            where: { email } 
        });

        //No duplicate emails allowed
        if (existingUser) {
            return res.status(400).json({error: 'A user with this email already exists.'});
        }

        //password length validation
        if (password.length < 6 || password.length > 20) {
            return res.status(400).json({error: 'Password must be between 6 and 20 characters.'});
        }

        //hashing the password before saving it to the database
        const passwordHash = await bcrypt.hash(password, 10);

        //creating a new user in the database
        const user = await prisma.user.create({
            data: {
                name,
                email,
                passwordHash: passwordHash,
            },
        });

        //creating a JWT token for the user
        //the token contains the user ID and is signed with a secret key
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        //responding with the token and user details
        res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email }});
    } catch (error) {
        console.error('Signup error: ', error);
        res.status(500).json({error: 'Failed to create user.'});
    }
};