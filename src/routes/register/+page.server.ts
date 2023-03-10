import { redirect, type Actions } from "@sveltejs/kit"
import type { LayoutServerLoad } from "../$types"

//Prevent
export const load = (({ locals }) => {
    if (locals.pb.authStore.isValid) {
        throw redirect(303, '/')
    }
}) satisfies LayoutServerLoad

//Forms
export const actions: Actions = {
    default: async ({ locals, request }) => {
        const formData = await request.formData()

        const username = formData.get('username')?.toString()
        const email = formData.get('email')?.toString()
        const emailVisibility = true
        const password = formData.get('password')?.toString()
        const passwordConfirm = formData.get('passwordConfirm')?.toString()
        const name = formData.get('name')?.toString()

        const data = {
            username,
            email,
            emailVisibility,
            password,
            passwordConfirm,
            name,
            avatar: 'avatar1'
        };

        try {
            const record = await locals.pb.collection('users').create(data)
            data.email ??= ""
            data.password ??= ''
            const { token } = await locals.pb.collection('users').authWithPassword(
                data.email,
                data.password,
            )

            locals.pb.authStore.clear()
        } catch (err) {
            console.error(err)
        }

        // on success
        throw redirect(303, '/login')
    },
}