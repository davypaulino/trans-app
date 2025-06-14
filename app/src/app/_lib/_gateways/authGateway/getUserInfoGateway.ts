"use server"

import { cookies } from "next/headers";
import {decrypt} from "@/app/_lib/session";
import { decodeJwt } from "jose";
import { JwtSessionPayload } from "@/middleware";
import {Environments} from "@/app/_lib/environments";
import {logger} from "@/app/_utils/logger";
import {handleStatusError} from "@/app/_lib/_gateways/utils/handleStatusError";

export async function GetUserInfoGateway() : Promise<Response | null> {
    const correlation_id = crypto.randomUUID()

    const cookie = await cookies();
    const cookieStore = cookie.get('session')?.value
    const session = await decrypt(cookieStore)
    const jwtSessionToken = session ? decodeJwt<JwtSessionPayload>(session?.access_token) : null

    console.log(`Env: ${process.env.NEXT_PUBLIC_RESOURCE_HTTP_AUTH}`)
    console.log(`Class: ${Environments.Resources.Auth.Host}`)
    console.log(`Type of session?.token: ${typeof session?.access_token}`);
    console.log(`Token: ${session?.access_token}`);
    console.log(`Token Sub: ${jwtSessionToken?.sub}`);

    const userId = jwtSessionToken?.sub;
    const response = await fetch(`${Environments.Resources.Auth.Host}/users?userId=${userId}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${session?.access_token}`
        }
    })

    if (!response.ok) {
        handleStatusError(
            "Error on Get User Information",
            response,
            {"correlation_id": correlation_id,
            "user_id": userId,
            "status_code": response.statusText,
            "response_body": response.body})
        return null;
    }

    return await response.json();
}
