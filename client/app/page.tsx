"use client";

import React, { useRef, useEffect } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { lexend, lexend900 } from "./layout";
import * as THREE from "three";

const ThreeScene: React.FC = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const hasRenderedBefore = useRef<boolean>(true);

	useEffect(() => {
		if (typeof window !== "undefined" && !hasRenderedBefore.current) {
			const scene = new THREE.Scene();
			scene.background = null;

			const camera = new THREE.PerspectiveCamera(
				20,
				containerRef.current?.clientHeight /
					containerRef.current?.clientWidth,
				0.1,
				2000
			);
			const renderer = new THREE.WebGLRenderer({ alpha: true });
			renderer.setClearColor(0x000000, 0);
			const controls = new OrbitControls(camera, renderer.domElement);
			const light = new THREE.AmbientLight(0xffffff, 2); // soft white light
			scene.add(light);

			// Add this function inside the useEffect hook
			const renderScene = () => {
				renderer.render(scene, camera);
				requestAnimationFrame(renderScene);
				console.log(scene);
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
			<div className="grid grid-rows-[10%_60%] grid-cols-2 overflow-y-hidden justify-items-center">
				<nav className="border-[1px] border-l-border flex items-center justify-center gap-x-10 w-[50%] rounded-lg col-span-2 my-5 font-lexend shadow-2xl shadow-slate-900 text-xl">
					<a>Home</a>
					<a>Projects</a>
					<a>Contact</a>
				</nav>
				<div className="text-9xl flex min-h-screen items-center justify-center overflow-y-hidden gap-x-36 col-span-2">
					<div className="font-lexend font-bold leading-snug">
						<h1>Learning</h1>
						<h1>Building</h1>
						<h1>Growing</h1>
					</div>
					<div className="flex items-center justify-center">
						<div className="w-[10px] h-[10px] absolute background-blur rounded-full"></div>{" "}
						<div
							ref={containerRef}
							className="w-[40rem] h-[40rem] z-10"
						></div>
					</div>
				</div>
			</div>
			<div>
				<h1>About Me</h1>
				<p>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Quis odio officiis placeat doloribus, assumenda tenetur
					maiores ea. Quam exercitationem, magni explicabo voluptate
					est debitis doloribus aliquid sed ullam cum veniam?
				</p>
			</div>
		</>
	);
};
export default ThreeScene;
