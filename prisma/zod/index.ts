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

// UPDATE USER SCHEMA
export const UpdateUserSchema = z.object({
    name: z.string().min(1, 'Username is required'),
    role: z.string().min(1, { message: "Role is required" }),
    avatar: z.string().min(1, { message: "Avatar is required" }),
    bio: z.string().min(1, { message: "Bio is required" }),
    phoneNumber: z.string().min(1, { message: "Phone Number is required" }),
    address: z.string().min(1, { message: "Address is required" }),
})