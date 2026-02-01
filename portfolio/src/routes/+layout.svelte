<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { resolve } from '$app/paths';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<nav class="navbar mx-auto justify-center gap-20 shadow-sm">
	<a href={resolve('/')}>Home</a>
	<a href={resolve('/projects/')}>Projects</a>
	<a href={resolve('/blog/')}>Blog</a>
</nav>
{@render children()}
