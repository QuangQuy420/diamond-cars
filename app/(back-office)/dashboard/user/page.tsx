import * as React from 'react';
import { UserList } from '@/app/(back-office)/dashboard/components';
import { getAllUser } from '@/app/actions/user';

export interface IUserProps {
}

async function getUserList() {
    const userList = await getAllUser();
    return userList.json();
}

export default async function User(props: IUserProps) {
    const userList = await getUserList();

    return (
        <div className='px-6'>
            <h3 className='py-3 text-3xl'>Users</h3>
            <UserList userList={userList} />
        </div>
    );
}
