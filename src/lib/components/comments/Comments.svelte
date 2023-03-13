<script lang="ts">
	import type { Comment } from '../../../app';
	import CommentComponent from './CommentComponent.svelte';
	export let comments: Comment[];
	export let postId: string;
</script>

<form action={`/comments?/create`} method="POST">
	<h4>Leave a comment</h4>

	<input type="hidden" name="postId" value={postId} />
	<label for="comment-content">Comment body</label>
	<textarea name="content" id="comment-content" rows="4" />
	<button>Leave comment</button>
</form>

<h4>Comments ({comments?.length})</h4>
<div class="comments-wrapper">
	{#each comments as comment}
		<CommentComponent
			{comment}
			isLikedByUser={comment?.isLikedByUser ?? false}
			isUsers={comment.isUsers ?? false}
			{postId}
		/>
	{/each}
</div>

<style>
	form {
		max-width: 100%;
	}
	textarea {
		width: 100%;
		resize: none;
	}
	.comments-wrapper {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
