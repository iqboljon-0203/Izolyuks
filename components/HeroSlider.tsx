'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Icon } from './ui'

export type HeroSlide = {
  image: string
  name: string
  cat: string
  href: string
  /** Up to two short facts of THIS product (e.g. density, thickness). */
  tags: { value: string; label: string }[]
}

/**
 * Hero product showcase: the picture, its own key facts and a selector strip.
 * Auto-advances until the visitor picks a product themselves.
 */
export default function HeroSlider({ slides, now, more }: { slides: HeroSlide[]; now: string; more: string }) {
  const [i, setI] = useState(0)
  const [auto, setAuto] = useState(true)

  useEffect(() => {
    if (!auto || slides.length < 2) return
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [auto, slides.length])

  if (!slides.length) return null
  const s = slides[i]
  const pick = (j: number) => { setI(j); setAuto(false) }

  return (
    <div className="hero-show rv">
      <div className="stage">
        <div className="ring" />
        <div className="ring r2" />
        <div className="hero-name"><span>{now} · {s.cat}</span><b>{s.name}</b></div>
        {slides.map((sl, j) => (
          <Link key={sl.href} href={sl.href} className={j === i ? 'slide on' : 'slide'} aria-hidden={j !== i} tabIndex={j === i ? 0 : -1}>
            <Image src={sl.image} alt={sl.name} width={900} height={675} priority={j === 0} sizes="(max-width: 1020px) 80vw, 480px" />
          </Link>
        ))}
        {s.tags[0] && <div className="tag t1" key={`a${i}`}><b>{s.tags[0].value}</b><span>{s.tags[0].label}</span></div>}
        {s.tags[1] && <div className="tag t2" key={`b${i}`}><b>{s.tags[1].value}</b><span>{s.tags[1].label}</span></div>}
        <Link href={s.href} className="hero-more">{more} <Icon name="arrow" /></Link>
      </div>
      <div className="hero-pick" role="tablist" aria-label={now}>
        {slides.map((sl, j) => (
          <button key={sl.href} type="button" role="tab" aria-selected={j === i} className={j === i ? 'on' : ''} onClick={() => pick(j)}>
            <span className="th"><Image src={sl.image} alt="" width={96} height={72} /></span>
            <span className="nm">{sl.name.replace(/^IZOLYUKS\s+/i, '').replace(/\s+[—(].*$/, '')}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
