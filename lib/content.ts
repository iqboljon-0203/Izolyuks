import { createHash } from 'node:crypto'
import { unstable_cache } from 'next/cache'
import seed from '@/data/content.json'
import type { Content } from './types'

/**
 * Content storage.
 * - Production (Vercel): JSON file in Vercel Blob, edited from /admin.
 * - Local dev without a Blob token: data/content.json on disk.
 * The repo's data/content.json is always the starting point (seed).
 */
const BLOB_KEY = 'content/content.json'
export const hasBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN
export const CONTENT_TAG = 'content'

const SEED = seed as unknown as Content

async function readRaw(): Promise<Content> {
  if (hasBlob()) {
    try {
      const { head } = await import('@vercel/blob')
      const meta = await head(BLOB_KEY)
      const res = await fetch(`${meta.url}?v=${meta.uploadedAt.getTime()}`, { cache: 'no-store' })
      if (res.ok) return { ...SEED, ...(await res.json()) }
    } catch {
      /* not saved yet → seed */
    }
    return SEED
  }
  try {
    const fs = await import('node:fs/promises')
    const path = await import('node:path')
    const txt = await fs.readFile(path.join(process.cwd(), 'data', 'content.json'), 'utf8')
    return JSON.parse(txt) as Content
  } catch {
    return SEED
  }
}

/** Changes whenever data/content.json changes, so a new deploy never serves cached old seed content. */
const SEED_VERSION = createHash('sha1').update(JSON.stringify(seed)).digest('hex').slice(0, 12)

export const getContent = unstable_cache(readRaw, ['izolyuks-content', SEED_VERSION], { tags: [CONTENT_TAG] })

export async function saveContent(c: Content): Promise<void> {
  const json = JSON.stringify(c, null, 2)
  if (hasBlob()) {
    const { put } = await import('@vercel/blob')
    await put(BLOB_KEY, json, {
      access: 'public',
      allowOverwrite: true,
      addRandomSuffix: false,
      contentType: 'application/json',
      cacheControlMaxAge: 60,
    })
    return
  }
  if (process.env.VERCEL) {
    throw new Error('BLOB_READ_WRITE_TOKEN topilmadi: Vercel → Storage → Blob ulang.')
  }
  const fs = await import('node:fs/promises')
  const path = await import('node:path')
  await fs.writeFile(path.join(process.cwd(), 'data', 'content.json'), json, 'utf8')
}

export const published = (c: Content) => c.products.filter((p) => p.published)
