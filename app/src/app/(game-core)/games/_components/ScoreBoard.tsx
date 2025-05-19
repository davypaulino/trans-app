import { RoomResponseDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO"
import { PlayerItem } from "@/app/(user-session)/rooms/_components/_room/playerItem"
import React from "react"

interface ScoreBoardProps {
    match: RoomResponseDTO | null
    playerScoreOne: number
    playerScoreTwo: number
}

export const ScoreBoard: React.FC<ScoreBoardProps> = ({match, playerScoreOne, playerScoreTwo}) => {
    const numberOfPlayers = match
        ? Math.max(0, match.maxAmountOfPlayers - match.amountOfPlayers)
        : 2;

    const emptyPlayers = Array(numberOfPlayers).fill(null)
    const safePlayers = match
        ? [...match.players, ...emptyPlayers]
        : [...emptyPlayers];

    const middleIndex = Math.floor(safePlayers.length / 2);

    return (
        <ul className="flex gap-4 justify-center items-center p-2">
            {safePlayers.map((player, index) => (
                <React.Fragment key={`player-${index}`}>
                    {index === middleIndex && (
                        <>
                            <li className="m-0 text-4xl font-semibold text-white">{playerScoreOne}</li>
                            <li className="m-0 text-4xl font-semibold text-white">X</li>
                            <li className="m-0 text-4xl font-semibold text-white">{playerScoreTwo}</li>
                        </>
                    )}

                    {/* Renderizando cada jogador */}
                    <PlayerItem
                        showExit={false}
                        player={player}
                        roomCode={match?.roomCode}
                    />
                </React.Fragment>
            ))}
        </ul>
    );
}