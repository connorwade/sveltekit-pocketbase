import { redirect, type Actions, type Load } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').Load} */
export const load: Load = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(302, '/signin');
    }
}

export const actions: Actions = {
    create: async ({ request, locals }) => {
        const formData = await request.formData();

        formData.append('author', locals.user.id);
        formData.append('likes', '0');
        formData.append('edited', 'false');

        try {
            await locals.pb.collection('posts').create(formData);
        } catch (err) {
            console.error(err);
            throw redirect(303, '/feed');
        }

        throw redirect(303, '/feed');
    }
};