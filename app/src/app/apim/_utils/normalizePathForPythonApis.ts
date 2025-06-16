import {enviroments} from "@/app/_lib/environments";
import { NextRequest } from "next/server";

export function normalizePathForApis(backenpoint: string, request: NextRequest) : string {
    const pathname = request.nextUrl.pathname.replace(`${enviroments["user"]?.apim["v2"]}`, "");
    const searchParams = request.nextUrl.searchParams.toString();
    const normalizedPathname = pathname.endsWith('/') ? pathname : pathname + '/';
    return `${backenpoint}${normalizedPathname}${searchParams ? `?${searchParams}` : ''}`;
}
