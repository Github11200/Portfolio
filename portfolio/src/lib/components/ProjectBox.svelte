<script lang="ts">
// Simple, shadcn-style project card.
// Uses shadcn color tokens (bg-card/text-card-foreground/border-border/etc.)
// Layout is flex-column so the media area is bounded and never “bleeds” to the bottom edge.

export let title: string = "Project Name";
export let description: string =
	"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum, cupiditate excepturi hic blanditiis voluptatem dignissimos nemo culpa quo perspiciatis qui.";

// NOTE: Use a direct image URL (jpg/png/webp) or a local asset in /static.
// Google Images "imgres" URLs often cause unexpected rendering/sizing.
export let imageSrc: string =
	"https://wallpapers.com/images/featured/blank-white-7sn5o1woonmklx1h.jpg";
export let imageAlt: string = "Project preview";

export let href: string | undefined = undefined;
</script>

<article
	class="group relative flex h-full w-full flex-col overflow-hidden rounded-xl border border-border bg-card text-card-foreground transition hover:-translate-y-0.5"
>
	{#if href}
		<a
			href={href}
			class="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
			aria-label={title}
		/>
	{/if}

	<!-- Media (bounded) -->
	<div class="px-5 pb-4 pt-4">
		<header class="flex items-start justify-between gap-3">
			<h2 class="text-pretty text-base font-semibold leading-snug tracking-tight">{title}</h2>
			<span
				class="pointer-events-none mt-0.5 inline-flex size-8 items-center justify-center rounded-md border border-border bg-background/60 text-muted-foreground opacity-0 transition group-hover:opacity-100"
				aria-hidden="true"
			>
				↗
			</span>
		</header>

		<p class="mt-1 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
	</div>

	<!-- Image fills the remaining space -->
	<div class="min-h-0 flex-1 px-4 pb-4">
		<div class="relative h-full w-full  rounded-lg border border-border bg-muted">
			<img
				src={imageSrc}
				alt={imageAlt}
				loading="lazy"
				class="block h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
			/>
		</div>
	</div>
</article>
