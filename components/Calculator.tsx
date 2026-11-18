'use client'

import { useMemo, useState } from 'react'
import type { Dict } from '@/lib/i18n'
import { formatPrice } from '@/lib/i18n'
import type { CalcMaterial, Lang } from '@/lib/types'
import { Icon } from './ui'

export const PREFILL_EVENT = 'izl:prefill'
export type Prefill = { product?: string; message?: string }

export function prefillOrder(detail: Prefill) {
  window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail }))
  document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Calculator({ lang, d, materials, productFor }: { lang: Lang; d: Dict; materials: CalcMaterial[]; productFor: Record<string, string> }) {
  const [mid, setMid] = useState(materials[0]?.id ?? '')
  const mat = materials.find((m) => m.id === mid) ?? materials[0]
  const [mm, setMm] = useState<number>(mat?.options[Math.min(3, (mat?.options.length ?? 1) - 1)]?.mm ?? 0)
  const [area, setArea] = useState(100)
  const [reserve, setReserve] = useState(5)

  const opt = mat?.options.find((o) => o.mm === mm) ?? mat?.options[0]

  const r = useMemo(() => {
    if (!mat || !opt) return null
    const A = area * (1 + reserve / 100)
    const volume = (A * opt.mm) / 1000
    if (mat.kind === 'board') {
      const sheets = Math.ceil(A / (mat.sheetArea || 0.7))
      const packs = Math.ceil(sheets / Math.max(1, opt.perPack))
      return { A, volume, main: sheets, mainUnit: d.calc.sheets, packs, cost: opt.price ? packs * opt.price : 0, summary: `${mat.name[lang]} ${opt.mm} mm · ${area} m² → ${sheets} ${d.calc.sheets}, ${packs} ${d.calc.packs.toLowerCase()}` }
    }
    const rolls = Math.ceil(A / Math.max(1, opt.perPack))
    return { A, volume, main: rolls, mainUnit: d.calc.rolls, packs: 0, cost: opt.price ? rolls * opt.price : 0, summary: `${mat.name[lang]} ${opt.mm} mm · ${area} m² → ${rolls} ${d.calc.rolls}` }
  }, [mat, opt, area, reserve, d, lang])

  if (!mat || !opt || !r) return null
  const fmt = (n: number) => n.toLocaleString('ru-RU', { maximumFractionDigits: 2 })

  const pickMat = (id: string) => {
    setMid(id)
    const m = materials.find((x) => x.id === id)
    if (m && !m.options.some((o) => o.mm === mm)) setMm(m.options[Math.min(1, m.options.length - 1)].mm)
  }

  return (
    <div className="calc">
      <div className="cbox rv">
        <div className="field">
          <label>{d.calc.material}</label>
          <div className="seg">
            {materials.map((m) => (
              <button key={m.id} className={m.id === mat.id ? 'on' : ''} onClick={() => pickMat(m.id)}>{m.name[lang]}</button>
            ))}
          </div>
        </div>
        <div className="field">
          <label htmlFor="c-area"><span>{d.calc.area}</span>
            <input className="num-in" type="number" min={1} max={100000} value={area} onChange={(e) => setArea(Math.max(1, Number(e.target.value) || 1))} aria-label={d.calc.area} />
          </label>
          <input id="c-area" type="range" min={5} max={3000} step={5} value={Math.min(area, 3000)} onChange={(e) => setArea(Number(e.target.value))} />
        </div>
        <div className="field">
          <label>{d.calc.thickness}</label>
          <div className="seg">
            {mat.options.map((o) => (
              <button key={o.mm} className={o.mm === opt.mm ? 'on' : ''} onClick={() => setMm(o.mm)}>{o.mm} mm</button>
            ))}
          </div>
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label htmlFor="c-res"><span>{d.calc.reserve}</span><b>{reserve}%</b></label>
          <input id="c-res" type="range" min={0} max={15} value={reserve} onChange={(e) => setReserve(Number(e.target.value))} />
        </div>
      </div>
      <div className="res rv" aria-live="polite">
        <span className="eyebrow">{d.calc.need}</span>
        <div className="rnum">{r.main} <small>{r.mainUnit}</small></div>
        {/* Show the arithmetic so the customer can follow it */}
        <div className="how">
          <small>{d.calc.how}</small>
          {mat.kind === 'board' ? (
            <>
              <span>{d.calc.sheetArea} = {fmt(mat.sheetArea || 0.7)} m²</span>
              <span>{fmt(r.A)} m² ÷ {fmt(mat.sheetArea || 0.7)} m² = <b>{r.main} {d.calc.listUnit}</b></span>
              <span>{r.main} ÷ {opt.perPack} = <b>{r.packs} {d.calc.packs.toLowerCase()}</b></span>
            </>
          ) : (
            <>
              <span>{d.calc.rollArea} = {fmt(opt.perPack)} m²</span>
              <span>{fmt(r.A)} m² ÷ {fmt(opt.perPack)} m² = <b>{r.main} {d.calc.rollUnit}</b></span>
            </>
          )}
        </div>
        <div className="rlist">
          <div><span>{d.calc.areaRes}</span><b>{fmt(r.A)} m²</b></div>
          {mat.kind === 'board'
            ? <div><span>{d.calc.packs} ({d.calc.inPack.toLowerCase()} {opt.perPack} {d.calc.packOf})</span><b>{r.packs}</b></div>
            : <div><span>{d.calc.rollArea}</span><b>{fmt(opt.perPack)} m²</b></div>}
          <div><span>{d.calc.volume}</span><b>{fmt(r.volume)}</b></div>
          <div className="cost"><span>{d.calc.cost}</span><b>{r.cost ? `≈ ${formatPrice(r.cost)} ${d.price.currency}` : d.calc.costNA}</b></div>
        </div>
        <p className="note">{d.calc.note}</p>
        <button className="btn btn-yellow" onClick={() => prefillOrder({ product: productFor[mat.id], message: r.summary + (r.cost ? ` ≈ ${formatPrice(r.cost)} ${d.price.currency}` : '') })}>
          <span>{d.calc.btn}</span><Icon name="arrow" />
        </button>
      </div>
    </div>
  )
}
