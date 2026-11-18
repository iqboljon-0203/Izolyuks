import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

const esc = (s: unknown) =>
  String(s ?? '').slice(0, 1500).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// Simple per-instance rate limit: 5 orders per IP per 10 minutes.
const hits = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now()
  const arr = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000)
  arr.push(now)
  hits.set(ip, arr)
  return arr.length > 5
}

export async function POST(req: Request) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chat = process.env.TELEGRAM_CHAT_ID
  if (!token || !chat) return NextResponse.json({ ok: false, error: 'not_configured' }, { status: 503 })

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'bad_json' }, { status: 400 })
  }
  // Honeypot: bots fill the hidden "website" field.
  if (body.website) return NextResponse.json({ ok: true })

  const name = String(body.name ?? '').trim()
  const phone = String(body.phone ?? '').trim()
  if (name.length < 2 || phone.replace(/\D/g, '').length < 9) {
    return NextResponse.json({ ok: false, error: 'invalid' }, { status: 422 })
  }
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (limited(ip)) return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 })

  const text = [
    '🆕 <b>Yangi ariza — izolyuks.uz</b>',
    '',
    `👤 <b>Ism:</b> ${esc(name)}`,
    `📞 <b>Telefon:</b> ${esc(phone)}`,
    body.product ? `📦 <b>Mahsulot:</b> ${esc(body.product)}` : '',
    body.message ? `📝 <b>Izoh:</b> ${esc(body.message)}` : '',
    '',
    `🌐 ${esc(body.lang === 'ru' ? 'RU' : 'UZ')} · ${esc(body.page)}`,
  ].filter((l, i, a) => l !== '' || (a[i - 1] !== '' && i > 0)).join('\n')

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: chat, text, parse_mode: 'HTML', disable_web_page_preview: true }),
  })
  if (!res.ok) return NextResponse.json({ ok: false, error: 'telegram' }, { status: 502 })
  return NextResponse.json({ ok: true })
}
