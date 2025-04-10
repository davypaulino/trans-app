import { EPrimaryColors, RoomResponseDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO";
import { PlayerItem } from "./playerItem";
import React from "react";
import { DS } from "@/app/_components/ds";

interface MatchPlayerProps {
    match: RoomResponseDTO
}

export const MatchPlayers: React.FC<MatchPlayerProps> = ({match}) => {
    const safePlayers = match.players ?? Array(4).fill({}); // Default 4 empty players
    
    return (
        <ul>
            {safePlayers.map((player, index) => (
                <PlayerItem
                    className="mb-3"
                    key={`player-${index}`}
                    showExit={true}
                    player={player}
                />
            ))}
        </ul>
    );
}