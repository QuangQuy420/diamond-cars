// http://localhost:3000/api/user

import { deleteUserById, getUserById } from '@/app/actions/user';
import { NextApiRequest } from 'next';

export const POST = async (request: Request) => {
    // get searchParam
    // const url = new URL(request.url);
    // const userId = url.searchParams.get('userId');
    const { userId } = await request.json();
    return await getUserById(userId);
}

export const DELETE = async (request: NextApiRequest) => {
    const url = new URL(request.url);
    const userId = url.searchParams.get('userId');
    // console.log('userId', userId);
    // return NextResponse.json({ data: 'abc', status: 200 });
    return await deleteUserById(userId);
}
