<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	let loading: boolean;
	$: loading = false;
	export let data: any;
	const { user } = data;

	const submitUpdateProfile = () => {
		loading = true;
		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await applyAction(result);
					break;
			}
			loading = false;
		};
	};
</script>

{#if user}
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
		<a href="/reset-password"><button>Reset Password</button></a>
		<h3>About me</h3>
		<textarea
			name="aboutme"
			id="aboutme"
			cols="30"
			rows="10"
			value={user?.aboutme}
			disabled={loading}
		/>
		<h3>Select Avatar</h3>
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
		<button type="submit" disabled={loading}>Save Settings</button>
	</form>
{/if}

<style>
	h3 {
		margin: 0;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 30px;
	}
	.radio-group {
		display: flex;
		align-items: center;
		justify-content: center;
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
