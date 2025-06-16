import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";
import {logger} from "@/app/_utils/logger";
import {decrypt} from "@/app/_lib/session";

export const externApis: (string | undefined)[] = [
    '/apim/'
]

export async function ExternAuthApiMiddleware(request: NextRequest) {
    logger.info(request.nextUrl.pathname)
    if (externApis.some(path => path ? request.nextUrl.pathname.startsWith(path) : false)) {
        const correlation_id = crypto.randomUUID()
        const cookie = await cookies();
        const cookieStore = cookie.get('session')?.value
        logger.info("Starting", {"function_name": ExternAuthApiMiddleware.name})

        if (!cookieStore) {
            logger.warn("Cookie not found.", {"correlation_id": correlation_id})
            const loginUrl = new URL('/', request.url);
            return NextResponse.redirect(loginUrl);
        }

        const session = await decrypt(cookieStore)
        if (!session) {
            logger.error("Not possible decrypt session", {"correlation_id": correlation_id})
            const loginUrl = new URL('/', request.url);
            return NextResponse.redirect(loginUrl);
        }

        if (!session.access_token) {
            logger.error("Not found access_token", {"correlation_id": correlation_id})
            const loginUrl = new URL('/', request.url);
            return NextResponse.redirect(loginUrl);
        }

        const requestHeaders = new Headers();
        requestHeaders.set('X-User-Id', request.headers.get('X-User-Id') as string)
        requestHeaders.set('X-User-Color', request.headers.get('X-User-Color') as string)
        requestHeaders.set('Authorization', `Bearer ${session?.access_token}`);
        requestHeaders.set('X-Correlation-Id', correlation_id);

        logger.info("Finished", {"function_name": ExternAuthApiMiddleware.name})
        return NextResponse.next({
            request: {
                headers: requestHeaders,
            },
        });
    }
    return null
}
