"use client"

import { GameState } from "@/app/_components/_dtos/gameState";
import { GameRender } from "./GameRender";
import React, {useRef, useEffect, ReactElement, Children, isValidElement, Dispatch, SetStateAction} from "react";
import { public_enviroments} from "@/app/_lib/public-envs";

interface PlayersScore {
    [key: string]: { score: number }; 
}

interface CanvaProps {
    actualGamaState: GameState | null;
    setActualGamaState: (data: GameState | null) => void;
    setScoreboard: (data: PlayersScore) => void;
    gameId: string;
    setGameFinish: Dispatch<SetStateAction<boolean>>
}

export const Canva = ({
        actualGamaState,
        setActualGamaState,
        setScoreboard,
        gameId,
        setGameFinish
    } : CanvaProps) => {
    const socketRef = useRef<WebSocket | null>(null);
    const boardGameRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = boardGameRef.current

        if (!canvas) {
            console.warn("Canva useEffect: Canvas element is not yet available.");
            return;
        }

        const game = new GameRender(canvas)

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
                game?.update(JSON.parse(data.game_state));
                setActualGamaState(data.game_state)
            }

            if (data.type === "game_finished") {
                setGameFinish(true);
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
            console.log("handleKeydown", 82);
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
    }, [gameId]);

    return (
        <div className="flex justify-center items-center">
            <canvas
                ref={boardGameRef}
                width={700}
                height={400}
                className="mx-auto"
                style={{
                    display: 'block',
                    border: '4px solid #333',
                    backgroundColor: '#3564f0'
                }}
            >
                Seu navegador não suporta o elemento canvas.
            </canvas>
        </div>
    );
}