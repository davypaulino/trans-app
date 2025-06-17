"use client"

import { RoomResponseDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO";
import { ErrorResposeDto } from "@/app/_components/_dtos/userSession/ErrorResponseDto";
import { GetNormalRoom } from "@/app/_lib/_gateways/userSession/roomRepository";
import { ScoreBoard } from "./ScoreBoard";
import { GameFinish } from "./GameFinish";
import { GameState } from "@/app/_components/_dtos/gameState";
import { Canva } from "./Canva";
import React, {useEffect, useRef, useState} from "react";
import { useParams } from "next/navigation";

interface PlayersScore {
    [key: string]: { score: number }; 
}

export const Board: React.FC = () => {
    const params = useParams();
    const gameId = params.game_id as string;
    const [roomData, setRoomData] = useState<RoomResponseDTO | null>(null);
    const [actualGamaState, setActualGamaState] = useState<GameState | null>(null)
    const [gameFinish, setGameFinish] = useState<boolean>(false)
    const [scoreboard, setScoreboard] = useState<PlayersScore>({
        "1": { score: 0 },
        "2": { score: 0 }
    });

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
        }

        fetchRoom();
    }, [gameId]);

    return (
        <>
            <Canva
                actualGamaState={actualGamaState}
                setActualGamaState={setActualGamaState}
                setScoreboard={setScoreboard}
                gameId={gameId}
                setGameFinish={setGameFinish}/>
            <div className="flex mt-2">
                <ScoreBoard playerScoreOne={scoreboard["1"]?.score} playerScoreTwo={scoreboard["2"]?.score} match={roomData ?? null} />
            </div>
            <GameFinish
                roomData={roomData}
                setRoomData={setRoomData}
                playerOneScore={scoreboard["1"]?.score}
                playerTwoScore={scoreboard["2"]?.score}
                gameFinish={gameFinish}
                setGameFinish={setGameFinish}
            />
        </>
    );
}
