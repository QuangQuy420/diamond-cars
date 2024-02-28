'use server'

import { SignUpSchema } from "@/prisma/zod";
import prisma from '@/prisma/db';
import bcrypt from 'bcryptjs';
import { revalidatePath } from "next/cache";

/**
 * SignUp a new user based on the provided form data.
 *
 * @param {Object} prevState (optional) The previous state of the registration process.
 * @param {Object} formData The form data containing email, password, and password confirmation fields.
 * @returns {{message: string, errors: ZodError[]|string, status: string}}
 */
export const signUp = async (prevState, formData: FormData) => {
    const result = SignUpSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
        password_confirm: formData.get('password_confirm'),
    });


    // Validate form signUp
    if (result.success == false) {
        return {
            message: 'Failed to signUp',
            errors: result.error.format(),
            status: 'error',
        };
    }

    // Check password confirm
    if (result.data.password !== result.data.password_confirm) {
        return {
            message: 'Password confirm is not correct with password',
            errors: 'error_create',
            status: 'error',
        };
    }

    try {
        const password = await bcrypt.hash(result.data.password, 10);
        const newUser = await prisma.user.create({
            data: {
                email: result.data.email,
                password: password,
                name: result.data.email,
                avatar: 'https://firebasestorage.googleapis.com/v0/b/diamond-cars-9422f.appspot.com/o/users%2Favatars%2Favatar_default.jpg?alt=media&token=eb46469b-7bdf-46d1-a0d1-8dee71ce1a41',
                profile: {
                    create: {
                        phoneNumber: '0385610163',
                        bio: 'hahaha',
                        address: 'Saigon City',
                    }
                }
            }
        })

        if (newUser) {
            // revalidatePath("/");
            return {
                message: 'Signup successfully!',
                errors: '',
                status: 'success',
            };
        }
    } catch (e) {
        if (e.code === "P2002") {
            // Email already exists
            return {
                message: 'User with that email already exist, please input another email!',
                errors: 'error_create',
                status: 'error',
            };
        } else {
            // Other error
            console.error(e);
        }
    }
}