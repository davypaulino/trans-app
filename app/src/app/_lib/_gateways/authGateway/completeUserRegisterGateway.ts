"use server"

import {decrypt} from "@/app/_lib/session";
import {cookies} from "next/headers";
import {Environments} from "@/app/_lib/environments";
import {CompleteUserRegisterRequestDto} from "@/app/_features/completeUserRegister/completeUserRegisterRequestDto";
import CompleteUserRegisterResponseDto from "@/app/_features/completeUserRegister/completeUserRegisterResponseDto";
import {logger} from "@/app/_utils/logger";

export async function PutCompleUserRegister(data: CompleteUserRegisterRequestDto): Promise<CompleteUserRegisterResponseDto | null> {
    const correlation_id = crypto.randomUUID()

    logger.info("Starting PutCompleUserRegister", {"correlation_id": correlation_id})

    try {
        const cookie = (await cookies()).get('session')?.value
        if (!cookie) {
            logger.warn("Cookie not found.", {"user_id": data.userId, "correlation_id": correlation_id})
            return null;
        }

        const session = await decrypt(cookie)
        if (!session) {
            logger.error("Not possible decrypt session", {"user_id": data.userId, "correlation_id": correlation_id})
            return null;
        }

        const response = await fetch(`${Environments.Resources.Auth.Host}/register`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${session?.access_token}`,
                "Content-Type": "application/json",
                "X-Correlation-Id": correlation_id,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            if (response.status >= 400 && response.status <= 499) {
                logger.warn("Warn on Put User Information", {"correlation_id": correlation_id, "user_id": data.userId, "status_code": response.statusText, "response_body": response.body})
            } else if (response.status >= 500 && response.status <= 599) {
                logger.error("Error on Put User Information", {"correlation_id": correlation_id, "user_id": data.userId, "status_code": response.statusText, "response_body": response.body})
            }
            return null;
        }

        const content = response.json()
        logger.info("Starting PutCompleUserRegister", {"correlation_id": correlation_id})
        return content;
    } catch (error) {
        logger.error("Error on Try PutCompleUserRegister", {"error": error, "correlation_id": correlation_id})
        return null;
    }
}