<script lang="ts">
	import type { Post } from '../../app';
	export let post: Post;
</script>

<div class="post">
	<h2>{post.title}</h2>
	<p>{@html post.content}</p>
	<div class="post-meta">
		<p>By {post.author}</p>
		<p>{post.created}</p>
	</div>
</div>
