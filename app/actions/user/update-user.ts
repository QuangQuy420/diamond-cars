'use server'

import { revalidatePath } from 'next/cache';
import prisma from '../../../prisma/db'
import { UpdateUserSchema } from "@/prisma/zod";


export async function updateUser(userId, prevState, formData: FormData) {
    const result = UpdateUserSchema.safeParse({
        name: formData.get('name'),
        role: formData.get('role'),
        avatar: formData.get('avatar'),
        bio: formData.get('bio'),
        phoneNumber: formData.get('phoneNumber'),
        address: formData.get('address'),
    });

    // Validate form signUp.
    if (result.success == false) {
        return {
            message: 'Failed to update',
            errors: result.error.format(),
            status: 'error',
        };
    }

    if (!userId) {
        return {
            message: 'Can not find user_Id',
            errors: 'error_user_id',
            status: 'error',
        };
    }
    try {
        const updateUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                name: result.data.name,
                role: result.data.role,
                avatar: result.data.avatar,
                updatedAt: new Date(),
                profile: {
                    update: {
                        bio: result.data.bio,
                        phoneNumber: result.data.phoneNumber,
                        address: result.data.address,
                    }
                }
            }
        })

        if (updateUser) {
            revalidatePath("/"); // reload the current page.
            return {
                message: 'Signup successfully!',
                errors: '',
                status: 'success',
            };
        }
    } catch (error) {
        console.log(error);
        return Response.json('Error ' + error, { status: 500 })
    }
}