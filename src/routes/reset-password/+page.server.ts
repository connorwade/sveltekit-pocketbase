import { error, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
    resetPassword: async ({ locals, request }) => {
        const body = Object.fromEntries(await request.formData());

        try {
            await locals.pb.collection('users').requestPasswordReset(body.email.toString());

            return {
                success: true,
            }
        } catch (err) {
            console.log("Error: ", err);
            throw error(500, 'Something went wrong')
        }
    }
};