<script lang="ts">
	import { ArrowUpRight } from "@lucide/svelte";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";

	interface Props {
	project: {
		name: string;
		description: string;
		image: string;
		href: string;
	};
	index?: number;
}

const { project, index = 0 }: Props = $props();
</script>

<article
	class="overflow-hidden p-0 rounded-none border border-border bg-background/90 shadow-none flex flex-col w-full"
>
	<div class="w-full aspect-video overflow-hidden bg-muted">
		<img
			src={project.image}
			alt={project.name}
			class="h-full w-full object-cover"
			loading={index < 2 ? "eager" : "lazy"}
		/>
	</div>
	<div class="flex flex-col justify-between flex-grow px-6 py-5">
		<div>
			<h2 class="text-xl tracking-tight">{project.name}</h2>
			<p class="mt-2 leading-relaxed text-muted-foreground">{project.description}</p>
		</div>
		<div class="mt-4 flex justify-end">
			<Button variant="card" href={project.href} class="gap-2">
				View Project
				<ArrowUpRight size={16} />
			</Button>
		</div>
	</div>
</article>
