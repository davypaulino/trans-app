import { ERoomType, RoomTypeKey, RoomTypeValue } from "@/app/_lib/RoomType";

export enum EPrimaryColors {
    gray = 0,
    red = 1,
    blue = 2,
    green = 3,
    yellow = 4,
}

export interface PlayerItemInfoDTO {
    name: string,
    color: EPrimaryColors,
    urlProfileImage: string,
    owner: boolean,
    you: boolean
}


type PlayerItemMap = {
    [key: string]: PlayerItemInfoDTO;
}

export interface RoomResponseDTO {
    roomType: RoomTypeKey,
    roomCode: string,
    roomName: string,
    maxAmountOfPlayers: number,
    amountOfPlayers: number,
    players: PlayerItemMap;
    owner: boolean,
    ownerColor: EPrimaryColors
}