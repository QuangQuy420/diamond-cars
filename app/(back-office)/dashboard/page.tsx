import { getUserById } from '@/app/actions/user';
import { useHasCapability } from '@/utils';
import * as React from 'react';

export interface IDashboardProps {
}

async function getUserInfo(userId: string) {
    const response = await getUserById(userId);
    const user = await response.json();
    return user;
}

export default async function Dashboard(props: IDashboardProps) {
    const session = await useHasCapability();
    // @ts-ignore
    const userInfo = await getUserInfo(session.user.id);
    console.log('userInfo', userInfo);

    return (
        <div>
            Dashboard page ...
        </div>
    );
}
