"use server"

import { cookies } from 'next/headers'
import { decodeJwt, JWTPayload } from 'jose'
import { NextRequest, NextResponse } from 'next/server'
import { createSession, decrypt, updateSession } from '@/app/_lib/session'
import { logger } from './app/_utils/logger'

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

export default async function middleware(req: NextRequest) {
  logger.info("starting | middleware", { "function_name": middleware.name })
  
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isPublicRoute = publicRoutes.includes(path)
  
  const token = req.nextUrl.searchParams.get('token')
  
  if (token) {
    logger.info("Get token query param", {"function_name": middleware.name})
    await createSession(token)
  }
  
  let jwtSessionToken = null
  const cookie = (await cookies()).get('session')?.value
  if (cookie) {
    const session = await decrypt(cookie)
    jwtSessionToken = session ? decodeJwt<JwtSessionPayload>(session?.token) : null
  }
  
  if (isProtectedRoute && !jwtSessionToken) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
  
  if ((isPublicRoute || isProtectedRoute) && !path.startsWith("/register") && jwtSessionToken?.status == UserStatus.Pending) {
    return NextResponse.redirect(new URL('/register', req.nextUrl))
  }
  
  if ((isPublicRoute || isProtectedRoute) && path.startsWith("/register") && jwtSessionToken?.status != UserStatus.Pending) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }
  
  logger.info("Finished | middleware", { "function_name": middleware.name })
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}