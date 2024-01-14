'use client'

import { getSession, signOut } from 'next-auth/react';
import * as React from 'react';
import { useState, useEffect } from 'react';

export interface IHeaderProps {
}

export default function Header(props: IHeaderProps) {
    const [userInfo, setUserInfo] = useState({})

    useEffect(() => {
        const fetchUser = async () => {
            const session = await getSession();
            console.log('client', session);

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
        <div className='flex h-14 w-full border-b-2 border-slate-600'>
            <button onClick={() => signOut({ callbackUrl: '/login' })}>Sign out</button>
        </div>
    );
}
