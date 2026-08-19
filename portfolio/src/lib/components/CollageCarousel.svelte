<script lang="ts">
	import { resolve } from '$app/paths';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowRight } from '@lucide/svelte';

	interface CollageItem {
		id: string;
		title: string;
		caption: string;
		category: string;
		categoryColor: string;
		badgeBg: string;
		badgeText: string;
		badgeBorder: string;
		image: string;
		rotation: number;
		story: string;
		link?: string;
	}

	const collageItems: CollageItem[] = [
		{
			id: 'vex',
			title: 'VEX Robotics World Championship',
			caption: 'VEX World Finals • Champion',
			category: 'World 1st Place',
			categoryColor: '#ef4444',
			badgeBg: 'bg-red-500/10 dark:bg-red-500/20',
			badgeText: 'text-red-600 dark:text-red-400',
			badgeBorder: 'border-red-500/30',
			image: '/project-images/vex-robotics.jpg',
			rotation: -3.5,
			story:
				'Won the VEX Robotics World Championship out of 15,000+ teams worldwide, designing high-speed mechanics and autonomous motion control routines.',
			link: '/projects'
		},
		{
			id: 'verbosity',
			title: 'Verbosity Programming Language',
			caption: 'Verbosity 0.1 Compiler',
			category: 'C++ / Compiler',
			categoryColor: '#3b82f6',
			badgeBg: 'bg-blue-500/10 dark:bg-blue-500/20',
			badgeText: 'text-blue-600 dark:text-blue-400',
			badgeBorder: 'border-blue-500/30',
			image: '/project-images/verbosity.png',
			rotation: 2.8,
			story:
				'Built a custom programming language and optimizing compiler from scratch in C++ featuring code with zero punctuation or special symbols.',
			link: '/articles/creating-verbosity'
		},
		{
			id: 'posturai',
			title: 'Posturai — Posture Correction AI',
			caption: 'Posturai ML Vision',
			category: 'Hackathon Winner',
			categoryColor: '#10b981',
			badgeBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
			badgeText: 'text-emerald-600 dark:text-emerald-400',
			badgeBorder: 'border-emerald-500/30',
			image: '/project-images/posturai.png',
			rotation: -2.2,
			story:
				'Created an intelligent posture correction tool using PyTorch computer vision that tracks spinal alignment and provides real-time ergonomic alerts.',
			link: '/projects'
		},
		{
			id: 'citrus',
			title: 'Citrus — ANSI Terminal Tetris',
			caption: 'Citrus in C',
			category: 'Game Dev / C',
			categoryColor: '#f59e0b',
			badgeBg: 'bg-amber-500/10 dark:bg-amber-500/20',
			badgeText: 'text-amber-600 dark:text-amber-400',
			badgeBorder: 'border-amber-500/30',
			image: '/project-images/citrus.png',
			rotation: 3.2,
			story:
				'Engineered a fast, ANSI-terminal Tetris game written strictly in C using only the standard library and raw terminal escape sequences.',
			link: '/articles/creating-citrus'
		},
		{
			id: 'robotics',
			title: 'Autonomous Motion Control Template',
			caption: 'Push-Back Control Framework',
			category: 'Autonomous Systems',
			categoryColor: '#f43f5e',
			badgeBg: 'bg-rose-500/10 dark:bg-rose-500/20',
			badgeText: 'text-rose-600 dark:text-rose-400',
			badgeBorder: 'border-rose-500/30',
			image: '/project-images/robot.png',
			rotation: -3.0,
			story:
				'Developed a custom pure pursuit and PID motion controller for competitive robots, securing a 100% autonomous win rate across tournament matches.',
			link: '/projects'
		},
		{
			id: 'termicord',
			title: 'Termicord Chat Engine',
			caption: 'Termicord TCP Protocol',
			category: 'C++ / Raw Sockets',
			categoryColor: '#6366f1',
			badgeBg: 'bg-indigo-500/10 dark:bg-indigo-500/20',
			badgeText: 'text-indigo-600 dark:text-indigo-400',
			badgeBorder: 'border-indigo-500/30',
			image: '/project-images/termicord.png',
			rotation: 2.2,
			story:
				'Architected a distributed terminal chat platform using raw C++ TCP sockets, client-server multithreading, and custom packet serialization.',
			link: '/projects'
		},
		{
			id: 'range-queries',
			title: 'Range Queries Deep Dive',
			caption: 'Segment & BIT Visualizer',
			category: 'Algorithmic Research',
			categoryColor: '#a855f7',
			badgeBg: 'bg-purple-500/10 dark:bg-purple-500/20',
			badgeText: 'text-purple-600 dark:text-purple-400',
			badgeBorder: 'border-purple-500/30',
			image: '/range-queries-part-three/rqp3.jpg',
			rotation: -2.8,
			story:
				'Authored visual deep-dive guides into advanced competitive programming data structures: Static Range Queries, Fenwick Trees, and Segment Trees.',
			link: '/articles/range-queries-part-one'
		},
		{
			id: 'arch-linux',
			title: 'Arch Linux Rice & Workflow',
			caption: 'Custom Arch Workstation',
			category: 'Dev Environment',
			categoryColor: '#06b6d4',
			badgeBg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
			badgeText: 'text-cyan-600 dark:text-cyan-400',
			badgeBorder: 'border-cyan-500/30',
			image: '/project-images/arch-linux.jpg',
			rotation: 3.5,
			story:
				'Minimalist Arch Linux workstation configuration with customized tiling window management, fast terminal multiplexing, and NeoVim editor workflows.'
		}
	];

	// Duplicate items to ensure smooth continuous infinite looping
	const loopedItems = [...collageItems, ...collageItems];

	let hoveredItemId = $state<string | null>(null);
	let activeItem = $derived(
		hoveredItemId ? collageItems.find((item) => item.id === hoveredItemId) || null : null
	);
