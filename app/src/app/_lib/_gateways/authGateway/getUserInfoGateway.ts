"use server"

import { cookies } from "next/headers";
import {decrypt} from "@/app/_lib/session";
import { decodeJwt } from "jose";
import { JwtSessionPayload } from "@/middleware";
import {enviroments} from "@/app/_lib/environments";
import {logger} from "@/app/_utils/logger";
import {handleStatusError} from "@/app/_lib/_gateways/utils/handleStatusError";

export async function GetUserInfoGateway() : Promise<Response | null> {
    const correlation_id = crypto.randomUUID()
    let route = `${enviroments["auth"]?.Host}${enviroments["auth"]?.http["v1"]}`

    let response: Response;
    try {
        const cookie = await cookies();
        const cookieStore = cookie.get('session')?.value
        const session = await decrypt(cookieStore)
        const jwtSessionToken = session ? decodeJwt<JwtSessionPayload>(session?.access_token) : null

        logger.debug("Decrypted session and JWT token details.", {
            correlation_id,
            config_auth_host: route,
            token_type_of: typeof session?.access_token,
            token_present: !!session?.access_token,
            token_sub_claim: jwtSessionToken?.sub,
        });

        const userId = jwtSessionToken?.sub;
        logger.info(`Fetching user data from`, { correlation_id, userId, route });
        route = `${route}/users?userId=${userId}`
        response = await fetch(route, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session?.access_token}`
            },
            cache: 'no-store'
        })

        if (!response.ok) {
            const responseBodyText = await response.text().catch(e => {
                logger.error("Failed to read response body for error logging.", { correlation_id, route, error: e });
                return "Failed to read body.";
            });

            logger.error("Backend response not OK for Get User Info.", {
                correlation_id,
                user_id: userId,
                status_code: response.status,
                status_text: response.statusText,
                response_body_preview: responseBodyText.substring(0, 500), // Log only a preview
                failed_fetch_url: route,
            });

            handleStatusError(
                "Error on Get User Information",
                response,
                {
                    correlation_id,
                    user_id: userId,
                    status_code: response.status,
                    response_body: responseBodyText
                }
            );
            return null;
        }
    } catch (error: any) {
        logger.error("Fetch operation failed for GetUserInfoGateway. Network or unexpected error.", {
            correlation_id,
            error_message: error.message,
            error_stack: error.stack,
            route,
            error_cause_message: error.cause ? error.cause.message : 'N/A',
            error_cause_code: error.cause ? error.cause.code : 'N/A',
        });

        logger.error("Error on Get User Information", {route, error})
        return null
    }

    return await response?.json();
}
