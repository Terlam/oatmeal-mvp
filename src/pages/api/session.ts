// pages/api/session.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'
import { adminAuth } from '../../firebase/admin'

const COOKIE_NAME = '__session'
const FIVE_DAYS_IN_MS = 5 * 24 * 60 * 60 * 1000

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Helper to set a cookie
  const setCookie = (value: string) => {
    const cookie = serialize(COOKIE_NAME, value, {
      maxAge: FIVE_DAYS_IN_MS / 1000,
      expires: new Date(Date.now() + FIVE_DAYS_IN_MS),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      sameSite: 'lax',
    })
    res.setHeader('Set-Cookie', cookie)
  }

  if (req.method === 'POST') {
    const { token } = req.body
      console.log('Received token in /api/session:', token?.slice(0, 20))
    if (!token) {
      return res.status(400).json({ error: 'Missing Firebase ID token' })
    }

    // Are we pointing at the Auth emulator?
    const isEmulator =
      process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true'

    try {
      if (isEmulator) {
        // Emulator tokens have no 'kid', so just persist the raw ID token
        setCookie(token)
      } else {
        // Production: verify & mint a session cookie
        await adminAuth.verifyIdToken(token)
        const sessionCookie = await adminAuth.createSessionCookie(token, {
          expiresIn: FIVE_DAYS_IN_MS,
        })
        setCookie(sessionCookie)
      }
      return res.status(200).json({ status: 'success' })
    } catch (err: any) {
      console.error('Failed to create session cookie', err)
      return res.status(401).json({ error: 'Unauthorized: ' + err.message })
    }
  }

  if (req.method === 'DELETE') {
    // Clear the cookie
    const expired = serialize(COOKIE_NAME, '', {
      maxAge: -1,
      path: '/',
    })
    res.setHeader('Set-Cookie', expired)
    return res.status(200).json({ status: 'deleted' })
  }

  res.setHeader('Allow', ['POST', 'DELETE'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
