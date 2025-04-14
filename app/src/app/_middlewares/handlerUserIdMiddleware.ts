import { MiddlewareResponse } from "./middlewareResponse";

export async function HandlerUserIdMiddlewareAfter(request: any, response: any): Promise<MiddlewareResponse> {
    const userId = response.headers.get("X-User-Id");
    const userColor = response.headers.get("X-User-Color");
    if (userId && userId != "") localStorage.setItem("userId", userId);
    if (userColor && userColor != "") localStorage.setItem("userColor", userColor);
    return {
        pass: true,
        response: { },
        data: { }
    };
}

export async function HandlerUserIdMiddlewareBefore(request: any, playload: any): Promise<MiddlewareResponse> {
    const userId = localStorage.getItem("userId") ?? "";
    const headers = { "X-User-Id": userId }
    request.headers = { ...request.headers, ...headers }
    return {
        pass: true, 
        data: { }
    };
}