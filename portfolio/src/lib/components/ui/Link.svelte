<script lang="ts">
	import { resolve } from '$app/paths';

	interface Props {
		href: string;
		text: string;
	}

	const { href, text }: Props = $props();
</script>

<a href={href} class="underline">{text}</a>
