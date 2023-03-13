<script lang="ts">
	import Comments from '$lib/components/comments/Comments.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const { post, author, comments } = data;
	const { created, id } = post;
	const date = new Date(created);
	const formattedDate = date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
	const { isAuthor } = data;
</script>

<main>
	<div class="post-main">
		<a href={`/feed`} type="submit"> &laquo; Back to feed</a>
		<p>{formattedDate}</p>
		<h4>
			<img src={`/avatars/${author?.avatar}.gif`} alt={author.username} />
			<a href={`/bio/${author.id}`}>{author.username}</a>
		</h4>
		<h1>{post.title}</h1>
		<p>{post.content}</p>

		{#if isAuthor}
			<a href={`/feed/${post.id}/edit`}> <button> Edit </button></a>
		{/if}
	</div>

	<Comments postId={id} {comments} />
</main>

<style>
	main {
		background-color: white;
		padding: 1rem;
	}
	.post-main {
		background-color: white;
		padding: 1rem;
		font-size: 1rem;
		position: relative;
		border: 1px solid gray;
	}
	h1 {
		margin: 4rem 0;
	}
	h4 {
		display: flex;
		align-items: center;
		gap: 5px;
	}
	h4 img {
		width: 2rem;
	}
</style>
