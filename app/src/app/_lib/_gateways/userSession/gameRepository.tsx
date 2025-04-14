import { Gateway } from "@/app/_middlewares/middlewareHandler";
import { Session  } from "../../gatewaysConfig";
export const PostStartGame = async (roomCode: string)
: Promise<Response> => {

    const response = await Gateway.Fetch(
        `${Session.Url}/${Session.GamesPath}/${roomCode}/new-game/`,
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