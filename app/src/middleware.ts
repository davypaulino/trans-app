"use server"

import { cookies } from 'next/headers'
import { JWTPayload } from 'jose'
import { NextRequest, NextResponse } from 'next/server'
import {createSession, decrypt, decryptApiTokens} from '@/app/_lib/session'
import { logger } from './app/_utils/logger'
import {ExternAuthApiMiddleware} from "@/app/_middlewares/externAuthApiMiddleware";
import {TryGetToken} from "@/app/_middlewares/tryGetToken";
import {enviroments} from "@/app/_lib/environments";

const protectedRoutes = ['/games', '/register', '/home', '/ranking', '/rooms', '/users']
const publicRoutes = ['/']

enum UserStatus {
  // 1 ~ 29 User Active
  Active = 1,
  // 40 ~ 49 Warning
  Pending = 40,
  // 50 ~ 59 Error
  Inactive = 50,
  Suspended = 51,
}

enum UserRole {
  NormalUser,
  GmUser,
  Admin,
}

export interface JwtSessionPayload extends JWTPayload {
  role: UserRole,
  nickname: string,
  status: UserStatus,
}

interface UserTokenResponse {
  access_token: string
  refresh_token: string
}

const REFRESH_THRESHOLD_SECONDS = 300;

export default async function middleware(req: NextRequest) {
  logger.info("starting | middleware", { "function_name": middleware.name })
  
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isPublicRoute = publicRoutes.includes(path)
  const isApimRoute = path.startsWith("/apim")

  let refreshToken: JWTPayload | null = null
  let accessToken: JwtSessionPayload | null = null
  const cookie = (await cookies()).get('session')?.value

  if (!isApimRoute && !cookie) {
    const hasToken = await TryGetToken(req)
    if (hasToken) {
      return hasToken
    }
  }

  if (cookie) {
    try {
      const session = await decrypt(cookie)
      accessToken = session ? await decryptApiTokens<JwtSessionPayload>(session?.access_token) : null
      refreshToken = session && session.refresh_token ? await decryptApiTokens<JWTPayload>(session.refresh_token, 'refresh') : null
    } catch (e: any) {
      (await cookies()).delete("session")
      req.cookies.delete('session')
      logger.error("", {error: e})
      return NextResponse.redirect(new URL( '/', req.nextUrl))
    }
  }

  if (accessToken && refreshToken) {
    const now = Math.floor(Date.now() / 1000); // Current Unix timestamp in seconds
    const expiry = accessToken.exp ?? Math.floor(Date.now() / 1000) - 2000;

    if (expiry - now < REFRESH_THRESHOLD_SECONDS && refreshToken) {
      logger.info("Middleware: Access token is near expiration, attempting refresh.", { userId: accessToken.sub });

      try {
        const renewApiUrl = `${enviroments["auth"]?.Host}${enviroments["auth"]?.http["v1"]}`
        const renewResponse = await fetch(`${renewApiUrl}/token/refresh`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ access_token: accessToken, refresh_token: refreshToken }),
          cache: 'no-store',
        });

        if (renewResponse.ok) {
          const renewData: UserTokenResponse = await renewResponse.json();
          logger.info("Middleware: Token refreshed successfully.", { userId: refreshToken.sub });
          await createSession(renewData.access_token, renewData.refresh_token)
        } else {
          const errorBody = await renewResponse.text();
          (await cookies()).delete("session")
          req.cookies.delete('session')
          logger.error("Middleware: Failed to refresh token from API", { status: renewResponse.status, body: errorBody, userId: accessToken.sub });
          return NextResponse.redirect(new URL( '/', req.nextUrl))
        }
      } catch (error) {
        (await cookies()).delete("session")
        req.cookies.delete('session')
        logger.error("Middleware: Network error during token refresh", { error_message: (error as Error).message, userId: accessToken.sub });
        return NextResponse.redirect(new URL( '/', req.nextUrl))
      }
    }
  }

  if (isApimRoute) {
    const externResponse = await ExternAuthApiMiddleware(req)
    if (externResponse) {
      return externResponse
    }
    return NextResponse.next()
  }

  if (isProtectedRoute && !accessToken && !isPublicRoute ) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  if ((isPublicRoute || isProtectedRoute) && !path.startsWith("/register") && accessToken?.status == UserStatus.Pending) {
    return NextResponse.redirect(new URL('/register', req.nextUrl))
  }

  if ((isPublicRoute || isProtectedRoute) && path.startsWith("/register") && accessToken?.status != UserStatus.Pending) {
    return NextResponse.redirect(new URL('/home', req.nextUrl))
  }

  logger.info("Finished | middleware", { "function_name": middleware.name })
  return NextResponse.next()
}

export const config = {
  matcher: [
      `/apim/v1/user-session:path*`,
      `/apim/v1/guardian:path*`,
      `/apim/v1/game-core:path*`,
      '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpeg$|.*\\.gif$|.*\\.css$|.*\\.js$).*)',
  ],
}

