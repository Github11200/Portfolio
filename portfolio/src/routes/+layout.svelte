<script lang="ts">
	import '../app.css';
	import { resolve } from '$app/paths';
	import favicon from '$lib/assets/favicon.png';
	import * as NavigationMenu from '$lib/components/ui/navigation-menu/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import 'katex/dist/katex.min.css';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import {
		NavigationMenuRoot,
		NavigationMenuList,
		NavigationMenuItem,
		NavigationMenuLink
	} from '$lib/components/ui/navigation-menu/index';
	import LinkedinOutlineIcon from '@iconify-svelte/basil/linkedin-outline';
	import GithubLineIcon from '@iconify-svelte/mingcute/github-line';
	import { FileUser } from '@lucide/svelte';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();
</script>

<Toaster position="top-center" richColors />

<div class="grid w-screen grid-cols-[auto_1fr] justify-items-start">
	<NavigationMenuRoot class="grid h-screen grid-rows-2 items-start border-r border-black">
		<NavigationMenuList class="m-0 flex w-full flex-col justify-center divide-y divide-black">
			<NavigationMenuItem class="m-0 w-full">
				<NavigationMenuLink
					class="block w-full border-t border-black py-8 pr-8 pl-32 text-right text-base sm:text-lg"
					href={resolve('/')}>Home</NavigationMenuLink
				>
			</NavigationMenuItem>

			<NavigationMenuItem class="m-0 w-full">
				<NavigationMenuLink
					class="block w-full py-8 pr-8 pl-12 text-right text-base sm:text-lg"
					href={resolve('/articles')}
				>
					Articles
				</NavigationMenuLink>
			</NavigationMenuItem>

			<NavigationMenuItem class="m-0 w-full">
				<NavigationMenuLink
					class="block w-full border-b border-black py-8 pr-8 pl-12 text-right text-base sm:text-lg"
					href={resolve('/projects')}
				>
					Projects
				</NavigationMenuLink>
			</NavigationMenuItem>
		</NavigationMenuList>
		<div class="mt-8 flex w-full flex-col divide-y divide-black self-end border-t border-black">
			<a href="https://github.com/Github11200" target="_blank" class="flex-1">
				<Button
					variant="ghost"
					class="h-full w-full rounded-none border-t py-8 hover:bg-[#080808]/3"
				>
					<GithubLineIcon height="1em" color="#080808" /> Github
				</Button>
			</a>
			<a href="https://www.linkedin.com/in/jinay-patel-6369002b4/" target="_blank" class="flex-1">
				<Button variant="ghost" class="h-full w-full rounded-none py-8 hover:bg-[#0072b1]/3">
					<LinkedinOutlineIcon height="1em" color="#0072B1" /> LinkedIn
				</Button>
			</a>
			<a
				href="https://drive.google.com/file/d/1umUoKVOtOqldoiI5ccnjN55PszYAxzwC/view?usp=drive_link"
				target="_blank"
				class="flex-1"
			>
				<Button variant="ghost" class="h-full w-full rounded-none py-8 hover:bg-[#b51208]/3">
					<FileUser size={20} color="#b51208" /> Resume
				</Button>
			</a>
		</div>
	</NavigationMenuRoot>
	{@render children()}
</div>
