import prisma from '../../../prisma/db'

export async function getAllUser() {
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