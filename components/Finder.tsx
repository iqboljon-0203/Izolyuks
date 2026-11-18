'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import type { Dict } from '@/lib/i18n'
import type { Lang } from '@/lib/types'
import { Icon } from './ui'

type Zone = 'fund' | 'floor' | 'wall' | 'roof'
type Sol = { slug: string; zone: Zone; name: string; text: string; thickness: string; products: { slug: string; name: string; cat: string; image: string }[] }

export default function Finder({ lang, d, solutions }: { lang: Lang; d: Dict; solutions: Sol[] }) {
  const [z, setZ] = useState<Zone>(solutions.find((s) => s.zone === 'floor')?.zone ?? solutions[0]?.zone ?? 'floor')
  const sol = solutions.find((s) => s.zone === z) ?? solutions[0]
  if (!sol) return null
  const zoneProps = (zone: Zone) => ({
    className: zone === z ? 'zone on' : 'zone',
    onClick: () => setZ(zone),
    role: 'button',
    tabIndex: 0,
    'aria-label': d.finder.zones[zone],
    onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setZ(zone) } },
  })
  return (
    <div className="finder">
      <div className="house rv">
        <svg viewBox="0 0 400 330">
          <polygon {...zoneProps('roof')} points="40,138 200,30 360,138 336,138 200,56 64,138" />
          <rect {...zoneProps('wall')} x="74" y="138" width="16" height="114" />
          <rect {...zoneProps('wall')} x="310" y="138" width="16" height="114" />
          <rect {...zoneProps('floor')} x="90" y="236" width="220" height="16" />
          <rect {...zoneProps('fund')} x="66" y="252" width="268" height="44" />
          <g fill="none" stroke="var(--stroke)" strokeWidth="1.2">
            <path d="M90 138v98h220v-98" />
            <rect x="130" y="160" width="46" height="46" />
            <path d="M153 160v46M130 183h46" />
            <rect x="232" y="170" width="44" height="66" />
            <path d="M10 252h380" strokeDasharray="4 5" />
          </g>
          <text className="lbl" x="200" y="102" textAnchor="middle">{d.finder.zones.roof}</text>
          <text className="lbl" x="56" y="200" textAnchor="end">{d.finder.zones.wall}</text>
          <text className="lbl" x="200" y="229" textAnchor="middle">{d.finder.zones.floor}</text>
          <text className="lbl" x="200" y="318" textAnchor="middle">{d.finder.zones.fund}</text>
        </svg>
        <span className="hint">{d.finder.hint}</span>
      </div>
      <div className="rv">
        <div className="ftabs" role="tablist">
          {solutions.map((s) => (
            <button key={s.slug} role="tab" aria-selected={s.zone === z} className={s.zone === z ? 'on' : ''} onClick={() => setZ(s.zone)}>{s.name}</button>
          ))}
        </div>
        <div className="fpanel" key={sol.slug}>
          <h3>{sol.name}</h3>
          <p className="tip">{sol.text}</p>
          <div className="fthk">{d.finder.th} <b>{sol.thickness}</b></div>
          <div className="eyebrow" style={{ marginBottom: 14 }}>{d.finder.rec}</div>
          <div className="frec">
            {sol.products.map((p) => (
              <Link key={p.slug} href={`/${lang}/mahsulotlar/${p.slug}`}>
                <span className="th"><Image src={p.image} alt="" width={112} height={88} /></span>
                <span><small>{p.cat}</small><b>{p.name}</b></span>
                <Icon name="arrow" />
              </Link>
            ))}
          </div>
          <Link href={`/${lang}/yechimlar/${sol.slug}`} className="btn btn-line btn-sm" style={{ marginTop: 18 }}>{d.finder.more} <Icon name="arrow" /></Link>
        </div>
      </div>
    </div>
  )
}
