import { EPrimaryColors, RoomResponseDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO";
import { PlayerItem } from "./playerItem";
import React from "react";
import { DS } from "@/app/_components/ds";

interface MatchPlayerProps {
    match: RoomResponseDTO
}

export const MatchPlayers: React.FC<MatchPlayerProps> = ({match}) => {
    const emptyPlayers = Array(match.maxAmountOfPlayers - match.amountOfPlayers).fill(null)
    const safePlayers = [...match.players, ...emptyPlayers]
    
    return (
        <ul>
            {safePlayers.map((player, index) => (
                <PlayerItem
                    className="mb-3"
                    key={`player-${index}`}
                    showExit={match.owner}
                    player={player}
                />
            ))}
        </ul>
    );
}