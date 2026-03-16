<script lang="ts">
	import BlogPostBox from "$lib/components/BlogPostBox.svelte";
	import { blogPosts } from "$lib/data/blogPosts";

	const posts = blogPosts.map((post) => ({
		title: post.title,
		description: post.description,
		image: post.image,
		href: `/blog/${post.slug}`
	}));
</script>

<div class="relative min-h-screen overflow-hidden">
	<div class="pointer-events-none absolute -left-24 top-20 size-64 rounded-full border border-border/70 bg-red-50"></div>
	<div class="pointer-events-none absolute right-20 top-28 h-28 w-28 rotate-12 border border-border/70 bg-green-50"></div>
	<div class="pointer-events-none absolute bottom-20 left-1/4 h-40 w-40 -rotate-12 rounded-full border border-border/60 bg-blue-50"></div>
	<div class="pointer-events-none absolute bottom-20 right-16 h-52 w-52 rotate-45 border border-border/60 bg-yellow-50"></div>

	<section class="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-28 sm:px-8">
		<div class="flex flex-col gap-6">
			{#each posts as post}
				<BlogPostBox {post} />
			{/each}
		</div>
	</section>
</div>
