import {logger} from "@/app/_utils/logger";
import {createSession} from "@/app/_lib/session";
import {externApis} from "@/app/_middlewares/externAuthApiMiddleware";
import {NextRequest} from "next/server";

export async function TryGetToken(req: NextRequest) {
    if (!externApis.some(path => path ? req.nextUrl.pathname.startsWith(path) : false)) {
        logger.info("Starting", {"function_name": TryGetToken.name})
        const token = req.nextUrl.searchParams.get('token')
        const refresh_token: string | null = req.nextUrl.searchParams.get('refresh_token')

        if (token) {
            logger.info("Get token query param", {"function_name": TryGetToken.name})
            await createSession(token, refresh_token ?? undefined)
        }
        logger.info("Finished", {"function_name": TryGetToken.name})
    }
}