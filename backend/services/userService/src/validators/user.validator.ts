import { z } from 'zod';


export const signUpSchema = z.object({
    fullName: z.string().min(1, { message: "Name cannot be empty" }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { message: "Password must contain at least one letter" })
      .regex(/[0-9]/, { message: "Password must contain at least one number" })
      .refine(val => !/\s/.test(val), 'Password cannot contain spaces')
  });