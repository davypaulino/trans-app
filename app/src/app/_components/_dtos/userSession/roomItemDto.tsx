import { ERoomType } from "@/app/_lib/RoomType"

export interface RoomItemDto {
    roomCode: string,
    roomName: string,
    numberOfPlayers: number,
    maxNumberOfPlayers: number,
    type: keyof typeof ERoomType,
    owner: string
}