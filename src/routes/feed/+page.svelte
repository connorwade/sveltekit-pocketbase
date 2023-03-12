<script lang="ts">
	import PostList from '$lib/components/PostList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { posts } = data;
</script>

<main>
	<h1>Feed</h1>
	<PostList {posts} />
</main>

<style>
	main {
		background: white;
		padding: 1rem;
	}
</style>
