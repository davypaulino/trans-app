import { EPrimaryColors, RoomResponseDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO";
import { PlayerItem } from "./playerItem";
import React from "react";
import { DS } from "@/app/_components/ds";

interface MatchPlayerProps {
    match?: RoomResponseDTO
}

export const MatchPlayers: React.FC<MatchPlayerProps> = ({match}) => {
    const numberOfPlayers = match
        ? Math.max(0, match.maxAmountOfPlayers - match.amountOfPlayers)
        : 2;

    const emptyPlayers = Array(numberOfPlayers).fill(null)
    const playerList = match ? Object.values(match.players) : []
    const safePlayers = match
        ? [...playerList, ...emptyPlayers]
        : [...emptyPlayers];

    return (
        <ul>
            {safePlayers.map((player, index) => (
                <PlayerItem
                    className="mb-3"
                    key={`player-${index}`}
                    showExit={(!match) ? false : match.owner}
                    player={player}
                    roomCode={match?.roomCode}
                />
            ))}
        </ul>
    );
}