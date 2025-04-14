import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

class WebSocketManager {
    private socket: WebSocket | null = null;
    private host: string = "";
    private endpoint: string =  ""
    private path: string = ""
    private connection: string = `wss://${this.host}${this.endpoint}`

    public constructor(
        endpoint: string,
        path: string
    ) {
        this.endpoint = endpoint;
        this.path = path;
        this.host = window.location.host;
        this.connection = `wss://${this.host}${this.endpoint}${this.path}`
    }

    public connect(userId: string, roomCode: string): WebSocket {

        if (this.socket) {
            console.warn("WebSocket is already connected!");
            return this.socket;
        }

        this.socket = new WebSocket(`${this.connection}/${roomCode}/?userId=${userId}`);
        return this.socket;
    }

    public disconnect(): void {
        if (!this.socket) {
            console.warn("WebSocket is not connected!");
            return;
        }

        this.socket.close();
        this.socket = null;
        console.log("WebSocket connection terminated.");
    }
}

export const webSocketRoomManager = new WebSocketManager(
                                        "/api/v1/user-session",
                                        "/ws/rooms");