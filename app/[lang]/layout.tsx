import type { Metadata, Viewport } from 'next'
import { notFound } from 'next/navigation'
import { Onest, Playfair_Display } from 'next/font/google'
import '../globals.css'
import Header from '@/components/Header'
import Reveal from '@/components/Reveal'
import { Fab, Footer } from '@/components/Sections'
import { JsonLd } from '@/components/ui'
import { getContent } from '@/lib/content'
import { getDict } from '@/lib/i18n'
import { orgLd, pageMeta, SITE_URL, websiteLd } from '@/lib/seo'
import { isLang, LANGS } from '@/lib/types'

const onest = Onest({ subsets: ['latin', 'cyrillic'], weight: ['300', '400', '500', '600', '700'], variable: '--font-sans', display: 'swap' })
const serif = Playfair_Display({ subsets: ['latin', 'cyrillic'], weight: ['500', '600'], style: ['italic'], variable: '--font-serif', display: 'swap' })

export const dynamicParams = false
export const generateStaticParams = () => LANGS.map((lang) => ({ lang }))

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f6f4ef' },
    { media: '(prefers-color-scheme: dark)', color: '#080b14' },
  ],
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  if (!isLang(lang)) return {}
  const c = await getContent()
  return {
    ...pageMeta({ lang, path: '', title: c.seo.title[lang], description: c.seo.description[lang], keywords: c.seo.keywords[lang] }),
    metadataBase: new URL(SITE_URL),
    applicationName: 'IZOLYUKS',
    title: { default: c.seo.title[lang], template: '%s | IZOLYUKS' },
    authors: [{ name: c.site.legalName }],
    creator: 'IZOLYUKS',
    formatDetection: { telephone: true },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 } },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || undefined,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
    },
  }
}

const themeScript = `try{var t=localStorage.getItem('izl-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}`

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const c = await getContent()
  const d = getDict(lang)
  return (
    <html lang={lang} data-theme="light" className={`${onest.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header lang={lang} d={d} phone={c.site.phone} phoneDisplay={c.site.phoneDisplay} />
        <main id="main">{children}</main>
        <Footer c={c} lang={lang} d={d} />
        <Fab c={c} />
        <Reveal />
        <JsonLd data={orgLd(c, lang)} />
        <JsonLd data={websiteLd(lang)} />
      </body>
    </html>
  )
}
