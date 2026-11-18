import Link from 'next/link'
import type { Dict } from '@/lib/i18n'
import type { Content, Lang } from '@/lib/types'
import Calculator from './Calculator'
import OrderForm from './OrderForm'
import { Icon, Logo, SecHead } from './ui'

export function ContactSection({ c, lang, d, defaultProduct, bg = true, withMap = false }: { c: Content; lang: Lang; d: Dict; defaultProduct?: string; bg?: boolean; withMap?: boolean }) {
  const s = c.site
  const products = c.products.filter((p) => p.published).map((p) => ({ slug: p.slug, name: p.name[lang] }))
  return (
    <section id="contact" className={bg ? 'alt' : ''}>
      <div className="wrap">
        <SecHead eb={d.contact.eb} title={d.contact.t} />
        <div className="contact">
          <div className="cinfo rv">
            <a className="ci" href={`tel:${s.phone}`}><span className="i"><Icon name="phone" /></span><span><small>{s.phoneLabel[lang]}</small><b>{s.phoneDisplay}</b></span></a>
            <a className="ci" href={`https://t.me/${s.telegram}`} target="_blank" rel="noopener"><span className="i"><Icon name="send" /></span><span><small>Telegram</small><b>@{s.telegram}</b></span></a>
            <a className="ci" href={`https://www.instagram.com/${s.instagram}/`} target="_blank" rel="noopener"><span className="i"><Icon name="insta" /></span><span><small>Instagram</small><b>@{s.instagram}</b></span></a>
            <a className="ci" href={s.mapUrl} target="_blank" rel="noopener"><span className="i"><Icon name="pin" /></span><span><small>{d.contact.address}</small><b>{s.address[lang]} — {d.contact.map}</b></span></a>
            <div className="ci"><span className="i"><Icon name="clock" /></span><span><small>{d.contact.hours}</small><b>{s.workHours[lang]}</b></span></div>
            <div className="ci"><span className="i"><Icon name="building" /></span><span><small>{d.contact.company}</small><b>{s.legalName}</b></span></div>
          </div>
          <div className="rv">
            <OrderForm lang={lang} d={d} products={products} telegram={s.telegram} defaultProduct={defaultProduct} />
          </div>
        </div>
        {withMap && s.mapEmbed && (
          <div className="map rv">
            <iframe src={s.mapEmbed} title={d.contact.address} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        )}
      </div>
    </section>
  )
}

export function FaqSection({ c, lang, d, bg = false }: { c: Content; lang: Lang; d: Dict; bg?: boolean }) {
  if (!c.faq.length) return null
  return (
    <section id="faq" className={bg ? 'alt' : ''}>
      <div className="wrap faq-wrap">
        <SecHead eb={d.faq.eb} title={d.faq.t} />
        <div className="faq rv">
          {c.faq.map((f, i) => (
            <details key={i} open={i === 0}>
              <summary>{f.q[lang]}<span className="pm"><Icon name="plus" /></span></summary>
              <p>{f.a[lang]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CalcSection({ c, lang, d, bg = true }: { c: Content; lang: Lang; d: Dict; bg?: boolean }) {
  const productFor: Record<string, string> = {}
  for (const m of c.calc) {
    const hit = c.products.find((p) => p.published && (m.kind === 'roll' ? p.cat === 'sint' : p.slug.includes(m.id.replace('xps-', ''))))
    productFor[m.id] = hit?.slug ?? c.products[0]?.slug ?? ''
  }
  return (
    <section id="calc" className={bg ? 'alt' : ''}>
      <div className="wrap">
        <SecHead eb={d.calc.eb} title={d.calc.t} p={d.calc.p} />
        <Calculator lang={lang} d={d} materials={c.calc} productFor={productFor} />
      </div>
    </section>
  )
}

export function Footer({ c, lang, d }: { c: Content; lang: Lang; d: Dict }) {
  const prods = c.products.filter((p) => p.published)
  return (
    <footer className="foot-wrap">
      <div className="wrap foot-grid">
        <div>
          <Link href={`/${lang}`} className="brand brand-foot" aria-label="IZOLYUKS"><Logo height={30} /></Link>
          <p className="muted" style={{ marginTop: 18, maxWidth: 320 }}>{d.footer.about}</p>
        </div>
        <div>
          <h4>{d.nav.products}</h4>
          {prods.map((p) => <Link key={p.slug} href={`/${lang}/mahsulotlar/${p.slug}`}>{p.name[lang]}</Link>)}
        </div>
        <div>
          <h4>{d.nav.solutions}</h4>
          {c.solutions.map((s) => <Link key={s.slug} href={`/${lang}/yechimlar/${s.slug}`}>{s.name[lang]}</Link>)}
          <Link href={`/${lang}/kalkulyator`}>{d.nav.calc}</Link>
        </div>
        <div>
          <h4>{d.nav.contact}</h4>
          <a href={`tel:${c.site.phone}`}>{c.site.phoneDisplay}</a>
          <a href={`https://t.me/${c.site.telegram}`} target="_blank" rel="noopener">Telegram</a>
          <a href={`https://www.instagram.com/${c.site.instagram}/`} target="_blank" rel="noopener">Instagram</a>
          <span className="muted">{c.site.address[lang]}</span>
        </div>
      </div>
      <div className="wrap foot-bottom">
        <span>© {new Date().getFullYear()} {c.site.legalName}. {d.footer.rights}</span>
        <span className="langs"><Link href="/uz" hrefLang="uz">O&apos;zbekcha</Link> · <Link href="/ru" hrefLang="ru">Русский</Link></span>
      </div>
    </footer>
  )
}

export function Fab({ c }: { c: Content }) {
  return (
    <div className="fab">
      <a className="tg" href={`https://t.me/${c.site.telegram}`} target="_blank" rel="noopener" aria-label="Telegram"><Icon name="send" /></a>
      <a className="ph-b" href={`tel:${c.site.phone}`} aria-label="Phone"><Icon name="phone" /></a>
    </div>
  )
}

export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      {items.map((it, i) => (
        <span key={i}>
          {it.href ? <Link href={it.href}>{it.name}</Link> : <span aria-current="page">{it.name}</span>}
          {i < items.length - 1 && <span className="sep">/</span>}
        </span>
      ))}
    </nav>
  )
}
