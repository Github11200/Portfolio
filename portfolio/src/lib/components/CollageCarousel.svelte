<script lang="ts">
	import { resolve } from '$app/paths';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';

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

	const loopedItems = [...collageItems, ...collageItems];

	let hoveredItemId = $state<string | null>(null);
</script>

<section
	class="group relative overflow-visible py-2 select-none sm:py-3"
	style="width: 100vw; margin-left: calc(-1 * var(--sidebar-width, 0px));"
	aria-label="Highlights & Projects Collage Carousel"
>
	<!-- Carousel Track Container -->
	<div class="relative w-full overflow-hidden py-8 sm:py-10">
		<!-- Looping Track -->
		<div
			class="flex w-max animate-collage-marquee items-center gap-8 will-change-transform group-hover:paused motion-reduce:animate-none motion-reduce:overflow-x-auto sm:gap-10"
		>
			{#each loopedItems as item, index (`${item.id}-${index}`)}
				{@const isHovered = hoveredItemId === item.id}
				<div
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
					aria-label={`${item.title} - ${item.category}`}
				>
					<!-- Polaroid / Collage Card Frame using shadcn Card -->
					<Card.Root
						class="relative flex w-80 transform-gpu flex-col gap-0 rounded-[calc(var(--radius)+0.875rem)] bg-card p-3.5 text-card-foreground transition-all duration-300 backface-hidden hover:border-foreground/80 sm:w-96"
					>
						<!-- Image Container -->
						<div
							class="relative h-52 w-full transform-gpu overflow-hidden rounded-(--radius) bg-muted backface-hidden sm:h-60"
						>
							<img
								src={item.image}
								alt={item.title}
								loading="lazy"
								class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
							/>

							<!-- Category Tag Overlay Pill on bottom-right of photo -->
							<div class="absolute right-2.5 bottom-2.5">
								<Badge
									variant="outline"
									class={`px-2.5 py-0.5 font-mono text-[11px] tracking-normal backdrop-blur-md ${item.badgeBg} ${item.badgeText} ${item.badgeBorder}`}
								>
									{item.category}
								</Badge>
							</div>
						</div>

						<!-- Polaroid Bottom Caption Bar -->
						<div class="mt-3 flex items-center justify-between px-1">
							<span class="truncate font-mono text-xs font-bold text-foreground sm:text-sm">
								{item.caption}
							</span>
							<Badge
								variant="outline"
								class="border-transparent px-1.5 py-0 font-mono text-[11px] text-muted-foreground"
							>
								#{String((index % collageItems.length) + 1).padStart(2, '0')}
							</Badge>
						</div>
					</Card.Root>
				</div>
			{/each}
		</div>
	</div>

	<script
		id="waterlooNetwork"
		src="https://uwaterloo.network/embed.js"
		data-webring
		data-user="your-name"
	></script>
</section>

<style>
	:global(.uwaterloo-webring-wrapper) {
		justify-content: center;
	}
</style>
