import { z } from 'zod';

const SignupSchema = z.object({
    body: z.object({
        username: z
            .string()
            .min(3, { message: 'Username must be at least 3 characters long' })
            .max(20, { message: 'Username must be at most 20 characters long' })
            .regex(/^[a-zA-Z0-9_]+$/, { message: 'Username must only contain alphabets, numbers, and underscores' }),
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .max(30, { message: 'Password must be at most 30 characters long' }),
        firstname: z.string().min(2).max(50),
        lastname: z.string().min(2).max(50),
        email: z.string().email({ message: 'Invalid email address' }),
    })
});

export default SignupSchema;