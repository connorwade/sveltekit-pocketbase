import { pb } from '$lib/pb'
import { serializeNonPOJOs } from '$lib/utils'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
    // before
    pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '')
    if (pb.authStore.isValid) {
        try {
            await pb.collection('users').authRefresh()
        } catch (_) {
            pb.authStore.clear()
        }
    }

    event.locals.pb = pb
    event.locals.user = serializeNonPOJOs(pb.authStore.model)

    const response = await resolve(event)

    // after
    response.headers.set(
        'set-cookie',
        pb.authStore.exportToCookie({ httpOnly: false })
    )

    return response
}