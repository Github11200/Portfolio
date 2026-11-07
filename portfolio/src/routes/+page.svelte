<script lang="ts">
	import CollageCarousel from '$lib/components/CollageCarousel.svelte';
	import HighlightedText from '$lib/components/HighlightedText.svelte';
</script>

<div class="flex min-h-0 w-full flex-1 flex-col overflow-visible">
	<div class="flex flex-col px-4 pt-3 sm:px-10 sm:pt-12 sm:short:pt-5 lg:px-14">
		<div class="hero-intro flex flex-col justify-center">
			<h1 class="text-xl sm:text-4xl md:text-5xl md:short:text-4xl font-bold tracking-tight text-foreground mb-0.5 sm:mb-2">
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

		<div class="mt-3 flex flex-col gap-3 text-foreground max-sm:short:mt-2.5 max-sm:short:gap-1.5 max-sm:short:*:leading-6 sm:mt-6 sm:gap-2.5 sm:short:mt-3 sm:short:gap-1">
			<p class="hero-bullet mt-0" style:--entrance-index={0}>
				<span class="mr-1 font-mono text-muted-foreground select-none">&gt;</span>Won the <HighlightedText
					text="Vex Robotics World Championship"
					color="red"
					imgSrc="/worlds-image.png"
				/> (out of 15,000+ teams)
			</p>
			<p class="hero-bullet mt-0" style:--entrance-index={1}>
				<span class="mr-1 font-mono text-muted-foreground select-none">&gt;</span>Created
				my own programming language <HighlightedText
					imgSrc="/project-images/verbosity.png"
					text="verbosity"
					color="blue"
				/>
			</p>
			<p class="hero-bullet mt-0" style:--entrance-index={2}>
				<span class="mr-1 font-mono text-muted-foreground select-none">&gt;</span>Built <HighlightedText
					text="Posturai"
					color="green"
					imgSrc="/project-images/posturai.png"
				/>, a posture correction app (hackathon winner)
			</p>
			<p class="hero-bullet mt-0" style:--entrance-index={3}>
				<span class="mr-1 font-mono text-muted-foreground select-none">&gt;</span>Developed a
				custom <HighlightedText
					imgSrc="/project-images/motion-control-framework.png"
					text="motion control framework"
					color="red"
				/> and secured a 100% autonomous win rate
			</p>
			<p class="hero-bullet mt-0" style:--entrance-index={4}>
				<span class="mr-1 font-mono text-muted-foreground select-none">&gt;</span>I use <HighlightedText
					text="Arch Linux"
					imgSrc="/arch-setup.png"
					color="blue"
				/>, btw
			</p>
		</div>
	</div>

	<!-- The carousel only gets whatever height is left after the hero text, so the
	     home page always fits in one screen; the cards scale down to fit that space. -->
	<div class="relative mt-4 min-h-36 w-full flex-1 sm:mt-6 short:mt-3">
		<div class="carousel-slot absolute inset-0 flex flex-col">
			<div class="grow-[3]"></div>
			<div class="hero-carousel w-full overflow-visible">
				<CollageCarousel />
			</div>
			<div class="grow-[2]"></div>
		</div>
	</div>
</div>

<style>
	.carousel-slot {
		/* Size container: its height comes from the space left in the page, never from the cards. */
		container-type: size;
	}
</style>
