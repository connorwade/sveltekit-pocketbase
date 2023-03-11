<script>
	export let form;
</script>

<form method="POST">
	<h3>Log In!</h3>
	<div class="group">
		<label for="email">Email</label>
		<input type="email" name="email" id="email" />
	</div>
	<div class="group">
		<label for="password">Password</label>
		<input type="password" name="password" id="password" />
	</div>
	<button>Log in</button>

	{#if form?.notVerified}
		<p class="error">You must verify your email before you can log in!</p>
	{/if}
	{#if form?.error}
		<p class="error">{form.error}</p>
	{/if}
</form>

<style>
	.error {
		color: red;
	}
</style>
