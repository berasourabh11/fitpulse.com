import { z } from 'zod';

const loginSchema = z.object({
    body: z.object({
        usernameorEmail: z
            .string()
            .min(3, { message: 'Username or Email must be at least 3 characters long' })
            .max(40, { message: 'Username or Email must be at most 40 characters long' }), // Make username optional
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .max(30, { message: 'Password must be at most 30 characters long' }),
    }),
});

export default loginSchema;
