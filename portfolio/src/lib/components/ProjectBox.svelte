<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

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
	class="flex w-full flex-col gap-0 overflow-hidden border border-border bg-card/90 p-0 shadow-none"
>
	<div class="aspect-video w-full overflow-hidden bg-muted">
		<enhanced:img
			src={project.image}
			alt={project.name}
			class="h-full w-full object-cover"
			loading={index < 2 ? 'eager' : 'lazy'}
		/>
	</div>
	<Card.Content class="flex grow flex-col justify-between px-6 py-5">
		<div>
			<Card.Title class="text-xl tracking-tight">{project.name}</Card.Title>
			<Card.Description class="mt-2 leading-relaxed text-muted-foreground"
				>{project.description}</Card.Description
			>
		</div>
		<div class="mt-4 flex justify-end">
			<Button variant="card" class="h-auto p-0">
				<a
					href={project.href}
					class="inline-flex items-center gap-2 px-4 py-2"
					target="_blank"
					rel="external"
				>
					View Project
					<ArrowUpRight size={16} />
				</a>
			</Button>
		</div>
	</Card.Content>
</Card.Root>
