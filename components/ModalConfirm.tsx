'use client'
import { deleteUserById } from "@/app/actions/user";
import { ModalConfirmProps } from "@/interfaces";
import { useRouter } from "next/navigation";
import React from "react";

/**
 * The component display modal confirm.
 */
export const ModalConfirm: React.FC<ModalConfirmProps> = ({
    title, content, confirm, cancel, showModal, toggleModal, userId
}) => {
    const router = useRouter();

    /**
     * The function handle close modal.
     * 
     * @param value boolean.
     */
    const closeModal = (value: boolean) => {
        if (toggleModal) {
            toggleModal(value);
        }
    }

    /**
     * Delete user.
     * 
     * @param userId 
     */
    const handleConfirm = async (userId: string) => {
        const response = await fetch(`http://localhost:3000/api/user?userId=${userId}`, { method: 'DELETE' });
        closeModal(false);
        if (response.ok) {
            router.refresh();
        }
    }

    return (
        // <!-- Main modal -->
        <div id="default-modal" tabIndex={-1} aria-hidden="true" className={` ${showModal ? '' : 'hidden'} bg-black bg-opacity-10 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
            <div className="relative top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] p-4 w-full max-w-2xl max-h-full">
                {/* <!-- Modal content --> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    {/* <!-- Modal header --> */}
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h3>
                        <button type="button" onClick={() => closeModal(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    {/* <!-- Modal body --> */}
                    <div className="p-4 md:p-5 space-y-4">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            {content}
                        </p>
                    </div>
                    {/* <!-- Modal footer --> */}
                    <div className="flex justify-end items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button data-modal-hide="default-modal" onClick={() => handleConfirm(userId)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{confirm}</button>
                        <button data-modal-hide="default-modal" onClick={() => closeModal(false)} type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{cancel}</button>
                    </div>
                </div>
            </div>
        </div >
    )
}