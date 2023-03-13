import { serializeNonPOJOs } from "$lib/utils";
import { type Load, redirect, type Actions, error } from "@sveltejs/kit";
import type { LikedItems } from "../../../../../Code/sveltekit-pocketbase/src/app";

/** @type {import('@sveltejs/kit').Load} */
export const load: Load = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(303, '/signin');
    }

    throw redirect(303, '/feed');
}

export const actions: Actions = {
    create: async ({ request, locals, params }) => {
        const formData = await request.formData();

        formData.append("author", locals.user.id);
        formData.append("likes", "0");
        formData.append("edited", "false");
        const postId = formData.get("postId");

        if (!formData.get('content')) {
            throw redirect(303, `/feed/${postId}`);
        }

        try {
            await locals.pb.collection("comments").create(formData);
        } catch (err: any) {
            console.error(err);
            throw error(err.status, err.message);
        }

        throw redirect(303, `/feed/${postId}`);
    },
    delete: async ({ request, locals }) => {
        const formData = await request.formData();
        const commentId = formData.get("commentId")?.toString();
        const postId = formData.get("postId")?.toString();

        if (commentId) {
            try {
                await locals.pb.collection("comments").delete(commentId);
            } catch (err: any) {
                console.error(err);
                throw error(err.status, err.message);
            }
        }

        throw redirect(303, `/feed/${postId}`);
    },
    like: async ({ request, locals }) => {
        const formData = await request.formData();
        const commentId = formData.get("commentId")?.toString();
        const postId = formData.get("postId")?.toString();

        const getComment = async (id: string) => {
            try {
                return serializeNonPOJOs(await locals.pb.collection("comments").getOne(id));
            } catch (err: any) {
                console.error(err);
                throw error(err.status, err.message);
            }
        };

        const addCommentToUsersLikedItems = async (id: string) => {
            try {
                const user = locals.user;
                let currentLikedItems: LikedItems = user.likedItems;

                if (currentLikedItems && currentLikedItems.comments) {
                    currentLikedItems.comments.push(id);
                } else if (currentLikedItems) {
                    currentLikedItems.comments = [id];
                } else {
                    currentLikedItems = { comments: [id], posts: [] };
                }

                await locals.pb.collection("users").update(user.id, { likedItems: currentLikedItems });
            } catch (err: any) {
                console.error(err);
                throw error(err.status, err.message);
            }
        }

        if (commentId && locals.user) {
            if (!locals.user.likedItems?.comments?.includes(commentId)) {
                try {
                    const currentComment = await getComment(commentId);
                    await addCommentToUsersLikedItems(commentId);
                    await locals.pb.collection("comments").update(commentId, { likes: currentComment.likes + 1 });
                } catch (err: any) {
                    console.error(err);
                    throw error(err.status, err.message);
                }
            }
        }

        throw redirect(303, `/feed/${postId}`);
    },
    unlike: async ({ request, locals }) => {
        const formData = await request.formData();
        const commentId = formData.get("commentId")?.toString();
        const postId = formData.get("postId")?.toString();

        const getComment = async (id: string) => {
            try {
                return serializeNonPOJOs(await locals.pb.collection("comments").getOne(id));
            } catch (err: any) {
                console.error(err);
                throw error(err.status, err.message);
            }
        };

        const removeCommentFromUsersLikedItems = async (id: string) => {
            try {
                const user = locals.user;
                let currentLikedItems: LikedItems = user.likedItems;

                if (currentLikedItems && currentLikedItems.comments) {
                    currentLikedItems.comments = currentLikedItems.comments.filter((commentId) => commentId !== id);
                }

                await locals.pb.collection("users").update(user.id, { likedItems: currentLikedItems });
            } catch (err: any) {
                console.error(err);
                throw error(err.status, err.message);
            }
        }

        if (commentId && locals.user) {
            if (locals.user.likedItems?.comments?.includes(commentId)) {
                try {
                    const currentComment = await getComment(commentId);
                    await removeCommentFromUsersLikedItems(commentId);
                    await locals.pb.collection("comments").update(commentId, { likes: currentComment.likes - 1 });
                } catch (err: any) {
                    console.error(err);
                    throw error(err.status, err.message);
                }
            }
        }

        throw redirect(303, `/feed/${postId}`);
    }
};