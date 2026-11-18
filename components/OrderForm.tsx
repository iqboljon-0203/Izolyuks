'use client'

import { useEffect, useState } from 'react'
import type { Dict } from '@/lib/i18n'
import type { Lang } from '@/lib/types'
import { PREFILL_EVENT, type Prefill } from './Calculator'
import { Icon } from './ui'

type Opt = { slug: string; name: string }

export default function OrderForm({ lang, d, products, telegram, defaultProduct }: { lang: Lang; d: Dict; products: Opt[]; telegram: string; defaultProduct?: string }) {
  const f = d.contact.form
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('+998 ')
  const [product, setProduct] = useState(defaultProduct ?? products[0]?.slug ?? '')
  const [msg, setMsg] = useState('')
  const [hp, setHp] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'fallback' | 'err'>('idle')

  useEffect(() => {
    const on = (e: Event) => {
      const p = (e as CustomEvent<Prefill>).detail
      if (p.product) setProduct(p.product)
      if (p.message !== undefined) setMsg(p.message)
      setState('idle')
    }
    window.addEventListener(PREFILL_EVENT, on)
    return () => window.removeEventListener(PREFILL_EVENT, on)
  }, [])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const digits = phone.replace(/\D/g, '')
    if (name.trim().length < 2 || digits.length < 9) return setState('err')
    setState('sending')
    const pname = products.find((p) => p.slug === product)?.name ?? ''
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, product: pname, message: msg, lang, page: location.pathname, website: hp }),
      })
      if (res.ok) {
        setState('ok')
        setName(''); setMsg('')
        return
      }
      throw new Error(String(res.status))
    } catch {
      // Bot not configured or network error → hand off to Telegram chat.
      const txt = `Assalomu alaykum! Saytdan ariza:\n👤 ${name}\n📞 ${phone}\n📦 ${pname}\n📝 ${msg}`
      try { await navigator.clipboard.writeText(txt) } catch {}
      setState('fallback')
      window.open(`https://t.me/${telegram}`, '_blank', 'noopener')
    }
  }

  return (
    <form className="cbox oform" onSubmit={submit} id="order" noValidate>
      <h3>{f.t}</h3>
      <p className="muted">{f.p}</p>
      <div className="row">
        <label className="sr" htmlFor="o-name">{f.name}</label>
        <input id="o-name" required placeholder={f.name} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        <label className="sr" htmlFor="o-phone">{f.phone}</label>
        <input id="o-phone" required type="tel" placeholder={f.phone} value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" inputMode="tel" />
      </div>
      <label className="sr" htmlFor="o-prod">{f.product}</label>
      <select id="o-prod" value={product} onChange={(e) => setProduct(e.target.value)}>
        {products.map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
      </select>
      <label className="sr" htmlFor="o-msg">{f.msg}</label>
      <textarea id="o-msg" rows={4} placeholder={f.msg} value={msg} onChange={(e) => setMsg(e.target.value)} />
      <input className="hp" tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} name="website" aria-hidden="true" />
      <button className="btn btn-dark" type="submit" disabled={state === 'sending'}>
        <span>{state === 'sending' ? f.sending : f.send}</span><Icon name="arrow" />
      </button>
      {state === 'ok' && <div className="note-box ok" role="status">{f.ok}</div>}
      {state === 'fallback' && <div className="note-box ok" role="status">{f.fallback}</div>}
      {state === 'err' && <div className="note-box err" role="alert">{f.err}</div>}
    </form>
  )
}
