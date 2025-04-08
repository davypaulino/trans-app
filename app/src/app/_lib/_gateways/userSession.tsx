import { PaginationResponse } from "@/app/_components/_dtos/paginationResponse"
import { RequestParamsDto } from "@/app/_components/_dtos/requestParamsDto"
import { RoomItemDto } from "@/app/_components/_dtos/userSession/roomItemDto"
import { RoomsPath, Url } from "../gatewaysConfig"

export const getAllRooms = async (requestParams: RequestParamsDto<string>)
: Promise<PaginationResponse<RoomItemDto>>  => {
    const data = await fetch(`${Url}/${RoomsPath}/?page=${requestParams.page}&size=${requestParams.size ?? 5}`);
    const posts: PaginationResponse<RoomItemDto> = await data.json()
    return posts; 
}

interface PutPlayerOnRoomRequest {
    playerName: string,
    roomCode: string,
}

export const putPlayerOnRoom = async (event: React.FormEvent<HTMLFormElement>)
: Promise<Response> => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const data: PutPlayerOnRoomRequest = {
        playerName: formData.get('nickname') as string,
        roomCode: formData.get('roomCode') as string
    }

    const response = await fetch(`${Url}/${RoomsPath}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response;
};

interface PostCreateARoomRequest {
    createdBy: string,
    roomType: number,
    maxAmountOfPlayers: number,
    roomName: string,
    privateRoom: boolean
}

export const PostCreateARoom = async (event: React.FormEvent<HTMLFormElement>)
: Promise<Response> => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const data: PostCreateARoomRequest = {
        createdBy: formData.get('nickname') as string,
        roomType: Number(formData.get('gameType')),
        maxAmountOfPlayers: Number(formData.get('numberOfPlayers')),
        roomName: formData.get('roomName') as string,
        privateRoom: formData.get('isPrivate') === 'true'
    };

    const response = await fetch(`${Url}/${RoomsPath}/new-room/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return response;
};