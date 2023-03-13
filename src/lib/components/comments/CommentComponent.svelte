<script lang="ts">
	import type { Comment } from '../../../app';
	import LikeComment from './LikeComment.svelte';

	export let comment: Comment;
	export let isUsers: boolean;
	export let postId: string;
	export let isLikedByUser: boolean;
	const date = new Date(comment.created);
	const formattedDate = date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<div class="comment">
	{#if typeof comment.author !== 'string'}
		<p>{formattedDate}</p>
		<div class="comment__author">
			<img src={`/avatars/${comment?.author?.avatar}.gif`} alt={comment?.author?.username} />
			<h5>
				<a href={`/bio/${comment?.author?.id}`}>{comment?.author?.username}</a>
			</h5>
		</div>
	{/if}
	<p class="comment-body">{comment?.content}</p>
	{#if isUsers}
		<form class="delete-btn" action="/comments?/delete" method="POST">
			<input type="hidden" name="postId" value={postId} />
			<input type="hidden" name="commentId" value={comment.id} />
			<button>Delete <img src="/icons/png/trash.png" alt="Delete item" /></button>
		</form>
	{/if}

	<LikeComment {comment} {postId} isLiked={isLikedByUser} />
</div>

<style>
	.comment {
		background-color: white;
		padding: 1rem;
		font-size: 1rem;
		position: relative;
		border: 1px solid gray;
	}

	.comment__author {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.comment__author h5 {
		margin: 0;
		font-size: 1rem;
	}

	.comment__author img {
		max-width: 20px;
	}

	.comment-body {
		font-size: 1.5rem;
	}

	.delete-btn {
		position: absolute;
		right: 0;
		top: 0;
		padding: 0 10px;
	}

	.delete-btn button {
		background: none;
		border: none;
		color: blue;
		font-size: 1rem;
		appearance: none;
		border: none;
		box-shadow: none;
		max-width: unset;
		min-width: unset;
		padding: 0;
		text-decoration: underline;
		display: flex;
		align-items: center;
		gap: 5px;
		width: unset;
	}

	.delete-btn button img {
		width: 20px;
	}

	form {
		margin: 0;
		display: block;
	}
</style>
