// http://localhost:3000/api/user

import prisma from '../../../prisma/db';

export async function POST(
    request: Request
) {
    try {
        // get searchParam
        // const url = new URL(request.url);
        // const userId = url.searchParams.get('userId');
        const { userId } = await request.json();

        if (!userId) {
            return Response.json('User ID is required', { status: 400 })
        }

        // get user by ID.
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        return Response.json(user, { status: 200 })
    } catch (error) {
        return Response.json('Error ' + error, { status: 500 })
    }
}
