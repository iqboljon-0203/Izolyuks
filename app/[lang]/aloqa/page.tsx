import type { Metadata } from 'next'
import { ContactSection, Crumbs, FaqSection } from '@/components/Sections'
import { JsonLd } from '@/components/ui'
import { getContent } from '@/lib/content'
import { getDict } from '@/lib/i18n'
import { breadcrumbLd, pageMeta } from '@/lib/seo'
import { isLang, type Lang } from '@/lib/types'

type P = { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const c = await getContent()
  const title = lang === 'uz' ? 'Aloqa — IZOLYUKS zavodi, Toshkent' : 'Контакты — завод IZOLYUKS, Ташкент'
  const description = lang === 'uz'
    ? `Narx, bepul namuna va ulgurji buyurtma uchun bog'laning: ${c.site.phoneDisplay}, Telegram @${c.site.telegram}. ${c.site.address.uz}.`
    : `Свяжитесь для цены, бесплатного образца и оптового заказа: ${c.site.phoneDisplay}, Telegram @${c.site.telegram}. ${c.site.address.ru}.`
  return pageMeta({ lang, path: '/aloqa', title, description })
}

export default async function ContactPage({ params }: P) {
  const lang = (await params).lang as Lang
  const c = await getContent()
  const d = getDict(lang)
  return (
    <>
      <section className="page-top pb0">
        <div className="wrap"><Crumbs items={[{ name: d.nav.home, href: `/${lang}` }, { name: d.nav.contact }]} /></div>
      </section>
      <ContactSection c={c} lang={lang} d={d} bg={false} withMap />
      <FaqSection c={c} lang={lang} d={d} bg />
      <JsonLd data={breadcrumbLd([{ name: d.nav.home, path: `/${lang}` }, { name: d.nav.contact, path: `/${lang}/aloqa` }])} />
    </>
  )
}
