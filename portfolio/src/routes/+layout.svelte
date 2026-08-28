<script lang="ts">
	import '../app.css';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.png';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';
	import 'katex/dist/katex.min.css';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import LinkedinOutlineIcon from '@iconify-svelte/basil/linkedin-outline';
	import GithubLineIcon from '@iconify-svelte/mingcute/github-line';
	// Added Menu and X icons for the mobile toggle
	import { FileUser, LibraryBig, Menu, X } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();

	let asideWidth = $state(0);
	// State for mobile menu
	let isMobileMenuOpen = $state(false);

	const navLinks = [
		{ name: 'Home', href: resolve('/'), badge: '// 01' },
		{ name: 'Articles', href: resolve('/articles'), badge: '// 02' },
		{ name: 'Projects', href: resolve('/projects'), badge: '// 03' }
	];

	const connectLinks = [
		{
			href: 'https://hardcover.app/@igbig',
			ariaLabel: 'Books',
			icon: LibraryBig,
			color: '#6366f1'
		},
		{
			href: 'https://github.com/Github11200',
			ariaLabel: 'GitHub',
			icon: GithubLineIcon,
			color: '#080808'
		},
		{
			href: 'https://www.linkedin.com/in/jinay-patel-6369002b4/',
			ariaLabel: 'LinkedIn',
			icon: LinkedinOutlineIcon,
			color: '#0072B1'
		},
		{
			href: 'https://drive.google.com/file/d/1nYS3qjF_-0Q5r5N_GHFr-nauUQ3iro2m/view?usp=sharing',
			ariaLabel: 'Resume',
			icon: FileUser,
			color: '#b51208'
		},
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster position="top-center" richColors />

<Tooltip.Provider>
	<!-- Top Right Connect Links (Circular Icons with Tooltips) -->
	<div class="absolute top-5 right-5 z-50 flex items-center gap-2.5 sm:top-6 sm:right-8 sm:gap-3">
		{#each connectLinks as connectLink}
			<Tooltip.Root>
				<Tooltip.Trigger>
					{#snippet child({ props })}
						{@const color = connectLink.color}
						<Button
							{...props}
							variant="outline"
							size="icon"
							href={connectLink.href}
							target="_blank"
							rel="noopener noreferrer"
							class={cn(
								`size-10 rounded-full border-border bg-card text-card-foreground transition-all duration-200 hover:scale-110 hover:border-foreground/80 sm:size-11`,
								`hover:bg-[${color}]`
							)}
						>
							{@const IconComponent = connectLink.icon}

							<IconComponent
								height="1.3em"
								class="transition-transform group-hover:scale-110"
								color={connectLink.color}
							/>
						</Button>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content side="bottom" class="font-mono text-xs">
					{connectLink.ariaLabel}
				</Tooltip.Content>
			</Tooltip.Root>
		{/each}
	</div>

	<!-- Changed: Use flex-col on mobile, grid on sm+ screens -->
	<div
		class="flex min-h-screen w-full flex-col overflow-x-hidden bg-background text-foreground sm:grid sm:grid-cols-[auto_1fr] sm:grid-rows-[1fr_auto]"
		style="--sidebar-width: {asideWidth}px;"
	>
		<!-- Sidebar Navigation -->
		<aside
			bind:clientWidth={asideWidth}
			class="sticky top-0 z-20 flex w-full flex-col justify-start bg-background/95 p-4 backdrop-blur sm:pointer-events-none sm:w-auto sm:bg-transparent sm:p-6 sm:backdrop-blur-none"
		>
			<!-- Hamburger Menu Button (Mobile Only) -->
			<div class="pointer-events-auto mb-2 flex w-full justify-start sm:hidden">
				<Button
					variant="outline"
					size="icon"
					class="size-10 border-border bg-card text-card-foreground"
					onclick={() => (isMobileMenuOpen = !isMobileMenuOpen)}
					aria-label="Toggle Menu"
				>
					{#if isMobileMenuOpen}
						<X class="size-5" />
					{:else}
						<Menu class="size-5" />
					{/if}
				</Button>
			</div>

			<!-- Navigation Links Container (Overlay on mobile when open) -->
			<nav
				class="{isMobileMenuOpen
					? 'absolute top-16 left-4 z-50 flex rounded-xl border border-border bg-card p-3 shadow-xl'
					: 'hidden'} pointer-events-auto w-fit flex-col gap-2.5 sm:static sm:flex sm:rounded-none sm:border-none sm:bg-transparent sm:p-0 sm:shadow-none"
			>
				{#each navLinks as link}
					{@const isActive =
						page.url.pathname === link.href ||
						(link.href !== '/' && page.url.pathname.startsWith(link.href))}
					<Button
						variant={isActive ? 'default' : 'outline'}
						href={resolve(link.href as any)}
						class={`h-auto justify-start gap-3.5 px-4 py-2.5 transition-all duration-200 ${
							isActive
								? 'border-foreground/20 bg-foreground text-background hover:bg-foreground/90'
								: 'border-border bg-card text-card-foreground hover:border-foreground hover:bg-accent hover:text-accent-foreground'
						}`}
					>
						<Badge
							variant={isActive ? 'default' : 'outline'}
							class={`font-mono text-xs tracking-normal ${
								isActive ? 'text-background opacity-80' : 'text-muted-foreground opacity-60'
							}`}
						>
							{link.badge}
						</Badge>
						<span class="text-sm font-bold tracking-tight sm:text-base">{link.name}</span>
					</Button>
				{/each}
			</nav>
		</aside>

		<main class="relative z-10 flex min-h-0 w-full min-w-0 flex-1 flex-col">
			{@render children()}
		</main>

		<!-- Waterloo Network Widget Container -->
		<div class="my-6 flex origin-center scale-75 justify-center col-span-full">
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
