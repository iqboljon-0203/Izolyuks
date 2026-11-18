import Link from 'next/link'
import { getDict } from '@/lib/i18n'

export default function NotFound() {
  const d = getDict('uz')
  const r = getDict('ru')
  return (
    <section className="page-top nf">
      <div className="wrap">
        <span className="eyebrow">404</span>
        <h1>{d.notFound.t}</h1>
        <p className="lead">{d.notFound.p}<br />{r.notFound.p}</p>
        <div className="hero-cta">
          <Link href="/uz" className="btn btn-dark">{d.notFound.b}</Link>
          <Link href="/ru" className="btn btn-line">{r.notFound.b}</Link>
        </div>
      </div>
    </section>
  )
}
