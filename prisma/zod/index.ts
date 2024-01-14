import { z } from 'zod';


// LOGIN SCHEMA
export const LoginSchema = z.object({
    email: z.string().min(1, 'Username is required'),
    password: z.string().min(6, { message: "Must be 6 or fewer characters long" }),
})


// SIGNUP SCHEMA
export const SignUpSchema = z.object({
    email: z.string().min(1, 'Username is required'),
    password: z.string().min(6, { message: "Must be 6 or fewer characters long" }),
    password_confirm: z.string().min(6, { message: "Must be 6 or fewer characters long" }),
})