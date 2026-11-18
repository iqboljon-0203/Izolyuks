import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PrefillButton from '@/components/PrefillButton'
import ProductGallery from '@/components/ProductGallery'
import ProductCard, { PriceLine } from '@/components/ProductCard'
import { CalcSection, ContactSection, Crumbs } from '@/components/Sections'
import { Icon, JsonLd, Paras } from '@/components/ui'
import { getContent, published } from '@/lib/content'
import { getDict } from '@/lib/i18n'
import { breadcrumbLd, pageMeta, productLd } from '@/lib/seo'
import { isLang, LANGS, specValue, type Lang } from '@/lib/types'

type P = { params: Promise<{ lang: string; slug: string }> }

export async function generateStaticParams() {
  const c = await getContent()
  return LANGS.flatMap((lang) => published(c).map((p) => ({ lang, slug: p.slug })))
}

async function load(params: P['params']) {
  const { lang, slug } = await params
  if (!isLang(lang)) return null
  const c = await getContent()
  const p = c.products.find((x) => x.slug === slug && x.published)
  return p ? { c, p, lang } : null
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const r = await load(params)
  if (!r) return {}
  const { p, lang } = r
  const d = getDict(lang)
  const title = p.seoTitle?.[lang]?.trim() || `${p.name[lang]} — ${lang === 'uz' ? 'narxi, xususiyatlari' : 'цена, характеристики'}`
  const auto = `${p.short[lang]} ${p.specs.map((s) => `${s.label[lang]}: ${specValue(s.value, lang)}`).join(', ')}. ${d.price.from === 'dan' ? "Zavod narxida, O'zbekiston bo'ylab yetkazish." : 'По цене завода, доставка по Узбекистану.'}`
  const description = p.seoDescription?.[lang]?.trim() || auto
  return pageMeta({ lang, path: `/mahsulotlar/${p.slug}`, title, description: description.slice(0, 300), image: p.image, type: 'article' })
}

export default async function ProductPage({ params }: P) {
  const r = await load(params)
  if (!r) notFound()
  const { c, p } = r
  const lang = r.lang as Lang
  const d = getDict(lang)
  const uses = c.solutions.filter((s) => s.products.includes(p.slug))
  const related = published(c).filter((x) => x.slug !== p.slug && x.cat === p.cat).concat(published(c).filter((x) => x.cat !== p.cat && x.slug !== p.slug)).slice(0, 3)

  return (
    <>
      <section className="page-top">
        <div className="wrap">
          <Crumbs items={[{ name: d.nav.home, href: `/${lang}` }, { name: d.nav.products, href: `/${lang}/mahsulotlar` }, { name: p.name[lang] }]} />
          <div className="pd">
            <ProductGallery images={[p.image, ...(p.images ?? [])]} alt={p.name[lang]} badge={p.badge} />
            <div className="pd-info rv">
              <span className="pcat">{d.catalog.cats[p.cat]}</span>
              <h1>{p.name[lang]}</h1>
              <p className="lead">{p.short[lang]}</p>
              <div className="pd-price"><PriceLine p={p} lang={lang} d={d} /></div>
              <div className="specs big">
                {p.specs.map((s, i) => <div key={i}><small>{s.label[lang]}</small><b>{specValue(s.value, lang)}</b></div>)}
              </div>
              <div className="hero-cta">
                <PrefillButton className="btn btn-dark" product={p.slug}><span>{d.product.order}</span><Icon name="arrow" /></PrefillButton>
                <a className="btn btn-line" href={`tel:${c.site.phone}`}><Icon name="phone" /> {c.site.phoneDisplay}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pt40">
        <div className="wrap pd-body">
          <article className="prose rv">
            <span className="eyebrow">{d.product.about}</span>
            <h2>{p.name[lang]}</h2>
            <Paras text={p.description[lang]} />
          </article>
          <aside className="rv">
            <div className="cbox">
              <span className="eyebrow">{d.product.features}</span>
              <ul className="checks">{p.features.map((f, i) => <li key={i}><Icon name="check" /><span>{f[lang]}</span></li>)}</ul>
            </div>
            {uses.length > 0 && (
              <div className="cbox" style={{ marginTop: 16 }}>
                <span className="eyebrow">{d.product.uses}</span>
                <div className="links">{uses.map((s) => <Link key={s.slug} href={`/${lang}/yechimlar/${s.slug}`}>{s.name[lang]} <Icon name="arrow" /></Link>)}</div>
              </div>
            )}
          </aside>
        </div>
      </section>

      <CalcSection c={c} lang={lang} d={d} />

      {related.length > 0 && (
        <section>
          <div className="wrap">
            <div className="sec-head rv"><div><span className="eyebrow">{d.catalog.eb}</span><h2>{d.product.related}</h2></div>
              <Link href={`/${lang}/mahsulotlar`} className="btn btn-line btn-sm">{d.product.back} <Icon name="arrow" /></Link></div>
            <div className="pgrid">{related.map((x, i) => <div key={x.slug} className="pcell rv"><ProductCard p={x} lang={lang} d={d} num={i + 1} /></div>)}</div>
          </div>
        </section>
      )}

      <ContactSection c={c} lang={lang} d={d} defaultProduct={p.slug} />

      <JsonLd data={productLd(p, lang)} />
      <JsonLd data={breadcrumbLd([{ name: d.nav.home, path: `/${lang}` }, { name: d.nav.products, path: `/${lang}/mahsulotlar` }, { name: p.name[lang], path: `/${lang}/mahsulotlar/${p.slug}` }])} />
    </>
  )
}
