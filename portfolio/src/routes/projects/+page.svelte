<script lang="ts">
	import ProjectBox from '$lib/components/ProjectBox.svelte';
</script>

<div class="flex h-screen justify-center overflow-y-scroll">
	<div class="prose mt-16">
		<h1>Projects</h1>
		<div class="flex flex-col gap-4">
			<ProjectBox />
			<ProjectBox />
			<ProjectBox />
			<ProjectBox />
		</div>
	</div>
</div>
