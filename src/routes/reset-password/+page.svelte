<script>
	export let form;
</script>

<form action="?/resetPassword" method="POST">
	<h3>Request password change</h3>
	<div class="group">
		<label for="email">Email</label>
		<input type="email" name="email" id="email" />
	</div>
	<button>submit</button>

	{#if form?.success}
		<span class="success">An email has been sent to reset your password</span>
	{/if}
</form>

<style>
	.success {
		color: green;
	}
</style>
