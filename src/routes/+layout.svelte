<script lang="ts">
	import type { PageData } from './$types';
	import Header from './Header.svelte';
	import './98.css';
	import './styles.css';

	export let data: PageData;
	const { signedIn, user } = data;
</script>

<div class="app">
	<Header {user} />

	<main>
		<slot />
	</main>
</div>
