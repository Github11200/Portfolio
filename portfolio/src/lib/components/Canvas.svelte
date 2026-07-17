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

	onMount(async () => {
		if (stage === null) return;

		const anim = new Konva.Animation(function (frame) {
			for (let i = 0; i < objects.length; ++i) {
				let deltaD =
					objects[i].velocity * frame.timeDiff +
					0.5 * acceleration * frame.timeDiff * frame.timeDiff;

				objects[i].y += deltaD;

				let vf = Math.sqrt(objects[i].velocity * objects[i].velocity + 2 * acceleration * deltaD);
				objects[i].velocity = vf;

				objectBindings[i]?.node.y(objects[i].y);
			}
		});

		anim.start();
	});

	function changeSize(e) {
		// to() is a method of `Konva.Node` instances
		e.target.to({
			scaleX: Math.random() + 0.8,
			scaleY: Math.random() + 0.8,
			duration: 0.2
		});
	}
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
				ondragstart={changeSize}
				ondragend={changeSize}
			/>
		{/each}
	</Layer>
</Stage>
