<script lang="ts">
	import { page } from '$app/stores';
	export let user: any;
</script>

<header>
	<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">
					<button>Home</button>
				</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">
					<button>About</button>
				</a>
			</li>
			{#if user}
				<li aria-current={$page.url.pathname === '/bio' ? 'page' : undefined}>
					<a href="/bio">
						<button>Bio</button>
					</a>
				</li>
			{/if}
			<li aria-current={$page.url.pathname === '/feed' ? 'page' : undefined}>
				<a href="/feed">
					<button>Feed</button>
				</a>
			</li>
		</ul>

		{#if user}
			<div class="user-avatar">
				<img class="avatar" src={`/avatars/${user.avatar}.gif`} alt={user.name} />
				<p>Welcome back, {user.username}!</p>
			</div>
		{/if}
		<ul class={`sign-ins ${user ? '' : 'ml-auto'}`}>
			{#if !user}
				<a href="/signin"><button>Sign in</button></a>
				<a href="/register"> <button>Sign up</button></a>
			{:else}
				<a href="/profile"><button>Profile</button></a>
				<form action="/logout" method="POST"><button>Log out</button></form>
			{/if}
		</ul>
	</nav>
</header>

<style>
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1em;
		gap: 10px;
	}
	ul {
		display: flex;
		list-style: none;
		padding: 0;
	}
	a:visited {
		color: black;
	}
	a {
		color: black;
		text-decoration: none;
	}

	.avatar {
		background-color: white;
		height: 30px;
	}
	.user-avatar {
		display: flex;
		align-items: center;
		gap: 5px;
		margin: 0 0 0 auto;
	}
	.ml-auto {
		margin-left: auto;
	}
</style>
