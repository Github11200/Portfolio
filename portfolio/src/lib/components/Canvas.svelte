<script lang="ts">
	import { Stage, Layer, Rect, RegularPolygon } from 'svelte-konva';
	import { onMount } from 'svelte';
	import Konva from 'konva';
	import World from '$lib/physics/world';
	import { Box, Hexagon, Object } from '$lib/physics/object';
	import Vector2D from '$lib/physics/vector';

	const world = new World([
		// new Box({
		// 	position: new Vector2D(window.innerWidth / 2, window.innerHeight - 500),
		// 	velocity: new Vector2D(0, 0),
		// 	angularVelocity: 0,
		// 	rotation: 30,
		// 	mass: 10,
		// 	restitution: 0.5,
		// 	isStatic: false,
		// 	width: 50,
		// 	height: 50,
		// 	shape: 'Square',
		// 	color: 'green',
		// 	id: ''
		// }),
		new Hexagon({
			position: new Vector2D(window.innerWidth / 2, 100),
			velocity: new Vector2D(0, 0),
			angularVelocity: 0,
			rotation: Math.PI / 6,
			mass: 10,
			restitution: 0.9,
			isStatic: false,
			width: 100,
			height: 50,
			shape: 'Square',
			color: 'pink',
			id: '',
			staticFriction: 0.9,
			dynamicFriction: 0.9
		}),
		// new Object(
		// 	new Vector2D(window.innerWidth / 2 + 80, window.innerHeight - 500),
		// 	new Vector2D(0, 0),
		// 	0,
		// 	0,
		// 	10,
		// 	0.5,
		// 	false,
		// 	50,
		// 	50,
		// 	'Square',
		// 	'green',
		// 	''
		// ),
		new Box({
			position: new Vector2D(window.innerWidth / 2, window.innerHeight - 25),
			velocity: new Vector2D(0, 0),
			angularVelocity: 0,
			rotation: 0,
			mass: 10,
			restitution: 0.9,
			isStatic: true,
			width: window.innerWidth,
			height: 1,
			shape: 'Square',
			color: 'pink',
			id: '',
			staticFriction: 0.9,
			dynamicFriction: 0.4
		})
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

		// Helper for testing the physics
		window.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowRight') world.objects[0].applyForce(new Vector2D(5, 0));
			if (e.key === 'ArrowLeft') world.objects[0].applyForce(new Vector2D(-5, 0));
			if (e.key === 'ArrowUp') world.objects[0].applyForce(new Vector2D(0, -5));
			if (e.key === 'ArrowDown') world.objects[0].applyForce(new Vector2D(0, 5));
			if (e.key === 'Enter') {
				world.objects.push(
					new Hexagon({
						position: new Vector2D(window.innerWidth / 2, 100),
						velocity: new Vector2D(0, 0),
						angularVelocity: 0,
						rotation: Math.PI / 6,
						mass: 10,
						restitution: 0.5,
						isStatic: false,
						width: 50,
						height: 50,
						shape: 'Square',
						color: 'pink',
						id: '',
						staticFriction: 0.5,
						dynamicFriction: 0.4
					})
				);
				layer.add(world.objects[world.objects.length - 1].getKonvaObject());
			}
		});

		// Add all the objects
		for (const object of world.objects) layer.add(object.getKonvaObject());

		const anim = new Konva.Animation(function (frame) {
			world.step(frame.timeDiff);
			for (const object of world.objects) object.updateKonvaObject();
		});
		anim.start();
	});
</script>

<div id="canvas-container"></div>
