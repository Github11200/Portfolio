"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import { AmbientLight, Mesh } from "three";

const Model = () => {
	const gltf = useLoader(GLTFLoader, "/book.gltf");

	return (
		<>
			<primitive object={gltf.scene} scale={0.4} />
		</>
	);
};

export default function MeshComponent() {
	return (
		<Canvas className="w-full h-full">
			<Suspense fallback={null}>
				<ambientLight intensity={0.1} />
				<Model />
				<OrbitControls />
			</Suspense>
		</Canvas>
	);
}
