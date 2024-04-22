import React from "react";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as THREE from "three";
import { useEffect, useRef } from "react";
import { createRoot } from 'react-dom/client'
import { Canvas } from '@react-three/fiber'

export const ModelBox = () => {
	const containerRef = useRef<any>(null);
	const hasRenderedBefore = useRef<boolean>(true);

	useEffect(() => {
		if (!hasRenderedBefore.current) {
			const root: any = document.getElementById("container");
			createRoot(root).render(<ModelBox />);
			const scene = new THREE.Scene()
			let width = 100;
			let height = 100;
			const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
			
			const renderer = new THREE.WebGLRenderer()
			renderer.setSize(width, height)
			document.querySelector('#canvas-container')?.appendChild(renderer.domElement)
			
			const mesh = new THREE.Mesh()
			mesh.geometry = new THREE.BoxGeometry()
			mesh.material = new THREE.MeshStandardMaterial()
			
			scene.add(mesh)
			
			function animate() {
			  requestAnimationFrame(animate)
			  renderer.render(scene, camera)
			}
			
			animate()
		} else {
			hasRenderedBefore.current = false;
		}
	}, []);

	return <div ref={containerRef} id="container" className="w-[40rem] h-[40rem] z-10">
		<Canvas>
			<ambientLight intensity={0.1} />
  			<directionalLight color="red" position={[0, 0, 5]} />
			<mesh>
				<boxGeometry />
				<meshStandardMaterial />
			</mesh>
		</Canvas>
	</div>;
};