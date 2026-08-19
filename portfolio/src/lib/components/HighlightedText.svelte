<script lang="ts">
	type HighlightColor = 'red' | 'blue' | 'green' | 'yellow';

	let { color = 'red', text }: { color?: HighlightColor; text: string } = $props();

	// Tailwind can read these full strings during build-time
	const bgColors: Record<HighlightColor, string> = {
		red: 'bg-red-200',
		blue: 'bg-blue-200',
		green: 'bg-green-200',
		yellow: 'bg-yellow-100'
	};

	let className = $derived(`text-primary-background p-1 ${bgColors[color] || 'bg-red-200'}`);
</script>

<mark class={className}>{text}</mark>
