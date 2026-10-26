<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, stagger } from 'animejs';
	import CollageCarousel from '$lib/components/CollageCarousel.svelte';
	import HighlightedText from '$lib/components/HighlightedText.svelte';

	onMount(() => {
		animate('.hero-intro', {
			opacity: [0, 1],
			translateY: [8, 0],
			duration: 550,
			ease: 'outCubic'
		});

		animate('.hero-bullet', {
			opacity: [0, 1],
			translateX: [-8, 0],
			delay: stagger(60, { start: 120 }),
			duration: 500,
			ease: 'outCubic'
		});

		animate('.hero-carousel', {
			opacity: [0, 1],
			translateY: [12, 0],
			delay: 300,
			duration: 650,
			ease: 'outCubic'
		});
	});
</script>

<div class="flex flex-1 w-full flex-col overflow-visible">
	<div class="flex flex-col px-4 pt-3 sm:px-10 sm:pt-12 lg:px-14">
		<div class="hero-intro flex flex-col justify-center">
			<h1 class="text-xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-0.5 sm:mb-2">
				Jinay Patel
			</h1>
			<p class="mt-0 text-[9px] sm:text-sm md:text-base text-muted-foreground whitespace-nowrap">
				Computer Engineering @ <HighlightedText
					imgSrc="/waterloo.png"
					text="UWaterloo"
					color="yellow"
				/>
			</p>
		</div>

		<div class="mt-2.5 sm:mt-6 flex flex-col gap-0.5 sm:gap-2.5 text-[9px] sm:text-base text-foreground leading-snug sm:leading-normal">
			<p class="hero-bullet mt-0">
				<span class="mr-1 font-mono text-muted-foreground select-none">&gt;</span>Won the <HighlightedText
					text="Vex Robotics World Championship"
					color="red"
					imgSrc="/worlds-image.png"
				/> (out of 15,000+ teams)
			</p>
			<p class="hero-bullet mt-0">
				<span class="mr-1 font-mono text-muted-foreground select-none">&gt;</span>Created
				my own programming language <HighlightedText
					imgSrc="/project-images/verbosity.png"
					text="verbosity"
					color="blue"
				/>
			</p>
			<p class="hero-bullet mt-0">
				<span class="mr-1 font-mono text-muted-foreground select-none">&gt;</span>Built <HighlightedText
					text="Posturai"
					color="green"
					imgSrc="/project-images/posturai.png"
				/>, a posture correction app (hackathon winner)
			</p>
			<p class="hero-bullet mt-0">
				<span class="mr-1 font-mono text-muted-foreground select-none">&gt;</span>Developed a
				custom <HighlightedText
					imgSrc="/project-images/motion-control-framework.png"
					text="motion control framework"
					color="red"
				/> and secured a 100% autonomous win rate
			</p>
			<p class="hero-bullet mt-0">
				<span class="mr-1 font-mono text-muted-foreground select-none">&gt;</span>I use <HighlightedText
					text="Arch Linux"
					imgSrc="/arch-setup.png"
					color="blue"
				/>, btw
			</p>
		</div>
	</div>

	<div class="grow-[3] min-h-4 sm:min-h-6"></div>

	<div class="hero-carousel w-full overflow-visible">
		<CollageCarousel />
	</div>

	<div class="grow-[2]"></div>
</div>
