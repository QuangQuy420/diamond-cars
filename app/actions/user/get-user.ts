import prisma from '../../../prisma/db';

/**
 * The function handle get user information by Id.
 * 
 * @param id 
 * @returns user information.
 */
export const getUserById = async (id: string) => {
    try {
        if (!id) {
            return Response.json('User ID is required', { status: 400 })
        }

        // get user by ID.
        const user = await prisma.user.findUnique({
            where: { id: id },
            select: {
                email: true,
                name: true,
                role: true,
                avatar: true,
                createdAt: true,
                updatedAt: true,
                profile: {
                    select: {
                        phoneNumber: true,
                        bio: true,
                        address: true,
                    }
                }
            },
        });

        return Response.json(user, { status: 200 })
    } catch (error) {
        return Response.json('Error ' + error, { status: 500 })
    }
}