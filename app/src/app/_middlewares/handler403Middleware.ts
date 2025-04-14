import { MiddlewareResponse } from "./middlewareResponse";

export async function Handler403MiddlewareAfter(request: any, response: any): Promise<MiddlewareResponse> {
    const forbbiden = (response.status != 403)
    return {
        pass: forbbiden,
        response: {
            title: "Access Denied",
            description: "You don't has access to that content."
        },
        data: { }
    };
}
