<script lang="ts">
	import Tooltip from './ui/tooltip/tooltip.svelte';
	import TooltipContent from './ui/tooltip/tooltip-content.svelte';
	import TooltipTrigger from './ui/tooltip/tooltip-trigger.svelte';

	type HighlightColor = 'red' | 'blue' | 'green' | 'yellow';

	let {
		color = 'red',
		text,
		imgSrc
	}: { color?: HighlightColor; text: string; imgSrc: string } = $props();

	// Tailwind can read these full strings during build-time
	const bgColors: Record<HighlightColor, string> = {
		red: 'bg-red-200',
		blue: 'bg-blue-200',
		green: 'bg-green-200',
		yellow: 'bg-yellow-100'
	};

	let className = $derived(
		`text-primary-background text-wrap whitespace-normal hover:cursor-text p-1 px-2 ${bgColors[color] || 'bg-red-200'}`
	);
</script>

<Tooltip>
	<TooltipTrigger class="whitespace-normal inline-block">
		<mark class={className}>{text}</mark>
	</TooltipTrigger>
	<TooltipContent class="p-1">
		<img src={imgSrc} alt="" class="rounded-[calc(var(--radius)-0.25rem)]" />
	</TooltipContent>
</Tooltip>
