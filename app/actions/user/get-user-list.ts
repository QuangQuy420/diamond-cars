import prisma from '../../../prisma/db'


/**
 * The function handle get all user.
 * 
 * @returns user list.
 */
export const getAllUser = async () => {
    try {
        const userList = await prisma.user.findMany({
            include: {
                profile: true,
            },
        });

        return Response.json(userList, { status: 200 })
    } catch (error) {
        return Response.json('Error ' + error, { status: 500 })
    }
}