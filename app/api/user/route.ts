// http://localhost:3000/api/user

import { getUserById } from '@/app/actions/user';

export async function POST(
    request: Request
) {
    // get searchParam
    // const url = new URL(request.url);
    // const userId = url.searchParams.get('userId');
    const { userId } = await request.json();
    return await getUserById(userId);
}
