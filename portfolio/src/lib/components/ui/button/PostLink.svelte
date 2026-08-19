<script lang="ts">
import { ArrowRight } from "@lucide/svelte";
import Button from "./button.svelte";

interface Props {
	href: string;
	text?: string;
	class?: string;
}

const { href, text = "View Post", class: className = "" }: Props = $props();
</script>

<Button variant="outline" href={href} class={`h-auto gap-2 px-4 py-2 ${className}`}>
	{text}
	<ArrowRight size={16} />
</Button>

