import { Request, Response, NextFunction } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization?.split(' ')[1];

    if (!accessToken) {
        return res.status(401).json({ message: 'Access token not found' });
    }

    try {
        const decryptedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET as string) as { userId: string, email: string };
        (req as any).user = decryptedToken;
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({ message: 'Token expired' });
        }

        return res.status(401).json({ message: 'Invalid access token' });
    }
};

export default verifyToken;