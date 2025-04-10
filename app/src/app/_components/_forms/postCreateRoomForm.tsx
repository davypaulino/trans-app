'use client'

import React, { useState, useEffect } from "react"
import { generateRandomName, generateRandomCode } from '@/app/_lib/utils';
import { PostCreateARoom } from "@/app/_lib/_gateways/userSession";
import { ERoomType, RoomTypeKey, RoomTypeValue } from "@/app/_lib/RoomType";
import { useRouter } from "next/navigation";

interface PostProps {
    className?: string
}

export const PostCreateRoomForm: React.FC<PostProps> = (props) => {
    const [nickname, setNickname] = useState<string>('');
    const [numberOfPlayersOption, setNumberOfPlayersOption] = useState<number[]>([1]);
    const [roomCode, setRoomCode] = useState<string>('');
    const router = useRouter();
    
    useEffect(() => {
        setNickname(generateRandomName());
        setRoomCode(generateRandomCode());
    }, []);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        const response = await PostCreateARoom(event);
        const responseData = await response.json(); // Parse response JSON

        // Store 'X-User-Id' in localStorage
        const userId = response.headers.get("X-User-Id");
        if (userId) {
            localStorage.setItem("userId", userId);
        }
    
        // Use Next.js router for navigation
        if (responseData?.roomCode) {
            router.push(`/rooms/${responseData.roomCode}`); // Navigate dynamically
        }
    };

    const updateNumberOfPlayersOptions = (roomType: number) => {
        const type = ERoomType[roomType as RoomTypeKey];
        if (type === 'Match' as RoomTypeValue) {
            setNumberOfPlayersOption([2, 4])
            return
        } else if (type === 'Tournament' as RoomTypeValue) {
            setNumberOfPlayersOption([4, 8, 16, 32])
            return
        }
        setNumberOfPlayersOption([1]);
    }

    return (
        <form onSubmit={onSubmit} className="space-y-4 p-4">
            {/* Nickname Input */}
            <div className="mb-3">
                <label htmlFor="nickname-input" className="block text-sm font-medium text-gray-700">Nickname</label>
                <input
                    name="nickname"
                    type="text"
                    id="nickname-input"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
            </div>

            {/* Game Type Selection */}
            <div className="mb-3">
                <label htmlFor="game-type-section" className="block text-sm font-medium text-gray-700">Game Type</label>
                <select
                    name="gameType"
                    id="game-type-section"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    aria-label="game type selection"
                    onChange={(e) => updateNumberOfPlayersOptions(Number(e.target.value))}
                    >
                    <option value={2} selected>Single Player</option>
                    <option value={0}>Match</option>
                    <option value={1}>Tournament</option>
                </select>
            </div>

            {/* Number of Players Selection */}
            <div className="mb-3">
                <label htmlFor="number-of-players-section" className="block text-sm font-medium text-gray-700">
                    Number of Players
                </label>
                <select
                    name="numberOfPlayers"
                    id="number-of-players-section"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    aria-label="number of players selection"
                >
                    {numberOfPlayersOption.map((number, index) => (
                        <option key={`numberOfPlayersOption-${index}`} value={number}>
                            {number}
                        </option>
                    ))}
                </select>
            </div>


            {/* Room Name Input */}
            <div className="mb-3">
                <label htmlFor="room-name-input" className="block text-sm font-medium text-gray-700">Room Name</label>
                <input
                    name="roomName"
                    id="room-name-input"
                    className="w-full mt-1 p-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Private Room Toggle */}
            <div className="flex items-center">
                <input
                    name="isPrivate"
                    type="checkbox"
                    role="switch"
                    id="private-room-checkbox"
                    className="rounded focus:ring-blue-500 focus:border-blue-500"
                    />
                <label htmlFor="private-room-checkbox" className="ml-2 text-sm font-medium text-gray-700">
                    Private Room <br />
                    <p className="text-xs text-gray-500">Private rooms do not appear in global search and can only be accessed by code.</p>
                </label>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
                <button type="submit" data-bs-dismiss="modal" className="w-full py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900">
                    Create The Room
                </button>
            </div>
        </form>
    );
}