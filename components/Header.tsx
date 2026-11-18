'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Dict } from '@/lib/i18n'
import type { Lang } from '@/lib/types'
import { Icon, Logo } from './ui'

export default function Header({ lang, d, phone, phoneDisplay }: { lang: Lang; d: Dict; phone: string; phoneDisplay: string }) {
  const path = usePathname() || `/${lang}`
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30)
    on()
    window.addEventListener('scroll', on, { passive: true })
    setDark(document.documentElement.dataset.theme === 'dark')
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [path])

  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('izl-theme', next) } catch {}
    setDark(next === 'dark')
  }

  const swap = (l: Lang) => path.replace(/^\/(uz|ru)(?=\/|$)/, `/${l}`)
  const links = [
    { href: `/${lang}#finder`, label: d.nav.finder },
    { href: `/${lang}/mahsulotlar`, label: d.nav.products },
    { href: `/${lang}/kalkulyator`, label: d.nav.calc },
    { href: `/${lang}#factory`, label: d.nav.factory },
    { href: `/${lang}/aloqa`, label: d.nav.contact },
  ]

  return (
    <header className={scrolled || open ? 'hdr scrolled' : 'hdr'}>
      <div className="wrap nav">
        <Link href={`/${lang}`} className="brand" aria-label="IZOLYUKS"><Logo /></Link>
        <nav className={open ? 'menu open' : 'menu'} aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={path === l.href ? 'page' : undefined}>{l.label}</Link>
          ))}
        </nav>
        <div className="nav-r">
          <div className="lang" role="group" aria-label="Language">
            {(['uz', 'ru'] as Lang[]).map((l) => (
              <Link key={l} href={swap(l)} className={l === lang ? 'on' : ''} hrefLang={l} scroll={false}>{l.toUpperCase()}</Link>
            ))}
          </div>
          <button className="theme" onClick={toggleTheme} aria-label={d.theme}><Icon name={dark ? 'sun' : 'moon'} /></button>
          <a className="nav-phone" href={`tel:${phone}`}>{phoneDisplay}</a>
          <Link href={`/${lang}/aloqa`} className="btn btn-dark btn-sm">{d.cta}</Link>
          <button className="burger" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}><Icon name={open ? 'close' : 'menu'} /></button>
        </div>
      </div>
    </header>
  )
}
