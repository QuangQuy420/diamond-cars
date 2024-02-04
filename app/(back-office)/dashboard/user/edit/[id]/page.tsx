import * as React from 'react';
import { getAllUser, getUserById } from '@/app/actions/user';
import { DetailUser } from '@/app/(back-office)/components';

export async function generateStaticParams() {
    const userList = await getAllUser();
    const users = await userList.json();

    return users.map((user) => ({
        id: user.id,
    }))
}

async function getUserInfo(id: string) {
    const userInfo = await getUserById(id);
    return await userInfo.json();
}

export default async function EditUser({ params }: { params: { id: string } }) {
    const userInfo = await getUserInfo(params.id);

    return (
        <div className='px-6'>
            <h3 className='py-3 text-3xl'>Edit user</h3>
            <DetailUser userInfo={userInfo} userId={params.id} />
        </div>
    );
}
