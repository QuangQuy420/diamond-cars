"use server"

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "../libs/auth";

/**
 * Check user has capability to action. If not, return home page.
 */
export async function useHasCapability() {
    // @ts-ignore
    const session = await getServerSession(authConfig);
    // @ts-ignore
    if (!session || session.user.role !== 'ADMIN') {
        return redirect("/");
    }
    return session;
}