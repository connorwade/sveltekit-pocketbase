import { redirect, type Actions } from "@sveltejs/kit"
import type { LayoutServerLoad } from "../$types"

//Prevent
export const load = (({ locals }) => {
    if (locals.pb.authStore.isValid) {
        throw redirect(303, '/')
    }
}) satisfies LayoutServerLoad

export const actions: Actions = {
    default: async ({ locals, request }) => {
        const formData = await request.formData()

        const data = {
            email: formData.get('email')?.toString(),
            password: formData.get('password')?.toString(),
        }

        if (!data.email || !data.password) {
            return {
                error: "Please fill in all fields"
            }
        }

        try {
            await locals.pb.collection('users').authWithPassword(data.email, data.password)
            if (!locals.pb?.authStore?.model?.verified) {
                locals.pb.authStore.clear();

                return {
                    notVerified: true,
                }
            }
        } catch (err) {
            return {
                error: "Invalid email or password"
            }
        }

        // On success:
        throw redirect(303, '/')
    }
}