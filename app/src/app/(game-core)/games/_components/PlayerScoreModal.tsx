import Link from "next/link";
import { PlayerItemSimple } from "./PlayerItemSimple";
import { RoomResponseDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO";

interface PlayerScoreModalProps {
    roomData: RoomResponseDTO | null;
    playerOne: number;
    playerTwo: number;
}

export default function PlayerScoreModal({roomData, playerOne, playerTwo}: PlayerScoreModalProps) {
    return (
        <div className="mx-auto">
            <div className="p-6 gap-2 flex justify-between items-center gap-10">
                <PlayerItemSimple player={roomData?.players[1]} score={playerOne}/>
                <p className="text-5xl font-semibold">X</p>
                <PlayerItemSimple player={roomData?.players[2]} score={playerTwo}/>
            </div>
            <div className="flex justify-center mt-6">
                <Link 
                    href="/home" 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                    Voltar para Home
                </Link>
            </div>
        </div>
    );
}