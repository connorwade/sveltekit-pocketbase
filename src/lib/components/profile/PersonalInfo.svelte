<script lang="ts">
	import type { UserInfo } from '../../../app';

	export let loading: boolean;
	export let user: UserInfo;
</script>

<h3>Personal Info</h3>
<form action="/profile" method="POST">
	<div class="group">
		<label for="name">Name</label>
		<input type="text" name="name" id="name" disabled={loading} value={user.name} />
	</div>
	<div class="group">
		<label for="username">Username</label>
		<input type="text" id="username" disabled value={user.username} />
	</div>
	<div class="group">
		<label for="email">Email</label>
		<input type="email" id="email" disabled value={user.email} />
	</div>
	<div>
		<button type="submit" disabled={loading}>Save Settings</button>
	</div>
</form>

<style>
	h3 {
		margin-top: 0;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 30px;
		margin: 0;
	}
</style>
