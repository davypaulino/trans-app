import React from "react";

interface PlayerStatusProps {
    isConnected: boolean;
}

const PlayerStatus: React.FC<PlayerStatusProps> = ({ isConnected }) => {
    return (
        <div
            className={`fixed bottom-4 right-4 flex items-center gap-2 p-3 rounded-lg shadow-xl ${
                isConnected ? "bg-green-500" : "bg-red-500"
            } text-white font-medium`}
        >
            <div
                className={`w-3 h-3 rounded-full animate-pulse ${
                    isConnected ? "bg-green-300" : "bg-red-300"
                }`}
            ></div>
            {isConnected ? "You are connected!" : "Disconnected from server"}
        </div>
    );
};

export default PlayerStatus;
