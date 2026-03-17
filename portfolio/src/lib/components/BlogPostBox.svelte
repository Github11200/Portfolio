<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import PostLink from "$lib/components/ui/button/PostLink.svelte";

	interface Props {
		post: {
			title: string;
			description: string;
			image: string;
			href: string;
		};
	}

	const { post }: Props = $props();
</script>

<Card.Root class="overflow-hidden border-border bg-card/90 py-0 shadow-none">
	<div  class="group block transition-colors">
		<div class="flex flex-col md:flex-row">
			<div class="h-52 w-full shrink-0 border-b border-border bg-muted md:h-auto md:w-72 md:border-b-0 md:border-r">
				<img src={post.image} alt={post.title} loading="lazy" class="h-full w-full object-cover" />
			</div>
			<div class="flex min-w-0 flex-1 items-start justify-between gap-6 px-6 py-6 md:px-8 md:py-8">
				<div class="min-w-0 flex-1">
					<Card.Title class="text-2xl tracking-tight">{post.title}</Card.Title>
					<Card.Description class="mt-3 max-w-2xl text-sm leading-relaxed">
						{post.description}
					</Card.Description>
				</div>
				<PostLink href={post.href} />
			</div>
		</div>
	</div>
</Card.Root>
