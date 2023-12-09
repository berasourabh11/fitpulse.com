import bcrypt from 'bcrypt';
import User, { IUserData } from '../models/userDataModel';
import { generateJWT } from '../utils/jwt';
import { TokenPair } from '../utils/types';


async function verifyUserAndGenerateJWT(username: string, password: string): Promise<TokenPair | null> {
    try {
        // Find the user in the MongoDB table
        const user = await User.findOne({ username });

        if (!user) {
            return null; // User not found
        }

        // Compare the provided password with the stored password hash
        console.log('password', password);
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return null; // Invalid password
        }

        // Generate and return a JWT token
        const accesstoken = generateJWT(user, process.env.ACCESS_TOKEN_SECRET as string, process.env.ACCESS_TOKEN_EXPIRY_DURATION as string); 
        const refreshToken = generateJWT(user, process.env.REFRESH_TOKEN_SECRET as string, process.env.REFRESH_TOKEN_EXPIRY_DURATION as string);
        return {accesstoken, refreshToken};
    } catch (error) {
        console.error('Error verifying user:', error);
        throw error;
    }
}

export default verifyUserAndGenerateJWT;
