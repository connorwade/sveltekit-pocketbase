<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const { post, author } = data;
	const { created } = post;
	const date = new Date(created);
	const formattedDate = date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	const { isAuthor } = data;
</script>

<main>
	<a href={`/feed`} type="submit"> &laquo; Back to feed</a>
	<h1>{post.title}</h1>
	<h2>By {author.username}</h2>
	<p>{formattedDate}</p>
	<p>{post.content}</p>

	{#if isAuthor}
		<a href={`/feed/${post.id}/edit`}> <button> Edit </button></a>
	{/if}
</main>

<style>
	main {
		background-color: white;
		padding: 1rem;
	}
</style>
