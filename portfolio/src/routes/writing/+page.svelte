<script lang="ts">
	import BlogPostBox from '$lib/components/BlogPostBox.svelte';
	import { blogPosts } from '$lib/data/blogPosts';


	let posts = blogPosts.map((post) => ({
		title: post.title,
		description: post.description,
		image: post.image,
		date: post.date,
		href: `/writing/${post.slug}`
	}));
	posts.sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)));
</script>

<div class="relative flex-1 flex flex-col w-full">
	<section class="relative w-full px-4 pt-6 pb-12 sm:px-8 sm:pt-12 sm:pb-16 lg:px-14">
		<div class="grid auto-rows-fr gap-6 max-w-4xl">
			{#each posts as post, i (i)}
				<div class="writing-card-wrapper flex flex-col" style:--entrance-index={i}>
					<BlogPostBox {post} />
				</div>
			{/each}
		</div>
	</section>
</div>
