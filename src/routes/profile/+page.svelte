<script lang="ts">
	import PersonalInfo from '$lib/components/profile/PersonalInfo.svelte';
	import PreferencesSettings from '$lib/components/profile/PreferencesSettings.svelte';
	import ResetPassword from '$lib/components/profile/ResetPassword.svelte';

	let loading: boolean;
	$: loading = false;
	export let data: any;
	const { user } = data;

	let selectedTab: any = PersonalInfo;

	const tabMap: Record<string, any> = {
		personalInfo: PersonalInfo,
		password: ResetPassword,
		preferences: PreferencesSettings
	};

	function selectTab(tabId: string) {
		selectedTab = tabMap[tabId];
	}
</script>

<main>
	<h1>Profile Settings</h1>
	{#if user}
		<div class="tabs">
			<div class="tabs-controller">
				<button
					class:active={selectedTab === PersonalInfo}
					on:click={() => selectTab('personalInfo')}>Personal Info</button
				>
				<button class:active={selectedTab === ResetPassword} on:click={() => selectTab('password')}
					>Password</button
				>
				<button
					class:active={selectedTab === PreferencesSettings}
					on:click={() => selectTab('preferences')}>Preferences</button
				>
			</div>
			<div class="tab-view">
				<svelte:component this={selectedTab} {loading} {user} />
			</div>
		</div>
	{/if}
</main>

<style>
	.tabs {
		display: flex;
		gap: 20px;
	}
	.tabs-controller {
		display: flex;
		flex-direction: column;
		flex: 1;
	}
	.tabs-controller button {
		text-align: left;
		font-size: 1.4rem;
		padding: 10px 15px;
	}
	.tab-view {
		flex: 2;
	}
	.active {
		border: 2px solid blue;
	}
</style>
