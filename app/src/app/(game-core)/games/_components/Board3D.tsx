'use client'
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import * as THREE from 'three'
import type { Player, Ball, FieldAttributes, GameState } from '@/app/_components/_dtos/gameState'

export const Board3D: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const [current, setCurrent] = useState()
    let actualGamaState: GameState | null = null
    const params = useParams();
    let scene: any 
  
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
          scene = loader.parse(sceneJson.scene);
  
          let ball = scene.getObjectByName('Ball');
          let direction = new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
          const speed = 1.5; // unidades por segundo
  
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
  
      const upServer = (scene: THREE.Object3D<THREE.Object3DEventMap> | null, gameState: GameState, nowGameState: GameState) => {
          console.log(nowGameState)
          
          const { fieldAttributes, players, ball: serverBall } = gameState;
          const { fieldAttributes: actualFieldAttributes, players: actualPlayers, ball: actualServerBall } = nowGameState;
          const { width: fw, height: fh } = fieldAttributes;
          if (!scene)
              return
          // Escala lógica para unidade Three.js (suponha que 1 unidade = 1 metro ou o que fizer sentido)
          const scaleX = 1; // ou qualquer escala desejada
          const scaleZ = 1;
  
          // Ball
          const ballMesh = scene.getObjectByName('Ball');
          if (ballMesh) {
              ballMesh.translateX((actualServerBall.x - serverBall.x) * 0.1);
              ballMesh.translateZ((actualServerBall.y - serverBall.y) * 0.1);
              //ballMesh.translateZ((actualServerBall.x - serverBall.y) * 0.01); // y do servidor vira z aqui
              //ballMesh.scale.setScalar(serverBall.radius * 2); // diâmetro, se usar uma esfera unitária
          }
  
          // Paddle 1
          const leftPad = scene.getObjectByName('Pad 1');
          if (leftPad && players['1']) {
              const p = players['1'];
              const ap = actualPlayers['1'];
              leftPad.position.x = (ap.x - p.x) * scaleX;
              leftPad.position.z = (ap.y - p.y) * scaleZ;
          }
  
          // Paddle 2
          const rightPad = scene.getObjectByName('Pad 2');
          if (rightPad && players['2']) {
              const p = players['2'];
              rightPad.position.x = p.x * scaleX;
              rightPad.position.z = p.y * scaleZ;
  
              rightPad.scale.x = p.width * scaleX;
              rightPad.scale.z = p.height * scaleZ;
          }
      }
  
      const host = window.location.host;
      const userId = localStorage.getItem("userId");
      const gameId = params.game_id;
      const endpoint = `/api/v1/game-core/games/${gameId}/${userId}/`;
      const wsProtocol = window.location.protocol === "https:" ? "wss" : "ws";
  
      const socket = new WebSocket(`${wsProtocol}://${host}${endpoint}`);
      socketRef.current = socket;
  
      socket.onopen = () => {
          socket.send(JSON.stringify({
              type: "connect",
              headers: { "X-User-Id": userId }
          }));
      };
  
      socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
  
          if (data.type === "game.update") {
              const parsedGameState = JSON.parse(data.game_state);
              if (!actualGamaState) {
                actualGamaState = parsedGameState;
              }
              upServer(scene, parsedGameState, actualGamaState!);
              actualGamaState = parsedGameState;     
          }
  
          if (data.type === "game_finished") {
              alert(data.winner === userId ? "Você venceu!" : "Você perdeu!");
          }
      };
  
      socket.onclose = () => {
          console.log("WebSocket fechado");
      };
  
      socket.onerror = (error) => {
          console.error("WebSocket erro:", error);
      };
  
      const handleKeydown = (e: KeyboardEvent) => {
          if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
              socketRef.current.send(JSON.stringify({
                  direction: e.key,
                  headers: { "X-User-Id": userId }
              }));
          }
      };
  
      window.addEventListener("keydown", handleKeydown);
  
      return () => {
          window.removeEventListener("keydown", handleKeydown);
          socketRef.current?.close();
          if (renderer) {
              renderer.dispose();
          }
      };
    }, []);
  
    return <div ref={containerRef} />;
  };
  