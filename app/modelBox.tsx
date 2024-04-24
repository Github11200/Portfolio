import React from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera, useAnimations, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Stats, OrbitControls } from "@react-three/drei";

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

	const { nodes, materials } = useGLTF("/glb/book.glb");
	console.log(nodes);

	return (
		<Canvas flat linear>
			<color attach="background" args={["#fff"]} />
			<ambientLight intensity={0.5} />
			<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
			<pointLight position={[-10, -10, -10]} />
			<PerspectiveCamera />
			<OrbitControls />
			<group dispose={null}>
				<mesh
					castShadow
					receiveShadow
					//@ts-ignore
					geometry={nodes.Cube006.geometry}
					material={materials["Material.010"]}
					position={[-0.021, 25.793, 1.751]}
					rotation={[-0.354, -0.431, -0.221]}
					scale={5.893}
				/>
				<mesh
					castShadow
					receiveShadow
					//@ts-ignore
					geometry={nodes.Cube007.geometry}
					material={materials["Material.021"]}
					position={[-2.182, 25.114, 2.895]}
					rotation={[1.311, -0.2, 0.44]}
					scale={[6.033, 0.169, 5.893]}
				/>
				<mesh
					castShadow
					receiveShadow
					//@ts-ignore
					geometry={nodes.Plane006.geometry}
					material={materials["Material.023"]}
					position={[5.295, 29.537, 3.369]}
					rotation={[-2.996, -1.127, 2.01]}
					scale={0.84}
				/>
				<mesh
					castShadow
					receiveShadow
					//@ts-ignore
					geometry={nodes.Plane007.geometry}
					material={materials["Material.012"]}
					position={[5.121, 26.714, 3.293]}
					rotation={[-2.996, -1.127, 2.01]}
					scale={0.84}
				/>
				<mesh
					castShadow
					receiveShadow
					//@ts-ignore
					geometry={nodes.Plane008.geometry}
					material={materials["Material.008"]}
					position={[4.035, 24.565, 5.254]}
					rotation={[-2.996, -1.127, 2.01]}
					scale={0.84}
				/>
				<mesh
					castShadow
					receiveShadow
					//@ts-ignore
					geometry={nodes.Plane009.geometry}
					material={materials["Material.011"]}
					position={[3.82, 21.495, 5.226]}
					rotation={[-2.996, -1.127, 2.01]}
					scale={0.84}
				/>
			</group>
		</Canvas>
	);
};

useGLTF.preload("/glb/book.glb");
