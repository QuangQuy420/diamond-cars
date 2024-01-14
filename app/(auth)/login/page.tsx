import React from 'react';
import LoginForm from './components/LoginForm';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/libs/auth';
import { redirect } from 'next/navigation';

/**
 * The login page.
 */
const Login = async () => {
    // @ts-ignore
    const session = await getServerSession(authConfig);
    if (session) {
        redirect('/');
    }

    return (
        <LoginForm />
    )
}

export default Login;