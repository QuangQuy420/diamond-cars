'use client'

import * as React from 'react';
import { useFormState } from 'react-dom'
import { updateUser } from '@/app/actions/user'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation';

export interface IDetailUserProps {
    userInfo: {
        email: string,
        name: string,
        role: string,
        avatar: string,
        createAt: string,
        updatedAt: string,
        profile: {
            bio: string,
            phoneNumber: string,
            address: string,
        },
    },
    userId: string,
}

const initialState = {
    message: '',
}

export function DetailUser(props: IDetailUserProps) {
    const { userInfo, userId } = props;
    const { pending } = useFormStatus();
    const updateUserWithId = updateUser.bind(null, userId);
    const [state, formAction] = useFormState(updateUserWithId, initialState);
    const router = useRouter();

    if (state?.status === 'success') {
        router.push('/dashboard/user');
    }

    return (
        <form action={formAction}>
            <div className='py-2'>
                <label className='mr-2' htmlFor="email">Email</label>
                <input type="text" id="email" name="email" required defaultValue={userInfo.email} disabled />
            </div>
            <div className='py-2'>
                <label className='mr-2' htmlFor="name">Name</label>
                <input type="text" id="name" name="name" required defaultValue={userInfo.name} />
            </div>
            <div className='py-2'>
                <label className='mr-2' htmlFor="role">Role</label>
                <input type="text" id="role" name="role" required defaultValue={userInfo.role} />
            </div>
            <div className='py-2'>
                <label className='mr-2' htmlFor="avatar">Avatar</label>
                <input type="text" id="avatar" name="avatar" required defaultValue={userInfo.avatar} />
            </div>
            <div className='py-2'>
                <label className='mr-2' htmlFor="bio">Bio</label>
                <input type="text" id="bio" name="bio" required defaultValue={userInfo.profile.bio} />
            </div>
            <div className='py-2'>
                <label className='mr-2' htmlFor="phoneNumber">Phone Number</label>
                <input type="text" id="phoneNumber" name="phoneNumber" required defaultValue={userInfo.profile.phoneNumber} />
            </div>
            <div className='py-2'>
                <label className='mr-2' htmlFor="address">Address</label>
                <input type="text" id="address" name="address" required defaultValue={userInfo.profile.address} />
            </div>
            <div className='py-2'>
                <label className='mr-2' htmlFor="updateDate">Update Date</label>
                <input type="text" id="updateDate" name="updateDate" required defaultValue={userInfo.updatedAt} disabled />
            </div>
            <button type="submit" disabled={pending} aria-disabled={pending}>Edit User</button>
        </form>
    );
}
