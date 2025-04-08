import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { MatchItemComponent } from "../_components/matchItem";
import { MatchItemPlayer } from "../_components/matchItem";

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

export default function Page() {
    return (
        <section className="container mx-auto flex justify-center items-center h-[80vh] w-[80vw] bg-slate-300 rounded-b-lg">
            <div className="h-full flex flex-col w-1/2 p-6">
                <div>

                </div>
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
                    {items.map((item) => (
                        <MatchItemComponent player_one={item.player_one} player_two={item.player_two} className="mb-2" />
                    ))}
                </div>
                <div className="h-1/6 flex justify-end items-center w-full">
                    <button className="me-3 w-1/4 py-1 bg-red-500 font-bold text-slate-800 rounded-md hover:bg-orange-600">close room</button>
                    <button className="w-1/4 py-1 bg-emerald-500 font-bold text-slate-800 rounded-md houver:bg-lime-500">start game</button>
                </div>
            </div>
        </section>
    );
}