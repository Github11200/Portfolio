<script lang="ts">
import { Github, Linkedin } from "@lucide/svelte";

import * as Avatar from "$lib/components/ui/avatar/index.js";
</script>

<!--
- barebones homepage
- blog
- projects
-->
<div class="h-screen">
	<div class="flex h-full w-screen items-center justify-center">
		<div class="flex w-[60%] flex-row">
			<div class="mr-10">
			<Avatar.Root class="size-56">
        <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn"  />
        <Avatar.Fallback>CN</Avatar.Fallback>
      </Avatar.Root>
				<div class="mt-4">
				<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">Jinay Patel</h3>
				<a href="#top" class="flex flex-row items-center gap-2"><Github size={20} /> Github</a>
				<a href="#top" class="flex flex-row items-center gap-2"><Linkedin size={20} /> LinkedIn</a>
				</div>
			</div>

			<div class="ml-16">
				<p>
				   Hello 👋! I'm currently a grade 12 student interested in low-level programming and machine learning!
				</p>
			</div>
		</div>
	</div>
</div>
