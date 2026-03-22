<script lang="ts">
	import { Github, Linkedin, FileUser } from '@lucide/svelte';
	import { resolve } from '$app/paths';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<div class="relative min-h-screen overflow-hidden">
	<div
		class="flex min-h-screen w-screen items-start justify-center px-6 pt-24 pb-8 sm:items-center sm:pt-0 sm:pb-0"
	>
		<section
			class="w-full max-w-3xl overflow-hidden rounded-(--radius) bg-card/90 p-8 backdrop-blur-sm sm:p-12"
		>
			<div class="space-y-6">
				<h1 class="text-2xl font-semibold tracking-tight sm:text-4xl">Jinay Patel</h1>
				<p class="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
					I'm currently a Grade 12 student interested in low-level programming and machine learning.
					<br />
					<br />
					Previously, I've created <a href="https://github.com/Github11200/Verbosity"
						>my own programming language</a
					>, a <a href="https://github.com/Github11200/Termicord">messaging app</a> using raw TCP
					sockets, and <a href="https://github.com/Github11200/Push-Back"
						>an autonomous motions template</a
					> that contains algorithms to let robots move to points or follow paths. <br />
					<br />
					Feel free to check out some <a href={resolve('/blog')}>articles</a> I've written in the past or
					check out some other <a href={resolve('/blog')}>projects</a> I've created as well.
					<br />
					<br />
					If you'd like to reach out then just send me a message on LinkedIn!
				</p>
				<div class="grid grid-cols-2 gap-2 sm:grid-cols-3">
					<a href="https://github.com/Github11200" target="_blank">
						<Button variant="card" class="h-full w-full">
							<Github size={20} color="#080808" /> Github
						</Button>
					</a>
					<a href="https://www.linkedin.com/in/jinay-patel-6369002b4/" target="_blank">
						<Button variant="card" class="h-full w-full">
							<Linkedin size={20} color="#0072B1" /> LinkedIn
						</Button>
					</a>
					<a
						class="col-span-2 sm:col-span-1"
						href="https://drive.google.com/file/d/1UslT3CCwyRGmOWgkhb5iPeZ3uHFiPCuA/view?usp=drive_link/"
						target="_blank"
					>
						<Button variant="card" class="h-full w-full">
							<FileUser size={20} color="#b51208" /> Resume
						</Button>
					</a>
				</div>
			</div>
		</section>
	</div>
</div>
