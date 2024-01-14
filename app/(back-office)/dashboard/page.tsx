import { useHasCapability } from '@/utils';
import * as React from 'react';

export interface IDashboardProps {
}

async function getUserInfo(userId: string) {
    const response = await fetch('http://localhost:3000/api/user', {
        method: 'POST', // Use POST method for sending data in the body
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY, // Include API key if needed
        },
        body: JSON.stringify({ userId }), // Pass userId in the request body
    });
    const user = await response.json()
    return user;
}

export default async function Dashboard(props: IDashboardProps) {
    const session = await useHasCapability();
    // @ts-ignore
    const userInfo = await getUserInfo(session.user.id);

    return (
        <div>
            Dashboard page ...
        </div>
    );
}
