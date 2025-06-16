"use server-only"

interface ResourceServiceConfig {
    Host?: string;
    Ws?: string;
    NextApi: string;
}

interface ResourcesConfig {
    Game: ResourceServiceConfig;
    User: ResourceServiceConfig;
    Auth: ResourceServiceConfig;
}

interface EnvironmentConfig {
    Resources: ResourcesConfig;
}

export const Environments: EnvironmentConfig = {
    Resources: {
        Game: {
            Host: process.env.NEXT_PUBLIC_RESOURCE_HTTP_GAME_CORE,
            Ws: process.env.NEXT_PUBLIC_RESOURCE_WS_GAME_CORE,
            NextApi: "/apim/v1/game-core"
        },
        User: {
            Host: process.env.NEXT_PUBLIC_RESOURCE_HTTP_USER,
            Ws: process.env.NEXT_PUBLIC_RESOURCE_WS_USER,
            NextApi: "/apim/v1/user-session"
        },
        Auth: {
            Host: process.env.NEXT_PUBLIC_RESOURCE_HTTP_AUTH,
            Ws: process.env.NEXT_PUBLIC_RESOURCE_WS_AUTH,
            NextApi: "/apim/v1/guardian"
        },
    },
}
