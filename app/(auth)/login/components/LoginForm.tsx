'use client'
import React from 'react';
import { SubmitButton } from '@/app/(auth)/components/submitButton';
import { login } from '@/app/actions/auth';
import { useFormState } from 'react-dom';
import { GoogleSignInButton, GithubSignInButton } from './authButton';

/**
 * The login form.
 */
const LoginForm: React.FC = () => {
    const initialState = {
        message: null,
    }
    const [state, formAction] = useFormState(login, initialState);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action={formAction}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="text" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        {state?.errors && (
                            <span className='text-red-600'>{state?.errors?.username?._errors}</span>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                            <div className="text-sm">
                                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
                            </div>
                        </div>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        {state?.errors && (
                            <span className='text-red-600'>{state?.errors?.password?._errors}</span>
                        )}
                    </div>

                    <SubmitButton typeSubmit={"Login"} />

                    <GoogleSignInButton />
                    <GithubSignInButton />
                </form>
            </div>
        </div >
    )
}

export default LoginForm;