<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import PostLink from '$lib/components/ui/button/PostLink.svelte';
	import { ArrowRight } from '@lucide/svelte';

	import { animate } from 'animejs';

	interface Props {
		post: {
			title: string;
			description: string;
			image: string;
			href: string;
		};
	}

	const { post }: Props = $props();

	let boxEl: HTMLElement | null = $state(null);

	function handleMouseEnter() {
		if (!boxEl) return;
		animate(boxEl, {
			translateY: -2,
			duration: 250,
			ease: 'outQuad'
		});
	}

	function handleMouseLeave() {
		if (!boxEl) return;
		animate(boxEl, {
			translateY: 0,
			duration: 300,
			ease: 'outQuad'
		});
	}
</script>

<div
	bind:this={boxEl}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	class="w-full will-change-transform"
>
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
			<div class="flex min-w-0 flex-1 items-start justify-between gap-4 px-4 py-4 sm:gap-6 sm:px-8 sm:py-8">
				<div class="min-w-0 flex-1 pb-12 sm:pb-14 md:pb-0">
					<Card.Title class="text-lg sm:text-2xl tracking-tight leading-snug">{post.title}</Card.Title>
					<Card.Description class="mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm leading-relaxed">
						{post.description}
					</Card.Description>
				</div>

				<PostLink
					href={post.href}
					class="absolute right-4 bottom-4 sm:right-6 sm:bottom-6 md:static md:right-auto md:bottom-auto text-xs sm:text-sm"
				/>
			</div>
		</div>
	</div>
</Card.Root>
</div>