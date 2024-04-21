"use client";

import React, { useRef, useEffect, useState } from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";
import Image from "next/image";
import { CardWrapper } from "@/components/ui/cardWrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";

import Autoplay from "embla-carousel-autoplay";
import { ModelBox } from "@/components/ui/modelBox";

interface ContactObject {
	svgName: string;
	link: string;
}

interface GlowPosition {
	mouseX: number;
	mouseY: number;
}

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
			controls.enablePan = false;
			controls.enableZoom = false;
			const light = new THREE.AmbientLight(0xffffff, 2); // soft white light
			scene.add(light);

			let model: THREE.Group<THREE.Object3DEventMap>;

			// Add this function inside the useEffect hook
			const renderScene = () => {
				requestAnimationFrame(renderScene);
				renderer.render(scene, camera);
			};

			const loader = new GLTFLoader();
			loader.load("book.gltf", (gltf) => {
				model = gltf.scene;

				let box = new THREE.Box3().setFromObject(gltf.scene);
				let parent = new THREE.Object3D();
				scene.add(parent);

				const c = box.getCenter(new THREE.Vector3());
				const size = box.getSize(new THREE.Vector3());
				gltf.scene.position.set(-c.x, size.y / 2 - c.y - 8.5, -c.z);

				gltf.scene.castShadow = true;
				gltf.scene.receiveShadow = true;

				gltf.scene.customDepthMaterial = new THREE.MeshStandardMaterial(
					{
						opacity: 0,
						transparent: true,
					}
				);

				parent.add(gltf.scene);
				parent.rotation.x += 20;
				parent.rotation.x += 0.2;

				// Call the renderScene function to start the animation loop
				controls.update();
				renderer.render(scene, camera);
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

	const skillsIconsSvgNames = [
		"css.svg",
		"git.svg",
		"html.svg",
		"javascript.svg",
		"nodejs.svg",
		"python.svg",
		"react.svg",
		"rust.svg",
		"tailwindcss.svg",
		"c++.svg",
	];

	const contactSvgNames: Array<ContactObject> = [
		{
			svgName: "linkedin",
			link: "https://www.linkedin.com/in/jinay-patel-6369002b4/",
		},
		{
			svgName: "discord",
			link: "https://discordapp.com/users/904515875615420426",
		},
		{
			svgName: "github",
			link: "https://github.com/Github11200",
		},
	];

	const [glowPosition, updateGlowPosition] = useState<GlowPosition>({
		mouseX: 0,
		mouseY: 0,
	});

	const [style, updateStyle] = useState<React.CSSProperties>({
		boxShadow: "0px 0px 500px 200px rgb(67, 176, 254)",
	});

	setTimeout(() => {
		updateStyle({ boxShadow: "0px 0px 500px 200px rgb(0, 0, 0)" });
	}, 1000);

	const updateShadowPosition = (
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) => {
		updateGlowPosition({ mouseX: event.pageX, mouseY: event.pageY });
	};

	const spaceBetweenItemsInsideSectionsInPixels = 80;

	return (
		<div onMouseMove={(event) => updateShadowPosition(event)}>
			<div
				className="absolute mouse-blur z-[-10]"
				style={{
					top: glowPosition.mouseY,
					left: glowPosition.mouseX,
				}}
			></div>
			<div className="grid grid-cols-2 overflow-y-hidden justify-items-center">
				<nav className="border-[1px] border-l-border flex items-center h-16 w-[40rem] justify-center gap-x-16 text-center rounded-lg col-span-2 my-5 font-lexend shadow-2xl shadow-slate-900 text-xl">
					<a>Home</a>
					<a>Projects</a>
					<a>Contact</a>
				</nav>
				<div className="text-9xl flex min-h-screen items-center justify-center overflow-y-hidden gap-x-36 col-span-2 bottom-10">
					<div className="font-lexend font-bold leading-snug">
						<h1>Learning</h1>
						<h1>Building</h1>
						<h1>Growing</h1>
					</div>
					<div className="flex items-center justify-center">
						<div
							className="w-[10px] h-[10px] absolute rounded-full"
							style={style}
						></div>{" "}
						<Carousel
							opts={{
								align: "start",
								loop: true,
							}}
							className="w-[40rem]"
							plugins={[
								Autoplay({
									delay: 2000,
								}),
							]}
						>
							<CarouselContent>
								<CarouselItem>
									<div className="p-1">
										<ModelBox modelName="book.gltf" />
									</div>
								</CarouselItem>
								<CarouselItem>
									<div className="p-1">
										<ModelBox modelName="book.gltf" />
									</div>
								</CarouselItem>
								<CarouselItem>
									<div className="p-1">
										<ModelBox modelName="book.gltf" />
									</div>
								</CarouselItem>
							</CarouselContent>
						</Carousel>
					</div>
				</div>
			</div>
			<div className="grid gap-64 pb-24">
				<div className="w-[800px] mx-auto">
					<h1
						className="text-7xl font-lexend font-bold text-center"
						style={{
							marginBottom:
								spaceBetweenItemsInsideSectionsInPixels,
						}}
					>
						About Me
					</h1>
					<p className="text-2xl font-lexend font-light leading-relaxed">
						Hi 👋! I&apos;m Jinay Patel, a grade 10 student with a
						passion for all things related to STEM. I mainly
						specialize in full-stack web development, but have also
						started delving a lot into machine learning with
						PyTorch.
					</p>
				</div>
				<div className="w-[60%] mx-auto">
					<h1
						className="text-7xl font-lexend font-bold text-center"
						style={{
							marginBottom:
								spaceBetweenItemsInsideSectionsInPixels,
						}}
					>
						Skills
					</h1>
					<div
						className={cn(
							`grid w-9/12 mx-auto gap-12 justify-items-center grid-cols-5 grid-cols-${Math.round(
								skillsIconsSvgNames.length / 2
							)}`
						)}
					>
						{skillsIconsSvgNames.map((object, index) => {
							return (
								<Image
									src={"logos/" + object}
									height={120}
									width={120}
									alt={object + "logo"}
									key={index}
									className="place-self-center button-hover"
								/>
							);
						})}
					</div>
				</div>
				<div className="w-[800px] mx-auto">
					<h1
						className="text-7xl font-lexend font-bold text-center"
						style={{
							marginBottom:
								spaceBetweenItemsInsideSectionsInPixels,
						}}
					>
						Projects
					</h1>
					<div className="text-center grid grid-cols-2 justify-items-center gap-32">
						<CardWrapper
							title="Pure Pursuit Simulator"
							image="theMentalLeaf.svg"
							description="This is a hackathon project I made with my friend related to mental health."
							link="https://youtube.com"
						/>
						{/* <CardWrapper
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
						/> */}
					</div>
				</div>

				<div className="w-[800px] mx-auto">
					<h1
						className="text-7xl font-lexend font-bold text-center"
						style={{
							marginBottom:
								spaceBetweenItemsInsideSectionsInPixels,
						}}
					>
						Contact
					</h1>
					<div className="flex justify-center gap-x-32 overflow-y-hidden">
						{contactSvgNames.map((object, index) => {
							return (
								<Link
									href={object.link}
									className="flex justify-center items-center"
									key={index}
								>
									<div
										className={`${object.svgName}-shadow`}
									></div>
									<Image
										src={`logos/${object.svgName}.svg`}
										width={100}
										height={100}
										alt={`${object.svgName} logo`}
										className="z-10 button-hover"
									/>
								</Link>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};
export default ThreeScene;
