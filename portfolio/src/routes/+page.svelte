<script lang="ts">
import { Github, Linkedin } from "@lucide/svelte";
import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="relative h-screen overflow-hidden">
	<!-- <div class="pointer-events-none absolute -left-24 top-16 size-64 rounded-full bg-red-100"></div>
	<div class="pointer-events-none absolute right-24 top-24 size-28 rotate-12 bg-green-100"></div>
	<div class="pointer-events-none absolute bottom-20 left-1/4 h-40 w-40 -rotate-12 rounded-full bg-blue-100"></div>
	<div class="pointer-events-none absolute bottom-24 right-16 h-52 w-52 rotate-45 bg-yellow-100"></div> -->

	<div class="flex h-full w-screen items-center justify-center px-6">
		<section class="w-full max-w-3xl overflow-hidden rounded-(--radius)  bg-card/90 p-8 backdrop-blur-sm sm:p-12">
			<div class="space-y-6">
				<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Jinay Patel</h1>
				<p class="max-w-2xl text-lg leading-relaxed text-muted-foreground">
					Hello 👋! I'm currently a Grade 12 student interested in low-level programming and machine
					learning.
				</p>
				<div class="grid grid-cols-2 gap-2 ">
				<a
					href="https://github.com/Github11200"
					target="_blank"
				>
					<Button variant="card" class="h-full w-full">
						<Github size={20} /> Github
					</Button>
				</a>
				<a href="https://www.linkedin.com/in/jinay-patel-6369002b4/" target="_blank">
					<Button variant="card" class="h-full w-full">
							<Linkedin size={20} /> LinkedIn
					</Button>
				</a>
				</div>
			</div>
		</section>
	</div>
</div>
