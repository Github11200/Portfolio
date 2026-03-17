<script lang="ts">
import { Github, Linkedin } from "@lucide/svelte";
import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="relative h-screen overflow-hidden">
	<div class="pointer-events-none absolute right-24 top-24 size-28 rotate-12 bg-green-100"></div>
	<div class="pointer-events-none absolute bottom-24 right-16 h-52 w-52">	<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" fill="red"><path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" fill="rgb(84, 84, 84)"></path></svg>

	</div>
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
