// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import PocketBase from 'pocketbase'

interface UserInfo {
	id: string;
	name: string;
	avatar: string;
	aboutme: string;
	username: string;
	email: string;
}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			pb: PocketBase,
			user: UserInfo,
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export { };
