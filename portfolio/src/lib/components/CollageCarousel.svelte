<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';

	interface CollageItem {
		id: string;
		caption: string;
		image: string;
		link: string;
	}

	const collageItems: CollageItem[] = [
		{
			id: 'vex',
			caption: 'Excellence Award @ World Championship',
			image: '/worlds-image.png',
			link: 'https://www.deltasd.bc.ca/news-events/news/seaquam-robotics-wins-prestigious-international-award/'
		},
		{
			id: 'verbosity',
			caption: 'Custom Compiler',
			image: '/project-images/verbosity.png',
			link: '/writing/creating-verbosity'
		},
		{
			id: 'posturai',
			caption: 'Posture Correction Software',
			image: '/project-images/posturai.png',
			link: 'https://posturai.vercel.app/'
		},
		{
			id: 'citrus',
			caption: 'Tetris in C in the Terminal',
			image: '/project-images/citrus.png',
			link: '/writing/creating-citrus'
		},
		{
			id: 'robotics',
			caption: 'Custom Motion Control Framework',
			image: '/project-images/robot.png',
			link: 'https://github.com/Github11200/Motion-Control-Framework'
		},
		{
			id: 'termicord',
			caption: 'Raw TCP Sockets Chat App in C++',
			image: '/project-images/termicord.png',
			link: 'https://github.com/Github11200/Termicord'
		},
		{
			id: 'range-queries',
			caption: 'Range Queries Visualized Article',
			image: '/range-queries-part-three/rqp3.jpg',
			link: '/writing/range-queries-part-one'
		},
		{
			id: 'arch-linux',
			caption: 'Omarchy Setup',
			image: '/arch-setup.png',
			link: 'https://github.com/Github11200/Custom-Omarchy-Config'
		}
	];

	const loopedItems = [...collageItems, ...collageItems];
</script>

<section class="group relative z-30 w-full overflow-hidden select-none">
	<div class="relative w-full overflow-hidden">
		<div
			class="flex w-max animate-collage-marquee items-stretch gap-0 will-change-transform group-hover:paused motion-reduce:animate-none motion-reduce:overflow-x-auto"
		>
			{#each loopedItems as item, index (`${item.id}-${index}`)}
				<a
					class="group/item relative block flex-shrink-0 focus:outline-none"
					tabindex="0"
					href={item.link}
				>
					<div class="collage-card flex h-full flex-col border-b border-border bg-background">
						<div class="aspect-[4/3] w-full overflow-hidden bg-muted">
							<img
								src={item.image}
								alt={item.caption}
								loading="lazy"
								class="h-full w-full object-cover"
							/>
						</div>
						<div class="flex h-(--caption-h) items-center border-t border-border border-r border-r-border px-2.5 sm:px-3 transition-colors duration-200 group-hover/item:bg-muted/70 group-focus-visible/item:bg-muted/70">
							<span class="min-w-0 truncate text-[11px] sm:text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors duration-200">
								{item.caption}
							</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<style>
	.collage-card {
		--caption-h: 1.75rem;
		/* Preferred image height (4:3 cards), capped so the card fits the height
		   left over in the parent size container (see .carousel-slot on the home page). */
		--img-h: min(52.5vw, calc(100cqh - var(--caption-h) - 1px));
		width: calc(var(--img-h) * 4 / 3);
	}
	@media (min-width: 640px) {
		.collage-card {
			--caption-h: 2.25rem;
			--img-h: min(37.5vh, calc(100cqh - var(--caption-h) - 1px));
		}
	}
	@media (min-width: 768px) {
		.collage-card {
			--img-h: min(39vh, calc(100cqh - var(--caption-h) - 1px));
		}
	}
	@media (min-width: 1024px) {
		.collage-card {
			--img-h: min(40.5vh, calc(100cqh - var(--caption-h) - 1px));
		}
	}
	@media (min-width: 1280px) {
		.collage-card {
			--img-h: min(41.25vh, calc(100cqh - var(--caption-h) - 1px));
		}
	}
</style>
