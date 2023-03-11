// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import PocketBase from 'pocketbase'

export interface UserInfo {
	id: string;
	name: string;
	avatar: string;
	aboutme: string;
	username: string;
	email: string;
}

export interface Post {
	id: string;
	created: string;
	updated: string;
	title: string;
	content: string;
	edited: boolean;
	author: string;
	likes: number;
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
