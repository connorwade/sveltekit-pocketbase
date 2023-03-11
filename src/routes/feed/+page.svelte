<script>
	import PostList from '$lib/components/PostList.svelte';

	export let data;
	const { posts } = data;
</script>

<main>
	<h1>Welcome to your feed!</h1>

	<a href="/feed/create-post"><button>Create new post +</button></a>
	<PostList {posts} />
</main>
