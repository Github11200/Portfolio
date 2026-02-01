<script lang="ts">
	import BlogPostBox from '$lib/components/BlogPostBox.svelte';
</script>

<div class="flex h-screen justify-center overflow-y-scroll">
	<div class="prose mt-16">
		<h1>Blog Posts</h1>
		<div class="flex flex-col gap-4">
			<BlogPostBox />
			<BlogPostBox />
			<BlogPostBox />
			<BlogPostBox />
		</div>
	</div>
</div>
