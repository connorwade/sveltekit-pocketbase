import { error, redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "../$types";

export const load = (async ({ locals }) => {
    if (!locals.pb.authStore.isValid) {
        throw redirect(303, '/signin')
    }

    return {
        user: locals.user
    }
}) satisfies LayoutServerLoad;

export const actions = {
    default: async ({ locals, request }) => {
        const formData = await request.formData()

        const name = formData.get('name')?.toString();
        const avatar = formData.get('avatar')?.toString();
        const aboutme = formData.get('aboutme')?.toString();

        try {
            await locals.pb.collection('users').update(locals?.user?.id, { name, avatar, aboutme })
        } catch (err) {
            throw error(404, "Something went wrong while updating your profile.");
        }

        throw redirect(303, '/profile')
    }
}
