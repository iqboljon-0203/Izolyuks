import type { MetadataRoute } from 'next'
import { getContent, published } from '@/lib/content'
import { abs } from '@/lib/seo'
import { LANGS } from '@/lib/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const c = await getContent()
  const now = new Date()
  const entry = (path: string, priority: number, images: string[] = [], freq: 'weekly' | 'monthly' = 'weekly') =>
    LANGS.map((lang) => ({
      url: abs(`/${lang}${path}`),
      lastModified: now,
      changeFrequency: freq,
      priority,
      alternates: { languages: Object.fromEntries(LANGS.map((l) => [l, abs(`/${l}${path}`)])) },
      ...(images.length ? { images: images.map(abs) } : {}),
    }))

  return [
    ...entry('', 1, [c.gallery[0]?.image].filter(Boolean) as string[]),
    ...entry('/mahsulotlar', 0.9),
    ...published(c).flatMap((p) => entry(`/mahsulotlar/${p.slug}`, 0.8, [p.image])),
    ...c.solutions.flatMap((s) => entry(`/yechimlar/${s.slug}`, 0.7, [s.image], 'monthly')),
    ...entry('/kalkulyator', 0.7, [], 'monthly'),
    ...entry('/aloqa', 0.6, [], 'monthly'),
  ]
}
