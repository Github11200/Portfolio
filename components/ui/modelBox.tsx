"use client";

import {
	Canvas,
	MeshProps,
	PrimitiveProps,
	useFrame,
	useLoader,
} from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";

import { PerspectiveCamera } from "@react-three/drei";

const Model = () => {
	const gltf = useGLTF("/book.glb");
	const test = useRef<any>();

	useFrame((state) => {
		state.camera.updateProjectionMatrix();
	});

	return (
		<>
			<Suspense fallback={null}>
				<ambientLight intensity={1.2} />
				<PerspectiveCamera
					fov={30}
					aspect={1}
					near={0.1}
					far={2000}
				></PerspectiveCamera>
				<OrbitControls />
				<mesh ref={test}>
					<primitive
						object={gltf.scene}
						scale={0.4}
						position={[1, 0.3, 0]}
					/>
				</mesh>
				<OrbitControls />
			</Suspense>
		</>
	);
};

export default function MeshComponent() {
	return (
		<Canvas>
			<Model />
		</Canvas>
	);
}
