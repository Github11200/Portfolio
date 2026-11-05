<script>
	import { resolve } from '$app/paths';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import '@mistweaverco/mdsvex-shiki/styles.css';

	let { title, date, image, imageAlt, Link } = $props();
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.min.css"
		integrity="sha384-5TcZemv2l/9On385z///+d7MSYlvIEw9FuZTIdZ14vJLqWphw7e7ZPuOiCHJcFCP"
		crossorigin="anonymous"
	/>
</svelte:head>

<div class="relative flex-1 flex flex-col overflow-hidden">
	<section class="relative mx-auto w-full max-w-4xl px-4 py-6 sm:px-8 sm:py-10">
		<div class="article-back-button mt-2 sm:mt-6 flex justify-start">
			<Button
				variant="outline"
				href={resolve('/writing')}
				size="sm"
				class="gap-2 text-xs sm:text-sm font-medium"
			>
				← Back to Posts
			</Button>
		</div>
		<div class="article-header-card">
			<Card.Root
				class="mx-auto mt-4 mb-6 gap-0 overflow-hidden rounded-(--radius) border border-border bg-card py-0 shadow-none"
			>
			{#if image}
				<enhanced:img src={image} alt={imageAlt ?? title} loading="lazy" class="h-48 sm:h-96 w-full object-cover" />
			{/if}
			<Card.Header class="border-b border-border px-4 py-3 sm:px-8 sm:py-4">
				<Card.Title class="text-xl sm:text-2xl">{title}</Card.Title>
			</Card.Header>
			<Card.Content class="px-4 py-2 sm:px-8 sm:py-2">
				<p class="m-0 text-xs sm:text-sm text-muted-foreground">{date}</p>
			</Card.Content>
		</Card.Root>
		</div>

		<!-- Content Section -->
		<div class="blog-content max-w-none">
			<slot />
		</div>

		<!-- Back Link -->
		<div class="mt-12 flex justify-start">
			<Button
				variant="outline"
				href={resolve('/writing')}
				size="sm"
				class="gap-2 text-sm font-medium"
			>
				← Back to Posts
			</Button>
		</div>
	</section>
</div>
