import { PaginationResponse } from "@/app/_components/_dtos/paginationResponse"
import { RequestParamsDto } from "@/app/_components/_dtos/requestParamsDto"
import { RoomItemDto } from "@/app/_components/_dtos/userSession/roomItemDto"
import { RoomsPath, Url } from "../gatewaysConfig"

export const getAllRooms = async (requestParams: RequestParamsDto<string>)
: Promise<PaginationResponse<RoomItemDto>>  => {
    const data = await fetch(`${Url}/${RoomsPath}?page=${requestParams.page}&size=${requestParams.size ?? 5}`);
    const posts: PaginationResponse<RoomItemDto> = await data.json()
    return posts; 
}