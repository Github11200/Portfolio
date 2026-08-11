<script lang="ts">
	import { onMount } from 'svelte';
	import Konva from 'konva';
	import cPlusPlusLogo from '../../../static/cPlusPlusLogo.svg';
	import cLogo from '../../../static/cLogo.svg';
	import jsLogo from '../../../static/jsLogo.svg';
	import pythonLogo from '../../../static/pythonLogo.svg';
	import gitLogo from '../../../static/gitLogo.svg';
	import typescriptLogo from '../../../static/typescriptLogo.svg';
	import svelteLogo from '../../../static/svelteLogo.svg';
	import { World, Hexagon, Box, Vector2D } from '$lib/physics';

	const scaleFactor = Math.min(window.innerWidth / 512, 1);
	const objects = [
		new Hexagon({
			position: new Vector2D(window.innerWidth / 2, 100),
			velocity: new Vector2D(0, 0),
			angularVelocity: 0,
			rotation: Math.PI / 6,
			mass: 100,
			restitution: 0.1,
			isStatic: false,
			width: 100 * scaleFactor,
			height: 100 * scaleFactor,
			staticFriction: 0.9,
			dynamicFriction: 0.9,
			logoSrc: cPlusPlusLogo
		}),
		new Hexagon({
			position: new Vector2D(window.innerWidth / 2, 100),
			velocity: new Vector2D(0, 0),
			angularVelocity: 0,
			rotation: Math.PI / 6,
			mass: 100,
			restitution: 0.1,
			isStatic: false,
			width: 100 * scaleFactor,
			height: 100 * scaleFactor,
			staticFriction: 0.9,
			dynamicFriction: 0.9,
			logoSrc: cLogo
		}),
		new Box({
			position: new Vector2D(window.innerWidth / 2, 100),
			velocity: new Vector2D(0, 0),
			angularVelocity: 0,
			rotation: 0,
			mass: 100,
			restitution: 0.1,
			isStatic: false,
			width: 100 * scaleFactor,
			height: 100 * scaleFactor,
			staticFriction: 0.9,
			dynamicFriction: 0.9,
			logoSrc: jsLogo
		}),
		new Box({
			position: new Vector2D(window.innerWidth / 2, 100),
			velocity: new Vector2D(0, 0),
			angularVelocity: 0,
			rotation: 0,
			mass: 100,
			restitution: 0.1,
			isStatic: false,
			width: 100 * scaleFactor,
			height: 100 * scaleFactor,
			staticFriction: 0.9,
			dynamicFriction: 0.9,
			logoSrc: pythonLogo
		}),
		new Box({
			position: new Vector2D(window.innerWidth / 2, 100),
			velocity: new Vector2D(0, 0),
			angularVelocity: 0,
			rotation: 0,
			mass: 100,
			restitution: 0.1,
			isStatic: false,
			width: 100 * scaleFactor,
			height: 100 * scaleFactor,
			staticFriction: 0.9,
			dynamicFriction: 0.9,
			logoSrc: gitLogo
		}),
		new Box({
			position: new Vector2D(window.innerWidth / 2, 100),
			velocity: new Vector2D(0, 0),
			angularVelocity: 0,
			rotation: 0,
			mass: 100,
			restitution: 0.1,
			isStatic: false,
			width: 100 * scaleFactor,
			height: 100 * scaleFactor,
			staticFriction: 0.9,
			dynamicFriction: 0.9,
			logoSrc: typescriptLogo
		}),
		new Box({
			position: new Vector2D(window.innerWidth / 2, 100),
			velocity: new Vector2D(0, 0),
			angularVelocity: 0,
			rotation: 0,
			mass: 100,
			restitution: 0.1,
			isStatic: false,
			width: 100 * scaleFactor,
			height: 100 * scaleFactor,
			staticFriction: 0.9,
			dynamicFriction: 0.9,
			logoSrc: svelteLogo
		})
	];
	const availableIndexes = Array.from({ length: objects.length }, (_, index) => index);

	const getIndex = (): number | undefined => {
		if (availableIndexes.length === 0) return undefined;
		const randomIndex = Math.floor(Math.random() * (availableIndexes.length - 1));
		const index = availableIndexes[randomIndex];

		availableIndexes.splice(randomIndex, 1);
		return index;
	};

	const world = new World([
		// THE WALL
		new Box({
			position: new Vector2D(window.innerWidth / 2, window.innerHeight),
			velocity: new Vector2D(0, 0),
			angularVelocity: 0,
			rotation: 0,
			mass: 10,
			restitution: 0.9,
			isStatic: true,
			width: window.innerWidth,
			height: 1,
			staticFriction: 0.9,
			dynamicFriction: 0.4,
			logoSrc: ''
		}),
		new Box({
			position: new Vector2D(window.innerWidth / 2, 0),
			velocity: new Vector2D(0, 0),
			angularVelocity: 0,
			rotation: 0,
			mass: 10,
			restitution: 0.9,
			isStatic: true,
			width: window.innerWidth,
			height: 1,
			staticFriction: 0.9,
			dynamicFriction: 0.4,
			logoSrc: ''
		}),
		new Box({
			position: new Vector2D(0, window.innerHeight / 2),
			velocity: new Vector2D(0, 0),
			angularVelocity: 0,
			rotation: 0,
			mass: 10,
			restitution: 0.9,
			isStatic: true,
			width: 1,
			height: window.innerHeight,
			staticFriction: 0.9,
			dynamicFriction: 0.4,
			logoSrc: ''
		}),
		new Box({
			position: new Vector2D(window.innerWidth, window.innerHeight / 2),
			velocity: new Vector2D(0, 0),
			angularVelocity: 0,
			rotation: 0,
			mass: 10,
			restitution: 0.9,
			isStatic: true,
			width: 1,
			height: window.innerHeight,
			staticFriction: 0.9,
			dynamicFriction: 0.4,
			logoSrc: ''
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

		// Add objects when there is a click
		window.addEventListener('click', (e) => {
			const index = getIndex();
			if (index !== undefined) {
				objects[index].position = new Vector2D(e.offsetX, 150);
				world.objects.push(objects[index]);
				layer.add(world.objects.at(-1).getKonvaObject());
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
