import { serializeNonPOJOs } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
    if (!locals) {
        throw redirect(303, 'login');
    }

    const getPosts = async () => {
        try {
            return serializeNonPOJOs(await locals.pb.collection('posts').getFullList());
        }
        catch (err: any) {
            console.error(err);
            throw error(err.status, err.message);
        }
    }

    return {
        posts: await getPosts()
    }
}) satisfies PageServerLoad;