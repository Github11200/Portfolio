<script lang="ts">
import BlogPostBox from "$lib/components/BlogPostBox.svelte";
import { blogPosts } from "$lib/data/blogPosts";

const posts = blogPosts.map((post) => ({
	title: post.title,
	description: post.description,
	image: post.image,
	href: `/blog/${post.slug}`,
}));
</script>

<div class="relative min-h-screen overflow-hidden">

	<section class="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-28 sm:px-8">
		<div class="flex flex-col gap-6">
			{#each posts as post, i (i)}
				<BlogPostBox {post} />
			{/each}
		</div>
	</section>
</div>
