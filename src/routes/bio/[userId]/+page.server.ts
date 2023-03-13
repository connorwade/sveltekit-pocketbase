import { serializeNonPOJOs } from '$lib/utils';
import { error, redirect, type Load } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Load} */
export const load: Load = async ({ locals, params }) => {
    const { userId } = params;

    if (locals.user) {
        let user;
        try {
            user = serializeNonPOJOs(await locals.pb.collection('users').getOne(userId));
        } catch (err) {
            throw error(404, 'That user does not exist.');
        }

        return {
            user
        }
    } else {
        throw redirect(302, '/signin');
    }
}