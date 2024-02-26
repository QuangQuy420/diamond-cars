import * as React from 'react';
import { getAllUser, getUserById } from '@/app/actions/user';
import { EditDetailUser } from '@/app/(back-office)/dashboard/components';
import { NextPage } from 'next';
import { UserInfoProps } from '@/interfaces';

/**
 * The function is used in combination with dynamic route segments to statically generate routes at build time
 * instead of on-demand at request time.
 * 
 * @returns Id of user.
 */
export const generateStaticParams = async () => {
    const userList = await getAllUser();
    const users = await userList.json();

    return users.map((user) => ({
        id: user.id,
    }))
}

/**
 * The function get user information to display.
 * 
 * @param id userId.
 * @returns The detail of user.
 */
async function getUserInfo(id: string) {
    const userInfo = await getUserById(id);
    return await userInfo.json();
}

/*
 * The Edit user page.
 */
const EditUser: NextPage = async ({ params }: { params: { id: string } }) => {
    const userInfo: UserInfoProps = await getUserInfo(params.id);

    return (
        <div className='px-6'>
            <h3 className='py-3 text-3xl'>Edit user</h3>
            <EditDetailUser userInfo={userInfo} userId={params.id} />
        </div>
    );
}

export default EditUser;