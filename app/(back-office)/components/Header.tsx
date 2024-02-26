'use client'
import { getSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import * as React from 'react';
import { useState, useEffect } from 'react';
import googleLogo from "@/public/google.png";

/*
 * The header of Dashboard page.
 */
export const Header: React.FC = () => {
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        const fetchUser = async () => {
            const session = await getSession();

            try {
                // @ts-ignore
                const userId = session.user?.id;
                const response = await fetch('http://localhost:3000/api/user', {
                    method: 'POST', // Use POST method for sending data in the body
                    headers: {
                        'Content-Type': 'application/json',
                        'API-Key': process.env.DATA_API_KEY, // Include API key if needed
                    },
                    body: JSON.stringify({ userId }), // Pass userId in the request body
                });

                const user = await response.json()
                setUserInfo(user);

                // ... rest of the code remains the same
            } catch (error) {
            }
        };

        fetchUser();
    }, []);

    return (
        <div className='flex items-center h-14 w-full shadow-md px-6 justify-between'>
            <div className='relative w-[576px] ml-48'>
                <svg className="w-4 h-4 absolute top-1/2 translate-y-[-50%] left-2" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                </svg>
                <input className='bg-gray-100 h-9 rounded border-gray-600 pr-2 pl-8 py-2 w-full leading-9' type="text" placeholder='Search for project' />
            </div>
            <ul className='flex items-center gap-6'>
                <li>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                </li>
                <li>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                    </svg>
                </li>
                <li>
                    <Image
                        src={googleLogo}
                        alt="Picture of the author"
                        width={32}
                        height={32}
                    />
                </li>
                <li>
                    <button onClick={() => signOut({ callbackUrl: '/login' })}>Sign out</button>
                </li>
            </ul>
        </div>
    );
}
