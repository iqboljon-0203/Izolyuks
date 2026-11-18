import { cookies } from 'next/headers'
import { createHmac, timingSafeEqual } from 'node:crypto'

export const ADMIN_COOKIE = 'izl_admin'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 kun

function secret() {
  return process.env.ADMIN_SECRET || process.env.ADMIN_PASSWORD || ''
}

function sign(payload: string) {
  return createHmac('sha256', secret()).update(payload).digest('hex')
}

/** token = expiry.signature */
export function makeToken() {
  const exp = String(Date.now() + MAX_AGE * 1000)
  return `${exp}.${sign(exp)}`
}

function validToken(token?: string) {
  if (!token || !secret()) return false
  const [exp, sig] = token.split('.')
  if (!exp || !sig || Number(exp) < Date.now()) return false
  const a = Buffer.from(sig)
  const b = Buffer.from(sign(exp))
  return a.length === b.length && timingSafeEqual(a, b)
}

export async function isAdmin() {
  const jar = await cookies()
  return validToken(jar.get(ADMIN_COOKIE)?.value)
}

export function checkPassword(input: string) {
  const pass = process.env.ADMIN_PASSWORD || ''
  if (!pass) return false
  const a = Buffer.from(input)
  const b = Buffer.from(pass)
  return a.length === b.length && timingSafeEqual(a, b)
}

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/',
  maxAge: MAX_AGE,
}
