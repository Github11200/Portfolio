<script lang="ts">
	import { Stage, Layer, Rect, RegularPolygon } from 'svelte-konva';
	import type { Object } from '$lib/types';
	import { onMount } from 'svelte';
	import Konva from 'konva';

	let objects: Object[] = $state([
		{ id: '1', x: 0, y: 0, width: 50, height: 50, velocity: 0, mass: 0 }
	]);

	let objectBindings: (Konva.Rect | null)[] = $state([]);

	const acceleration = 0.001;

	let stage: Stage | null = $state(null);
	let screenWidth: number, screenHeigth: number;

	function isOnGround(object: Object): boolean {
		if (object.y + object.height >= screenHeigth) return true;
		return false;
	}

	onMount(async () => {
		((screenWidth = window.innerWidth), (screenHeigth = window.innerHeight));

		if (stage === null) return;

		const anim = new Konva.Animation(function (frame) {
			for (let i = 0; i < objects.length; ++i) {
				let deltaD =
					objects[i].velocity * frame.timeDiff +
					0.5 * acceleration * frame.timeDiff * frame.timeDiff;

				if (isOnGround(objects[i])) {
					objects[i].velocity = 0;
					deltaD = 0;
				}

				objects[i].y += deltaD;

				let vf = Math.sqrt(objects[i].velocity * objects[i].velocity + 2 * acceleration * deltaD);
				objects[i].velocity = vf;

				objectBindings[i]?.node.y(objects[i].y);
			}
		});

		anim.start();
	});
</script>

<Stage width={window.innerWidth} height={window.innerHeight} bind:this={stage}>
	<Layer>
		{#each objects as object, i (object.id)}
			<Rect
				width={50}
				height={50}
				y={100}
				fill="green"
				draggable
				// @ts-ignore
				bind:this={objectBindings[i]}
			/>
		{/each}
	</Layer>
</Stage>
