'use client'
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ModalConfirm } from '@/components';
import { ModalConfirmProps, UserListProps } from '@/interfaces';

/**
 * The list of user that display in dashboard page.
 */
export const UserList: React.FC<UserListProps> = ({ userList }) => {
    const [showModal, setShowModal] = useState<boolean>(false);

    /**
     * The function handle show modal confirm when the users want to delete user.
     * 
     * @param value true/false.
     */
    const toggleModal = (value: boolean) => {
        setShowModal(value);
    };

    const defaultProps: ModalConfirmProps = {
        title: 'Are you sure you want to delete this user?',
        content: 'Deleting a user is irreversible and will permanently remove their account and all associated data. Are you sure you want to proceed?',
        confirm: 'Yes',
        cancel: 'No',
        showModal: showModal,
        toggleModal: toggleModal,
        userId: '',
    }

    /**
     * The function render list user to html.
     */
    const slideUserList = userList.map((value: any, index: number) => {
        const date = value.updatedAt > value.createdAt ? value.updatedAt : value.createdAt;
        const userUpdateDate = new Date(Date.parse(date)).toISOString().substring(0, 10);

        return (
            <tbody key={index} className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                <tr className="text-gray-700 dark:text-gray-400">
                    <td className="px-4 py-3">
                        <div className="flex items-center text-sm">
                            <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                <Image
                                    src={value.avatar}
                                    alt="Picture of the author"
                                    width={32}
                                    height={32}
                                />
                            </div>
                            <div>
                                <p className="font-semibold">{value.name}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">
                                    10x Developer
                                </p>
                            </div>
                        </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                        {value.profile.phoneNumber}
                    </td>
                    <td className="px-4 py-3 text-xs">
                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
                            {value.role}
                        </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                        {userUpdateDate}
                    </td>
                    <td className="px-4 py-3">
                        <div className="flex items-center space-x-4 text-sm">
                            <Link href={`user/edit/${value.id}`} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Edit">
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                </svg>
                            </Link>
                            <button onClick={() => { toggleModal(true) }} className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray" aria-label="Delete">
                                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className='p-0 h-0'>
                        {showModal && <ModalConfirm {...defaultProps} userId={value.id} />}
                    </td>
                </tr>
            </tbody >
        );
    })

    return (
        <div className="w-full pb-8 overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                    <thead>
                        <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                            <th className="px-4 py-3">Client</th>
                            <th className="px-4 py-3">Phone number</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Update date</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    {slideUserList}
                </table>
            </div>
        </div>
    );
}
