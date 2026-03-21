<script lang="ts">
	import BlogPostBox from '$lib/components/BlogPostBox.svelte';
	import { blogPosts } from '$lib/data/blogPosts';

	let posts = blogPosts.map((post) => ({
		title: post.title,
		description: post.description,
		image: post.image,
		date: post.date,
		href: `/blog/${post.slug}`
	}));
	posts.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
</script>

<div class="relative min-h-screen overflow-hidden">
	<section class="relative mx-auto w-full max-w-6xl px-6 pt-28 pb-16 sm:px-8">
		<div class="flex flex-col gap-6">
			{#each posts as post, i (i)}
				<BlogPostBox {post} />
			{/each}
		</div>
	</section>
</div>
