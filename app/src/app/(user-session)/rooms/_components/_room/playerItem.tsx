import { PlayerItemInfoDTO, EPrimaryColors } from "@/app/_components/_dtos/userSession/RoomResponseDTO";
import { XCircleIcon, NoSymbolIcon, UserCircleIcon, TagIcon, ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { MinusCircleIcon } from "@heroicons/react/20/solid";
import { DS } from '@/app/_components/ds';
import React from "react";

interface PlayeritemProps {
    player?: PlayerItemInfoDTO
    showExit: boolean
    className?: string
}

export const PlayerItem: React.FC<PlayeritemProps> = ({player, className, showExit}) => {
    if (!player) return (<PlayerItemLabel />);

    const { border, text } = DS.playerColors[EPrimaryColors[player.color]] ?? {
        border: "border-gray-400 hover:border-gray-600",
        text: "text-gray-400"
    };

    return (
        <li className={`${className} p-2 bg-slate-200 flex justify-between items-center rounded-lg`}>
            <div className={`flex items-center gap-2`}>
                <img 
                src={player.urlProfileImage} 
                alt='oi'
                className={`w-10 h-10 rounded-full object-cover border-4 ${border}`}
                />
                <div>
                    <p className="text-sm text-bold">{player.name}</p>
                    <div className="text-xs flex gap-2 items-center">
                        <p>{EPrimaryColors[player.color]}</p> |
                        {player.you ? <MinusCircleIcon className={`${text} h-4 w-4`}/> : "" }
                    </div>
                </div>
            </div>
            { player.owner ? <IdentityIcon /> : showExit ? <ExitButton /> : "" }
        </li>
    );
}

const ExitButton = () => {
    return (
        <button className={`rounded-full flex items-center bg-slate-300 hover:bg-rose-300 p-1 transition ease-in duration-200 hover:scale-102`}>
            <XCircleIcon className="w-6 h-6" />
        </button>
    );
}

const IdentityIcon = () => {
    return (
        <div className="rounded-full flex items-center bg-slate-300 p-1">
            <TagIcon className="w-6 h-6" />
        </div>
    );
}

const PlayerItemLabel = () => {
    return (
        <li className="animate-pulse p-2 bg-gray-200 flex justify-between items-center rounded-lg">
            <div className="flex gap-2">
                <div
                className="bg-slate-400 w-10 h-10 flex items-center justify-center rounded-full object-cover border-lg border-gray-400"
                >
                    <UserCircleIcon className="text-slate-200 w-8 h-8"/>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="bg-slate-400 rounded-sm h-3 w-20"></div>
                    <div className="bg-slate-400 rounded-sm h-3 w-30"></div>
                </div>
            </div>
            <div className="rounded-full flex items-center bg-slate-400 p-1">
                <NoSymbolIcon className="text-slate-200 w-6 h-6" />
            </div>
        </li>
    );
}