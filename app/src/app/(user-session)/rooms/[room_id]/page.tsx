'use client'

import { useParams, useRouter } from "next/navigation";
import { MatchRoom } from "../_components/_room/matchRoom";
import { GetNormalRoom } from "@/app/_lib/_gateways/userSession/roomRepository";
import { useEffect, useState } from "react";
import { RoomResponseDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO";
import { webSocketRoomManager } from "@/app/_websockets/websocketManager";
import PlayerStatus from '@/app/_components/playerStatus'
import { ErrorResposeDto } from "@/app/_components/_dtos/userSession/ErrorResponseDto";

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const [wsConnected, setWsConnected] = useState<boolean>(false)
    const [roomData, setRoomData] = useState<RoomResponseDTO | null>(null);

    const isRoomResponseDTO = (response: any): response is RoomResponseDTO => {
        return response && typeof response === "object" && "roomName" in response && "roomId" in response;
    };

    useEffect(() => {
        const fetchRoom = async () => {
            if (params.room_id) {
                localStorage.setItem("roomCode", params.room_id as string)
                const response: RoomResponseDTO | ErrorResposeDto = await GetNormalRoom(params.room_id as string);
                if (isRoomResponseDTO(response)) {
                    setRoomData(response);
                    return
                }
            }
        };

        fetchRoom();
        const userId: string = localStorage.getItem("userId") ?? ""
        const userColor: number = Number(localStorage.getItem("userColor")) ?? 0
        const socket: WebSocket = webSocketRoomManager.connect(userId, params.room_id as string)

        socket.onopen = () => {
            console.log("WebSocket connection opened.");
            setWsConnected(true);
        };

        socket.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.type === "delete_room" || (data.type === "player_list_update" && data.userRemoved === userColor)) {
                localStorage.removeItem("userId");
                localStorage.removeItem("roomCode");
                router.push("/home")
            } else if (data.type === "player_list_update") {
                fetchRoom()
            } else if (data.type === "game.started") {
                router.push(`/games/${data.gameId}`)
            }
        };

        socket.onclose = () => {
            console.log("WebSocket connection closed.");
            setWsConnected(false)
            webSocketRoomManager.disconnect() // Cleanup
        };
        
        socket.onerror = (error: Event) => {
            setWsConnected(false)
            console.error("WebSocket error:", error);
        };
    }, [params.room_id]); // Runs when room_id changes

    return (
        <section className="container mx-auto w-[80vw] bg-slate-300 rounded-b-lg p-6">
            {roomData ? <MatchRoom match={roomData} /> : <p>Loading room...</p>}
            <PlayerStatus isConnected={wsConnected} />
        </section>
    );
}
