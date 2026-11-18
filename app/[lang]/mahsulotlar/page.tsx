import type { Metadata } from 'next'
import Catalog from '@/components/Catalog'
import ProductCard from '@/components/ProductCard'
import { ContactSection, Crumbs, FaqSection } from '@/components/Sections'
import { JsonLd, Rich } from '@/components/ui'
import { getContent, published } from '@/lib/content'
import { getDict } from '@/lib/i18n'
import { breadcrumbLd, itemListLd, pageMeta, plain } from '@/lib/seo'
import { isLang, type Lang } from '@/lib/types'

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const d = getDict(lang)
  const title = lang === 'uz' ? 'Mahsulotlar: XPS penopleks, sintifon, skoba — zavod narxida' : 'Продукция: пеноплекс XPS, синтифон, скобы — по цене завода'
  return pageMeta({ lang, path: '/mahsulotlar', title, description: plain(d.catalog.t) + '. ' + d.catalog.p, image: '/img/zavod-2.jpg' })
}

export default async function ProductsPage({ params }: P) {
  const lang = (await params).lang as Lang
  const c = await getContent()
  const d = getDict(lang)
  const prods = published(c)
  return (
    <>
      <section className="page-top">
        <div className="wrap">
          <Crumbs items={[{ name: d.nav.home, href: `/${lang}` }, { name: d.nav.products }]} />
          <div className="sec-head rv">
            <div><span className="eyebrow">{d.catalog.eb}</span><h1 className="h1-sub"><Rich text={d.catalog.t} /></h1></div>
            <p>{d.catalog.p}</p>
          </div>
          <Catalog d={d} items={prods.map((p, i) => ({ cat: p.cat, node: <ProductCard p={p} lang={lang} d={d} num={i + 1} /> }))} />
        </div>
      </section>
      <FaqSection c={c} lang={lang} d={d} bg />
      <ContactSection c={c} lang={lang} d={d} bg={false} />
      <JsonLd data={itemListLd(prods.map((p) => ({ name: p.name[lang], path: `/${lang}/mahsulotlar/${p.slug}` })))} />
      <JsonLd data={breadcrumbLd([{ name: d.nav.home, path: `/${lang}` }, { name: d.nav.products, path: `/${lang}/mahsulotlar` }])} />
    </>
  )
}
