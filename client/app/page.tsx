"use client";

import React, { useRef, useEffect } from 'react';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasRenderedBefore = useRef<boolean>(true);

  useEffect(() => {
    if (typeof window !== 'undefined' && !hasRenderedBefore.current) {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("skyblue");
      const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 2000);
      const renderer = new THREE.WebGLRenderer();
      const controls = new OrbitControls( camera, renderer.domElement );
      const light = new THREE.AmbientLight( 0xffffff, 1 ); // soft white light
      scene.add( light );

      // Add this function inside the useEffect hook
      const renderScene = () => {
        renderer.render(scene, camera);
        requestAnimationFrame(renderScene);
      };

      const loader = new FBXLoader();
      loader.load("goofy.fbx", (object) => {
        scene.add(object);
        // Call the renderScene function to start the animation loop
        renderScene();
      })

      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current?.appendChild(renderer.domElement);
      camera.position.z += 5;
    } else {
      hasRenderedBefore.current = false;
    }
  }, []);

  return <div ref={containerRef}></div>;
};
export default ThreeScene;