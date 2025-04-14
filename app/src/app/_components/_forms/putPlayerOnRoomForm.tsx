'use client'

import React, { useState, useEffect } from 'react';
import { putPlayerOnRoom } from '@/app/_lib/_gateways/userSession/roomRepository';
import { generateRandomName, generateRandomCode } from '@/app/_lib/utils';
import { useRouter } from 'next/navigation';

interface PutProps {
    className?: string
}

export const PutPlayerOnRoomForm: React.FC<PutProps> = (props) => {
    const [nickname, setNickname] = useState<string>('');
    const [roomCode, setRoomCode] = useState<string>('');
    const router = useRouter()
    
    useEffect(() => {
        setNickname(generateRandomName());
        setRoomCode(generateRandomCode());
    }, []);
    
    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const response = await putPlayerOnRoom(event);
        const responseData = await response.json();

        const userId = response.headers.get("X-User-Id");
        if (userId) {
            localStorage.setItem("userId", userId);
        }
    
        if (responseData?.roomCode) {
            router.push(`/rooms/${responseData.roomCode}`);
        }
    };

    return (
        <form name="player-on-room-form" onSubmit={onSubmit} className={`w-3/4 bg-gray-100 px-4 py-5 rounded-lg  ${props.className ?? ""}`}>
            <div className="mb-5">
                <label htmlFor="nickname-input" className="block text-sm font-medium text-gray-700">Your Nickname</label>
                <input type="text" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="nickname-input" name="nickname" placeholder={nickname} onChange={(e) => setNickname(e.target.value)} />
            </div>
            <div className="mb-5">
                <label htmlFor="room-name-input" className="block text-sm font-medium text-gray-700">Room Code</label>
                <input className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" id="room-name-input" name="roomCode" placeholder={roomCode} onChange={(e) => setRoomCode(e.target.value)} />
            </div>
            <div className="modal-footer mb-3">
                <button type="submit" className="w-full h-12 bg-gray-800 text-white rounded-md hover:bg-gray-900">Enter The Room</button>
            </div>
        </form>
    );
}