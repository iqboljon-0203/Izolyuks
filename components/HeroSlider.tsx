'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

type Slide = { image: string; name: string }

export default function HeroSlider({ slides, now, tag1, tag2 }: { slides: Slide[]; now: string; tag1: string; tag2: string }) {
  const [i, setI] = useState(0)
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (slides.length < 2) return
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [slides.length, tick])
  if (!slides.length) return null
  return (
    <div className="stage rv">
      <div className="ring" />
      <div className="ring r2" />
      <div className="hero-name"><span>{now}</span><b>{slides[i].name}</b></div>
      {slides.map((s, j) => (
        <div key={j} className={j === i ? 'slide on' : 'slide'} aria-hidden={j !== i}>
          <Image src={s.image} alt={s.name} width={900} height={675} priority={j === 0} sizes="(max-width: 1020px) 80vw, 480px" />
        </div>
      ))}
      <div className="tag t1"><b>1200 × 600</b><span>{tag1}</span></div>
      <div className="tag t2"><b>20–100 mm</b><span>{tag2}</span></div>
      <div className="hero-ctrl">
        {slides.map((_, j) => (
          <button key={j} className={j === i ? 'on' : ''} aria-label={String(j + 1)} onClick={() => { setI(j); setTick((t) => t + 1) }} />
        ))}
      </div>
    </div>
  )
}
