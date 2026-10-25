<script lang="ts">
	import { toggleMode, mode } from 'mode-watcher';
	import { Sun, Moon } from '@lucide/svelte';
</script>

<button
	onclick={toggleMode}
	aria-label="Toggle theme"
	class="flex cursor-pointer items-center text-muted-foreground transition-colors hover:text-foreground"
>
	{#if mode.current === 'dark'}
		<Sun class="size-[18px]" />
	{:else}
		<Moon class="size-[18px]" />
	{/if}
</button>
