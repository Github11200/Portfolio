<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, stagger } from 'animejs';
	import BlogPostBox from '$lib/components/BlogPostBox.svelte';
	import { blogPosts } from '$lib/data/blogPosts';

	onMount(() => {
		animate('.writing-card-wrapper', {
			opacity: [0, 1],
			translateY: [16, 0],
			delay: stagger(80, { start: 50 }),
			duration: 550,
			ease: 'outCubic'
		});
	});

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
		<div class="flex flex-col gap-6 max-w-4xl">
			{#each posts as post, i (i)}
				<div class="writing-card-wrapper flex flex-col">
					<BlogPostBox {post} />
				</div>
			{/each}
		</div>
	</section>
</div>
