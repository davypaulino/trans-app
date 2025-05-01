'use client'
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import type { Player, Ball, FieldAttributes, GameState } from '@/app/_components/_dtos/gameState'
import { PlayerItem } from "@/app/(user-session)/rooms/_components/_room/playerItem";
import { RoomResponseDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO";
import { ErrorResposeDto } from "@/app/_components/_dtos/userSession/ErrorResponseDto";
import { GetNormalRoom } from "@/app/_lib/_gateways/userSession/roomRepository";
import React from "react";

export const Board: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const socketRef = useRef<WebSocket | null>(null);
    const params = useParams();
    const [actualGamaState, setActualGamaState] = useState<GameState | null>(null)
    const [playerOneScore, setPlayerOneScore] = useState<number>(0)
    const [playerTwoScore, setPlayerTwoScore] = useState<number>(0)
    const [roomData, setRoomData] = useState<RoomResponseDTO | null>(null);

    const isRoomResponseDTO = (response: any): response is RoomResponseDTO => {
        return response && typeof response === "object" && "roomName" in response && "roomId" in response;
    };

    useEffect(() => {
        const fetchRoom = async () => {
            if (localStorage.getItem("roomCode")) {
                const response: RoomResponseDTO | ErrorResposeDto = await GetNormalRoom(localStorage.getItem("roomCode") as string);
                if (isRoomResponseDTO(response)) {
                    setRoomData(response);
                    return
                }
            }
        };

        fetchRoom()

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = 700;
        canvas.height = 400;

        const leftPaddle = { x: 0, y: 0, width: 0, height: 0 };
        const rightPaddle = { x: 0, y: 0, width: 0, height: 0 };
        const ball = { x: 0, y: 0, radius: 0 };

        const drawRect = (x: number, y: number, w: number, h: number, color: string) => {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, w, h);
        };

        drawRect(0, 0, canvas.width, canvas.height, "gray");

        const drawCircle = (x: number, y: number, radius: number, color: string) => {
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        };

        const render = () => {
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
                if (actualGamaState === null)
                    setActualGamaState(data.game_state)
                updateFromServer(JSON.parse(data.game_state));
                setActualGamaState(data.game_state)
            }

            if (data.type === "game_finished") {
                alert(data.winner === userId ? "Você venceu!" : "Você perdeu!");
            }

            if (data.type === "update_score") {
                console.log(data)
                if (data.playerColor === 1) {
                    setPlayerOneScore(data.playerScore)
                } 
                if (data.playerColor === 2) {
                    setPlayerTwoScore(data.playerScore)
                }
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
        <>
            <div>
                <canvas className="mx-auto" ref={canvasRef} style={{ display: "block" }} />
            </div>
            <div className="flex mt-2">
                <ScoreBoard playerScoreOne={playerOneScore} playerScoreTwo={playerTwoScore} match={roomData ?? null} />
            </div>
        </>
    );
};

interface ScoreBoardProps {
    match: RoomResponseDTO | null
    playerScoreOne: number
    playerScoreTwo: number
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({match, playerScoreOne, playerScoreTwo}) => {
    const numberOfPlayers = match
        ? Math.max(0, match.maxAmountOfPlayers - match.amountOfPlayers)
        : 2;

    const emptyPlayers = Array(numberOfPlayers).fill(null)
    const safePlayers = match
        ? [...match.players, ...emptyPlayers]
        : [...emptyPlayers];

    const middleIndex = Math.floor(safePlayers.length / 2);

    return (
        <ul className="flex gap-4 justify-center items-center p-2">
            {safePlayers.map((player, index) => (
                <React.Fragment key={`player-${index}`}>
                    {index === middleIndex && (
                        <>
                            <li className="m-0 text-4xl font-semibold text-white">{playerScoreOne}</li>
                            <li className="m-0 text-4xl font-semibold text-white">X</li>
                            <li className="m-0 text-4xl font-semibold text-white">{playerScoreTwo}</li>
                        </>
                    )}

                    {/* Renderizando cada jogador */}
                    <PlayerItem
                        showExit={false}
                        player={player}
                        roomCode={match?.roomCode}
                    />
                </React.Fragment>
            ))}
        </ul>
    );
}