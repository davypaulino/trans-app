"use client"

import { ModalComponent } from "@/app/_components/modal";
import PlayerScoreModal from "./PlayerScoreModal"
import {ComponentType, Dispatch, SetStateAction, SVGProps, useEffect, useState} from "react";
import { StarIcon } from "@heroicons/react/24/outline";
import { RoomResponseDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO";
import { ErrorResposeDto } from "@/app/_components/_dtos/userSession/ErrorResponseDto";
import { FaceFrownIcon } from "@heroicons/react/20/solid";
import { GetNormalRoom } from "@/app/_lib/_gateways/userSession/roomRepository";
import { Player } from "@/app/_components/_dtos/gameState";


interface GameFinish {
    title: string
    icon: ComponentType<SVGProps<SVGSVGElement>>
}

interface GameFinishProps {
    roomData: RoomResponseDTO | null;
    setRoomData: (data: RoomResponseDTO | null) => void;
    playerOneScore: number,
    playerTwoScore: number,
    gameFinish: boolean;
    setGameFinish: Dispatch<SetStateAction<boolean>>;
}

export const GameFinish = ({
       roomData,
       setRoomData,
       playerOneScore,
       playerTwoScore,
       gameFinish,
       setGameFinish}: GameFinishProps) => {
    const mockGameFinishResult = {
        title: "Você Venceu",
        icon: StarIcon,
    };

    const [gameFinishResult, setGameFinishResult] = useState<GameFinish>(mockGameFinishResult)
    
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

        const showModal = (winner: string) => {
            fetchRoom()
            setGameFinishResult({
                title: (winner === localStorage.getItem("userId") as string) ? "Você Venceu" : "Você Perdeu",
                icon: (winner === localStorage.getItem("userId") as string) ? StarIcon : FaceFrownIcon,
            });

            setGameFinish(true)
        }
        if (gameFinish)
            showModal(localStorage.getItem("userId") as string)
    }, [gameFinish])

    return (
        <ModalComponent
            title={gameFinishResult.title}
            open={gameFinish}
            setOpen={setGameFinish}
            icon={gameFinishResult.icon}
            description="Create your account and start play now.">
            <PlayerScoreModal roomData={roomData} playerOne={playerOneScore} playerTwo={playerTwoScore}/>
        </ModalComponent>
    );
}