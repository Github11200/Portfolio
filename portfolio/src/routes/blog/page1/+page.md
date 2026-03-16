<script lang="ts">
	import type { PageProps } from './$types';
	import * as Card from "$lib/components/ui/card/index.js";
	import PostLink from "$lib/components/ui/button/PostLink.svelte";

	let { data }: PageProps = $props();
	// svelte-ignore state_referenced_locally
	const { post } = data;

	// Parse markdown links (simple implementation)
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
	}

</script>

<div class="relative min-h-screen overflow-hidden">
	<div class="pointer-events-none absolute -left-24 top-20 size-64 rounded-full border border-border/70 bg-red-50"></div>
	<div class="pointer-events-none absolute right-20 top-28 h-28 w-28 rotate-12 border border-border/70 bg-green-50"></div>

    <section class="relative mx-auto w-full max-w-4xl px-6 py-16 sm:px-8">
    	<!-- Title Section -->
    	<Card.Root class="mb-6 mt-12 overflow-hidden rounded-none border border-border bg-background shadow-none">
    		<Card.Header class="border-b border-border px-8 py-6">
    			<Card.Title class="text-4xl tracking-tight">{post.title}</Card.Title>
    		</Card.Header>
    		<Card.Content class="px-8">
    			<p class="text-md text-muted-foreground">{formatDate(post.date)}</p>
    		</Card.Content>
    	</Card.Root>

    	<!-- Image Section -->
    	{#if post.image}
    		<div class="mb-8 overflow-hidden rounded-none">
    			<img src={post.image} alt={post.title} loading="lazy" class="h-96 w-full object-cover" />
    		</div>
    	{/if}

    	<!-- Content Section -->
    	<div class="prose prose-sm max-w-none dark:prose-invert">
    		{@html renderMarkdown(post.content)}
    	</div>

    	<!-- Back Link -->
    	<div class="mt-12 flex justify-start">
    		<a href="/blog" class="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent/20">
    			← Back to Posts
    		</a>
    	</div>
    </section>

</div>
