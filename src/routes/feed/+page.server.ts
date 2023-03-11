import { pb } from "$lib/pb";
import { serializeNonPOJOs } from "$lib/utils";
import { redirect } from "@sveltejs/kit";

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ locals }) => {
    if (locals.user) {
        const records = await pb.collection('posts').getFullList({
            sort: '-created',
        });
        const posts = await serializeNonPOJOs(records).map(async (post: any) => {
            post.author = await pb.collection('users').getOne(post.author)
        });

        return {
            user: locals.user,
            posts
        }
    } else {
        throw redirect(303, '/signin');
    }
}