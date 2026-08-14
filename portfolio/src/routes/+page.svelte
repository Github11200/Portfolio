<script lang="ts">
	import { resolve } from '$app/paths';
	import CustomToast from '$lib/components/CustomToast.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import HighlightedText from '$lib/components/HighlightedText.svelte';

	let CanvasComponent: any = $state();
	let clicked = false;

	onMount(async () => {
		const module = await import('$lib/components/Canvas.svelte');
		CanvasComponent = module.default;

		// toast("Try clicking to view technologies I'm familiar with!");

		window.addEventListener('click', () => {
			if (clicked) return;
			toast.dismiss();
		});
	});
</script>

<!-- {#if CanvasComponent}
	<div class="absolute h-screen w-screen">
		<CanvasComponent />
	</div>
{/if} -->

<div class="flex h-full flex-col p-16">
	<div class="flex flex-col justify-center">
		<h1 class="text-6xl">Jinay Patel</h1>
		<p class="mt-0">
			Computer Engineering @ <HighlightedText text="UWaterloo" color="yellow" />
		</p>
	</div>

	<div class="mt-8 flex flex-col gap-2">
		<p class="mt-0">
			> Won the <HighlightedText text="Vex Robotics World Championship" color="red" /> (out of 15,000+
			teams)
		</p>
		<p class="mt-0">
			> Created my own programming language <HighlightedText text="verbosity" color="blue" />
		</p>
		<p class="mt-0">
			> Built <HighlightedText text="Posturai" color="green" />, a posture correction app (hackathon
			winner)
		</p>
		<p class="mt-0">
			> Developed a custom <HighlightedText text="motion control framework" color="red" /> and secured
			a 100% autonomous win rate
		</p>
		<p class="mt-0">
			> I use <HighlightedText text="Arch Linux" color="blue" />, btw
		</p>
	</div>
</div>
