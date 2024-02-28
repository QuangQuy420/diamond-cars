import { revalidatePath } from 'next/cache';
import prisma from '../../../prisma/db';

/**
 * The function handle delete user by Id.
 * 
 * @param userId 
 * @returns JSON
 */
export const deleteUserById = async (userId: string) => {
    try {
        if (!userId) return Response.json('User ID is required', { status: 400 });

        // Delete profiles associated with the user.
        const deleteProfile = prisma.profile.deleteMany({
            where: {
                userId: userId,
            },
        })

        // Delete the user itself
        const deleteUser = prisma.user.delete({
            where: {
                id: userId,
            },
        })

        const transaction = await prisma.$transaction([deleteProfile, deleteUser])
        if (transaction) {
            revalidatePath("/"); // reload the current page.
            return Response.json('Delete user successfully!', { status: 200 });
        }
    } catch (error) {
        console.error('Error:', error);
        return Response.json('Error ' + error, { status: 500 })
    }
}