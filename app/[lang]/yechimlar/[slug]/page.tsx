import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { CalcSection, ContactSection, Crumbs } from '@/components/Sections'
import { Icon, JsonLd, Paras } from '@/components/ui'
import { getContent } from '@/lib/content'
import { getDict } from '@/lib/i18n'
import { breadcrumbLd, pageMeta } from '@/lib/seo'
import { isLang, LANGS, type Lang } from '@/lib/types'

type P = { params: Promise<{ lang: string; slug: string }> }

export async function generateStaticParams() {
  const c = await getContent()
  return LANGS.flatMap((lang) => c.solutions.map((s) => ({ lang, slug: s.slug })))
}

async function load(params: P['params']) {
  const { lang, slug } = await params
  if (!isLang(lang)) return null
  const c = await getContent()
  const s = c.solutions.find((x) => x.slug === slug)
  return s ? { c, s, lang } : null
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const r = await load(params)
  if (!r) return {}
  const { s, lang } = r
  return pageMeta({
    lang,
    path: `/yechimlar/${s.slug}`,
    title: s.seoTitle?.[lang]?.trim() || s.name[lang],
    description: s.seoDescription?.[lang]?.trim() || s.text[lang],
    image: s.image,
    type: 'article',
  })
}

export default async function SolutionPage({ params }: P) {
  const r = await load(params)
  if (!r) notFound()
  const { c, s } = r
  const lang = r.lang as Lang
  const d = getDict(lang)
  const prods = s.products.map((slug) => c.products.find((p) => p.slug === slug && p.published)).filter((p): p is NonNullable<typeof p> => !!p)
  const others = c.solutions.filter((x) => x.slug !== s.slug)

  return (
    <>
      <section className="page-top">
        <div className="wrap">
          <Crumbs items={[{ name: d.nav.home, href: `/${lang}` }, { name: d.nav.solutions, href: `/${lang}#finder` }, { name: s.name[lang] }]} />
          <div className="sol-hero">
            <div className="rv">
              <span className="eyebrow">{d.solution.eb}</span>
              <h1>{s.name[lang]}</h1>
              <p className="lead">{s.text[lang]}</p>
              <div className="fthk">{d.solution.thickness}: <b>{s.thickness}</b></div>
              <div className="hero-cta">
                <a href="#calc" className="btn btn-dark"><span>{d.solution.calc}</span><Icon name="arrow" /></a>
                <a href="#contact" className="btn btn-line">{d.cta}</a>
              </div>
            </div>
            <div className="sol-img rv"><Image src={s.image} alt={s.name[lang]} fill priority sizes="(max-width: 1020px) 100vw, 560px" /></div>
          </div>
        </div>
      </section>

      <section className="pt40">
        <div className="wrap pd-body">
          <article className="prose rv"><Paras text={s.description[lang]} /></article>
          <aside className="rv">
            <div className="cbox">
              <span className="eyebrow">{d.solution.others}</span>
              <div className="links">{others.map((o) => <Link key={o.slug} href={`/${lang}/yechimlar/${o.slug}`}>{o.name[lang]} <Icon name="arrow" /></Link>)}</div>
            </div>
          </aside>
        </div>
      </section>

      {prods.length > 0 && (
        <section className="pt0">
          <div className="wrap">
            <div className="sec-head rv"><div><span className="eyebrow">{d.finder.rec}</span><h2>{d.solution.products}</h2></div></div>
            <div className="pgrid">{prods.map((p, i) => <div key={p.slug} className="pcell rv"><ProductCard p={p} lang={lang} d={d} num={i + 1} /></div>)}</div>
          </div>
        </section>
      )}

      <CalcSection c={c} lang={lang} d={d} />
      <ContactSection c={c} lang={lang} d={d} defaultProduct={prods[0]?.slug} bg={false} />

      <JsonLd data={breadcrumbLd([{ name: d.nav.home, path: `/${lang}` }, { name: s.name[lang], path: `/${lang}/yechimlar/${s.slug}` }])} />
    </>
  )
}
