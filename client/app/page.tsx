"use client";

import React, { useRef, useEffect } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";
import Image from "next/image";
import { CardWrapper } from "@/components/ui/cardWrapper";

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

	const svgNames = [
		"css.svg",
		"git.svg",
		"html.svg",
		"javascript.svg",
		"nodejs.svg",
		"python.svg",
		"react.svg",
		"rust.svg",
		"tailwindcss.svg",
	];

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
			<div className="grid gap-32">
				<div className="w-[800px] mx-auto">
					<h1 className="text-7xl font-lexend font-bold text-center mb-10">
						About Me
					</h1>
					<p className="text-2xl font-lexend font-light leading-relaxed">
						Hi 👋! I&apos;m a grade 10 student with a passion for
						all things related to STEM. I mainly specialize in
						full-stack web development, but have also started
						delving a lot into machine learning with PyTorch.
					</p>
				</div>
				<div className="w-[60%] mx-auto">
					<h1 className="text-7xl font-lexend font-bold text-center mb-10">
						Skills
					</h1>
					<div
						className={
							"grid w-9/12 mx-auto gap-y-5 justify-items-center " +
							`grid-cols-${Math.round(svgNames.length / 2)}`
						}
					>
						{svgNames.map((object, index) => {
							return (
								<Image
									src={"logos/" + object}
									height={100}
									width={100}
									alt={object + "logo"}
									key={index}
									className="place-self-center"
								/>
							);
						})}
					</div>
				</div>
				<div className="w-[800px] mx-auto">
					<h1 className="text-7xl font-lexend font-bold text-center mb-10">
						Projects
					</h1>
					<div className="text-center grid grid-cols-2 justify-items-center gap-32 mt-20">
						<CardWrapper
							title="The Mental Leaf"
							image="theMentalLeaf.svg"
							description="This is a hackathon project I made with my friend related to mental health."
						/>
						<CardWrapper
							title="The Mental Leaf"
							image="theMentalLeaf.svg"
							description="This is a hackathon project I made with my friend related to mental health."
						/>
						<CardWrapper
							title="The Mental Leaf"
							image="theMentalLeaf.svg"
							description="This is a hackathon project I made with my friend related to mental health."
						/>
						<CardWrapper
							title="The Mental Leaf"
							image="theMentalLeaf.svg"
							description="This is a hackathon project I made with my friend related to mental health."
						/>
					</div>
				</div>

				<div className="w-[800px] mx-auto">
					<h1 className="text-7xl font-lexend font-bold text-center mb-10">
						Contact
					</h1>
					<div className="flex justify-center gap-x-10">
						<Image
							src="logos/linkedin.svg"
							width={200}
							height={200}
							alt="Linkedin logo"
							className="logo-shadow"
						/>
						<Image
							src="logos/discord.svg"
							width={200}
							height={200}
							alt="Linkedin logo"
						/>
						<Image
							src="logos/github.svg"
							width={200}
							height={200}
							alt="Linkedin logo"
						/>
					</div>
				</div>
			</div>
		</>
	);
};
export default ThreeScene;
