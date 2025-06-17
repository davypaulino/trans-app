import { PaginationResponse } from "@/app/_components/_dtos/paginationResponse"
import { RequestParamsDto } from "@/app/_components/_dtos/requestParamsDto"
import { RoomItemDto } from "@/app/_components/_dtos/userSession/roomItemDto"
import React from "react"
import { RoomResponseDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO"
import { Gateway } from "@/app/_middlewares/middlewareHandler"
import { ErrorResposeDto } from "@/app/_components/_dtos/userSession/ErrorResponseDto"
import {public_enviroments} from "@/app/_lib/public-envs";

export const getAllRooms = async (requestParams: RequestParamsDto<string>)
: Promise<PaginationResponse<RoomItemDto>>  => {
    console.log(requestParams)
    const route = `${public_enviroments["user"]?.apim["v2"]}`

    const data = await fetch(`${route}/rooms/?page=${requestParams.page}&size=${requestParams?.size ?? 4}&filter=${requestParams.filters ?? ""}`);
    const posts: PaginationResponse<RoomItemDto> = await data.json()
    return posts; 
}

interface PutPlayerOnRoomRequest {
    roomCode: string,
}

export const putPlayerOnRoom = async (event: React.FormEvent<HTMLFormElement>)
: Promise<any> => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const userId = localStorage.getItem("userId") ?? "";

    const data: PutPlayerOnRoomRequest = {
        roomCode: formData.get('roomCode') as string
    }

    const route = `${public_enviroments["user"]?.apim["v2"]}`
    const response = await fetch(`${route}/rooms/${data.roomCode}/add-player/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            "X-User-Id": userId
        },
        body: JSON.stringify(data)
    });

    return response;
};

interface PostCreateARoomRequestDTO {
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

    const data: PostCreateARoomRequestDTO = {
        createdBy: formData.get('nickname') as string,
        roomType: Number(formData.get('gameType')),
        maxAmountOfPlayers: Number(formData.get('numberOfPlayers')),
        roomName: formData.get('roomName') as string,
        privateRoom: formData.get('isPrivate') === 'true'
    };

    const route = `${public_enviroments["user"]?.apim["v2"]}`
    const response = await fetch(
        `${route}/rooms/new-room`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

    return response;
};

interface UserInfoRequest {
    [key: string]: string
}

export const GetNormalRoom = async (roomCode: string): Promise<RoomResponseDTO | ErrorResposeDto> => {
    const userId = localStorage.getItem("userId") ?? "";

    const route = `${public_enviroments["user"]?.Host}${public_enviroments["user"]?.http["v1"]}`
    const response = await fetch(`${route}/rooms/${roomCode}/detail/`, {
        method: 'GET',
        headers: {
            'X-User-Id': `${userId}`,
        },
    });

    return response.json();
};

const DeleteCloseRoom = async (roomCode: string): Promise<void> => {
    const route = `${public_enviroments["user"]?.Host}${public_enviroments["user"]?.http["v1"]}`
    await Gateway.Fetch(
        `${route}/rooms/${roomCode}/delete`,
        {
            method: 'DELETE',
        },
        null,
        [],
        []
    )
}

const PostStartGame = async ():Promise<void> => {

}

const PutExitRoom = async (roomCode: string, color: number):Promise<void> => {
    const route = `${public_enviroments["user"]?.Host}${public_enviroments["user"]?.http["v1"]}`
    await Gateway.Fetch(
        `${route}/rooms/${roomCode}/${color}/remove-player/`,
        {
            method: 'DELETE',
        },
        null,
        [],
        []
    )
}

export const RoomRepository = {
    GetNormalRoom,
    PostCreateARoom,
    DeleteCloseRoom,
    PostStartGame,
    PutExitRoom
}