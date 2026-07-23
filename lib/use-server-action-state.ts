"use client";

import { useActionState } from "react";
import { unstable_rethrow } from "next/navigation";

export type ServerActionState = { error?: string };

/**
 * Wraps a form-bound server action so a thrown error (e.g. "Application not
 * found") surfaces as state instead of an unhandled exception, while letting
 * Next.js's own redirect/notFound control-flow errors continue to propagate.
 */
export function useServerActionState(action: (formData: FormData) => Promise<void>) {
    return useActionState<ServerActionState, FormData>(async (_prevState, formData) => {
        try {
            await action(formData);
        } catch (error) {
            unstable_rethrow(error);
            return {
                error: error instanceof Error ? error.message : "Something went wrong. Please try again.",
            };
        }
        return {};
    }, {});
}
