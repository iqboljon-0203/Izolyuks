import type { Metadata } from 'next'
import { CalcSection, ContactSection, Crumbs, FaqSection } from '@/components/Sections'
import { JsonLd } from '@/components/ui'
import { getContent } from '@/lib/content'
import { getDict } from '@/lib/i18n'
import { breadcrumbLd, pageMeta, plain } from '@/lib/seo'
import { isLang, type Lang } from '@/lib/types'

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const d = getDict(lang)
  const title = lang === 'uz' ? 'Penopleks va sintifon kalkulyatori — miqdor va narxni hisoblash' : 'Калькулятор пеноплекса и синтифона — расчёт количества и цены'
  return pageMeta({ lang, path: '/kalkulyator', title, description: plain(d.calc.p) })
}

export default async function CalcPage({ params }: P) {
  const lang = (await params).lang as Lang
  const c = await getContent()
  const d = getDict(lang)
  return (
    <>
      <section className="page-top pb0">
        <div className="wrap"><Crumbs items={[{ name: d.nav.home, href: `/${lang}` }, { name: d.nav.calc }]} /></div>
      </section>
      <div className="calc-page"><CalcSection c={c} lang={lang} d={d} bg={false} /></div>
      <FaqSection c={c} lang={lang} d={d} bg />
      <ContactSection c={c} lang={lang} d={d} bg={false} />
      <JsonLd data={breadcrumbLd([{ name: d.nav.home, path: `/${lang}` }, { name: d.nav.calc, path: `/${lang}/kalkulyator` }])} />
    </>
  )
}
