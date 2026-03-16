<script lang="ts">
	import ProjectBox from "$lib/components/ProjectBox.svelte";

	const projects = [
		{
			name: "Compiler Visualizer",
			description: "A step-by-step view of tokenization, parsing, and code generation.",
			image: "https://picsum.photos/960/540?random=1",
			href: "#"
		},
		{
			name: "Kernel Sandbox",
			description: "A tiny playground for exploring process scheduling and memory behavior.",
			image: "https://picsum.photos/960/540?random=2",
			href: "#"
		},
		{
			name: "Vision Lab",
			description: "An experiment bench for training and comparing lightweight CV models.",
			image: "https://picsum.photos/960/540?random=3",
			href: "#"
		},
		{
			name: "Byte Journal",
			description: "A notes app focused on fast writing and searchable technical snippets.",
			image: "https://picsum.photos/960/540?random=4",
			href: "#"
		}
	] as const;
</script>

<div class="relative min-h-screen overflow-hidden">
	<div class="pointer-events-none absolute -left-24 top-20 size-64 rounded-full border border-border/70 bg-red-50"></div>
	<div class="pointer-events-none absolute right-20 top-28 h-28 w-28 rotate-12 border border-border/70 bg-green-50"></div>
	<div class="pointer-events-none absolute bottom-20 left-1/4 h-40 w-40 -rotate-12 rounded-full border border-border/60 bg-blue-50"></div>
	<div class="pointer-events-none absolute bottom-20 right-16 h-52 w-52 rotate-45 border border-border/60 bg-yellow-50"></div>

	<section class="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-28 sm:px-8">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each projects as project, index}
				<ProjectBox {project} {index} />
			{/each}
		</div>
	</section>
</div>
