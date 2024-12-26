import { z } from 'zod';

export const userLoginSchema = z.object({
  email: z
    .string({ required_error: 'email is required' })
    .email('Invalid email address')
    .transform((val) => val.toLowerCase()),
  password: z
    .string({ required_error: 'password is required' })
    .min(4, 'Password must be at least 6 characters long')
});

export const userSignupSchema = z.object({
  email: z
    .string({ required_error: 'email is required' })
    .email('Invalid email address')
    .transform((val) => val.toLowerCase()),
  password: z
    .string({ required_error: 'password is required' })
    .min(4, 'Password must be at least 6 characters long')
});

export const userSignupWithRoleSchema = userSignupSchema.extend({
  role: z.enum(['EDITOR', 'VIEWER'], { required_error: 'role is required' })
});

export const passwordChangeSchema = z.object({
  old_password: z.string().min(4, 'Old password is required'),
  new_password: z.string().min(4, 'New password is required')
});

export type UserLogin = z.infer<typeof userLoginSchema>;
export type UserSignup = z.infer<typeof userSignupSchema>;
export type UserSignupWithRole = z.infer<typeof userSignupWithRoleSchema>;
export type PasswordChange = z.infer<typeof passwordChangeSchema>;
