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

<Button variant="card" class={`h-auto p-0 ${className}`}>
	<a href={href} class="inline-flex items-center gap-2 px-4 py-2">
		{text}
		<ArrowRight size={16} />
	</a>
</Button>
