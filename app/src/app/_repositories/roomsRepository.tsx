import { PaginationResponse } from "../_models/Rooms";
import { redirect } from 'next/navigation'

const url = "https://didactic-telegram-w9xqw6x46pxf5gv4-8443.app.github.dev";
const roomsPath = "/api/v1/user-session/rooms";

export const fetchRooms = async (
    currentPage: number = 1,
    pageSize: number = 5,
    filterLabel: string = "",
) : Promise<PaginationResponse> => {
    try {
        const response = await fetch(
            `${url}${roomsPath}/?currentPage=${currentPage}&pageSize=${pageSize}&filterLabel=${filterLabel}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch rooms");
        }

        const data: PaginationResponse = (await response.json()).paginatedItems;
        return data;
    } catch (err) {
        return err.message;
    }
}

interface AddPlayerDataRequest {
    playerName: string | null;
    roomCode: string | null;
}

export async function addPlayerToRoom(formData: FormData) {
    const data: AddPlayerDataRequest = {
        playerName: formData.get('nickname').toString(),
        roomCode: formData.get('roomCode').toString()
    };

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    const response = await fetch(`${url}${roomsPath}/${data.roomCode}/add-player/`, options);
    const result = await response.json();

    if (response.ok) {
        redirect(`/rooms/${result.roomCode}`);
    } else {
        console.error('Erro ao adicionar jogador');
    }
}