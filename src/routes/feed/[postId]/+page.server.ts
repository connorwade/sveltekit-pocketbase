import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals, params }) => {
    const getProject = async (postId: string) => {
        try {
            return serializeNonPOJOs(await locals.pb.collection('posts').getOne(postId));
        } catch (err: any) {
            console.error(err);
            throw error(err.status, err.message);
        }
    }

    const getAuthor = async (userId: string) => {
        try {
            return serializeNonPOJOs(await locals.pb.collection('users').getOne(userId));
        } catch (err: any) {
            console.error(err);
            throw error(err.status, err.message);
        }
    }

    const post = await getProject(params.postId);

    return {
        post,
        author: await getAuthor(post.author),
        isAuthor: locals.user?.id === post.author
    };
}) satisfies PageServerLoad;