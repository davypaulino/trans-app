'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let renderer: THREE.WebGLRenderer;

    const init = async () => {
      if (!containerRef.current) return;

      // Renderer
      const width = 700;
      const height = 400;
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(width, height);
      renderer.shadowMap.enabled = true;
      containerRef.current.appendChild(renderer.domElement);

      // Load app.json from public folder
      const response = await fetch('/app.json');
      const sceneJson = await response.json();

      const loader = new THREE.ObjectLoader();
      const scene = loader.parse(sceneJson.scene);

      // Get camera
      const cameraObj = scene.getObjectByName('PerspectiveCamera');
      let camera: THREE.PerspectiveCamera;

      if (cameraObj && cameraObj instanceof THREE.PerspectiveCamera) {
        camera = cameraObj;
      } else {
        camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1700);
        camera.position.z = 5;
      }

      // Update camera aspect ratio
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      // Animate
      const clock = new THREE.Clock();
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
    };

    init();

    return () => {
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return <div ref={containerRef} />;
};

export default function Page() {
  return <ThreeScene />;
}
