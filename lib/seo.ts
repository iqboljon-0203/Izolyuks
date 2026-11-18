import type { Metadata } from 'next'
import type { Content, Lang, Product } from './types'
import { localeTag } from './i18n'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://izolyuks.uz').replace(/\/$/, '')
export const abs = (p: string) => (p.startsWith('http') ? p : `${SITE_URL}${p}`)

/** Remove *emphasis* markers used for styled words. */
export const plain = (s: string) => s.replace(/\*/g, '')

/** Metadata for a page that exists in both languages under /{lang}{path}. */
export function pageMeta(opts: {
  lang: Lang
  path: string // '' for home, '/mahsulotlar' ...
  title: string
  description: string
  image?: string
  keywords?: string
  type?: 'website' | 'article'
}): Metadata {
  const { lang, path, title, description, image, keywords } = opts
  const url = `/${lang}${path}`
  return {
    title,
    description,
    keywords: keywords?.split(',').map((k) => k.trim()).filter(Boolean),
    alternates: {
      canonical: url,
      languages: { uz: `/uz${path}`, ru: `/ru${path}`, 'x-default': `/uz${path}` },
    },
    openGraph: {
      type: opts.type || 'website',
      url,
      title,
      description,
      siteName: 'IZOLYUKS',
      locale: localeTag[lang],
      alternateLocale: [localeTag[lang === 'uz' ? 'ru' : 'uz']],
      ...(image ? { images: [{ url: image, width: 1200, height: 900, alt: title }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description, ...(image ? { images: [image] } : {}) },
  }
}

/* ---------------- JSON-LD builders ---------------- */

export function orgLd(c: Content, lang: Lang) {
  const s = c.site
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LocalBusiness'],
    '@id': `${SITE_URL}/#org`,
    name: 'IZOLYUKS',
    legalName: s.legalName,
    url: SITE_URL,
    logo: abs('/logo.svg'),
    image: abs(c.gallery[0]?.image || '/img/zavod-1.jpg'),
    description: c.seo.description[lang],
    foundingDate: String(s.foundingYear),
    telephone: s.phone,
    address: { '@type': 'PostalAddress', addressLocality: 'Tashkent', addressCountry: 'UZ', streetAddress: s.address[lang] },
    areaServed: ['UZ', 'KZ', 'TJ', 'TM', 'KG'],
    openingHours: 'Mo-Sa 09:00-18:00',
    priceRange: '$$',
    sameAs: [`https://www.instagram.com/${s.instagram}/`, `https://t.me/${s.telegram}`],
    contactPoint: { '@type': 'ContactPoint', telephone: s.phone, contactType: 'sales', availableLanguage: ['uz', 'ru'] },
  }
}

export function websiteLd(lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: `${SITE_URL}/${lang}`,
    name: 'IZOLYUKS',
    inLanguage: lang,
    publisher: { '@id': `${SITE_URL}/#org` },
  }
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: abs(it.path) })),
  }
}

export function faqLd(c: Content, lang: Lang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: c.faq.map((f) => ({ '@type': 'Question', name: f.q[lang], acceptedAnswer: { '@type': 'Answer', text: f.a[lang] } })),
  }
}

export function productLd(p: Product, lang: Lang) {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name[lang],
    description: p.short[lang],
    image: abs(p.image),
    sku: p.slug,
    brand: { '@type': 'Brand', name: 'IZOLYUKS' },
    manufacturer: { '@id': `${SITE_URL}/#org` },
    url: abs(`/${lang}/mahsulotlar/${p.slug}`),
    additionalProperty: p.specs.map((s) => ({ '@type': 'PropertyValue', name: s.label[lang], value: s.value })),
  }
  if (p.price > 0) {
    data.offers = {
      '@type': 'Offer',
      price: p.price,
      priceCurrency: 'UZS',
      availability: 'https://schema.org/InStock',
      url: abs(`/${lang}/mahsulotlar/${p.slug}`),
      seller: { '@id': `${SITE_URL}/#org` },
    }
  }
  return data
}

export function itemListLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, url: abs(it.path) })),
  }
}
