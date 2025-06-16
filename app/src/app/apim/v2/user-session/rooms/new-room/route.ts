import { NextRequest } from 'next/server';
import {logger} from "@/app/_utils/logger";
import {enviroments} from "@/app/_lib/environments";
import {
    HandleProxyError,
    ResponseHandler
} from "@/app/apim/_utils/responseHandler";
import {normalizePathForApis} from "@/app/apim/_utils/normalizePathForPythonApis";

const BACKEND_BASE_URL = `${enviroments["user"]?.Host}${enviroments["user"]?.http["v2"]}`

export async function POST(request: NextRequest) {
    const correlation_id = request.headers.get('X-Correlation-Id') as string;
    const routeUrl = normalizePathForApis(BACKEND_BASE_URL, request)

    logger.info("Proxying POST request to external backend.", {
        correlation_id,
        route: routeUrl
    });

    try {
        const headers = new Headers(request.headers);
        headers.set('Content-Type', 'application/json')

        const sendData = await request.json()

        const backendResponse = await fetch(routeUrl, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(sendData)
        });

        return await ResponseHandler(backendResponse, { correlation_id, routeUrl })
    } catch (error: any) {
        return HandleProxyError(error, { correlation_id, routeUrl })
    }
}