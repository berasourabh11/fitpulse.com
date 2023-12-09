import { z } from 'zod';

const loginSchema = z.object({
    body: z.object({
        username: z
            .string()
            .min(3, { message: 'Username must be at least 3 characters long' })
            .max(20, { message: 'Username must be at most 20 characters long' })
            .optional(), // Make username optional
        email: z
            .string()
            .email({ message: 'Invalid email address' })
            .optional(), // Make email optional
        password: z
            .string()
            .min(8, { message: 'Password must be at least 8 characters long' })
            .max(30, { message: 'Password must be at most 30 characters long' }),
    })
    .refine(data => {
        // Ensure that at least one of username or email is provided
        return data.username !== undefined || data.email !== undefined;
    }, { message: 'Either username or email must be provided' })
});

export default loginSchema;
