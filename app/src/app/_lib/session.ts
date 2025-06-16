"use server"

import 'server-only'

import { SignJWT, jwtVerify } from 'jose'
import { JWTPayload } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { logger } from '../_utils/logger'

interface Keys {
  [key: string]: string | undefined
}

const keys: Keys = {
    'access': process.env.ACCESS_TOKEN_SECRET,
    'refresh': process.env.REFRESH_TOKEN_SECRET,
}

const secretKey = process.env.SESSION_SECRET_KEY
const encodedKey = new TextEncoder().encode(secretKey ? secretKey : "")

export interface SessionPayload extends JWTPayload {
    access_token: string,
    refresh_token?: string,
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify<SessionPayload>(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    logger.error("Error on decrypt token", {"function_name": decrypt.name, "error": error})
    throw error
  }
}

export async function decryptApiTokens<T>(session: string | undefined = '', tokenSecretKey: string = 'access') {
  const secret = keys[tokenSecretKey]

  if (!secret) {
    throw new Error('Missing secret')
  }

  const encodedKey = new TextEncoder().encode(secret ? secret : "")
  //logger.debug("Secret Key Used", {encodedKey: encodedKey, secret: secret})

  const { payload } = await jwtVerify<T>(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
}
 
export async function createSession(access_token: string, refresh_token: string | undefined) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ access_token, refresh_token, expiresAt })

  if (!session || session.length === 0) {
    throw new Error('Failed to create valid session token')
  }
  
  const cookieStore = await cookies()
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
 
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
 
  const cookieStore = await cookies()

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

export async function logout() {
  await deleteSession()
  redirect('/login')
}
