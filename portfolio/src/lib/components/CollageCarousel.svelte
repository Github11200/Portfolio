<script lang="ts">
	import { resolve } from '$app/paths';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';

	interface CollageItem {
		id: string;
		caption: string;
		image: string;
		rotation: number;
		link: string;
	}

	const collageItems: CollageItem[] = [
		{
			id: 'vex',
			caption: 'Excellence Award @ World Championship',
			image: '/worlds-image.png',
			rotation: -3.5,
			link: 'https://www.deltasd.bc.ca/news-events/news/seaquam-robotics-wins-prestigious-international-award/'
		},
		{
			id: 'verbosity',
			caption: 'Custom Compiler',
			image: '/project-images/verbosity.png',
			rotation: 2.8,
			link: '/articles/creating-verbosity'
		},
		{
			id: 'posturai',
			caption: 'Posture Correction Software',
			image: '/project-images/posturai.png',
			rotation: -2.2,
			link: 'https://posturai.vercel.app/'
		},
		{
			id: 'citrus',
			caption: 'Tetris in C in the Terminal',
			image: '/project-images/citrus.png',
			rotation: 3.2,
			link: '/articles/creating-citrus'
		},
		{
			id: 'robotics',
			caption: 'Custom Motion Control Framework',
			image: '/project-images/robot.png',
			rotation: -3.0,
			link: 'https://github.com/Github11200/Motion-Control-Framework'
		},
		{
			id: 'termicord',
			caption: 'Raw TCP Sockets Chat App in C++',
			image: '/project-images/termicord.png',
			rotation: 2.2,
			link: 'https://github.com/Github11200/Termicord'
		},
		{
			id: 'range-queries',
			caption: 'Range Queries Visualized Article',
			image: '/range-queries-part-three/rqp3.jpg',
			rotation: -2.8,
			link: '/articles/range-queries-part-one'
		},
		{
			id: 'arch-linux',
			caption: 'Omarchy Setup',
			image: '/arch-setup.png',
			rotation: 3.5,
			link: 'https://github.com/Github11200/Custom-Omarchy-Config'
		}
	];

	const loopedItems = [...collageItems, ...collageItems];

	let hoveredItemId = $state<string | null>(null);
</script>

<section
  class="collage-carousel-section group relative z-30 w-full overflow-visible py-2 select-none sm:py-3"
>
	<div class="relative w-full overflow-hidden pt-8 pb-12 sm:pt-10 sm:pb-16">
		<!-- Looping Track -->
		<div
			class="flex w-max animate-collage-marquee items-center gap-6 will-change-transform group-hover:paused motion-reduce:animate-none motion-reduce:overflow-x-auto sm:gap-10"
		>
			{#each loopedItems as item, index (`${item.id}-${index}`)}
				{@const isHovered = hoveredItemId === item.id}
				<a
					class="relative cursor-pointer transition-transform duration-300 ease-out focus:outline-none"
					style="transform: rotate({isHovered ? 0 : item.rotation}deg) scale({isHovered
						? 1.05
						: 1}); z-index: {isHovered ? 40 : 10};"
					onmouseenter={() => (hoveredItemId = item.id)}
					onmouseleave={() => (hoveredItemId = null)}
					onfocus={() => (hoveredItemId = item.id)}
					onblur={() => (hoveredItemId = null)}
					tabindex="0"
					role="button"
					href={item.link}
				>
					<!-- Polaroid / Collage Card Frame using shadcn Card -->
					<Card.Root
						class="relative flex w-[60vw] transform-gpu flex-col gap-0 rounded-[calc(var(--radius)+0.875rem)] bg-card p-2 text-card-foreground transition-all duration-300 backface-hidden hover:border-foreground/80 sm:w-80 sm:p-3.5 md:w-96 lg:w-md xl:w-lg"
					>
						<!-- Image Container -->
						<div
							class="relative h-[45vw] w-full transform-gpu overflow-hidden rounded-(--radius) bg-muted backface-hidden sm:h-52 md:h-64 lg:h-72 xl:h-80"
						>
							<img
								src={item.image}
								alt={item.caption}
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
							/>
						</div>

						<!-- Polaroid Bottom Caption Bar -->
						<div class="mt-3 flex items-center justify-between px-1">
							<span class="truncate font-mono text-xs font-bold text-foreground sm:text-sm">
								{item.caption}
							</span>
						</div>
					</Card.Root>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	@media (min-width: 640px) {
		.collage-carousel-section {
			width: 100vw;
			margin-left: calc(-1 * var(--sidebar-width, 0px));
		}
	}
</style>
