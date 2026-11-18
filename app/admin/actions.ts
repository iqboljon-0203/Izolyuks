'use server'

import { cookies } from 'next/headers'
import { updateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { ADMIN_COOKIE, checkPassword, cookieOptions, isAdmin, makeToken } from '@/lib/auth'
import { CONTENT_TAG, saveContent } from '@/lib/content'
import type { Content } from '@/lib/types'

export async function login(_: string | null, form: FormData): Promise<string | null> {
  if (!process.env.ADMIN_PASSWORD) return "ADMIN_PASSWORD o'rnatilmagan (Vercel → Settings → Environment Variables)."
  // Small delay against brute force.
  await new Promise((r) => setTimeout(r, 600))
  if (!checkPassword(String(form.get('password') ?? ''))) return "Parol noto'g'ri."
  const jar = await cookies()
  jar.set(ADMIN_COOKIE, makeToken(), cookieOptions)
  redirect('/admin')
}

export async function logout() {
  const jar = await cookies()
  jar.delete(ADMIN_COOKIE)
  redirect('/admin')
}

function validate(c: Content): string | null {
  if (!c || typeof c !== 'object') return "Ma'lumot noto'g'ri"
  for (const k of ['site', 'seo', 'hero', 'products', 'solutions', 'calc', 'faq'] as const) if (!(k in c)) return `"${k}" bo'limi yo'q`
  const slugs = new Set<string>()
  for (const p of c.products) {
    if (!/^[a-z0-9-]+$/.test(p.slug)) return `Mahsulot manzili (slug) faqat kichik lotin harf, raqam va "-" bo'lishi kerak: "${p.slug}"`
    if (slugs.has(p.slug)) return `Mahsulot manzili takrorlangan: "${p.slug}"`
    slugs.add(p.slug)
    if (!p.name.uz || !p.name.ru) return 'Har bir mahsulotning UZ va RU nomi bo\'lishi kerak'
  }
  for (const s of c.solutions) if (!/^[a-z0-9-]+$/.test(s.slug)) return `Yechim manzili noto'g'ri: "${s.slug}"`
  return null
}

export async function save(json: string): Promise<{ ok: boolean; error?: string }> {
  if (!(await isAdmin())) return { ok: false, error: 'Sessiya tugagan, qayta kiring.' }
  let data: Content
  try {
    data = JSON.parse(json)
  } catch {
    return { ok: false, error: 'JSON xato' }
  }
  const err = validate(data)
  if (err) return { ok: false, error: err }
  try {
    await saveContent(data)
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : 'Saqlashda xato' }
  }
  updateTag(CONTENT_TAG)
  return { ok: true }
}
