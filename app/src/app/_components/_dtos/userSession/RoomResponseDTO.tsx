import { ERoomType, RoomTypeKey, RoomTypeValue } from "@/app/_lib/RoomType";

export interface PlayerItemInfoDTO {
    name: string,
    color: string,
    urlProfileImage: string,
    you: boolean
}

export interface RoomResponseDTO {
    roomType: RoomTypeKey,
    roomCode: string,
    roomName: string,
    maxAmountOfPlayers: number,
    amountOfPlayers: number,
    owner: string,
    players: PlayerItemInfoDTO[];
}