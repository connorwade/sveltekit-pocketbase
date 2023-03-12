<script lang="ts">
</script>

<div>
	<div>
		<form action="?/create" method="POST">
			<h3>Create a post</h3>
			<p>Hello, hello, hello</p>

			<label for="title">Post title</label>
			<div class="field-row">
				<input type="text" id="title" name="title" />
			</div>
			<br />
			<label for="content">Post Content</label>
			<div class="field-row">
				<textarea name="content" id="content" cols="30" rows="10" />
			</div>
			<br />
			<button type="submit"> Create! </button>
		</form>
	</div>
</div>