</script>

<section
	class="group relative mt-6 select-none overflow-visible py-4"
	style="width: 100vw; margin-left: calc(-1 * var(--sidebar-width, 0px));"
	aria-label="Highlights & Projects Collage Carousel"
>
	<!-- Carousel Track Container -->
	<div class="relative w-full overflow-hidden py-6">
		<!-- Looping Track -->
		<div class="carousel-track flex w-max items-center gap-7">
			{#each loopedItems as item, index (`${item.id}-${index}`)}
				{@const isHovered = hoveredItemId === item.id}
				<div
					class="relative transition-transform duration-300 ease-out cursor-pointer focus:outline-none"
					style="transform: rotate({isHovered ? 0 : item.rotation}deg) scale({isHovered ? 1.05 : 1}); z-index: {isHovered ? 40 : 10};"
					onmouseenter={() => (hoveredItemId = item.id)}
					onmouseleave={() => (hoveredItemId = null)}
					onfocus={() => (hoveredItemId = item.id)}
					onblur={() => (hoveredItemId = null)}
					tabindex="0"
					role="button"
					aria-label={`${item.title} - ${item.category}`}
				>
					<!-- Polaroid / Collage Card Frame using shadcn Card -->
					<Card.Root
						class="relative flex w-64 flex-col rounded-xl border-2 border-border bg-card p-3 shadow-md transition-all duration-300 sm:w-72 hover:shadow-2xl hover:border-foreground/80 gap-0 text-card-foreground"
					>
						<!-- Washi Tape / Pin Decor on Top -->
						<div
							class="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-amber-200/80 border border-amber-300/80 shadow-xs backdrop-blur -rotate-1 rounded-xs pointer-events-none dark:bg-amber-900/40 dark:border-amber-700/50"
							aria-hidden="true"
						></div>

						<!-- Image Container -->
						<div
							class="relative h-40 w-full overflow-hidden rounded-lg border border-border/60 bg-muted sm:h-44"
						>
							<img
								src={item.image}
								alt={item.title}
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
							/>

							<!-- Category Tag Overlay Pill on bottom-right of photo -->
							<div class="absolute right-2 bottom-2">
								<Badge
									variant="outline"
									class={`shadow-xs backdrop-blur-md font-mono text-[10px] px-2 py-0.5 tracking-normal ${item.badgeBg} ${item.badgeText} ${item.badgeBorder}`}
								>
									{item.category}
								</Badge>
							</div>
						</div>

						<!-- Polaroid Bottom Caption Bar -->
						<div class="mt-2.5 flex items-center justify-between px-1">
							<span class="truncate font-mono text-xs font-bold text-foreground">
								{item.caption}
							</span>
							<Badge
								variant="outline"
								class="font-mono text-[10px] text-muted-foreground border-transparent px-1 py-0"
							>
								#{String((index % collageItems.length) + 1).padStart(2, '0')}
							</Badge>
						</div>
					</Card.Root>

					<!-- Hover Context Tooltip Popover using semantic theme variables -->
					{#if isHovered}
						<div
							class="tooltip-popover absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-72 sm:w-80 rounded-xl border-2 border-border bg-popover/95 p-4 text-popover-foreground shadow-2xl backdrop-blur-md z-50 pointer-events-auto animate-in fade-in zoom-in-95 duration-200"
							role="tooltip"
						>
							<!-- Arrow pointer -->
							<div
								class="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-8 border-transparent border-t-popover pointer-events-none"
							></div>

							<div class="flex items-start justify-between gap-2">
								<h3 class="text-sm font-bold text-foreground leading-tight">
									{item.title}
								</h3>
								<Badge
									variant="outline"
									class={`shrink-0 font-mono text-[10px] px-1.5 py-0.5 tracking-normal ${item.badgeBg} ${item.badgeText} ${item.badgeBorder}`}
								>
									{item.category}
								</Badge>
							</div>

							<p class="mt-2 text-xs leading-relaxed text-muted-foreground">
								{item.story}
							</p>

							{#if item.link}
								<div class="mt-3 pt-2 border-t border-border flex justify-end">
									<Button
										variant="ghost"
										size="xs"
										href={resolve(item.link as any)}
										class="gap-1 text-xs text-foreground hover:text-foreground/80 font-medium px-2 h-7"
									>
										<span>View related details</span>
										<ArrowRight class="size-3" />
									</Button>
								</div>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	/* Continuous infinite marquee */
	.carousel-track {
		display: flex;
		width: max-content;
		animation: collageMarquee 38s linear infinite;
		will-change: transform;
	}

	/* Pause entire loop whenever user hovers over the carousel section or any card */
	section:hover .carousel-track,
	.carousel-track:hover {
		animation-play-state: paused !important;
	}

	@keyframes collageMarquee {
		0% {
			transform: translateX(0);
		}
		100% {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.carousel-track {
			animation: none;
			overflow-x: auto;
		}
	}
</style>
