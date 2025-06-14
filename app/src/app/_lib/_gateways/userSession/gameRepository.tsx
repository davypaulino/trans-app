import { Gateway } from "@/app/_middlewares/middlewareHandler";
import {Environments} from "@/app/_lib/environments";

export const PostStartGame = async (roomCode: string)
: Promise<Response> => {

    const response = await Gateway.Fetch(
        `${Environments.Resources.User.Host}/rooms/${roomCode}/new-game/`,
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