import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export interface AuthenticatedRequest extends Request {
    userId?: string;    //optional userId property to store the authenticated user's ID
}

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;   //retrieving the Auth header from the request

    //checking if Auth header is present, and if so, if it starts with 'Bearer'
    if (!authHeader?.startsWith('Bearer')) {
        return res.status(401).json({ error: 'Unauthorized: Missing or malformed token.'});
    }

    //extracting the token from the header
    const token = authHeader.split(' ')[1];

    try {
        //verifying the token using the secret key
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.error('Token verification failed: ', error);
        return res.status(403).json({ error: 'Forbidden: Invalid or expired token.' });
    }
};