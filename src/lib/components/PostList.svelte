<script lang="ts">
	import type { Post } from '../../app';
	import PostListItem from './PostListItem.svelte';

	export let posts: Post[];
</script>

<div class="post-list">
	<hr />
	{#each posts as post}
		<PostListItem {post} />
	{/each}
</div>
