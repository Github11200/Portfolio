<script>
import { resolve } from "$app/paths";
import * as Card from "$lib/components/ui/card/index.js";
import { Button } from "$lib/components/ui/button/index.js";
import "@mistweaverco/mdsvex-shiki/styles.css";

export let title, date, image;
</script>


<div class="relative min-h-screen overflow-hidden ">
	<div class="pointer-events-none absolute -left-24 top-20 size-64 rounded-full border border-primary/30 bg-primary/15"></div>
	<div class="pointer-events-none absolute right-20 top-28 h-28 w-28 rotate-12 border border-accent-foreground/20 bg-accent/70"></div>

	<section class="relative mx-auto w-full max-w-4xl px-6 py-16 sm:px-8">
	<Card.Root class="mb-6 mt-12 overflow-hidden border border-border bg-card shadow-none mx-auto">
			<Card.Header class="border-b border-border px-8 py-4">
				<Card.Title>{title}</Card.Title>
			</Card.Header>
			<Card.Content class="px-8">
				<p class="text-md text-muted-foreground mt-0">{date}</p>
			</Card.Content>
	</Card.Root>

		<!-- Image Section -->
		{#if image}
			<div class="mb-8 overflow-hidden rounded-lg border border-border/60">
				<img src={image} alt={title} loading="lazy" class="h-96 w-full object-cover" />
			</div>
		{/if}

		<!-- Content Section -->
		<div class="prose prose-sm max-w-none dark:prose-invert">
	    <slot />
		</div>

		<!-- Back Link -->
		<div class="mt-12 flex justify-start">
			<Button variant="card" class="h-auto p-0">
				<a href={resolve("/blog")} class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium">
					← Back to Posts
				</a>
			</Button>
		</div>
	</section>
</div>
