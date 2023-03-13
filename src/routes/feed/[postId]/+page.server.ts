import { serializeNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Comment } from "../../../app";

export const load = (async ({ locals, params }) => {
    const getPost = async (postId: string) => {
        try {
            return serializeNonPOJOs(await locals.pb.collection('posts').getOne(postId));
        } catch (err: any) {
            console.error(err);
            throw error(400, err.message);
        }
    }

    const getAuthor = async (userId: string) => {
        try {
            return serializeNonPOJOs(await locals.pb.collection('users').getOne(userId));
        } catch (err: any) {
            console.error(err);
            throw error(400, err.message);
        }
    }

    const getComments = async (postId: string) => {
        try {
            return serializeNonPOJOs(await (await locals.pb.collection('comments')
                .getFullList({ postId })).sort((a: Comment, b: Comment) => new Date(b.created).getTime() - new Date(a.created).getTime()));
        } catch (err: any) {
            console.error(err);
        }
    }

    const post = await getPost(params.postId);
    const comments: Comment[] = await getComments(params.postId);

    let comment: Comment;
    for (comment of comments) {
        if (comment.author == locals?.user?.id) {
            comment.isUsers = true;
        }
        if (comment.author && typeof comment.author === 'string')
            comment.author = await getAuthor(comment.author);

        comment.isLikedByUser = locals.user?.likedItems?.comments?.includes(comment.id);
    }

    return {
        post,
        author: await getAuthor(post.author),
        isAuthor: locals.user?.id === post.author,
        comments,
    };
}) satisfies PageServerLoad;