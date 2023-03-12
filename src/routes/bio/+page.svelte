<script>
	export let data;

	const { user } = data;
</script>

<main>
	<h1>My Bio</h1>
	<img src="/avatars/{user.avatar}.gif" alt="" />
	<h2>Hello, my name is {user.name}!</h2>
	{#if user.aboutme}
		<p>{user.aboutme}</p>
	{:else}
		<p>
			You haven't filled out your bio! Go to <a href="/profile">your profile</a> to fill it out.
		</p>
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
