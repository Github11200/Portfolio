<script lang="ts">
	import { Stage, Layer, Rect, RegularPolygon } from 'svelte-konva';
	import { onMount } from 'svelte';
	import Konva from 'konva';
	import World from '$lib/physics/world';
	import { Object } from '$lib/physics/object';
	import Vector2D from '$lib/physics/vector';
	import CollisionHelper from '$lib/physics/collisions';

	const world = new World([
		new Object(new Vector2D(100, 100), new Vector2D(0, 0), 0.01, 0, 10, 50, 50, 'green', ''),
		new Object(new Vector2D(75, 125), new Vector2D(0, 0), 0.01, 0, 10, 50, 50, 'red', '')
	]);

	onMount(async () => {
		let stage = new Konva.Stage({
			container: 'canvas-container',
			width: window.innerWidth,
			height: window.innerHeight
		});

		let layer = new Konva.Layer();
		stage.add(layer);

		// Update the canvas size if the window is resized
		window.addEventListener('resize', () => {
			(stage.width(window.innerWidth), stage.height(window.innerHeight));
		});

		console.log(world.objects[0].getTransformedVertices());
		// console.log(new CollisionHelper().checkCollision(world.objects[0], world.objects[1]));
		for (const object of world.objects) layer.add(object.getKonvaObject());

		console.log(world.objects[0].getAABB());
		console.log(world.objects[1].getAABB());
		const anim = new Konva.Animation(function (frame) {
			world.step(frame.timeDiff);
			// for (const object of world.objects) object.updateKonvaObject();
		});

		anim.start();
	});
</script>

<div id="canvas-container"></div>
