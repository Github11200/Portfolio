<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import PostLink from '$lib/components/ui/button/PostLink.svelte';
	import { ArrowRight } from '@lucide/svelte';

	interface Props {
		post: {
			title: string;
			description: string;
			image: string;
			href: string;
		};
	}

	const { post }: Props = $props();
</script>

<Card.Root class="relative overflow-hidden bg-card py-0 shadow-none">
	<div class="group block transition-colors">
		<div class="flex flex-col md:flex-row">
			<div
				class="h-52 w-full shrink-0 border-b border-border bg-muted md:w-72 md:border-r md:border-b-0"
			>
				<enhanced:img
					src={post.image}
					alt={post.title}
					loading="lazy"
					class="h-full w-full object-cover"
				/>
			</div>
			<div class="flex min-w-0 flex-1 items-start justify-between gap-6 px-6 py-6 md:px-8 md:py-8">
				<div class="min-w-0 flex-1 pb-14 md:pb-0">
					<Card.Title class="text-2xl tracking-tight">{post.title}</Card.Title>
					<Card.Description class="mt-3 max-w-2xl text-sm leading-relaxed">
						{post.description}
					</Card.Description>
				</div>

				<PostLink
					href={post.href}
					class="absolute right-6 bottom-6 md:static md:right-auto md:bottom-auto"
				/>
			</div>
		</div>
	</div>
</Card.Root>