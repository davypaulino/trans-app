"use server"

import { Gateway } from "@/app/_middlewares/middlewareHandler";
import { cookies } from "next/headers";
import { decrypt } from "../session";
import { decodeJwt } from "jose";
import { JwtSessionPayload } from "@/middleware";

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

export async function GetUserInfo() : Promise<Response | null> {
    try {
        const cookie = (await cookies()).get('session')?.value
        const session = await decrypt(cookie)
        const jwtSessionToken = session ? decodeJwt<JwtSessionPayload>(session?.token) : null
        
        const res = await fetch(`http://localhost:3001/users?userId=${jwtSessionToken?.sub}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${jwtSessionToken}`
            }
        });
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status} ${res.body}`);
        }
        return await res.json();
    } catch (error) {
        console.error("Error fetching user:", error);
        return null
    }
}
