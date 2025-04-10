import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const response = NextResponse.next();

    // Get 'X-User-Id' from request headers or cookies
    const userIdFromCookies = req.cookies.get("userId")?.value ?? "";
    const userIdFromHeaders = req.headers.get("X-User-Id");

    // Store 'X-User-Id' in cookies if received in headers
    if (userIdFromHeaders && userIdFromHeaders !== userIdFromCookies) {
        response.cookies.set("userId", userIdFromHeaders, { path: "/", secure: true, httpOnly: true });
    }

    // Clone headers and inject 'X-User-Id' if found in cookies
    const modifiedHeaders = new Headers(req.headers);
    if (userIdFromCookies) {
        modifiedHeaders.set("X-User-Id", userIdFromCookies);
    }

    return NextResponse.next({
        request: {
            headers: modifiedHeaders,
        },
    });
}

// Apply middleware only to API requests
export const config = {
    matcher: "/api/:path*",
};
