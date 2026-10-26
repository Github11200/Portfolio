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
					<div class="flex h-full flex-col border-b border-border bg-background w-[70vw] sm:w-[50vh] md:w-[52vh] lg:w-[54vh] xl:w-[55vh]">
						<div class="aspect-[4/3] w-full overflow-hidden bg-muted">
							<img
								src={item.image}
								alt={item.caption}
								loading="lazy"
								class="h-full w-full object-cover"
							/>
						</div>
						<div class="border-t border-border border-r border-r-border px-2.5 py-1.5 sm:px-3 sm:py-2 transition-colors duration-200 group-hover/item:bg-muted/70 group-focus-visible/item:bg-muted/70">
							<span class="truncate text-[11px] sm:text-xs font-medium text-muted-foreground group-hover/item:text-foreground transition-colors duration-200">
								{item.caption}
							</span>
						</div>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>
