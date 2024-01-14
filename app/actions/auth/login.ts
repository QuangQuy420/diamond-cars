import { LoginSchema } from "@/prisma/zod";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

/**
 * Log in a user based on the provided email and password.
 *
 * @param {Object} prevState (optional) The previous state of the login process.
 * @param {Object} formData The form data containing email and password fields.
 * @returns {{message: string, errors: ZodError[]|string, status: string}}
 */
export default async function login(prevState, formData) {
    const result = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    // Validate form login
    if (result.success == false) {
        return {
            message: 'Failed to login',
            errors: result.error.format(),
            status: 'error',
        };
    }

    const signInResponse = await signIn("credentials", {
        email: result.data.email,
        password: result.data.password,
        redirect: false,
    });

    // Return error if wrong email or password
    if (signInResponse?.error) {
        return {
            message: 'User name or password not correct!',
            errors: 'wrong_user',
            status: 'error',
        };
    }

    // Login success
    redirect('/');
}