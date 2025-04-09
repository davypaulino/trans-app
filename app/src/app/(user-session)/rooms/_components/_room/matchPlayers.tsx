import { RoomResponseDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO";
import { PlayerItem } from "./playerItem";
import React from "react";

interface MatchPlayerProps {
    match: RoomResponseDTO
}

export const MatchPlayer: React.FC<MatchPlayerProps> = ({match}) => {
    return (
        <ul>
            {Array.from({ length: 4 }).map((_, index) => (
                <PlayerItem
                    className="mb-3"
                    key={`player-${index}`}
                    owner={match.owner === match.players[index]?.color}
                    showExit={true}
                    player={match.players[index]} />
            ))}
        </ul>
    );
}