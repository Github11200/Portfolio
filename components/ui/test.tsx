"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stats } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import { AmbientLight, Mesh } from "three";

import * as THREE from "three";
import { PerspectiveCamera } from "@react-three/drei";

const Model = () => {
	const gltf = useLoader(GLTFLoader, "/book.glb");

	return (
		<>
			<primitive object={gltf.scene} scale={1} />
		</>
	);
};

export default function MeshComponent() {
	return (
		<Canvas>
			<Suspense fallback={null}>
				<ambientLight intensity={0.8} />
				<PerspectiveCamera
					fov={40}
					aspect={100 / 100}
					near={0.1}
					far={100}
				/>
				<OrbitControls />
				<Stats />
				<ambientLight intensity={0.1} />
				<Model />
				<OrbitControls />
			</Suspense>
		</Canvas>
	);
}
