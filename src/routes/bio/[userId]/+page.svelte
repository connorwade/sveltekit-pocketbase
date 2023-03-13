<script lang="ts">
	export let data;
	const { user } = data;
</script>

<main>
	<h1>Bio for {user.username}</h1>
	<img src="/avatars/{user.avatar}.gif" alt="" />
	<h2>Hello, my name is {user.name}!</h2>
	{#if user.aboutme}
		<p>{user.aboutme}</p>
	{:else}
		<p>This profile has not been filled out yet!</p>
	{/if}
</main>

<style>
	img {
		width: 100px;
		height: 100px;
	}
	main {
		background-color: white;
		padding: 1rem;
	}
</style>
