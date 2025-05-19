"use client"

import { RoomResponseDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO";
import { ErrorResposeDto } from "@/app/_components/_dtos/userSession/ErrorResponseDto";
import { GetNormalRoom } from "@/app/_lib/_gateways/userSession/roomRepository";
import { ScoreBoard } from "./ScoreBoard";
import { GameFinish } from "./GameFinish";
import { GameState } from "@/app/_components/_dtos/gameState";
import { Canva } from "./Canva";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

interface PlayersScore {
    [key: string]: { score: number }; 
}

export const Board: React.FC = () => {
    let roomData: RoomResponseDTO | null = null;
    const params = useParams();
    const [actualGamaState, setActualGamaState] = useState<GameState | null>(null)
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
                    roomData = await response;
                    return
                }
            }
        }

        fetchRoom();
    }, []);

    return (
        <>
            <Canva
                actualGamaState={actualGamaState}
                setActualGamaState={setActualGamaState}
                setScoreboard={setScoreboard}
                gameId={params.game_id as string}  />
            <div className="flex mt-2">
                <ScoreBoard playerScoreOne={scoreboard["1"]?.score} playerScoreTwo={scoreboard["0"]?.score} match={roomData ?? null} />
            </div>
            {/* <GameFinish roomData={roomData} setRoomData={setRoomData} playerOneScore={scoreboard["1"]?.score} playerTwoScore={scoreboard["0"]?.score}/> */}
        </>
    );
}
