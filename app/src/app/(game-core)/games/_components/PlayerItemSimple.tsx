import { PlayerItemInfoDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO"
import Image from "next/image";

interface PlayerItemSimpleProps {
    player?: PlayerItemInfoDTO
    score: number
}

export const PlayerItemSimple: React.FC<PlayerItemSimpleProps> = ({player, score}) => {
    return (
        <div className="flex flex-col justify-center items-center space-y-2">
            {/* Área do Jogador */}
            <div className="flex flex-col justify-center items-center">
                
                <Image 
                    className="mb-1 w-12 h-12 rounded-full object-cover" 
                    src={player ? player.urlProfileImage : "/assets/img/1.png"} 
                    alt={player ? player.name : ""} 
                    width={48} 
                    height={48} 
                />
                <p className="font-semibold">{player?.name}</p>
            </div>

            {/* Score */}
            <p className="text-sm flex items-center space-x-2">
                <span className="font-medium">Score:</span>
                <span className="bg-slate-200 px-2 py-1 rounded-md text-gray-800">
                    {score}
                </span>
            </p>
        </div>
    );
}