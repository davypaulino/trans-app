import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { MatchItemPlayer, MatchItemComponent } from '@/app/(user-session)/rooms/_components/matchItem'
import { EPrimaryColors, RoomResponseDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO";
import { MatchPlayers } from '@/app/(user-session)/rooms/_components/_room/matchPlayers'
import { ERoomType } from "@/app/_lib/RoomType";
import { BsCopy } from "react-icons/bs";
import React from "react";

interface response {
    player_one: MatchItemPlayer,
    player_two: MatchItemPlayer
}

const items: response[] = [
    {
        player_one: {
            name: "davy",
            color: "red",
            position: 1,
            score: 10,
            url: "/assets/img/1.png",
        },
        player_two: {
            name: "bea",
            color: "sky",
            position: 2,
            score: 8,
            url: "/assets/img/2.png",
        }
    },
    {
        player_one: {
            name: "bictor",
            color: "red",
            position: 1,
            score: 10,
            url: "/assets/img/1.png",
        },
        player_two: {
            name: "cladia",
            color: "sky",
            position: 2,
            score: 8,
            url: "/assets/img/2.png",
        }
    }
]

const response: RoomResponseDTO = {
    roomCode: "82d49f69",
    roomName: "Selva",
    roomType: 0,
    maxAmountOfPlayers: 4,
    amountOfPlayers: 3,
    owner: EPrimaryColors.red,
    players: [
        {
            name: "Alice",
            color: EPrimaryColors.red,
            urlProfileImage: "https://randomuser.me/api/portraits/women/1.jpg",
            you: false
        },
        {
            name: "Bob",
            color: EPrimaryColors.green,
            urlProfileImage: "https://randomuser.me/api/portraits/men/2.jpg",
            you: true
        },
        {
            name: "Charlie",
            color: EPrimaryColors.yellow,
            urlProfileImage: "https://randomuser.me/api/portraits/men/3.jpg",
            you: false
        },
    ]
}

interface MatchRoomProps {
    match: RoomResponseDTO
}

export const MatchRoom: React.FC<MatchRoomProps> = ({match}) => {
    return (
        <>
        <div className="flex items-center w-full justify-between mb-6">
            <div>
                <div className="flex gap-4 items-start justify-start">
                    <h1 className="text-3xl text-bold">{ERoomType[match.roomType]}: {match.roomName}</h1>
                    <button className="flex gap-2 items-start text-xs bg-slate-900 hover:bg-slate-700 py-1 px-2 rounded-full text-slate-100 hover:animate-pulse">
                        <BsCopy />
                        <span>{match.roomCode}</span>
                    </button>
                </div>
                <p className="text-sm">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet   </p>
            </div>
            <div className="flex gap-1">
                <h1 className="text-6xl">{match.amountOfPlayers}/{match.maxAmountOfPlayers}</h1>
                <p className="text-xs">number<br />of players</p>
            </div>
        </div>
        <div  className="flex justify-center items-stretch h-[80vh]">
            <div className="h-full flex flex-col w-1/2 p-6">
                <MatchPlayers match={match} />
            </div>
            <div className="mx-4 h-[92%] border-2 rounded-full border-slate-400"></div>
            <div className="h-full flex flex-col w-1/2 p-6">
                <div className="bg-slate-500 h-5/6 rounded-lg p-6">
                    <div>
                        <h1>Battle History</h1>
                        <p>history of battles inside the rooms.</p>
                        <div className="mt-2 mb-2 flex items-center border border-gray-300 rounded-full overflow-hidden">
                            <div className="rounded-full flex items-center bg-slate-300 px-3 py-3">
                                <MagnifyingGlassIcon className="w-4 h-4" />
                            </div>
                            <input 
                                type="text" 
                                placeholder="Search..." 
                                className="px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="bg-slate-600 text-white px-4 py-2 hover:bg-slate-700 transition flex items-center gap-2">
                                Search
                            </button>
                        </div>
                    </div>
                    {items.map((item, index) => (
                        <MatchItemComponent key={`match-${index}`} player_one={item.player_one} player_two={item.player_two} className="mb-2" />
                    ))}
                </div>
                <div className="h-1/6 flex justify-end items-center w-full">
                    <button className="me-3 w-1/4 py-1 bg-red-500 font-bold text-slate-800 rounded-md hover:bg-orange-600">close room</button>
                    <button className="w-1/4 py-1 bg-emerald-500 font-bold text-slate-800 rounded-md houver:bg-lime-500">start game</button>
                </div>
            </div>
        </div>
        </>
    );
}