import Image from 'next/image'
import Link from 'next/link'
import type { Dict } from '@/lib/i18n'
import { formatPrice } from '@/lib/i18n'
import type { Lang, Product } from '@/lib/types'
import { Icon } from './ui'

export function PriceLine({ p, lang, d }: { p: Product; lang: Lang; d: Dict }) {
  if (!p.price) return <span className="price na">{d.price.onRequest}</span>
  return (
    <span className="price">
      {lang === 'ru' && <small>{d.price.from} </small>}
      <b>{formatPrice(p.price)}</b> {d.price.currency}
      {lang === 'uz' && <small> {d.price.from}</small>}
      <small> / {p.unit[lang]}</small>
    </span>
  )
}

export default function ProductCard({ p, lang, d, num }: { p: Product; lang: Lang; d: Dict; num: number }) {
  const href = `/${lang}/mahsulotlar/${p.slug}`
  return (
    <article className="pcard">
      <Link href={href} className="pimg" aria-label={p.name[lang]}>
        <span className="num">{String(num).padStart(2, '0')}</span>
        {p.badge && <span className="badge">{p.badge}</span>}
        <Image src={p.image} alt={p.name[lang]} fill sizes="(max-width: 640px) 100vw, (max-width: 1020px) 50vw, 400px" />
      </Link>
      <div className="pbody">
        <span className="pcat">{d.catalog.cats[p.cat]}</span>
        <h3><Link href={href}>{p.name[lang]}</Link></h3>
        <p>{p.short[lang]}</p>
        <div className="specs">
          {p.specs.slice(0, 4).map((s, i) => (
            <div key={i}><small>{s.label[lang]}</small><b>{s.value}</b></div>
          ))}
        </div>
        <div className="pfoot">
          <PriceLine p={p} lang={lang} d={d} />
          <Link href={href} className="btn btn-line btn-sm">{d.catalog.more} <Icon name="arrow" /></Link>
        </div>
      </div>
    </article>
  )
}
