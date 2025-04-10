'use client'

import { useParams, useRouter } from "next/navigation";
import { MatchRoom } from "../_components/_room/matchRoom";
import { GetNormalRoom } from "@/app/_lib/_gateways/userSession";
import { useEffect, useState } from "react";
import { RoomResponseDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO";
import { webSocketRoomManager } from "@/app/_websockets/websocketManager";
import PlayerStatus from '@/app/_components/playerStatus'

export default function Page() {
    const params = useParams();
    const router = useRouter();
    const [wsConnected, setWsConnected] = useState<boolean>(false)
    const [roomData, setRoomData] = useState<RoomResponseDTO | null>(null);

    useEffect(() => {
        const fetchRoom = async () => {
            if (params.room_id) {
                const response: RoomResponseDTO = await GetNormalRoom(params.room_id as string);
                setRoomData(response);
            }
        };

        fetchRoom();
        const userId: string = localStorage.getItem("userId") ?? ""
        const socket: WebSocket = webSocketRoomManager.connect(userId, params.room_id as string)

        socket.onopen = () => {
            console.log("WebSocket connection opened.");
            setWsConnected(true);
        };

        socket.onmessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);

            if (data.type === "delete_room" || (data.type === "player_list_update" && data.userRemoved === userId)) {
                localStorage.removeItem("userId");
                localStorage.removeItem("roomCode");
                router.push("/home")
            } else if (data.type === "player_list_update") {
                fetchRoom()
            } else if (data.type === "game.started") {
                router.push(`/games/${123}`)
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
