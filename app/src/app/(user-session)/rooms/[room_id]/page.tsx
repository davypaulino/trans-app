'use client'

import { useParams } from "next/navigation";
import { MatchRoom } from "../_components/_room/matchRoom";
import { GetNormalRoom } from "@/app/_lib/_gateways/userSession";
import { useEffect, useState } from "react";
import { RoomResponseDTO } from "@/app/_components/_dtos/userSession/RoomResponseDTO";

export default function Page() {
    const params = useParams();
    const [roomData, setRoomData] = useState<RoomResponseDTO | null>(null);

    useEffect(() => {
        const fetchRoom = async () => {
            if (params.room_id) {
                const response: RoomResponseDTO = await GetNormalRoom(params.room_id as string);
                setRoomData(response);
            }
        };

        fetchRoom();
    }, [params.room_id]); // Runs when room_id changes

    return (
        <section className="container mx-auto h-[90vh] w-[80vw] bg-slate-300 rounded-b-lg p-6">
            {roomData ? <MatchRoom match={roomData} /> : <p>Loading room...</p>}
        </section>
    );
}
