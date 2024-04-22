"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import { AmbientLight, Mesh } from "three";

import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

const Model = () => {
	const gltf = useLoader(GLTFLoader, "/book.gltf");

	return (
		<>
			<primitive object={gltf.scene} scale={0.4} />
		</>
	);
};

export default function MeshComponent() {
	const [ortho, set] = useState(false);

	return (
		<Canvas style={{ width: "50vw", height: "50vh" }}>
			<Suspense fallback={null}>
				<PerspectiveCamera
					position={[0, 0, 1.8]}
					fov={120}
					makeDefault={!ortho}
				/>
				<ambientLight intensity={0.1} />
				<Model />
				<OrbitControls />
			</Suspense>
		</Canvas>
	);
}
