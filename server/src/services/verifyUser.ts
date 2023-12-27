import bcrypt from 'bcrypt';
import User, { IUserData } from '../models/userDataModel';
import { generateJWT } from '../utils/jwt';
import { UserLoginDetails } from '../utils/types';


async function verifyUserAndGenerateJWT(usernameorEmail: string, password: string): Promise<UserLoginDetails | null> {
    try {
        // Find the user in the MongoDB table
        let user = await User.findOne({ username: usernameorEmail });
        if(!user) {
            user = await User.findOne({ email: usernameorEmail });
        }
        if (!user) {
            return null; // User not found
        }
        // Compare the provided password with the stored password hash
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return null; // Invalid password
        }

        // Generate and return a JWT token
        const accesstoken = generateJWT(user, process.env.ACCESS_TOKEN_SECRET as string, process.env.ACCESS_TOKEN_EXPIRY_DURATION as string); 
        return {token:accesstoken, username: user.username, email: user.email, firstName: user.firstname, lastName: user.lastname};
    } catch (error) {
        console.error('Error verifying user:', error);
        throw error;
    }
}

export default verifyUserAndGenerateJWT;
