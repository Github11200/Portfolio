<script lang="ts">
import { Github, Linkedin } from "@lucide/svelte";
</script>

<div class="relative h-screen overflow-hidden">
	<div class="pointer-events-none absolute -left-24 top-16 size-64 rounded-full border border-border/70 bg-red-50" />
	<div class="pointer-events-none absolute right-24 top-24 size-28 rotate-12 border border-border/70 bg-background/40 bg-green-50" />
	<div class="pointer-events-none absolute bottom-20 left-1/4 h-40 w-40 -rotate-12 rounded-full border border-border/60 bg-blue-50" />
	<div class="pointer-events-none absolute bottom-24 right-16 h-52 w-52 rotate-45 border border-border/60 bg-yellow-50" />

	<div class="flex h-full w-screen items-center justify-center px-6">
		<section class="w-full max-w-3xl border border-border bg-background/70 p-8 backdrop-blur-sm sm:p-12">
			<div class="space-y-6">
				<h1 class="text-3xl font-semibold tracking-tight sm:text-4xl">Jinay Patel</h1>
				<p class="max-w-2xl text-lg leading-relaxed text-muted-foreground">
					Hello 👋! I'm currently a grade 12 student interested in low-level programming and machine
					learning.
				</p>
				<div class="grid grid-cols-2 border border-border">
					<a
						href="#top"
						class="flex items-center justify-center gap-2 border-r border-border px-5 py-3 transition-colors hover:bg-accent"
					>
						<Github size={20} /> Github
					</a>
					<a href="#top" class="flex items-center justify-center gap-2 px-5 py-3 transition-colors hover:bg-accent">
						<Linkedin size={20} /> LinkedIn
					</a>
				</div>
			</div>
		</section>
	</div>
</div>
