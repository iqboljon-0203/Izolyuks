'use client'

import { useEffect, useMemo, useState, useTransition } from 'react'
import { Logo } from '@/components/ui'
import type { Content } from '@/lib/types'
import { logout, save } from './actions'

/* eslint-disable @typescript-eslint/no-explicit-any */
type Any = any
type Path = (string | number)[]

const TABS: { id: string; label: string; keys: (keyof Content)[]; hint?: string }[] = [
  { id: 'products', label: 'Mahsulotlar', keys: ['products'], hint: "Har bir mahsulot saytda alohida sahifaga ega. Narx 0 bo'lsa — «Narxi so'rov bo'yicha» ko'rinadi." },
  { id: 'calc', label: 'Narxlar · Kalkulyator', keys: ['calc'], hint: "Kalkulyator shu narxlar bo'yicha hisoblaydi. Narx: XPS uchun 1 qadoq, sintifon uchun 1 rulon narxi (so'm). 0 — narx ko'rsatilmaydi." },
  { id: 'home', label: 'Bosh sahifa', keys: ['hero', 'stats', 'advantages', 'steps', 'delivery'], hint: 'Sarlavhada *so‘z* yozsangiz, u chiroyli kursivda ajratib ko‘rsatiladi.' },
  { id: 'solutions', label: 'Yechimlar', keys: ['solutions'], hint: "Fundament, pol, devor, tom — har biri alohida sahifa (Google uchun)." },
  { id: 'gallery', label: 'Galereya', keys: ['gallery'] },
  { id: 'faq', label: 'Savol-javob', keys: ['faq'] },
  { id: 'site', label: 'Kontaktlar', keys: ['site'] },
  { id: 'seo', label: 'SEO', keys: ['seo'], hint: 'Google natijalarida chiqadigan sarlavha va tavsif. Sarlavha ~60, tavsif ~160 belgigacha bo‘lgani ma’qul.' },
]

const LABELS: Record<string, string> = {
  products: 'Mahsulotlar', calc: 'Kalkulyator materiallari', hero: 'Bosh ekran', stats: 'Raqamlar', advantages: 'Afzalliklar', steps: 'Ish bosqichlari', delivery: 'Yetkazib berish', solutions: 'Yechimlar', gallery: 'Galereya rasmlari', faq: 'Savollar', site: 'Kontakt ma’lumotlari', seo: 'SEO',
  slug: 'Sahifa manzili (URL)', cat: 'Toifa', badge: 'Belgi (TOP, NEW, HIT yoki bo‘sh)', image: 'Rasm', price: "Narx (so'm). 0 = so'rov bo'yicha", unit: "Narx birligi (qadoq, rulon...)", published: 'Saytda ko‘rsatish',
  name: 'Nomi', seoTitle: 'Google sarlavhasi (~60 belgi; bo‘sh — avtomatik)', seoDescription: 'Google tavsifi (~160 belgi; bo‘sh — avtomatik)', short: 'Qisqa tavsif', description: "To'liq tavsif (bo'sh qator — yangi xatboshi)", specs: 'Xususiyatlar', label: 'Nomi', value: 'Qiymati', features: 'Afzalliklar',
  zone: 'Uy sxemasidagi qism', thickness: 'Tavsiya etilgan qalinlik', text: 'Matn', id: 'ID', kind: 'Turi', sheetArea: 'Bitta list maydoni (m²)', options: 'Qalinlik va narxlar',
  mm: 'Qalinlik (mm)', perPack: 'Qadoqdagi listlar soni / rulondagi m²', title: 'Sarlavha', eyebrow: 'Ustki kichik yozuv', lead: 'Tavsif', icon: 'Ikonka', caption: 'Izoh', q: 'Savol', a: 'Javob', routes: "Yo'nalishlar", code: 'Kod',
  legalName: 'Yuridik nomi', foundingYear: 'Tashkil topgan yil', phone: 'Telefon (+998XXXXXXXXX)', phoneDisplay: "Telefon (saytda ko'rinishi)", phoneLabel: 'Telefon izohi', telegram: 'Telegram username (@siz)', instagram: 'Instagram username',
  address: 'Manzil', mapUrl: 'Xarita havolasi', mapEmbed: 'Xarita (iframe) havolasi', workHours: 'Ish vaqti', keywords: 'Kalit so‘zlar (vergul bilan)',
  images: 'Qo‘shimcha rasmlar (galereya)', geo: 'Xaritadagi nuqta', lat: 'Kenglik (lat)', lng: 'Uzunlik (lng)', product: 'Buyurtmada tanlanadigan mahsulot (slug)',
}
const LONG = new Set(['description', 'a', 'text', 'lead', 'short', 'seoDescription'])
const SELECTS: Record<string, { v: string; t: string }[]> = {
  cat: [{ v: 'xps', t: 'XPS penopleks' }, { v: 'sint', t: 'Sintifon' }, { v: 'pipe', t: 'Quvur izolyatsiyasi' }, { v: 'film', t: 'Plyonka' }, { v: 'acc', t: 'Mahkamlagich' }],
  zone: [{ v: 'fund', t: 'Fundament' }, { v: 'floor', t: 'Pol' }, { v: 'wall', t: 'Devor' }, { v: 'roof', t: 'Tom' }],
  kind: [{ v: 'board', t: 'Plita (list)' }, { v: 'roll', t: 'Rulon' }],
  icon: ['factory', 'box', 'truck', 'leaf', 'thermo', 'globe', 'phone', 'home', 'building', 'clock'].map((v) => ({ v, t: v })),
}

