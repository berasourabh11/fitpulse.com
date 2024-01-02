import { Request, Response } from 'express';
import  verifyUser  from '../services/verifyUser';
import {UserLoginDetails} from '../utils/types';

export const loginController = async (req: Request, res: Response) => {
    try {
        const { usernameorEmail, password } = req.body;

        // Call the verifyUser function from the service folder
        const verifiedUser:UserLoginDetails | null = await verifyUser(usernameorEmail, password);

        // Handle the result and send a response
        if (verifiedUser) {
            res.cookie('jwt', verifiedUser.token, { httpOnly: true,secure:true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) });
            res.status(200).json({ message: 'User verified', username: verifiedUser.username, email: verifiedUser.email, firstName: verifiedUser.firstName, lastName: verifiedUser.lastName});
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    }catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: `Internal Server Error` });
    }
};
