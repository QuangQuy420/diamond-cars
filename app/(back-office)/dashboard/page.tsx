import { getUserById } from '@/app/actions/user';
import { useHasCapability } from '@/utils';
import * as React from 'react';
import { CountRecord } from '@/app/(back-office)/components';

export interface IDashboardProps {
}

async function getUserInfo(userId: string) {
    const user = await getUserById(userId);
    return await user.json();
}

export default async function Dashboard(props: IDashboardProps) {
    const session = await useHasCapability();
    // @ts-ignore
    const userInfo = await getUserInfo(session.user.id);

    return (
        <div className='flex flex-col max-w-7xl mx-auto px-6'>
            <h3 className='py-3 text-3xl'>Dashboard</h3>
            <CountRecord />
        </div>
    );
}
