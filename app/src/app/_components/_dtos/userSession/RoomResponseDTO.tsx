export interface PlayerItemInfoDTO {
    name: string,
    color: string,
    urlProfileImage: string,
    you: boolean
}

export interface RoomResponseDTO {
    owner: string,
    players: PlayerItemInfoDTO[];
}