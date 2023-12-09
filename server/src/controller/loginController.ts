import { Request, Response } from 'express';
import  verifyUser  from '../services/verifyUser';
import { TokenPair } from '../utils/types';

export const loginController = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        // Call the verifyUser function from the service folder
        const verifiedUser:TokenPair | null = await verifyUser(username, password);

        // Handle the result and send a response
        if (verifiedUser) {
            res.status(200).json({ message: 'User verified', accesstoken:verifiedUser.accesstoken, refreshtoken:verifiedUser.refreshToken });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: `Internal Server Error` });
    }
};
