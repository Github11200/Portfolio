<script>
	import { resolve } from '$app/paths';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import '@mistweaverco/mdsvex-shiki/styles.css';

	export let title, date, image;
</script>

<div class="relative min-h-screen overflow-hidden">
	<section class="relative mx-auto w-full max-w-4xl px-6 py-16 sm:px-8">
		<div class="mt-6 flex justify-start">
			<Button variant="card" class="h-auto p-0">
				<a
					href={resolve('/blog')}
					class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
				>
					← Back to Posts
				</a>
			</Button>
		</div>
		<Card.Root class="mx-auto mt-4  mb-6 overflow-hidden border border-border bg-card shadow-none">
			<Card.Header class="border-b border-border px-8 py-4">
				<Card.Title>{title}</Card.Title>
			</Card.Header>
			<Card.Content class="px-8">
				<p class="text-md mt-0 text-muted-foreground">{date}</p>
			</Card.Content>
		</Card.Root>

		<!-- Image Section -->
		{#if image}
			<div class="mb-8 overflow-hidden rounded-lg border border-border/60">
				<enhanced:img src={image} alt={title} loading="lazy" class="h-96 w-full object-cover" />
			</div>
		{/if}

		<!-- Content Section -->
		<div class="prose prose-sm dark:prose-invert max-w-none">
			<slot />
		</div>

		<!-- Back Link -->
		<div class="mt-12 flex justify-start">
			<Button variant="card" class="h-auto p-0">
				<a
					href={resolve('/blog')}
					class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium"
				>
					← Back to Posts
				</a>
			</Button>
		</div>
	</section>
</div>
