<script lang="ts">
import ProjectBox from "$lib/components/ProjectBox.svelte";

const projects = [
	{
		name: "Verbosity",
		description:
			"A step-by-step view of tokenization, parsing, and code generation.",
		image: "./src/lib/assets/citrus.png",
		href: "https://github.com/Github11200/Termicord",
	},
	{
		name: "Termicord",
		description:
			"A tiny playground for exploring process scheduling and memory behavior.",
		image: "https://picsum.photos/960/540?random=2",
		href: "#",
	},
	{
		name: "Posturai",
		description:
			"An experiment bench for training and comparing lightweight CV models.",
		image: "https://picsum.photos/960/540?random=3",
		href: "#",
	},
	{
		name: "Autonomous Motions Template",
		description:
			"A notes app focused on fast writing and searchable technical snippets.",
		image: "https://picsum.photos/960/540?random=4",
		href: "#",
	},
] as const;
</script>

<div class="relative min-h-screen overflow-hidden">

	<section class="relative mx-auto w-full max-w-6xl px-6 pb-16 pt-28 sm:px-8">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each projects as project, index}
				<ProjectBox {project} {index} />
			{/each}
		</div>
	</section>
</div>
