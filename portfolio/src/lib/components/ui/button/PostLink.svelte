<script lang="ts">
	import { ArrowUpRight } from "@lucide/svelte";
	import Button from "./button.svelte";

	interface Props {
		href: string;
		text?: string;
		class?: string;
	}

	const { href, text = "View Post", class: className = "" }: Props = $props();
</script>

<Button variant="card" {href} class={`gap-2 ${className}`}>
	{text}
	<ArrowUpRight size={16} />
</Button>
