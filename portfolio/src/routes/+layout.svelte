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
	import { FileUser } from '@lucide/svelte';
	import { cn } from '$lib/utils';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();

	let asideWidth = $state(0);

	const navLinks = [
		{ name: 'Home', href: resolve('/'), badge: '// 01' },
		{ name: 'Articles', href: resolve('/articles'), badge: '// 02' },
		{ name: 'Projects', href: resolve('/projects'), badge: '// 03' }
	];

	const connectLinks = [
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
			href: 'https://drive.google.com/file/d/1umUoKVOtOqldoiI5ccnjN55PszYAxzwC/view?usp=sharing',
			ariaLabel: 'Resume',
			icon: FileUser,
			color: '#b51208'
		}
	];
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Toaster position="top-center" richColors />

<Tooltip.Provider>
	<!-- Top Right Connect Links (Circular Icons with Tooltips) -->
	<div class="fixed top-5 right-5 z-50 flex items-center gap-2.5 sm:top-6 sm:right-8 sm:gap-3">
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
								`size-10 rounded-full border-2 border-border bg-card text-card-foreground transition-all duration-200 hover:scale-110 hover:border-foreground/80 sm:size-11`,
								`hover:bg-[${color}]`
							)}
						>
							{@const IconComponent = connectLink.icon}

							<IconComponent
								height="1.3em"
								class="t ransition-transform group-hover:scale-110"
								color={connectLink.color}
							/>
						</Button>
					{/snippet}
				</Tooltip.Trigger>

				<Tooltip.Content side="bottom" class="font-mono text-xs"
					>{connectLink.ariaLabel}
				</Tooltip.Content>
			</Tooltip.Root>
		{/each}
	</div>
</Tooltip.Provider>

<div
	class="grid min-h-screen w-full grid-cols-[auto_1fr] justify-items-start overflow-x-hidden bg-background text-foreground"
	style="--sidebar-width: {asideWidth}px;"
>
	<!-- Sidebar Navigation -->
	<aside
		bind:clientWidth={asideWidth}
		class="sticky top-0 z-20 flex w-auto flex-col justify-start p-4 sm:p-6"
	>
		<nav class="flex w-fit flex-col gap-2.5">
			{#each navLinks as link}
				{@const isActive =
					page.url.pathname === link.href ||
					(link.href !== '/' && page.url.pathname.startsWith(link.href))}
				<Button
					variant={isActive ? 'default' : 'outline'}
					href={resolve(link.href as any)}
					class={`h-auto justify-start gap-3.5 rounded-xl border-2 px-4 py-2.5 transition-all duration-200 hover:scale-[1.02] ${
						isActive
							? 'border-foreground/20 bg-foreground text-background hover:bg-foreground/90'
							: 'border-border bg-card text-card-foreground hover:border-foreground/40 hover:bg-accent hover:text-accent-foreground'
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

	<main class="flex h-full w-full min-w-0 flex-col justify-start">
		{@render children()}
	</main>
</div>
