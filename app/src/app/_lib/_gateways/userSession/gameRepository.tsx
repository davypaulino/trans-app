import { Gateway } from "@/app/_middlewares/middlewareHandler";
import {public_enviroments} from "@/app/_lib/public-envs";

export const PostStartGame = async (roomCode: string)
: Promise<Response> => {
    const route = `${public_enviroments["auth"]?.Host}${public_enviroments["user"]?.http["v1"]}`

    const response = await Gateway.Fetch(
        `${route}/rooms/${roomCode}/new-game/`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        },
        null,
        [],
        []
    )

    return response;
};

export const GameRepository = {
    PostStartGame
}