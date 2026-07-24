<script lang="ts">
	import { Stage, Layer, Rect, RegularPolygon } from 'svelte-konva';
	import { onMount } from 'svelte';
	import Konva from 'konva';
	import World from '$lib/physics/world';
	import Object from '$lib/physics/object';
	import Vector2D from '$lib/physics/vector';

	const world = new World([
		new Object(new Vector2D(100, 100), new Vector2D(1, 0), 0.01, 0, 10, 50, 50, '', '')
	]);

	let objectBindings: (Konva.Rect | null)[] = $state([]);

	let stage: Stage | null = $state(null);
	let screenWidth: number, screenHeigth: number;

	onMount(async () => {
		((screenWidth = window.innerWidth), (screenHeigth = window.innerHeight));

		if (stage === null) return;

		const anim = new Konva.Animation(function (frame) {
			world.step(frame.timeDiff);

			for (let i = 0; i < world.objects.length; ++i) {
				objectBindings[i]?.node.x(world.objects[i].position.x);
				objectBindings[i]?.node.y(world.objects[i].position.y);
				objectBindings[i]?.node.rotation(world.objects[i].rotation);
			}
		});

		anim.start();
	});
</script>

<Stage width={window.innerWidth} height={window.innerHeight} bind:this={stage}>
	<Layer>
		{#each world.objects as object, i (object.id)}
			<Rect
				width={object.width}
				height={object.height}
				x={object.position.x}
				y={object.position.y}
				rotation={0}
				fill="green"
				draggable
				offsetX={object.width / 2}
				offsetY={object.height / 2}
				// @ts-ignore
				bind:this={objectBindings[i]}
			/>
		{/each}
	</Layer>
</Stage>
