"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ConfigTexture {
    map: THREE.Texture,
    displacement: THREE.Texture,
    metallic: THREE.Texture,
    normal: THREE.Texture,
    roughness: THREE.Texture
}

interface TextureRequest {
    path: string,
    textureName: string,
    loader: THREE.TextureLoader,
    parameters?: THREE.MeshPhongMaterialParameters
}

function configTexture(config: TextureRequest): ConfigTexture {
    const path: string = `${config.path}/${config.textureName}/`;
    const Textures = {
        map: config.loader.load(`${path}base.jpg`),
        displacement: config.loader.load(`${path}displacement.tiff`),
        metallic: config.loader.load(`${path}metallic.jpg`),
        normal: config.loader.load(`${path}normal.png`),
        roughness: config.loader.load(`${path}roughness.jpg`)
    }

    Object.values(Textures).forEach((texture) => {
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(5, 5);
    });

    return Textures;
}

const Background: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const renderer = new THREE.WebGLRenderer();
            renderer.setSize(window.innerWidth, window.innerHeight);
            mountRef.current?.appendChild(renderer.domElement);
            camera.position.z = 5;
            scene.background = new THREE.Color(0xF2F2F2);
            if (typeof window !== 'undefined') {
                // Load Texture with Error Handling
                const textureLoader = new THREE.TextureLoader();
                
                const bgTexture = configTexture({
                    path: "/assets/img",
                    textureName: "white",
                    loader: textureLoader
                });

                const bgGeometry = new THREE.PlaneGeometry(20, 15);
                const bgMaterial = new THREE.MeshPhysicalMaterial({
                    map: bgTexture.map,           // Textura de cor
                    displacementMap: bgTexture.displacement, // Relevo
                    displacementScale: 0.2,       // Intensidade do efeito de relevo
                    metalnessMap: bgTexture.metallic, // Define áreas metálicas
                    metalness: 0,                 // Mantém bem metálico
                    normalMap: bgTexture.normal,      // Define profundidade realista
                    roughnessMap: bgTexture.roughness, // Define áreas ásperas
                    roughness: 0.35,
                    transmission: 0,
                    opacity: 1                  // Ajuste global de rugosidade
                });

                const paddleTexture = textureLoader.load("/assets/img/paddle-texture.jpg", () => {
                    console.log("Paddle texture loaded");
                }, undefined, () => {
                    console.error("Failed to load paddle texture");
                });

                // Create Background Plane
                const backgroundMesh = new THREE.Mesh(bgGeometry, bgMaterial);
                backgroundMesh.position.z = -5; // Push it behind objects
                scene.add(backgroundMesh);

                // Create Ball with Repeating Texture
                const ballGeometry = new THREE.SphereGeometry(0.2, 64, 64);
                const ballMaterial = new THREE.MeshPhysicalMaterial({
                    map: paddleTexture,           // Textura de cor// Define áreas ásperas
                    roughness: 1,                  // Ajuste global de rugosidade
                });

                const ball = new THREE.Mesh(ballGeometry, ballMaterial);
                ball.castShadow = true;
                ball.receiveShadow = true;
                scene.add(ball);

                // Create Paddles
                const paddleGeometry = new THREE.BoxGeometry(0.5, 2, 0.2);
                const paddleMaterial = new THREE.MeshStandardMaterial({
                    map: paddleTexture,  // Apply texture
                    color: 0xffffff,     // Add base color (orange)
                    roughness: 0.4,      // Adjust surface smoothness
                    metalness: 0.0,      // Slight metallic effect
                });
                const paddleLeft = new THREE.Mesh(paddleGeometry, paddleMaterial);
                const paddleRight = new THREE.Mesh(paddleGeometry, paddleMaterial);

                paddleLeft.position.x = -4;
                paddleRight.position.x = 4;

                paddleLeft.castShadow = true;
                paddleRight.castShadow = true;
                paddleLeft.receiveShadow = true;
                paddleRight.receiveShadow = true;
                scene.add(paddleLeft, paddleRight);
                
                // Sunlight setup
                const sunlight = new THREE.DirectionalLight(0xfff8dc, 2); // Warmer & stronger light
                sunlight.position.set(10, 20, 10);
                sunlight.castShadow = true;
                
                // Improve shadow resolution
                sunlight.shadow.mapSize.width = 2048;
                sunlight.shadow.mapSize.height = 2048;
                
                // Add ambient light to soften shadows & brighten scene
                const ambientLight = new THREE.AmbientLight(0xffffff, 1.2); // Increase brightness
                scene.add(ambientLight);
                
                scene.add(sunlight);
                
                // Adjust exposure for better clarity
                renderer.toneMapping = THREE.ACESFilmicToneMapping;
                renderer.toneMappingExposure = 1.5;
                
                // Enable Shadows in Renderer
                renderer.shadowMap.enabled = true;
                renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                renderer.setPixelRatio(window.devicePixelRatio); // Improves rendering sharpness

                let ballSpeedX = 0.07, ballSpeedY = 0.05;

                function animate() {
                    requestAnimationFrame(animate);
                
                    // Ball movement
                    ball.position.x += ballSpeedX;
                    ball.position.y += ballSpeedY;
                
                    // Wall collision
                    if (ball.position.y > 2.5 || ball.position.y < -2.5) ballSpeedY *= -1;
                
                    // Paddle AI Movement (auto-track ball)
                    paddleLeft.position.y += (ball.position.y - paddleLeft.position.y) * 0.08; // Smooth tracking
                    paddleRight.position.y += (ball.position.y - paddleRight.position.y) * 0.08;
                
                    // Paddle collision
                    const paddleCollision =
                        (ball.position.x < paddleLeft.position.x + 0.3 && ball.position.x > paddleLeft.position.x - 0.3 &&
                            ball.position.y < paddleLeft.position.y + 1 && ball.position.y > paddleLeft.position.y - 1) ||
                        (ball.position.x < paddleRight.position.x + 0.3 && ball.position.x > paddleRight.position.x - 0.3 &&
                            ball.position.y < paddleRight.position.y + 1 && ball.position.y > paddleRight.position.y - 1);
                
                    if (paddleCollision) {
                        ballSpeedX *= -1.1; // Reverse direction & add slight acceleration
                    }
                
                    // Reset ball if out of bounds
                    if (ball.position.x > 5 || ball.position.x < -5) {
                        ball.position.set(0, 0, 0);
                        ballSpeedX = 0.07 * (Math.random() > 0.5 ? 1 : -1);
                        ballSpeedY = 0.05;
                    }
                
                    renderer.render(scene, camera);
                }                                

                animate();

                // Handle window resizing
                function resizeHandler() {
                    renderer.setSize(window.innerWidth, window.innerHeight);
                    camera.aspect = window.innerWidth / window.innerHeight;
                    camera.updateProjectionMatrix();
                }

                window.addEventListener("resize", resizeHandler);

                return () => {
                    window.removeEventListener("resize", resizeHandler);
                    mountRef.current?.removeChild(renderer.domElement);
                };
            }
        }
    }, []);

    return <div ref={mountRef} className="absolute inset-0 -z-10" />;
};

export default Background;
