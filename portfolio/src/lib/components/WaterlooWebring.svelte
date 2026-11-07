<script lang="ts">
	// Native replacement for https://uwaterloo.network/embed.js.
	// The official embed waits for a network request before inserting itself into the
	// page, which made it pop in late and shift the layout. Rendering the markup here
	// (with a self-hosted icon and fixed dimensions) keeps the layout stable; the member
	// list is only needed when an arrow is clicked.
	const USER = 'Jinay Patel';
	const BASE_URL = 'https://www.uwaterloo.network';

	type Member = { id: string; name: string; website: string };

	let members: Member[] | null = null;
	let currentIndex = 0;
	let pending: Promise<Member[]> | null = null;

	function loadMembers(): Promise<Member[]> {
		if (members) return Promise.resolve(members);
		pending ??= fetch(`${BASE_URL}/api/webring?user=${encodeURIComponent(USER)}`)
			.then((res) => res.json())
			.then((data) => {
				members = Array.isArray(data?.members) ? (data.members as Member[]) : [];
				currentIndex = Math.floor(Math.random() * Math.max(members.length, 1));
				return members;
			})
			.catch(() => {
				pending = null;
				return [];
			});
		return pending;
	}

	async function go(step: 1 | -1) {
		// Open the tab synchronously so popup blockers allow it, then point it at the member.
		const win = window.open('about:blank', '_blank');
		const list = await loadMembers();
		if (list.length === 0) {
			if (win) win.location.href = BASE_URL;
			return;
		}
		currentIndex = (currentIndex + step + list.length) % list.length;
		const target = list[currentIndex].website;
		if (win) {
			win.opener = null;
			win.location.href = target;
		} else {
			window.open(target, '_blank', 'noopener,noreferrer');
		}
	}
</script>

<nav class="flex h-10 items-center justify-center gap-2 text-foreground" aria-label="UWaterloo webring">
	<button
		type="button"
		class="webring-arrow"
		aria-label="Previous site in the UWaterloo webring"
		onclick={() => go(-1)}
		onpointerenter={loadMembers}
		onfocus={loadMembers}>←</button
	>
	<a
		href={`${BASE_URL}?ref=${encodeURIComponent(USER)}`}
		target="_blank"
		rel="noopener noreferrer"
		title="Visit uwaterloo.network"
		class="block size-9 transition-transform duration-200 hover:scale-110"
	>
		<img
			src="/uwaterloo-network.svg"
			alt="UWaterloo Webring"
			width="36"
			height="36"
			class="block size-9"
			decoding="async"
		/>
	</a>
	<button
		type="button"
		class="webring-arrow"
		aria-label="Next site in the UWaterloo webring"
		onclick={() => go(1)}
		onpointerenter={loadMembers}
		onfocus={loadMembers}>→</button
	>
</nav>

<style>
	.webring-arrow {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.75rem;
		height: 1.75rem;
		font-size: 1.125rem;
		line-height: 1;
		cursor: pointer;
		background: transparent;
		border: none;
		color: inherit;
		transition:
			transform 0.2s,
			opacity 0.2s;
	}
	.webring-arrow:hover {
		transform: scale(1.2);
		opacity: 0.8;
	}
</style>
