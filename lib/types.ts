export const LANGS = ['uz', 'ru'] as const
export type Lang = (typeof LANGS)[number]
export type L = { uz: string; ru: string }

export interface Spec { label: L; value: string }

export interface Product {
  slug: string
  cat: 'xps' | 'sint' | 'acc'
  badge: string
  image: string
  price: number
  unit: L
  published: boolean
  name: L
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
  text: L
  description: L
}

export interface CalcOption { mm: number; perPack: number; price: number }
export interface CalcMaterial {
  id: string
  kind: 'board' | 'roll'
  sheetArea: number
  name: L
  options: CalcOption[]
}

export interface Content {
  site: {
    legalName: string
    foundingYear: number
    phone: string
    phoneDisplay: string
    phoneLabel: L
    telegram: string
    instagram: string
    address: L
    mapUrl: string
    mapEmbed: string
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
