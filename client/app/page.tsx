"use client";

import React, { useRef, useEffect } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";

const ThreeScene: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const hasRenderedBefore = useRef<boolean>(true);

	useEffect(() => {
		if (typeof window !== "undefined" && !hasRenderedBefore.current) {
			const scene = new THREE.Scene();
			scene.background = new THREE.Color("#101321");
			console.log(containerRef.current?.clientHeight);

			const camera = new THREE.PerspectiveCamera(
				20,
				containerRef.current?.clientHeight /
					containerRef.current?.clientWidth,
				0.1,
				2000
			);
			const renderer = new THREE.WebGLRenderer();
			const controls = new OrbitControls(camera, renderer.domElement);
			const light = new THREE.AmbientLight(0xffffff, 3); // soft white light
			const axesHelper = new THREE.AxesHelper(100);
			scene.add(axesHelper);
			scene.add(light);

			// Add this function inside the useEffect hook
			const renderScene = () => {
				renderer.render(scene, camera);
				requestAnimationFrame(renderScene);
				console.log(scene.children[2]);
			};

			const loader = new GLTFLoader();
			loader.load("book.gltf", (object) => {
				let box = new THREE.Box3().setFromObject(object.scene);
				let center = box.getCenter(new THREE.Vector3());

				object.scene.position.x += object.scene.position.x - center.x;
				object.scene.position.y += object.scene.position.y - center.y;
				object.scene.position.z += object.scene.position.z - center.z;

				object.scene.castShadow = true;
				object.scene.receiveShadow = true;

				object.scene.customDepthMaterial =
					new THREE.MeshDepthMaterial();

				scene.add(object.scene);
				// Call the renderScene function to start the animation loop
				renderScene();
			});

			renderer.setSize(
				containerRef.current?.clientHeight,
				containerRef.current?.clientWidth
			);
			containerRef.current?.appendChild(renderer.domElement);
			camera.position.y -= 55;
		} else {
			hasRenderedBefore.current = false;
		}
	}, []);

	return (
		<>
			<div className="text-9xl flex min-h-screen items-center justify-center overflow-y-hidden gap-x-36">
				<div>
					<h1>Learning</h1>
					<h1>Building</h1>
					<h1>Growing</h1>
				</div>
				<div ref={containerRef} className="w-[40rem] h-[40rem]"></div>
			</div>
		</>
	);
};
export default ThreeScene;