const isL = (v: Any) => v && typeof v === 'object' && !Array.isArray(v) && Object.keys(v).length === 2 && 'uz' in v && 'ru' in v
const label = (k: string | number) => (typeof k === 'number' ? `#${k + 1}` : LABELS[k] ?? k)

function itemTitle(v: Any, i: number) {
  const pick = v?.name?.uz || v?.title?.uz || v?.q?.uz || v?.caption?.uz || v?.label?.uz || v?.name?.uz
  if (pick) return pick
  if (typeof v?.mm === 'number') return `${v.mm} mm`
  if (v?.code) return v.code
  if (typeof v?.value === 'string' && v.value) return v.value
  if (isL(v)) return v.uz || `#${i + 1}`
  return `#${i + 1}`
}

function blank(sample: Any): Any {
  if (Array.isArray(sample)) return []
  if (isL(sample)) return { uz: '', ru: '' }
  if (sample && typeof sample === 'object') return Object.fromEntries(Object.entries(sample).map(([k, v]) => [k, blank(v)]))
  if (typeof sample === 'number') return 0
  if (typeof sample === 'boolean') return true
  return ''
}

function setIn(obj: Any, path: Path, val: Any): Any {
  if (!path.length) return val
  const [h, ...rest] = path
  const copy = Array.isArray(obj) ? [...obj] : { ...obj }
  copy[h as Any] = setIn(obj[h as Any], rest, val)
  return copy
}

/* ---------------- Image field with client-side resize + upload ---------------- */
async function resize(file: File): Promise<Blob> {
  if (!file.type.startsWith('image/') || file.type === 'image/svg+xml') return file
  const bmp = await createImageBitmap(file)
  const max = 1800
  const s = Math.min(1, max / Math.max(bmp.width, bmp.height))
  const cv = document.createElement('canvas')
  cv.width = Math.round(bmp.width * s)
  cv.height = Math.round(bmp.height * s)
  cv.getContext('2d')!.drawImage(bmp, 0, 0, cv.width, cv.height)
  return await new Promise((r) => cv.toBlob((b) => r(b || file), 'image/jpeg', 0.86))
}

