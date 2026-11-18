'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

/** Adds the fade-up animation to every `.rv` element as it scrolls into view. */
export default function Reveal() {
  const path = usePathname()
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.rv:not(.in)'))
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      els.forEach((e) => e.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (es) => es.forEach((x) => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target) } }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' },
    )
    els.forEach((e) => io.observe(e))
    return () => io.disconnect()
  }, [path])
  return null
}
