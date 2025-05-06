import { Gateway } from "@/app/_middlewares/middlewareHandler";
import { Session  } from "../gatewaysConfig";

export const TestAPI = async ()
: Promise<Response> => {
    console.log("AQUI CHEG|UEI")
    const response = await Gateway.Fetch(
        "https://localhost:7147/identity",
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        },
        null,
        [],
        []
    )
    console.log(response)
    return response;
};

export const AuthRepository = {
    TestAPI
}