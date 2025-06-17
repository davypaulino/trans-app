"use server-only"

interface ResourceOptions {
    Host?: string,
    Socket?: string,
    ws: {
        [key: string]: string;
    },
    http: {
        [key: string]: string;
    },
    apim: {
        [key: string]: string;
    }
}

export const enviroments: EnvironmentOptions = {
    game: {
        Host: process.env.GAME_HOST,
        Socket: process.env.GAME_SOCKET,
        http: {
            v1: "/api/v1/game-core"
        },
        ws: {
            v1: "/api/v1/game-core"
        },
        apim: {}
    },
    user: {
        Host: process.env.USER_HOST,
        Socket: process.env.USER_SOCKET,
        http: {
            v1: "/api/v1/user-session",
            v2: "/api/v2/user-session"
        },
        ws: {},
        apim: {
            v1: "/apim/v1/user-session",
            v2: "/apim/v2/user-session"
        }
    },
    auth: {
        Host: process.env.AUTH_HOST,
        Socket: process.env.AUTH_SOCKET,
        http: {
            v1: "/api/v1/guardian",
        },
        ws: {},
        apim: {}
    },
}

export interface EnvironmentOptions {
    [key: string]: ResourceOptions | undefined;
}
