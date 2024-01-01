import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.jwt;

    if (!accessToken) {
        return res.status(401).json({ message: 'Access token not found' });
    }

    try {
        const decryptedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string);
        req.user = decryptedToken as { data: {
            _id: string;
            username: string;
            role: 'user' | 'admin';
            email: string;
        } };
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            res.clearCookie('jwt');
            return res.status(401).json({ message: 'Token expired' });
        }

        return res.status(401).json({ message: 'Invalid access token' });
    }
};

export default verifyToken;