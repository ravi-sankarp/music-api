import { z } from 'zod';

export const userLoginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .transform((val) => val.toLowerCase()),
  password: z.string().min(4, 'Password must be at least 6 characters long')
});

export type UserLogin = z.infer<typeof userLoginSchema>;

export const userSignupSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .transform((val) => val.toLowerCase()),
  password: z.string().min(4, 'Password must be at least 6 characters long')
});

export type UserSignup = z.infer<typeof userSignupSchema>;
