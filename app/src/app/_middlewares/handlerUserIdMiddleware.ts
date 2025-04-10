import { MiddlewareResponse } from "./middlewareResponse";

export async function HandlerUserIdMiddlewareAfter(request: any, response: any): Promise<MiddlewareResponse> {
    const userId = response.headers.get("X-User-Id");
    if (userId) {
        localStorage.setItem("userId", userId);
    }
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