import { MiddlewareResponse } from "./middlewareResponse";

export async function HandlerAuthMiddlewareBefore(request: any, playload: any): Promise<MiddlewareResponse> {
    const token = "test"
    const pass = !token ? false : true; 
    const headers = { "Authorization": `Bearer ${token}` }
    request.headers = { ...request.headers, ...headers }
    return {
        pass: true, 
        data: { }
    };
}