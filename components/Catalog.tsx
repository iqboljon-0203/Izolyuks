'use client'

import { useState, type ReactNode } from 'react'
import type { Dict } from '@/lib/i18n'

/** Category filter; cards are rendered on the server and passed in. */
export default function Catalog({ d, items }: { d: Dict; items: { cat: string; node: ReactNode }[] }) {
  const [f, setF] = useState('all')
  const cats = ['all', ...Array.from(new Set(items.map((i) => i.cat)))]
  const label = (c: string) => (c === 'all' ? d.catalog.all : d.catalog.cats[c as keyof Dict['catalog']['cats']] ?? c)
  return (
    <>
      <div className="filters rv" role="tablist">
        {cats.map((c) => (
          <button key={c} role="tab" aria-selected={c === f} className={c === f ? 'on' : ''} onClick={() => setF(c)}>{label(c)}</button>
        ))}
      </div>
      <div className="pgrid">
        {items.filter((i) => f === 'all' || i.cat === f).map((i, k) => <div key={k} className="pcell">{i.node}</div>)}
      </div>
    </>
  )
}
