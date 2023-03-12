<script lang="ts">
	import type { Post } from '../../app';
	export let post: Post;

	const date = new Date(post.created);
	const formattedDate = date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});
</script>

<div class="post">
	<h2>{post.title}</h2>
	<p>{formattedDate}</p>
	<a href={`/feed/${post.id}`}>View Post</a>
</div>
<br />
<hr />
