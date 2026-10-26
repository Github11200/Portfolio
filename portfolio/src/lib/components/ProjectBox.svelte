<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	import { animate } from 'animejs';

	interface Props {
		project: {
			name: string;
			description: string;
			image: string;
			href: string;
		};
		index?: number;
	}

	const { project, index = 0 }: Props = $props();

	let cardEl: HTMLElement | null = $state(null);

	function handleMouseEnter() {
		if (!cardEl) return;
		animate(cardEl, {
			translateY: -3,
			duration: 250,
			ease: 'outQuad'
		});
	}

	function handleMouseLeave() {
		if (!cardEl) return;
		animate(cardEl, {
			translateY: 0,
			duration: 300,
			ease: 'outQuad'
		});
	}
</script>

<div
	bind:this={cardEl}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	class="flex h-full w-full flex-col will-change-transform"
>
	<Card.Root class="flex h-full w-full flex-col gap-0 overflow-hidden p-0 shadow-none">
	<div class="aspect-video w-full overflow-hidden bg-muted">
		<enhanced:img
			src={project.image}
			alt={project.name}
			class="h-full w-full object-cover"
			loading={index < 2 ? 'eager' : 'lazy'}
		/>
	</div>
	<Card.Content class="flex grow flex-col justify-between px-4 py-4 sm:px-6 sm:py-5">
		<div>
			<Card.Title class="text-lg sm:text-xl tracking-tight">{project.name}</Card.Title>
			<Card.Description class="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground"
				>{project.description}</Card.Description
			>
		</div>
		<div class="mt-4 flex justify-end">
			<Button
				variant="outline"
				href={project.href}
				target="_blank"
				rel="external"
				size="sm"
				class="gap-2"
			>
				View Project
				<ArrowUpRight size={16} />
			</Button>
		</div>
	</Card.Content>
</Card.Root>
</div>
