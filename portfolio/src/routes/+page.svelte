<script lang="ts">
	import HighlightedText from '$lib/components/HighlightedText.svelte';
	import CollageCarousel from '$lib/components/CollageCarousel.svelte';
</script>

<div class="flex min-h-screen w-full flex-col justify-between overflow-visible sm:pt-12 lg:pt-14">
	<div class="px-6 sm:px-10 lg:px-14">
		<div class="flex flex-col justify-center">
			<h1 class="text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl">
				Jinay Patel
			</h1>
			<p class="mt-2 text-lg text-muted-foreground">
				Computer Engineering @ <HighlightedText text="UWaterloo" color="yellow" />
			</p>
		</div>

		<div class="mt-8 flex flex-col gap-2.5 text-base text-foreground sm:text-lg">
			<p class="mt-0">
				<span class="mr-1.5 font-mono text-muted-foreground select-none">&gt;</span>Won the <HighlightedText
					text="Vex Robotics World Championship"
					color="red"
				/> (out of 15,000+ teams)
			</p>
			<p class="mt-0">
				<span class="mr-1.5 font-mono text-muted-foreground select-none">&gt;</span>Created my own
				programming language <HighlightedText text="verbosity" color="blue" />
			</p>
			<p class="mt-0">
				<span class="mr-1.5 font-mono text-muted-foreground select-none">&gt;</span>Built <HighlightedText
					text="Posturai"
					color="green"
				/>, a posture correction app (hackathon winner)
			</p>
			<p class="mt-0">
				<span class="mr-1.5 font-mono text-muted-foreground select-none">&gt;</span>Developed a
				custom <HighlightedText text="motion control framework" color="red" /> and secured a 100% autonomous
				win rate
			</p>
			<p class="mt-0">
				<span class="mr-1.5 font-mono text-muted-foreground select-none">&gt;</span>I use <HighlightedText
					text="Arch Linux"
					color="blue"
				/>, btw
			</p>
		</div>
	</div>

	<CollageCarousel />
</div>
