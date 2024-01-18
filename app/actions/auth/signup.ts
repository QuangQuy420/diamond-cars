'use server'

import { SignUpSchema } from "@/prisma/zod";
import prisma from '@/prisma/db';
import bcrypt from 'bcryptjs';

/**
 * SignUp a new user based on the provided form data.
 *
 * @param {Object} prevState (optional) The previous state of the registration process.
 * @param {Object} formData The form data containing email, password, and password confirmation fields.
 * @returns {{message: string, errors: ZodError[]|string, status: string}}
 */
export async function signUp(prevState, formData) {
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
                role: 'USER',
                name: result.data.email,
                avatar: 'abcd',
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