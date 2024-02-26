'use client'
import * as React from 'react';
import { useState, useEffect } from 'react';
import { useFormState } from 'react-dom'
import { updateUser } from '@/app/actions/user'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation'
import { uploadImage } from '@/libs/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from 'next/image';
import { EditDetailUserProps } from '@/interfaces';

const initialState = {
    message: '',
}

/**
 * The components handle edit user.
 */
export const EditDetailUser: React.FC<EditDetailUserProps> = ({ userInfo, userId }) => {
    const [fileImage, setFileImage] = useState('');
    const [urlImage, setUrlImage] = useState('');
    const { pending } = useFormStatus();
    const updateUserWithId = updateUser.bind(null, userId)
    const router = useRouter();
    const [state, formAction] = useFormState(updateUserWithId, initialState);

    if (state?.status === 'success') {
        router.push('/dashboard/user');
    }

    // Prevent a users leave the page when they are editing.
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (false) return;
            e.preventDefault();
            return (e.returnValue = true);
        };

        // Attach the event listener for beforeunload
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Clean up by removing the event listener when the component unmounts
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    // UPLOAD IMAGE ===============================================
    const handleDrop = async (e: any, type: string) => {
        const dateUpload = new Date();
        console.log('dateUpload', dateUpload.toString().replaceAll(" ", ""));

        if (type === 'drop') {
            e.preventDefault();
            setFileImage(e.dataTransfer.files);
            const fileName = dateUpload.toString().replaceAll(" ", "").concat(e.dataTransfer.files[0].name);
            const fileRef = ref(uploadImage, `users/avatars/${fileName}`);
            uploadBytes(fileRef, e.dataTransfer.files[0]).then(data => {
                getDownloadURL(data.ref).then(URL => {
                    setUrlImage(() => URL);
                    console.log(URL);
                })
            })
        } else {
            setFileImage(e.target.files);
            const fileName = dateUpload.toString().replaceAll(" ", "").concat(e.target.files[0].name);
            const fileRef = ref(uploadImage, `users/avatars/${fileName}`);
            uploadBytes(fileRef, e.target.files[0]).then(data => {
                getDownloadURL(data.ref).then(URL => {
                    setUrlImage(() => URL);
                    console.log(URL);
                })
            })
        }
    }

    const handleDragOver = (e: any) => {
        e.preventDefault();
    }
    // UPLOAD IMAGE ===============================================

    return (
        <form action={formAction} className='flex'>
            <div className='w-[400px] flex-wrap'>
                <div
                    onDrop={(e) => handleDrop(e, 'drop')}
                    onDragOver={handleDragOver}
                    className='flex justify-center flex-col relative'
                >
                    <div>
                        <div className="p-3 mt-10 flex justify-center w-[150px] mx-auto">
                            <Image src={urlImage ? urlImage : userInfo.avatar} alt="" width={150} height={150}></Image>
                        </div>
                        <div className="pb-3 flex justify-center text-xl">
                            <span>Drag photos or videos here</span>
                        </div>
                        <div className="flex justify-center items-center w-100 mb-20 p-3">
                            <label htmlFor="avatar" className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white cursor-pointer">Select from computer</label>
                            <input
                                id="avatar"
                                type="file"
                                className="hidden"
                                onChange={(e) => handleDrop(e, 'input')}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <input type="hidden" name='avatar' value={urlImage} />
            <div>
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
                <button type="submit" className='flex-1' disabled={pending} aria-disabled={pending}>Edit User</button>
            </div>
        </form>
    );
}
