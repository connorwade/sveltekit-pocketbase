<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const { post } = data;
</script>

<main>
	<a href={`/feed/${post.id}`} type="submit"> &laquo; Back </a>
	<div>
		<form action="?/update" method="POST">
			<h3>Edit your post</h3>
			<p>Hello, hello, hello</p>

			<label for="title">Post title</label>
			<div class="field-row">
				<input type="text" id="title" name="title" value={post.title ?? ''} />
			</div>
			<br />
			<label for="content">Post Content</label>
			<div class="field-row">
				<textarea name="content" id="content" cols="30" rows="10" value={post.content ?? ''} />
			</div>
			<br />
			<button type="submit"> Save! </button>
		</form>
	</div>
</main>
