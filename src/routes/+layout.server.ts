import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
    if (!locals.pb.authStore.isValid) {
        redirect(303, '/signin')
    }

    return {
        signedIn: locals.pb.authStore.isValid,
        user: locals.user
    }
}) satisfies LayoutServerLoad;