import React from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

interface ModelParameters {
	modelName: string;
}

export const ModelBox = ({ modelName }: ModelParameters) => {
	const containerRef = useRef<any>(null);
	// const hasRenderedBefore = useRef<boolean>(true);

	// useEffect(() => {
	// 	if (!hasRenderedBefore.current) {
	// 		const scene = new THREE.Scene();
	// 		scene.background = null;

	// 		const camera = new THREE.PerspectiveCamera(
	// 			20,
	// 			containerRef.current?.clientHeight /
	// 				containerRef.current?.clientWidth,
	// 			0.1,
	// 			2000
	// 		);
	// 		const renderer = new THREE.WebGLRenderer({ alpha: true });
	// 		renderer.setClearColor(0x000000, 0);
	// 		const controls = new OrbitControls(camera, renderer.domElement);
	// 		controls.enablePan = false;
	// 		controls.enableZoom = false;
	// 		const light = new THREE.AmbientLight(0xffffff, 2); // soft white light
	// 		scene.add(light);

	// 		let model: THREE.Group<THREE.Object3DEventMap>;

	// 		// Add this function inside the useEffect hook
	// 		const renderScene = () => {
	// 			requestAnimationFrame(renderScene);
	// 			renderer.render(scene, camera);
	// 		};

	// 		const loader = new GLTFLoader();
	// 		loader.load(modelName, (gltf) => {
	// 			model = gltf.scene;
	// 			console.log(model);

	// 			let box = new THREE.Box3().setFromObject(gltf.scene);

	// 			const c = box.getCenter(new THREE.Vector3());
	// 			const size = box.getSize(new THREE.Vector3());
	// 			gltf.scene.position.set(-c.x, size.y / 2 - c.y - 8.5, -c.z);

	// 			gltf.scene.castShadow = true;
	// 			gltf.scene.receiveShadow = true;

	// 			gltf.scene.customDepthMaterial = new THREE.MeshStandardMaterial(
	// 				{
	// 					opacity: 0,
	// 					transparent: true,
	// 				}
	// 			);

	// 			scene.add(gltf.scene);

	// 			// Call the renderScene function to start the animation loop
	// 			controls.update();
	// 			renderer.render(scene, camera);
	// 			renderScene();
	// 		});

	// 		renderer.setSize(
	// 			containerRef.current?.clientHeight,
	// 			containerRef.current?.clientWidth
	// 		);
	// 		containerRef.current?.appendChild(renderer.domElement);
	// 		camera.position.y -= 55;
	// 	} else {
	// 		hasRenderedBefore.current = false;
	// 	}
	// }, []);

	const { nodes, animations } = useGLTF("/glb/book.glb");

	return (
		<Canvas>
			<color attach="background" args={["#000"]} />
			<ambientLight intensity={0.5} />
			<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
			<pointLight position={[-10, -10, -10]} />
			<PerspectiveCamera />
			<mesh>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial color={"orange"} />
			</mesh>
			<mesh position={[5, 0, 0]}>
				<boxGeometry args={[1, 1, 1]} />
				<meshStandardMaterial color={"red"} />
			</mesh>
		</Canvas>
	);
};