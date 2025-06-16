import { NextRequest } from 'next/server';
import {logger} from "@/app/_utils/logger";
import {enviroments} from "@/app/_lib/environments";
import {
    HandleProxyError,
    ResponseHandler
} from "@/app/apim/_utils/responseHandler";

const BACKEND_BASE_URL = `${enviroments["user"]?.Host}${enviroments["user"]?.http["v2"]}`

export async function POST(request: NextRequest) {
    const correlation_id = request.headers.get('X-Correlation-Id') as string;

    const pathname = request.nextUrl.pathname.replace(`${enviroments["user"]?.apim["v2"]}`, "");
    const searchParams = request.nextUrl.searchParams.toString();
    const normalizedPathname = pathname.endsWith('/') ? pathname : pathname + '/';
    const backendEndpoint = `${BACKEND_BASE_URL}${normalizedPathname}${searchParams ? `?${searchParams}` : ''}`;

    logger.info("Proxying POST request to external backend.", {
        correlation_id,
        pathname,
        searchParams,
        backend_base_url: backendEndpoint
    });

    try {
        const headers = new Headers(request.headers);
        headers.set('Content-Type', 'application/json')

        const sendData = await request.json()

        const backendResponse = await fetch(backendEndpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(sendData)
        });

        return await ResponseHandler(backendResponse, {correlation_id})
    } catch (error: any) {
        return HandleProxyError(error, { correlation_id })
    }
}