"use client"

import { GameState } from "@/app/_components/_dtos/gameState";
import { GameRender } from "./GameRender";
import { useRef, useEffect } from "react";
import { public_enviroments} from "@/app/_lib/public-envs";

interface PlayersScore {
    [key: string]: { score: number }; 
}

interface CanvaProps {
    actualGamaState: GameState | null;
    setActualGamaState: (data: GameState | null) => void;
    setScoreboard: (data: PlayersScore) => void;
    gameId: string;
}

export const Canva = ({
        actualGamaState,
        setActualGamaState,
        setScoreboard,
        gameId
    } : CanvaProps) => {
    const socketRef = useRef<WebSocket | null>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const game = new GameRender(canvasRef.current)

        const userId = localStorage.getItem("userId");
        const route = `${public_enviroments["game"]?.Socket}${public_enviroments["game"]?.ws["v1"]}`
        const endpoint = `/games/${gameId}/${userId}/`;
        const socket = new WebSocket(`${route}${endpoint}`);
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
                game.update(JSON.parse(data.game_state));
                setActualGamaState(data.game_state)
            }

            if (data.type === "game_finished") {
                //showModal(data.winner)
            }

            if (data.type === "update_score") {
                console.log(data.scoreboard as PlayersScore)
                setScoreboard(data.scoreboard as PlayersScore)
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
}