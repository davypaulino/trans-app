import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { MatchItemComponent } from "../_components/matchItem";
import { MatchItemPlayer } from "../_components/matchItem";
import { PlayerItem } from "../_components/_room/playerItem";
import { RoomResponseDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO";

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
    owner: "red",
    players: [
        {
            name: "Alice",
            color: "red",
            urlProfileImage: "https://randomuser.me/api/portraits/women/1.jpg",
            you: false
        },
        {
            name: "Bob",
            color: "green",
            urlProfileImage: "https://randomuser.me/api/portraits/men/2.jpg",
            you: true
        },
        {
            name: "Charlie",
            color: "yellow",
            urlProfileImage: "https://randomuser.me/api/portraits/men/3.jpg",
            you: false
        },
    ]
}

export default function Page() {
    return (
        <section className="container mx-auto h-[90vh] w-[80vw] bg-slate-300 rounded-b-lg p-6">
            <div className="flex items-center w-full justify-between mb-6">
                <div>
                    <h1 className="text-3xl text-bold">Match: name</h1>
                    <p className="text-sm">Neque porro quisquam est qui dolorem ipsum quia dolor sit amet   </p>
                </div>
                <div className="flex gap-1">
                    <h1 className="text-6xl">1/2</h1>
                    <p className="text-xs">number<br />of players</p>
                </div>
            </div>
            <div  className="flex justify-center items-stretch h-[80vh]">
                <div className="h-full flex flex-col w-1/2 p-6">
                    <ul>
                    {Array.from({ length: 4 }).map((_, index) => (
                        <PlayerItem
                            className="mb-3"
                            key={`player-${index}`}
                            owner={response.owner === response.players[index]?.color}
                            showExit={true}
                            player={response.players[index]} />
                    ))}
                    </ul>
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

        </section>
    );
}