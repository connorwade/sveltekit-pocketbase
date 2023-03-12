<script lang="ts">
	import type { PageData } from './$types';
	import Header from './Header.svelte';
	import './98.css';
	import './styles.css';
	import Footer from './Footer.svelte';

	export let data: PageData;
	const { signedIn, user } = data;
</script>

<div class="app">
	<Header {user} />

	<main>
		<slot />
	</main>

	<Footer />
</div>