function ImageField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const upload = async (f?: File | null) => {
    if (!f) return
    setBusy(true); setErr('')
    try {
      const blob = await resize(f)
      const fd = new FormData()
      fd.append('file', new File([blob], f.name.replace(/\.[^.]+$/, '') + '.jpg', { type: blob.type || 'image/jpeg' }))
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd })
      const j = await res.json()
      if (!res.ok) throw new Error(j.error || res.status)
      onChange(j.url)
    } catch (e) {
      setErr('Yuklab bo‘lmadi: ' + (e instanceof Error ? e.message : ''))
    } finally { setBusy(false) }
  }
  return (
    <div className="ad-img">
      <div className="ad-thumb">{value ? <img src={value} alt="" /> : <span>Rasm yo‘q</span>}</div>
      <div className="ad-img-r">
        <label className="btn btn-dark btn-sm ad-up">
          {busy ? 'Yuklanmoqda...' : 'Rasm yuklash'}
          <input type="file" accept="image/jpeg,image/png,image/webp" hidden disabled={busy} onChange={(e) => upload(e.target.files?.[0])} />
        </label>
        <input value={value} onChange={(e) => onChange(e.target.value)} placeholder="/img/... yoki https://..." />
        {err && <small className="ad-err">{err}</small>}
      </div>
    </div>
  )
}

