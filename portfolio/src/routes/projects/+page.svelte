<script lang="ts">
import ProjectBox from "$lib/components/ProjectBox.svelte";

type Project = {
	title: string;
	description: string;
	imageSrc: string;
	href?: string;
	tags?: string[];
};

const projects: Project[] = [
	{
		title: "Project One",
		description:
			"A minimalist, shadcn-styled card. Swap this content for your real project data.",
		imageSrc: "https://img.daisyui.com/images/profile/demo/batperson@192.webp",
		href: "#",
		tags: ["Svelte", "Tailwind"],
	},
	{
		title: "Project Two",
		description:
			"Carousel behavior: snap scrolling + subtle scale/fade driven by scroll position (no tilt).",
		imageSrc: "https://img.daisyui.com/images/profile/demo/batperson@192.webp",
		href: "#",
		tags: ["UI", "Minimal"],
	},
	{
		title: "Project Three",
		description:
			"Non-stacked snap carousel: each scroll gesture advances exactly one project.",
		imageSrc: "https://img.daisyui.com/images/profile/demo/batperson@192.webp",
		href: "#",
		tags: ["Design", "Motion"],
	},
	{
		title: "Project Four",
		description:
			"Add/remove items freely; the scroll container will keep snapping one card at a time.",
		imageSrc: "https://img.daisyui.com/images/profile/demo/batperson@192.webp",
		href: "#",
		tags: ["Portfolio"],
	},
];

let scroller: HTMLDivElement | null = null;

// per-card transform state (kept for future effects; currently unused visually)
let progress: number[] = Array(projects.length).fill(0);

// Wheel-driven paging state
let activeIndex = 0;
let wheelLocked = false;
let wheelUnlockTimer: ReturnType<typeof setTimeout> | null = null;

function clamp(n: number, min: number, max: number) {
	return Math.max(min, Math.min(max, n));
}

function updateProgress() {
	if (!scroller) return;

	const rect = scroller.getBoundingClientRect();
	const centerY = rect.top + rect.height / 2;

	const cards = Array.from(
		scroller.querySelectorAll<HTMLElement>("[data-card]"),
	);
	const next = new Array(cards.length).fill(0);

	for (let i = 0; i < cards.length; i++) {
		const r = cards[i].getBoundingClientRect();
		const cardCenter = r.top + r.height / 2;

		const dist = (cardCenter - centerY) / (rect.height * 0.55);
		next[i] = clamp(dist, -1.25, 1.25);
	}

	progress = next;
}

function scrollToIndex(index: number) {
	if (!scroller) return;

	const clamped = clamp(index, 0, projects.length - 1);
	const target = scroller.querySelector<HTMLElement>(
		`[data-index="${clamped}"]`,
	);

	if (target) {
		target.scrollIntoView({ behavior: "smooth", block: "start" });
		activeIndex = clamped;
	}
}

function lockWheel(ms = 550) {
	wheelLocked = true;
	if (wheelUnlockTimer) clearTimeout(wheelUnlockTimer);
	wheelUnlockTimer = setTimeout(() => {
		wheelLocked = false;
		wheelUnlockTimer = null;
	}, ms);
}

function onWheel(e: WheelEvent) {
	// Force "one step per gesture" paging.
	// - Prevent default scrolling so the wheel doesn't free-scroll past multiple cards.
	// - Use a short lockout so trackpads don't trigger multiple steps in one swipe.
	if (!scroller) return;

	// Avoid hijacking when the user is trying to pinch-zoom/trackpad zoom etc.
	if (e.ctrlKey) return;

	// If the event originates from a nested scrollable element, don't hijack it.
	const target = e.target as HTMLElement | null;
	if (target && target.closest("[data-allow-native-scroll]")) return;

	e.preventDefault();

	if (wheelLocked) return;

	const dir = Math.sign(e.deltaY);
	if (dir === 0) return;

	lockWheel();

	if (dir > 0) scrollToIndex(activeIndex + 1);
	else scrollToIndex(activeIndex - 1);
}

function onScroll() {
	// Keep this lean; transforms are GPU-friendly.
	updateProgress();
}

$: {
	// keep arrays in sync if project list changes
	if (progress.length !== projects.length)
		progress = Array(projects.length).fill(0);

	// keep active index in range
	activeIndex = clamp(activeIndex, 0, projects.length - 1);
}
</script>

<div class="min-h-screen">
	<div class="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="mt-6">
			<div
				bind:this={scroller}
				on:wheel|passive={onWheel}
				on:scroll={onScroll}
				on:resize={updateProgress}
				class="flash-scroller relative h-[68vh] overflow-y-auto overscroll-contain scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none]"
			>
				<div class="flash-track mx-auto flex w-full max-w-2xl flex-col gap-6">
					{#each projects as p, i (p.title)}
						<section
							data-card
							data-index={i}
							class="flash-item relative snap-start snap-always"
							style={`
								--t: ${progress[i] ?? 0};
							`}
						>
							<div class="flash-card isolate mx-auto h-[48vh] w-full overflow-hidden rounded-xl border border-border bg-card text-card-foreground">
								<ProjectBox
									title={p.title}
									description={p.description}
									imageSrc={p.imageSrc}
									href={p.href}
									tags={p.tags ?? []}
								/>
							</div>
						</section>
					{/each}

					<!-- spacer so the last card can snap into view nicely -->
					<div class="h-[16vh]" />
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	/* Scroll snapping: one card per "page". */
	.flash-scroller {
		scroll-snap-type: y mandatory;
		scroll-padding-block: 0px;
	}

	.flash-scroller::-webkit-scrollbar {
		display: none;
	}

	/* Non-stacked carousel: each card occupies its own snap "page" */
	.flash-item {
		min-height: 68vh;
		display: flex;
		align-items: center;
	}

	/*
		Make the inner ProjectBox content fill neatly inside a square card.
		(ProjectBox renders an <article> with padding/margins; this keeps it tidy.)
	*/
	.flash-card :global(article) {
		height: 100%;
		width: 100%;
		border: none;
		border-radius: 0;
		transform: none !important;
	}

	.flash-card :global(article > div:first-child) {
		/* media wrapper */
		margin: 14px;
	}

	.flash-card :global(img) {
		/* ensure the image doesn't feel like a wide banner inside a square */
		height: 52%;
	}

	@media (prefers-reduced-motion: reduce) {
		.flash-scroller {
			scroll-behavior: auto;
		}
		.flash-card {
			transition: none;
		}
	}
</style>
