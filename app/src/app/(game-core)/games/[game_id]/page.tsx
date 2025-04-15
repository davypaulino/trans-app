'use client'
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";

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
    const socketRef = useRef<WebSocket | null>(null);
    const params = useParams();

    useEffect(() => {
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
                updateFromServer(JSON.parse(data.game_state));
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
        };
    }, []);

    return (
        <div>
            <canvas className="mx-auto" ref={canvasRef} style={{ display: "block" }} />
        </div>
    );
};
