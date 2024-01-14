"use client";

import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

/**
 * Check login in client.
 */
export function useLoginRequiredClient() {
    const session = useSession();
    const router = useRouter();
    if (!session) router.push("/");
}
