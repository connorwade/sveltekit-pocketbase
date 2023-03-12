<script lang="ts">
	import type { UserInfo } from '../../../app';

	export let loading: boolean;
	export let user: UserInfo;
</script>

<h3>Preferences</h3>
<h4>About me</h4>
<form action="/profile" method="POST">
	<textarea
		name="aboutme"
		id="aboutme"
		cols="30"
		rows="10"
		value={user?.aboutme}
		disabled={loading}
	/>
	<h4>Select Avatar</h4>
	<div class="radio-group">
		<div class="field-row">
			<input
				disabled={loading}
				type="radio"
				checked={user.avatar === 'avatar1'}
				name="avatar"
				id="avatar1"
				value="avatar1"
			/>
			<label for="avatar1">
				<img alt="avatar1" src="avatars/avatar1.gif" />
			</label>
		</div>
		<div class="field-row">
			<input
				disabled={loading}
				type="radio"
				checked={user.avatar === 'avatar2'}
				name="avatar"
				id="avatar2"
				value="avatar2"
			/>
			<label for="avatar2">
				<img alt="avatar2" src="avatars/avatar2.gif" />
			</label>
		</div>
		<div class="field-row">
			<input
				disabled={loading}
				type="radio"
				checked={user.avatar === 'avatar3'}
				name="avatar"
				id="avatar3"
				value="avatar3"
			/>
			<label for="avatar3">
				<img alt="avatar3" src="avatars/avatar3.gif" />
			</label>
		</div>
		<div class="field-row">
			<input
				disabled={loading}
				type="radio"
				checked={user.avatar === 'avatar4'}
				name="avatar"
				id="avatar4"
				value="avatar4"
			/>
			<label for="avatar4">
				<img alt="avatar4" src="avatars/avatar4.gif" />
			</label>
		</div>
	</div>
	<div>
		<button type="submit" disabled={loading}>Save Settings</button>
	</div>
</form>

<style>
	h3 {
		margin-top: 0;
	}
	h4 {
		margin: 1rem 0;
	}
	textarea {
		margin-bottom: 30px;
	}
	form {
		display: flex;
		flex-direction: column;
		margin: 0;
	}
	.radio-group {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 30px;
	}
	.radio-group > .field-row {
		flex: 1;
		gap: 5px;
	}
	img {
		max-height: 50px;
		width: 50px;
		overflow: hidden;
	}
	.field-row {
		margin-top: 0 !important;
	}
</style>
