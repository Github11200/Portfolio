<script lang="ts">
	import BlogPostBox from '$lib/components/BlogPostBox.svelte';
	import { blogPosts } from '$lib/data/blogPosts';

	let posts = blogPosts.map((post) => ({
		title: post.title,
		description: post.description,
		image: post.image,
		date: post.date,
		href: `/articles/${post.slug}`
	}));
	posts.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
</script>

<div class="relative flex-1 flex flex-col">
	<section class="relative mx-auto w-full max-w-6xl px-6 sm:pt-28 pb-16 sm:px-8">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-1">
			{#each posts as post, i (i)}
				<BlogPostBox {post} />
			{/each}
		</div>
	</section>
</div>
