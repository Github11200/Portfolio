"use client";

import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";

import { PerspectiveCamera } from "@react-three/drei";

const Model = () => {
    const gltf = useLoader(GLTFLoader, "/book.glb");

    return (
        <>
            <primitive object={gltf.scene} scale={0.4} position={[1, 0.3, 0]} />
        </>
    );
};

export default function MeshComponent() {
    return (
        <Canvas>
            <Suspense fallback={null}>
                <ambientLight intensity={1.2} />
                <PerspectiveCamera
                    fov={100}
                    aspect={5}
                    near={0.1}
                    far={2000}
                ></PerspectiveCamera>
                <OrbitControls />
                <Model />
                <OrbitControls />
            </Suspense>
        </Canvas>
    );
}
