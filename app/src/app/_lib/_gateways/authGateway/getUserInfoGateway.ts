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
    let response: Response;
    try {
        const cookie = await cookies();
        const cookieStore = cookie.get('session')?.value
        const session = await decrypt(cookieStore)
        const jwtSessionToken = session ? decodeJwt<JwtSessionPayload>(session?.access_token) : null

        logger.debug("Decrypted session and JWT token details.", {
            correlation_id,
            env_auth_host_var: process.env.NEXT_PUBLIC_RESOURCE_HTTP_AUTH,
            config_auth_host: Environments.Resources.Auth.Host,
            token_type_of: typeof session?.access_token,
            token_present: !!session?.access_token,
            token_sub_claim: jwtSessionToken?.sub,
        });

        const userId = jwtSessionToken?.sub;
        const fetchURL = `${Environments.Resources.Auth.Host}/users?userId=${userId}`;
        logger.info(`Fetching user data from: ${fetchURL}`, { correlation_id, userId });

        response = await fetch(`${Environments.Resources.Auth.Host}/users?userId=${userId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session?.access_token}`
            },
            cache: 'no-store'
        })

        if (!response.ok) {
            const responseBodyText = await response.text().catch(e => {
                logger.error("Failed to read response body for error logging.", { correlation_id, error: e });
                return "Failed to read body.";
            });

            logger.error("Backend response not OK for Get User Info.", {
                correlation_id,
                user_id: userId,
                status_code: response.status,
                status_text: response.statusText,
                response_body_preview: responseBodyText.substring(0, 500), // Log only a preview
                failed_fetch_url: fetchURL,
            });

            // Call handleStatusError, passing necessary details
            handleStatusError(
                "Error on Get User Information",
                response, // Pass the original response for status and headers
                {
                    correlation_id,
                    user_id: userId,
                    status_code: response.status, // Use response.status (number)
                    response_body: responseBodyText // Pass the already read body text
                }
            );
            return null;
        }
    } catch (error: any) {
        logger.error("Fetch operation failed for GetUserInfoGateway. Network or unexpected error.", {
            correlation_id,
            error_message: error.message,
            error_stack: error.stack,
            // Access error.cause for underlying network errors like ECONNREFUSED
            error_cause_message: error.cause ? error.cause.message : 'N/A',
            error_cause_code: error.cause ? error.cause.code : 'N/A', // e.g., 'ECONNREFUSED'
        });

        logger.error("Error on Get User Information", {error})
        return null
    }

    return await response?.json();
}
