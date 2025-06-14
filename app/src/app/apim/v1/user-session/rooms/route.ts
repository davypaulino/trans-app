//apim/v1/user-session/rooms/route.ts
import { NextRequest } from 'next/server';
import {logger} from "@/app/_utils/logger";
import {Environments} from "@/app/_lib/environments";
import {
    HandleProxyError,
    ResponseHandler
} from "@/app/apim/_utils/responseHandler";
const BACKEND_BASE_URL = Environments.Resources.User.Host

export async function GET(request: NextRequest) {
    const correlation_id = crypto.randomUUID();
    const pathname = request.nextUrl.pathname.replace(Environments.Resources.User.NextApi, "");
    const searchParams = request.nextUrl.searchParams.toString();

    logger.info("Proxying GET request to external backend.", {
        correlation_id,
        pathname,
        searchParams,
        backend_base_url: BACKEND_BASE_URL
    });

    try {
        const backendEndpoint = `${BACKEND_BASE_URL}${pathname}?${searchParams}`;
        console.log(`Backend endpoint ${backendEndpoint}`);
        const backendResponse = await fetch(backendEndpoint, {
            method: 'GET',
            headers: request.headers,
        });
        return await ResponseHandler(backendResponse, {correlation_id})
    } catch (error: any) {
        HandleProxyError(error, { correlation_id })
    }
}