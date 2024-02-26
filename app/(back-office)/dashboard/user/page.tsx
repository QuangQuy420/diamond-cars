import * as React from 'react';
import { UserList } from '@/app/(back-office)/dashboard/components';
import { getAllUser } from '@/app/actions/user';
import { NextPage } from 'next';

/**
 * The function get list user to display.
 * 
 * @returns The list of user.
 */
async function getUserList() {
    const userList = await getAllUser();
    return userList.json();
}

/*
 * The User page.
 */
const User: NextPage = async () => {
    const userList = await getUserList();

    return (
        <div className='px-6'>
            <h3 className='py-3 text-3xl'>Users</h3>
            <UserList userList={userList} />
        </div>
    );
}

export default User;