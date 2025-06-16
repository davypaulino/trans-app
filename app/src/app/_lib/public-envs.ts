"use client"

import {EnvironmentOptions} from "@/app/_lib/environments";

export const public_enviroments: EnvironmentOptions = {
    "game": {
        Host: process.env.NEXT_PUBLIC_GAME_HOST,
        Socket: process.env.NEXT_PUBLIC_GAME_SOCKET,
        http: {
            v1: "/api/v1/game-core"
        },
        ws: {
            v1: "/api/v1/game-core"
        },
        apim: {
            v1: "/api/v1/game-core"
        }
    },
    user: {
        Host: process.env.NEXT_PUBLIC_USER_HOST,
        Socket: process.env.NEXT_PUBLIC_USER_SOCKET,
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
        Host: process.env.NEXT_PUBLIC_AUTH_HOST,
        Socket: process.env.NEXT_PUBLIC_AUTH_SOCKET,
        http: {
            v1: "/api/v1/guardian",
        },
        ws: {},
        apim: {
            v1: "/apim/v1/guardian",
        }
    },
}

