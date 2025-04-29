'use client'
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import * as THREE from 'three'; 

export default function Page() {
    return (
        <div className="container mx-auto bg-slate-300 flex justify-center items-center">
            <div className="bg-slate-500">
                <PongGame />
            </div>
        </div>
    );
}

interface Ball {
    x: number;
    y: number;
    radius: number;
}

interface Player {
    user_id: string;
    color: number;
    x: number;
    y: number;
    width: number;
    height: number;
}

interface FieldAttributes {
    height: number;
    width: number;
}

type PlayerMap = {
    [key: string]: Player;
}

type GameStatus = 'PLAYING' | 'PAUSED' | 'ENDED' | string;

interface GameState {
    ball: Ball;
    players: PlayerMap;
    numberOfPlayers: number;
    fieldAttributes: FieldAttributes;
    gameStatus: GameStatus;
    lastPlayerHit: Player;
}

const PongGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const params = useParams();
    const [scene, setScene] = useState<THREE.Object3D<THREE.Object3DEventMap> | null>(null)
    const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null)
    const [actualGamaState, setActualGamaState] = useState<GameState | null>(null)

    useEffect(() => {
        let renderer: THREE.WebGLRenderer;
        const init = async () => {
            if (!containerRef.current) return;

            const width = 700;
            const height = 400;

            renderer = new THREE.WebGLRenderer({antialias: true})
            renderer.setSize(width, height)
            renderer.shadowMap.enabled = true;
            containerRef.current.appendChild(renderer.domElement)

            const response = await fetch('/app.json');
            const sceneJson = await response.json();

            const loader = new THREE.ObjectLoader();
            let s = loader.parse(sceneJson.scene);
            setScene(s)

            let ball = scene?.getObjectByName('Ball');
            let direction = new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
            const speed = 1.5; // unidades por segundo

            const cameraObj = scene?.getObjectByName('PerspectiveCamera');
            let c: THREE.PerspectiveCamera;
            setCamera(camera)
            if (cameraObj && cameraObj instanceof THREE.PerspectiveCamera) {
                setCamera(cameraObj);
            } else {
                setCamera(new THREE.PerspectiveCamera(75, width / height, 0.1, 1700));
                camera ? camera.position.z = 5 : 0;
            }

            // Update camera aspect ratio
            camera ? camera.aspect = width / height : "";
            camera?.updateProjectionMatrix();

            // Animate
            const clock = new THREE.Clock();
            const animate = () => {          
                requestAnimationFrame(animate);
                if (scene && camera)
                    renderer.render(scene, camera);
            };
            animate();
        }

        init()

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Tamanho fixo
        canvas.width = 700;
        canvas.height = 400;

        const leftPaddle = { x: 0, y: 0, width: 0, height: 0 };
        const rightPaddle = { x: 0, y: 0, width: 0, height: 0 };
        const ball = { x: 0, y: 0, radius: 0 };

        const drawRect = (x: number, y: number, w: number, h: number, color: string) => {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, w, h);
        };

        const drawCircle = (x: number, y: number, radius: number, color: string) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        };

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawRect(0, 0, canvas.width, canvas.height, "gray");
            drawRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height, "red");
            drawRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height, "blue");
            drawCircle(ball.x, ball.y, ball.radius, "yellow");
        };

        const upServer = (scene: THREE.Object3D<THREE.Object3DEventMap> | null, gameState: GameState) => {
            const { fieldAttributes, players, ball: serverBall } = gameState;
            if (actualGamaState) {
                const { fieldAttributes: actualFieldAttributes, players: actualPlayers, ball: actualServerBall } = actualGamaState;
                const { width: fw, height: fh } = fieldAttributes;
                if (!scene)
                    return
                // Escala lógica para unidade Three.js (suponha que 1 unidade = 1 metro ou o que fizer sentido)
                const scaleX = 1; // ou qualquer escala desejada
                const scaleZ = 1;
                
                // Ball
                const ballMesh = scene.getObjectByName('Ball');
                if (ballMesh) {
                    ballMesh.position.x = actualServerBall.x - serverBall.x * scaleX;
                    ballMesh.position.z = serverBall.y * scaleZ; // y do servidor vira z aqui
                    ballMesh.scale.setScalar(serverBall.radius * 2); // diâmetro, se usar uma esfera unitária
                }
                
                // Paddle 1
                const leftPad = scene.getObjectByName('Pad 1');
                if (leftPad && players['1']) {
                    const p = players['1'];
                    leftPad.position.x = p.x * scaleX;
                    leftPad.position.z = p.y * scaleZ;
                    
                    leftPad.scale.x = p.width * scaleX;
                    leftPad.scale.z = p.height * scaleZ;
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
        }

        const updateFromServer = (gameState: GameState) => {
            const { fieldAttributes, players, ball: serverBall } = gameState;
            const { width: fw, height: fh } = fieldAttributes;

            // Escala lógica -> pixel
            const scaleX = canvas.width / fw;
            const scaleY = canvas.height / fh;

            // Ball
            ball.x = ((serverBall.x + fw / 2) * scaleX);
            ball.y = ((fh / 2 - serverBall.y) * scaleY);
            ball.radius = serverBall.radius * scaleX;

            // Paddles
            if (players['1']) {
                const p = players['1'];
                leftPaddle.width = p.width * scaleX;
                leftPaddle.height = p.height * scaleY;
                leftPaddle.x = ((p.x + fw / 2) * scaleX) - (leftPaddle.width / 2);
                leftPaddle.y = ((fh / 2 - p.y) * scaleY) - (leftPaddle.height / 2);
            }

            if (players['2']) {
                const p = players['2'];
                rightPaddle.width = p.width * scaleX;
                rightPaddle.height = p.height * scaleY;
                rightPaddle.x = ((p.x + fw / 2) * scaleX) - (rightPaddle.width / 2);
                rightPaddle.y = ((fh / 2 - p.y) * scaleY) - (rightPaddle.height / 2);
            }

            render();
        };

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
                if (actualGamaState === null)
                    setActualGamaState(data.game_state)
                updateFromServer(JSON.parse(data.game_state));
                upServer(scene, JSON.parse(data.game_state));
                setActualGamaState(data.game_state)
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

    return (
        <>
            <div>
                <canvas className="mx-auto" ref={canvasRef} style={{ display: "block" }} />
            </div>
            <ThreeScene />;
        </>
    );
};


const ThreeScene: React.FC = () => {
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
