<script lang="ts">
	import { Github, Linkedin } from '@lucide/svelte';
</script>

<!--
- barebones homepage
- blog
- projects
-->
<div class="h-screen">
	<nav class="navbar mx-auto justify-center gap-20 shadow-sm">
		<a href="#top">Home</a>
		<a href="#top">Projects</a>
		<a href="#top">Blog</a>
	</nav>

	<div class="flex h-full w-screen items-center justify-center">
		<div class="flex w-[50%] flex-row">
			<div class="mr-10">
				<div class="avatar">
					<div class="w-56 rounded-full">
						<img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
					</div>
				</div>
				<div class="prose mt-4">
					<h2 class="mb-2">Jinay Patel</h2>
					<a href="#top" class="flex flex-row items-center gap-2"><Github size={20} /> Github</a>
					<a href="#top" class="flex flex-row items-center gap-2"><Linkedin size={20} /> LinkedIn</a
					>
				</div>
			</div>

			<div class="prose">
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
					ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
					reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
					sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
					est laborum.
				</p>
			</div>
		</div>
	</div>
</div>
