<script lang="ts">
	import { resolve } from '$app/paths';
	import CustomToast from '$lib/components/CustomToast.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import LinkedinOutlineIcon from '@iconify-svelte/basil/linkedin-outline';
	import GithubLineIcon from '@iconify-svelte/mingcute/github-line';
	import { FileUser } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	let CanvasComponent: any = $state();
	let clicked = false;

	onMount(async () => {
		const module = await import('$lib/components/Canvas.svelte');
		CanvasComponent = module.default;

		toast("Try clicking to view technologies I'm familiar with!");

		window.addEventListener('click', () => {
			if (clicked) return;
			toast.dismiss();
		});
	});
</script>

{#if CanvasComponent}
	<div class="absolute h-screen w-screen">
		<CanvasComponent />
	</div>
{/if}
<div class="pointer-events-none relative z-10 min-h-screen overflow-hidden">
	<div
		class="flex min-h-screen w-screen items-start justify-center px-6 pt-24 pb-8 sm:items-center sm:pt-0 sm:pb-0"
	>
		<section
			class="pointer-events-auto w-full max-w-3xl overflow-hidden rounded-(--radius) backdrop-blur-sm sm:p-12"
		>
			<div class="space-y-6">
				<h1 class="text-2xl font-semibold tracking-tight sm:text-4xl">Jinay Patel</h1>
				<p class="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
					I'm an incoming Computer Engineering major at the University of Waterloo this fall; My
					main interests include low-level programming and machine learning;
					<br />
					<br />
					Previously, I've created
					<a href="https://github.com/Github11200/Verbosity" class="font-bold underline"
						>my own programming language</a
					>, a
					<a href="https://github.com/Github11200/Termicord" class="font-bold underline"
						>messaging app</a
					>
					using raw TCP sockets, and
					<a href="https://github.com/Github11200/Push-Back" class="font-bold underline"
						>an autonomous motions template</a
					>
					that contains algorithms to let robots move to points or follow paths. <br />
					<br />
					Feel free to check out some
					<a href={resolve('/articles')} class="font-bold underline">articles</a>
					I've written in the past or my other
					<a href={resolve('/articles')} class="font-bold underline">projects</a>.
					<br />
					<br />
					If you'd like to reach out then feel free to send me a message on LinkedIn!
				</p>
				<div class="pointer-events-auto grid grid-cols-2 gap-2 sm:grid-cols-3">
					<a href="https://github.com/Github11200" target="_blank">
						<Button
							variant="card"
							class="h-full w-full border border-[#080808] hover:bg-[#080808]/3"
						>
							<GithubLineIcon height="1em" color="#080808" /> Github
						</Button>
					</a>
					<a href="https://www.linkedin.com/in/jinay-patel-6369002b4/" target="_blank">
						<Button
							variant="card"
							class="h-full w-full border border-[#0072b1] hover:bg-[#0072b1]/3"
						>
							<LinkedinOutlineIcon height="1em" color="#0072B1" /> LinkedIn
						</Button>
					</a>
					<a
						class="col-span-2 sm:col-span-1"
						href="https://drive.google.com/file/d/1umUoKVOtOqldoiI5ccnjN55PszYAxzwC/view?usp=drive_link"
						target="_blank"
					>
						<Button
							variant="card"
							class="h-full w-full border border-[#b51208] hover:bg-[#b51208]/3"
						>
							<FileUser size={20} color="#b51208" /> Resume
						</Button>
					</a>
				</div>
			</div>
		</section>
		<footer class="pointer-events-auto absolute bottom-3 left-3 text-sm">
			Custom <a
				href="https://github.com/Github11200/Portfolio/blob/master/portfolio/src/lib/physics.ts"
				class="underline"
				target="_blank">Physics Engine</a
			> used for the simulation
		</footer>
	</div>
</div>
