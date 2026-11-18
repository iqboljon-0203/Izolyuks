export const LANGS = ['uz', 'ru'] as const
export type Lang = (typeof LANGS)[number]
export type L = { uz: string; ru: string }

/** Qiymat bitta matn (ikkala tilda bir xil, masalan "1200 × 600 mm") yoki UZ/RU juftligi */
export interface Spec { label: L; value: string | L }
export const specValue = (v: string | L, lang: Lang) => (typeof v === 'string' ? v : v[lang] || v.uz)

export const CATS = ['xps', 'sint', 'pipe', 'film', 'acc'] as const
export type Cat = (typeof CATS)[number]

export interface Product {
  slug: string
  cat: Cat
  badge: string
  image: string
  /** Qo'shimcha rasmlar (mahsulot sahifasidagi galereya) */
  images?: string[]
  price: number
  unit: L
  published: boolean
  name: L
  /** Google sarlavhasi (bo'sh bo'lsa avtomatik) */
  seoTitle?: L
  /** Google tavsifi (bo'sh bo'lsa avtomatik) */
  seoDescription?: L
  short: L
  description: L
  specs: Spec[]
  features: L[]
}

export interface Solution {
  slug: string
  zone: 'fund' | 'floor' | 'wall' | 'roof'
  image: string
  thickness: string
  products: string[]
  name: L
  seoTitle?: L
  seoDescription?: L
  text: L
  description: L
}

export interface CalcOption { mm: number; perPack: number; price: number }
export interface CalcMaterial {
  id: string
  /** Kalkulyatordan buyurtma berilganda tanlanadigan mahsulot (slug) */
  product?: string
  kind: 'board' | 'roll'
  sheetArea: number
  name: L
  options: CalcOption[]
}

export interface Content {
  site: {
    legalName: string
    foundingYear: number
    /** INN (STIR) */
    taxId?: string
    phone: string
    phoneDisplay: string
    phoneLabel: L
    telegram: string
    instagram: string
    address: L
    /** Ko'cha va uy (Google uchun streetAddress) */
    street?: L
    mapUrl: string
    mapEmbed: string
    /** Xaritadagi nuqta (Google uchun LocalBusiness geo) */
    geo?: { lat: number; lng: number }
    workHours: L
  }
  seo: { title: L; description: L; keywords: L }
  hero: { eyebrow: L; title: L; lead: L }
  stats: { value: string; label: L }[]
  products: Product[]
  solutions: Solution[]
  calc: CalcMaterial[]
  advantages: { icon: string; title: L; text: L }[]
  steps: { title: L; text: L }[]
  gallery: { image: string; caption: L }[]
  delivery: { title: L; text: L; routes: { code: string; name: L }[] }
  faq: { q: L; a: L }[]
}

export const isLang = (v: string): v is Lang => (LANGS as readonly string[]).includes(v)
