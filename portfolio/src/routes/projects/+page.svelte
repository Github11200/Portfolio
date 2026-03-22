<script lang="ts">
	import ProjectBox from '$lib/components/ProjectBox.svelte';

	const projects = [
		{
			name: 'Verbosity',
			description:
				'My own compiler written in C++ for a programming language that contains no symbols, special characters, or punctuation marks.',
			image: '/project-images/verbosity.png',
			href: 'https://github.com/Github11200/Verbosity'
		},
		{
			name: 'Termicord',
			description:
				'A message app written in C++ with raw TCP sockets that includes a client, server, and database.',
			image: '/project-images/termicord.png',
			href: 'https://github.com/Github11200/Termicord'
		},
		{
			name: 'Posturai',
			description:
				'A machine learning model written in PyTorch that alerts the user if their posture is not great.',
			image: '/project-images/posturai.png',
			href: 'https://github.com/Github11200/Posturai'
		},
		{
			name: 'Autonomous Motions Template',
			description:
				'A template written in C++ that allows a robot to do autonomous motions like driving to points or following paths.',
			image: '/project-images/robot.png',
			href: 'https://github.com/Github11200/Push-Back'
		},
		{
			name: 'Citrus',
			description:
				'A game of Tetris that runs in the terminal and is written in C using just the standard library.',
			image: '/project-images/citrus.png',
			href: 'https://github.com/Github11200/Citrus'
		}
	] as const;
</script>

<div class="relative min-h-screen overflow-hidden">
	<section class="relative mx-auto w-full max-w-6xl px-6 pt-28 pb-16 sm:px-8">
		<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
			{#each projects as project, index (index)}
				<ProjectBox {project} {index} />
			{/each}
		</div>
	</section>
</div>
