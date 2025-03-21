import { ETypesOfRoom } from "../_enums/ETypesOfRoom";

interface DataRoomResponse {
    roomCode: string,
    amountOfPlayers: number,
    maxAmountOfPlayers: number,
    roomName: string,
    roomType: number,
    owner: string,
}

interface PaginationResponse {
    currentPage: number;
    pageSize: number,
    nextPage: number | null,
    previousPage: number | null,
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    totalPages: number,
    Data:  Array<DataRoomResponse>
}

export type { PaginationResponse, DataRoomResponse }