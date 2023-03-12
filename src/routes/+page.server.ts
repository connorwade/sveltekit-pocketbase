import { redirect, type Load } from '@sveltejs/kit';

export const load: Load = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(302, '/signin');
    }

    throw redirect(302, '/feed');
}