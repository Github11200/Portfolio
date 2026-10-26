<script lang="ts">
	import '../app.css';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.png';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import 'katex/dist/katex.min.css';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import LinkedinOutlineIcon from '@iconify-svelte/basil/linkedin-outline';
	import GithubLineIcon from '@iconify-svelte/mingcute/github-line';
	import { FileUser, LibraryBig, Menu, X } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { animate, stagger } from 'animejs';
	import { cn } from '$lib/utils';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();

	let isMobileMenuOpen = $state(false);
	let hoveredIcon = $state<string | null>(null);

	const navLinks = [
		{ name: 'home', href: resolve('/') },
		{ name: 'writing', href: resolve('/writing') },
		{ name: 'projects', href: resolve('/projects') }
	];

	const connectLinks = [
		{
			href: 'https://hardcover.app/@igbig',
			ariaLabel: 'Books',
			icon: LibraryBig,
			hoverColor: '#4f46e5'
		},
		{
			href: 'https://github.com/Github11200',
			ariaLabel: 'GitHub',
			icon: GithubLineIcon,
			hoverColor: '#000000'
		},
		{
			href: 'https://www.linkedin.com/in/jinay-patel-6369002b4/',
			ariaLabel: 'LinkedIn',
			icon: LinkedinOutlineIcon,
			hoverColor: '#0A66C2'
		},
		{
			href: 'https://drive.google.com/file/d/1CT7ZAGSOG635BG8Trk7xspCoZTdowuqN/view?usp=sharing',
			ariaLabel: 'Resume',
			icon: FileUser,
			hoverColor: '#FF0000'
		}
	];

	onMount(() => {
		// Subtle staggered reveal for header elements
		animate('.nav-link-item', {
			opacity: [0, 1],
			translateY: [-6, 0],
			delay: stagger(40, { start: 100 }),
			duration: 500,
			ease: 'outQuad'
		});

		animate('.connect-link-item', {
			opacity: [0, 1],
			translateY: [-6, 0],
			delay: stagger(35, { start: 200 }),
			duration: 500,
			ease: 'outQuad'
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster position="top-center" richColors />

<Tooltip.Provider>
	<div class="grain-overlay" aria-hidden="true"></div>
	<div class="flex min-h-screen w-full flex-col overflow-x-hidden bg-background text-foreground">
		<!-- Top Navigation Bar -->
		<header class="sticky top-0 z-50 w-full border-b border-border bg-background">
			<div class="flex h-11 items-stretch justify-between">
				<!-- Left: Nav Links -->
				<div class="flex items-stretch">
					<!-- Desktop Nav -->
					<nav class="hidden items-stretch sm:flex">
						{#each navLinks as link}
							{@const isActive =
								page.url.pathname === link.href ||
								(link.href !== '/' && page.url.pathname.startsWith(link.href))}
							<a
								href={link.href}
								class={cn(
									'nav-link-item flex items-center border-r border-border px-5 text-base transition-colors',
									isActive
										? 'bg-primary text-primary-foreground'
										: 'text-muted-foreground hover:text-foreground'
								)}
							>
								<span>{link.name}</span>
							</a>
						{/each}
					</nav>

					<!-- Mobile Hamburger -->
					<button
						class="flex items-center border-r border-border px-4 text-muted-foreground hover:text-foreground sm:hidden"
						onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
						aria-label="Toggle Menu"
					>
						{#if isMobileMenuOpen}
							<X class="size-4" />
						{:else}
							<Menu class="size-4" />
						{/if}
					</button>
				</div>

				<!-- Right: Connect Links -->
				<div class="flex items-stretch">
					{#each connectLinks as connectLink}
						<Tooltip.Root>
							<Tooltip.Trigger>
								{#snippet child({ props })}
									<a
										{...props}
										href={connectLink.href}
										target="_blank"
										rel="noopener noreferrer"
										class="connect-link-item flex items-center justify-center border-l border-border px-3 text-muted-foreground transition-colors sm:px-4"
										style="color: {hoveredIcon === connectLink.ariaLabel
											? connectLink.hoverColor
											: ''}; background-color: {hoveredIcon === connectLink.ariaLabel
											? connectLink.hoverColor + '15'
											: ''}"
										onmouseenter={() => (hoveredIcon = connectLink.ariaLabel)}
										onmouseleave={() => (hoveredIcon = null)}
									>
										<connectLink.icon class="size-[18px]" />
									</a>
								{/snippet}
							</Tooltip.Trigger>
							<Tooltip.Content side="bottom" class="font-mono text-xs">
								{connectLink.ariaLabel}
							</Tooltip.Content>
						</Tooltip.Root>
					{/each}
				</div>
			</div>

			<!-- Mobile Dropdown Nav -->
			{#if isMobileMenuOpen}
				<nav class="flex flex-col border-t border-border sm:hidden">
					{#each navLinks as link}
						{@const isActive =
							page.url.pathname === link.href ||
							(link.href !== '/' && page.url.pathname.startsWith(link.href))}
						<a
							href={link.href}
							onclick={() => (isMobileMenuOpen = false)}
							class={cn(
								'flex items-center gap-3 border-b border-border px-5 py-3 text-base transition-colors',
								isActive
									? 'bg-primary text-primary-foreground'
									: 'text-muted-foreground hover:text-foreground'
							)}
						>
							<span>{link.name}</span>
						</a>
					{/each}
				</nav>
			{/if}
		</header>

		<main class="relative z-10 flex min-h-0 w-full min-w-0 flex-1 flex-col">
			{@render children()}
		</main>

		<!-- Waterloo Network Widget -->
		<div class="my-3 sm:my-6 flex origin-center scale-65 justify-center">
			<script
				id="waterlooNetwork"
				src="https://uwaterloo.network/embed.js"
				data-webring
				data-user="Jinay Patel"
				data-align="center"
			>
			</script>
		</div>
	</div>
</Tooltip.Provider>
