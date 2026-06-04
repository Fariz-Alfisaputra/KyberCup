import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

/**
 * Hook that reads flash messages from Inertia shared props
 * and shows them as sonner toasts.
 *
 * Uses router.on('navigate') to safely read flash after each page
 * transition — this avoids calling usePage() outside an Inertia
 * context (which caused the black-screen crash).
 */
export function useFlashToast(): void {
    useEffect(() => {
        const unsubscribe = router.on('navigate', (event) => {
            // @ts-expect-error – Inertia v3 event has page prop
            const page = event.detail?.page;
            const flash = page?.props?.flash as
                | { success?: string | null; error?: string | null; info?: string | null }
                | undefined;

            if (!flash) return;

            if (flash.success) toast.success(flash.success);
            if (flash.error) toast.error(flash.error);
            if (flash.info) toast.info(flash.info);
        });

        return unsubscribe;
    }, []);
}
