import { XMarkIcon } from "@heroicons/react/24/solid";

export interface MatchItemPlayer {
    name: string,
    color: string,
    position: number,
    url: string,
    score: number
}

interface MatchItemProps {
    player_one: MatchItemPlayer,
    player_two: MatchItemPlayer,
    className?: string
}

export const MatchItemComponent: React.FC<MatchItemProps> = ({player_one, player_two, className}) => {
    return (
        <div className={`flex justify-around bg-slate-300 rounded-sm w-full ${className}`}>
            <div className={`flex w-5/12 py-2 ps-2 items-center justify-end border-s-8 border-${player_one.color}-500 gap-2`}>
                <img 
                    src={player_one.url} 
                    alt={player_one.name} 
                    className="w-10 h-10 rounded-full object-cover"
                    />
                <div className="w-6/12 text-sm/2">
                    <p className="mb-2">{player_one.name}</p>
                    <p>{player_one.position}º</p>
                </div>
                <h1 className="w-4/12 flex justify-center w-4/12">{player_one.score.toString().padStart(2, "0")}</h1>
            </div>
            <div className="flex w-1/12 items-center">
                <XMarkIcon />
            </div>
            <div className={`flex w-5/12 py-2 pe-2 items-center border-e-8 border-${player_two.color}-500 gap-2`}>
                <h1 className="w-4/12 flex justify-center">{player_two.score.toString().padStart(2, "0")}</h1>
                <div className="text-sm/2 w-6/12">
                    <p className="mb-2">{player_two.name}</p>
                    <p>{player_two.position}º</p>
                </div>
                <img 
                    src={player_two.url} 
                    alt={player_two.name} 
                    className="w-10 h-10 rounded-full object-cover"
                    />
            </div>
        </div>
    );
}