/* ---------------- Generic recursive editor ---------------- */
function Field({ k, value, path, set, root }: { k: string | number; value: Any; path: Path; set: (p: Path, v: Any) => void; root: Content }) {
  const key = typeof k === 'string' ? k : ''

  if (key === 'image') return <div className="ad-f"><span className="ad-l">{label(k)}</span><ImageField value={value} onChange={(v) => set(path, v)} /></div>

  if (key === 'images') {
    const list: string[] = Array.isArray(value) ? value : []
    return (
      <div className="ad-f"><span className="ad-l">{label(k)}</span>
        <div className="ad-arr">
          {list.map((src, i) => (
            <div key={i} className="ad-flat">
              <ImageField value={src} onChange={(v) => set([...path, i], v)} />
              <span className="ad-tools"><button type="button" className="danger" title="O‘chirish" onClick={() => set(path, list.filter((_, x) => x !== i))}>✕</button></span>
            </div>
          ))}
          <button type="button" className="btn btn-line btn-sm ad-add" onClick={() => set(path, [...list, ''])}>+ Rasm qo‘shish</button>
        </div>
      </div>
    )
  }

  if (key === 'products' && Array.isArray(value) && path[0] === 'solutions') {
    return (
      <div className="ad-f"><span className="ad-l">Tavsiya etiladigan mahsulotlar</span>
        <div className="ad-checks">
          {root.products.map((p) => (
            <label key={p.slug}><input type="checkbox" checked={value.includes(p.slug)} onChange={(e) => set(path, e.target.checked ? [...value, p.slug] : value.filter((s: string) => s !== p.slug))} /> {p.name.uz}</label>
          ))}
        </div>
      </div>
    )
  }

  if (isL(value)) {
    const long = LONG.has(key) || (value.uz?.length ?? 0) > 90
    return (
      <div className="ad-f"><span className="ad-l">{label(k)}</span>
        <div className="ad-l2">
          {(['uz', 'ru'] as const).map((l) => (
            <label key={l} className="ad-lang"><i>{l.toUpperCase()}</i>
              {long
                ? <textarea rows={key === 'description' ? 7 : 3} value={value[l]} onChange={(e) => set([...path, l], e.target.value)} />
                : <input value={value[l]} onChange={(e) => set([...path, l], e.target.value)} />}
            </label>
          ))}
        </div>
      </div>
    )
  }

  if (Array.isArray(value)) return <ArrayField k={k} value={value} path={path} set={set} root={root} />

  if (value && typeof value === 'object') {
    return (
      <fieldset className="ad-obj">
        {typeof k === 'string' && path.length > 1 && <legend>{label(k)}</legend>}
        {Object.entries(value).map(([ck, cv]) => <Field key={ck} k={ck} value={cv} path={[...path, ck]} set={set} root={root} />)}
      </fieldset>
    )
  }

  if (typeof value === 'boolean') {
    return <label className="ad-f ad-bool"><input type="checkbox" checked={value} onChange={(e) => set(path, e.target.checked)} /> {label(k)}</label>
  }

  if (SELECTS[key]) {
    return (
      <label className="ad-f"><span className="ad-l">{label(k)}</span>
        <select value={value} onChange={(e) => set(path, e.target.value)}>{SELECTS[key].map((o) => <option key={o.v} value={o.v}>{o.t}</option>)}</select>
      </label>
    )
  }

  if (typeof value === 'number') {
    return (
      <label className="ad-f"><span className="ad-l">{label(k)}</span>
        <input type="number" step="any" value={value} onChange={(e) => set(path, e.target.value === '' ? 0 : Number(e.target.value))} />
        {key === 'price' && value > 0 && <small className="ad-hint">{new Intl.NumberFormat('ru-RU').format(value)} so‘m</small>}
      </label>
    )
  }

  return (
    <label className="ad-f"><span className="ad-l">{label(k)}</span>
      <input value={value ?? ''} onChange={(e) => set(path, key === 'slug' ? e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') : e.target.value)} />
    </label>
  )
}

function ArrayField({ k, value, path, set, root }: { k: string | number; value: Any[]; path: Path; set: (p: Path, v: Any) => void; root: Content }) {
  const primitive = value.length > 0 && typeof value[0] !== 'object'
  const add = () => {
    let item = value.length ? blank(value[0]) : { uz: '', ru: '' }
    if (k === 'products') item = { ...item, slug: `yangi-mahsulot-${value.length + 1}`, cat: 'xps', published: false, specs: [], features: [] }
    if (k === 'solutions') item = { ...item, slug: `yangi-yechim-${value.length + 1}`, zone: 'wall', products: [] }
    if (k === 'options') item = { mm: 0, perPack: 1, price: 0 }
    set(path, [...value, item])
  }
  const move = (i: number, d: number) => {
    const j = i + d
    if (j < 0 || j >= value.length) return
    const a = [...value];[a[i], a[j]] = [a[j], a[i]]
    set(path, a)
  }
  const del = (i: number) => { if (confirm('O‘chirilsinmi?')) set(path, value.filter((_, x) => x !== i)) }
  const dup = (i: number) => {
    const c = structuredClone(value[i])
    if (c && typeof c === 'object' && 'slug' in c) c.slug = `${c.slug}-nusxa`
    set(path, [...value.slice(0, i + 1), c, ...value.slice(i + 1)])
  }
  const flat = k === 'options' || k === 'stats' || k === 'routes' || k === 'specs'

  return (
    <div className="ad-arr">
      {typeof k === 'string' && path.length > 1 && <div className="ad-l">{label(k)}</div>}
      {value.map((v, i) => {
        const tools = (
          <span className="ad-tools">
            <button type="button" onClick={() => move(i, -1)} title="Yuqoriga">↑</button>
            <button type="button" onClick={() => move(i, 1)} title="Pastga">↓</button>
            {!primitive && <button type="button" onClick={() => dup(i)} title="Nusxa">⧉</button>}
            <button type="button" onClick={() => del(i)} title="O‘chirish" className="danger">✕</button>
          </span>
        )
        if (primitive) return <div key={i} className="ad-prim"><input value={v} onChange={(e) => set([...path, i], e.target.value)} />{tools}</div>
        if (flat) return <div key={i} className="ad-flat">{Object.entries(v).map(([ck, cv]) => <Field key={ck} k={ck} value={cv} path={[...path, i, ck]} set={set} root={root} />)}{tools}</div>
        return (
          <details key={i} className="ad-item">
            <summary>
              <span className="ad-item-t">{v?.published === false && <em className="ad-off">yashirin</em>}{v?.image && <img src={v.image} alt="" />}{itemTitle(v, i)}</span>
              {tools}
            </summary>
            <div className="ad-item-b">
              {isL(v) ? <Field k={i} value={v} path={[...path, i]} set={set} root={root} /> : Object.entries(v).map(([ck, cv]) => <Field key={ck} k={ck} value={cv} path={[...path, i, ck]} set={set} root={root} />)}
            </div>
          </details>
        )
      })}
      <button type="button" className="btn btn-line btn-sm ad-add" onClick={add}>+ Qo‘shish</button>
    </div>
  )
}

/* ---------------- Main editor ---------------- */
export default function AdminEditor({ initial, storage, telegram }: { initial: Content; storage: 'blob' | 'local' | 'none'; telegram: boolean }) {
  const [data, setData] = useState<Content>(initial)
  const [saved, setSaved] = useState(JSON.stringify(initial))
  const [tab, setTab] = useState(TABS[0].id)
  const [msg, setMsg] = useState<{ ok: boolean; t: string } | null>(null)
  const [pending, start] = useTransition()
  const dirty = useMemo(() => JSON.stringify(data) !== saved, [data, saved])

  useEffect(() => {
    const on = (e: BeforeUnloadEvent) => { if (dirty) { e.preventDefault() } }
    window.addEventListener('beforeunload', on)
    return () => window.removeEventListener('beforeunload', on)
  }, [dirty])

  const set = (p: Path, v: Any) => setData((d) => setIn(d, p, v))
  const t = TABS.find((x) => x.id === tab)!

  const doSave = () => start(async () => {
    const json = JSON.stringify(data)
    const r = await save(json)
    if (r.ok) { setSaved(json); setMsg({ ok: true, t: 'Saqlandi! Saytda bir necha soniyada yangilanadi.' }) }
    else setMsg({ ok: false, t: r.error || 'Xato' })
    setTimeout(() => setMsg(null), 6000)
  })

  return (
    <div className="ad">
      <aside className="ad-side">
        <div className="ad-brand"><Logo height={24} /><small>Admin panel</small></div>
        <nav>
          {TABS.map((x) => <button key={x.id} className={x.id === tab ? 'on' : ''} onClick={() => setTab(x.id)}>{x.label}</button>)}
        </nav>
        <div className="ad-status">
          <span className={storage === 'none' ? 'bad' : 'good'}>{storage === 'blob' ? '● Saqlash: Vercel Blob' : storage === 'local' ? '● Saqlash: lokal fayl' : '● Blob ulanmagan — saqlab bo‘lmaydi'}</span>
          <span className={telegram ? 'good' : 'bad'}>{telegram ? '● Telegram bot ulangan' : '● Telegram bot sozlanmagan'}</span>
        </div>
        <div className="ad-side-b">
          <a href="/uz" target="_blank" rel="noopener" className="btn btn-line btn-sm">Saytni ochish ↗</a>
          <form action={logout}><button className="btn btn-sm ad-logout">Chiqish</button></form>
        </div>
      </aside>

      <main className="ad-main">
        <div className="ad-top">
          <div>
            <h1>{t.label}</h1>
            {t.hint && <p className="muted">{t.hint}</p>}
          </div>
          <div className="ad-save">
            {dirty && <span className="ad-dirty">Saqlanmagan o‘zgarishlar bor</span>}
            <button className="btn btn-dark" onClick={doSave} disabled={pending || !dirty}>{pending ? 'Saqlanmoqda...' : 'Saqlash'}</button>
          </div>
        </div>
        {msg && <div className={msg.ok ? 'note-box ok' : 'note-box err'}>{msg.t}</div>}
        <div className="ad-body">
          {t.keys.map((key) => (
            <section key={key} className="ad-sec">
              {t.keys.length > 1 && <h2>{label(key)}</h2>}
              <Field k={key} value={data[key]} path={[key]} set={set} root={data} />
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
