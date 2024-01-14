'use client'

import React from 'react';
import { SubmitButton } from '@/app/(auth)/components/submitButton';
import signUp from '@/app/actions/auth/signup';
import { useFormState } from 'react-dom';
import { useRouter } from 'next/navigation';

/**
 * The signup form.
 */
const SignUpForm = () => {
    const initialState = {
        message: null,
    }
    const [state, formAction] = useFormState(signUp, initialState);
    console.log(state);

    const router = useRouter();
    if (state?.status === 'success') {
        router.push('/login');
    }

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign Up account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action={formAction}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="text" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        {state?.errors && (
                            <span className='text-red-600'>{state?.errors?.username?._errors}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div className="mt-2">
                            <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        {state?.errors && (
                            <span className='text-red-600'>{state?.errors?.password?._errors}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password_confirm" className="block text-sm font-medium leading-6 text-gray-900">Password confirm</label>
                        <div className="mt-2">
                            <input id="password_confirm" name="password_confirm" type="password" autoComplete="current-password_confirm" required className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                        {state?.errors && (
                            <span className='text-red-600'>{state?.errors?.password_confirm?._errors}</span>
                        )}
                    </div>

                    {state?.errors === 'error_create' && (
                        <span className='text-red-600'>{state?.message}</span>
                    )}

                    <SubmitButton typeSubmit={"Sign Up"} />
                </form>
            </div>
        </div >
    )
}

export default SignUpForm;