<script lang="ts">
	import type { Comment } from '../../../app';

	export let comment: Comment;
	export let postId: string;
	export let isLiked: boolean;

	const likeLabel = `${comment?.likes} like${comment?.likes != 1 ? 's' : ''}`;
</script>

{#if !isLiked}
	<form action="/comments?/like" method="POST">
		<p>{likeLabel}</p>
		<input type="hidden" name="postId" value={postId} />
		<input type="hidden" name="commentId" value={comment.id} />
		<span>-</span>
		<button class="like-btn">
			<span>Like</span>
			<img src="/icons/png/like.png" alt="Like comment" />
		</button>
	</form>
{:else}
	<form action="/comments?/unlike" method="POST">
		<p>{likeLabel}</p>
		<input type="hidden" name="postId" value={postId} />
		<input type="hidden" name="commentId" value={comment.id} />
		<span>-</span>
		<button class="like-btn">
			<span>Unlike</span>
			<img src="/icons/png/unlike.png" alt="Remove your like from comment" />
		</button>
	</form>
{/if}

<style>
	form {
		margin: 0;
		display: flex;
		flex-direction: row;
		gap: 5px;
		align-items: center;
	}

	button.like-btn {
		background: none;
		border: none;
		color: blue;
		font-size: 1rem;
		appearance: none;
		border: none;
		box-shadow: none;
		width: auto;
		max-width: unset;
		min-width: unset;
		padding: 0;
		text-decoration: underline;
		display: flex;
		align-items: center;
		gap: 5px;
	}

	button.like-btn img {
		max-width: 1.6rem;
	}
</style>
