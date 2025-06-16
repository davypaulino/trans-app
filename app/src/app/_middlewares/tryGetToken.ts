import {logger} from "@/app/_utils/logger";
import {createSession} from "@/app/_lib/session";
import {externApis} from "@/app/_middlewares/externAuthApiMiddleware";
import {NextRequest, NextResponse} from "next/server";

export async function TryGetToken(req: NextRequest) {
    if (!externApis.some(path => path ? req.nextUrl.pathname.startsWith(path) : false)) {
        logger.info("Starting", {"function_name": TryGetToken.name})

        const access_token = req.nextUrl.searchParams.get('access_token')
        const refresh_token: string | null = req.nextUrl.searchParams.get('refresh_token')

        logger.info("Query params tokens", {"function_name": TryGetToken.name, access_token: access_token, refresh_token: refresh_token})

        if (access_token && refresh_token) {
            logger.info("Get token query param", {"function_name": TryGetToken.name, access_token: access_token, refresh_token: refresh_token})
            await createSession(access_token, refresh_token ?? undefined)
            return NextResponse.redirect(new URL( '/register', req.nextUrl))
        }

        logger.info("Finished", {"function_name": TryGetToken.name})
    }
    return null
}