<script lang="ts">
	import { onMount } from 'svelte';
	import { animate, stagger } from 'animejs';
	import ProjectBox from '$lib/components/ProjectBox.svelte';

	onMount(() => {
		animate('.project-card-wrapper', {
			opacity: [0, 1],
			translateY: [16, 0],
			scale: [0.98, 1],
			delay: stagger(70, { start: 50 }),
			duration: 550,
			ease: 'outCubic'
		});
	});

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
			name: 'Custom Motion Control Framework',
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
			imageClass: 'object-bottom',
			href: 'https://github.com/Github11200/Citrus'
		},
		{
			name: 'Lynx',
			description:
				'A plugin for Obsidian to automatically organize your notes using local LLMs. 250+ users on the Obsidian plugin marketplace.',
			image: '/project-images/Lynx.jpg',
			href: 'https://github.com/Github11200/Lynx'
		}
	] as const;
</script>

<div class="relative flex w-full flex-1 flex-col">
	<section class="relative w-full px-4 pt-6 pb-12 sm:px-8 sm:pt-12 sm:pb-16 lg:px-14">
		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{#each projects as project, index (index)}
				<div class="project-card-wrapper flex">
					<ProjectBox {project} {index} />
				</div>
			{/each}
		</div>
	</section>
</div>
