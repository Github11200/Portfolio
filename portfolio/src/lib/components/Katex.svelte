<script>
	import katex from 'katex';
	import 'katex/dist/katex.min.css';

	// These are the exact same props the old svelte-katex package used
	let { math = '', displayMode = false } = $props();

	// $derived ensures it updates if the math prop changes dynamically
	let html = $derived(
		katex.renderToString(math, {
			throwOnError: false,
			displayMode
		})
	);
</script>

{@html html}
