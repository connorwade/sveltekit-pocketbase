// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import PocketBase from 'pocketbase'

export interface LikedItems {
	posts: string[];
	comments: string[];
}

export interface UserInfo {
	id: string;
	name: string;
	avatar: string;
	aboutme: string;
	username: string;
	email: string;
	likedItems: LikedItems;
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

export interface Comment {
	id: string;
	created: string;
	updated: string;
	content: string;
	edited: boolean;
	author: string | UserInfo;
	likes: number;
	postId: string;
	isUsers?: boolean;
	isLikedByUser?: boolean;
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
