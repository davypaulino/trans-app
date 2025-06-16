import { NextResponse } from 'next/server';
import { logger } from '@/app/_utils/logger';

interface ProxyResponseHandlerOptions {
    correlation_id: string;
    routeUrl?: string;
}

export async function ResponseHandler(
    backendResponse: Response,
    options: ProxyResponseHandlerOptions
): Promise<NextResponse> {
    const responseHeaders = new Headers(backendResponse.headers);

    responseHeaders.delete('content-encoding');
    responseHeaders.delete('content-length');
    responseHeaders.delete('transfer-encoding');

    if (!backendResponse.ok) {
        let errorData: any = {};
        try {
            errorData = await backendResponse.json();
        } catch (e) {
            errorData = await backendResponse.text();
            logger.warn("Backend error response was not JSON.", { options, error: e });
        }

        logger.warn("Backend responded with an error.", {
            options,
            status: backendResponse.status,
            statusText: backendResponse.statusText,
            errorData
        });

        return NextResponse.json(errorData, {
            status: backendResponse.status,
            headers: responseHeaders,
        });
    }

    const responseBody = await backendResponse.json();
    logger.info("Successfully proxied request.", { options, status: backendResponse.status, responseHeaders });

    return NextResponse.json(responseBody, {
        status: backendResponse.status,
        headers: responseHeaders,
    });
}

export function HandleProxyError(error: any, options: ProxyResponseHandlerOptions): NextResponse {
    logger.error("Error during proxy request to external backend:", {
       options,
        error_message: error.message,
        error_stack: error.stack
    });
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
}