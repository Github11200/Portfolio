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

<Card.Root
	class="overflow-hidden p-0 border border-border bg-card/90 shadow-none flex flex-col w-full gap-0"
>
	<div class="w-full aspect-video overflow-hidden bg-muted">
		<img
			src={project.image}
			alt={project.name}
			class="h-full w-full object-cover"
			loading={index < 2 ? "eager" : "lazy"}
		/>
	</div>
	<Card.Content class="flex flex-col justify-between grow px-6 py-5">
		<div>
			<Card.Title class="text-xl tracking-tight">{project.name}</Card.Title>
			<Card.Description class="mt-2 leading-relaxed text-muted-foreground">{project.description}</Card.Description>
		</div>
		<div class="mt-4 flex justify-end">
			<Button variant="card" class="h-auto p-0">
				<a href={project.href} class="inline-flex items-center gap-2 px-4 py-2">
					View Project
					<ArrowUpRight size={16} />
				</a>
			</Button>
		</div>
	</Card.Content>
</Card.Root>
