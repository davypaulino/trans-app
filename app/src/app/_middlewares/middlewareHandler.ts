import { Handler403MiddlewareAfter } from "./handler403Middleware";
import { HandlerUserIdMiddlewareAfter, HandlerUserIdMiddlewareBefore } from "./handlerUserIdMiddleware";
import { MiddlewareResponse } from "./middlewareResponse";

async function Fetch(
    url: string,
    options: RequestInit = {},
    payload: any,
    middlewaresBefore: Function[] = [],
    middlewaresAfter: Function[] = []
): Promise<any> {
    const request: any = { headers: options.headers || {}, data: {} };
    let updatedPayload = payload;

    middlewaresAfter = [
        ...middlewaresAfter,
        HandlerUserIdMiddlewareAfter,
        Handler403MiddlewareAfter
    ]
    middlewaresBefore = [
        ...middlewaresBefore,
        HandlerUserIdMiddlewareBefore,
    ]

    for (const middlewareFunction of middlewaresBefore) {
        const result: MiddlewareResponse = await middlewareFunction(request, updatedPayload);

        if (!result.pass) {
            return result.response;
        }

        if (result.data) {
            updatedPayload = { ...updatedPayload, ...result.data };
        }
    }

    const fetchResponse = await fetch(url, {
        ...options,
        headers: { ...options.headers, ...request.headers },
        body: updatedPayload ? JSON.stringify(updatedPayload) : undefined,
    });

    for (const middlewareFunction of middlewaresAfter) {
        const result: MiddlewareResponse = await middlewareFunction(request, fetchResponse);

        if (!result.pass) {
            return result.response;
        }
    }

    return fetchResponse;
}

export const Gateway = {
    Fetch
}