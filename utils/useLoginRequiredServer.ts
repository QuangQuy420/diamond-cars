"use server"

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authConfig } from "../libs/auth";

/**
 * Check login in server.
 */
export async function useLoginRequiredServer() {
    // @ts-ignore
    const session = await getServerSession(authConfig);
    if (!session) return redirect("/login");
}
