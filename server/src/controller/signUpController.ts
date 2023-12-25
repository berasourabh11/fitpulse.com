import { Request, Response } from 'express';
import UserDataModel from '../models/userDataModel';
import bcrypt from 'bcrypt';

export const signUpController = async (req: Request, res: Response) => {
    try {
        const { username, password, firstname, lastname, email } = req.body;
        
        // Check if the user already exists
        const existingEmail = await UserDataModel.findOne({ email });
        if (existingEmail) {
            return res.status(409).json({ message: 'Email already exists' });
        }
        const existingUser = await UserDataModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password using bcrypt
        const newUser = new UserDataModel({
            username,
            password: hashedPassword, // Store the hashed password in the database
            firstname,
            lastname,
            email,
            role: 'user',
        });
        await newUser.save();
        return res.status(200).json({ message: 'User added successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to add user' });
    }
};
