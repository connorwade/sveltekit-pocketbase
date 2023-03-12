import { serializeNonPOJOs } from '$lib/utils';
import { error, redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
    if (!locals.user) {
        throw error(401, 'Unauthorized');
    }

    try {
        const post = serializeNonPOJOs(await locals.pb.collection('posts').getOne(params.postId));

        if (locals.user.id !== post.author) {
            throw error(401, 'Unauthorized');
        } else {
            return { post };
        }
    } catch (err: any) {
        console.error(err);
        throw error(err.status, err.message);
    }
}) satisfies PageServerLoad;

export const actions: Actions = {
    async update({ request, locals, params }) {
        const formData = await request.formData();

        try {
            await locals.pb.collection('posts').update(params.postId ?? '', formData);

        } catch (err: any) {
            console.error(err);
            throw error(err.status, err.message);
        }

        throw redirect(303, `/feed/${params.postId}`);
    }
} satisfies Actions;
