declare namespace Express {
    interface UserDetails{
        _id: string;
        username: string;
        role: 'user' | 'admin';
        email: string;
    }
    export interface Request {
        user?: { 
            data:UserDetails;
        } // Define the user property structure here
    }
}