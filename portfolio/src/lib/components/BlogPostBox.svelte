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
	class="h-full w-full will-change-transform"
>
	<Card.Root class="relative h-full overflow-hidden bg-card py-0 shadow-none">
	<div class="group h-full transition-colors">
		<div class="flex h-full flex-col md:flex-row">
			<div
				class="relative h-52 w-full shrink-0 border-b border-border bg-muted md:h-auto md:min-h-52 md:w-1/2 md:border-r md:border-b-0 lg:w-72"
			>
				<enhanced:img
					src={post.image}
					alt={post.title}
					loading="lazy"
					class="absolute inset-0 h-full w-full object-cover object-center"
				/>
			</div>
			<div class="flex min-w-0 flex-1 flex-col gap-4 p-4">
				<div class="min-w-0 w-full">
					<Card.Title class="text-base lg:text-lg tracking-tight leading-snug">{post.title}</Card.Title>
					<Card.Description class="mt-2 max-w-2xl text-xs leading-normal">
						{post.description}
					</Card.Description>
				</div>

				<PostLink
					href={post.href}
					class="mt-auto self-end text-xs"
				/>
			</div>
		</div>
	</div>
</Card.Root>
</div>
