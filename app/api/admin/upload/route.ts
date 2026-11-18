import { NextResponse } from 'next/server'
import { isAdmin } from '@/lib/auth'
import { hasBlob } from '@/lib/content'

export const runtime = 'nodejs'

const TYPES: Record<string, string> = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/avif': 'avif' }

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const form = await req.formData()
  const file = form.get('file')
  if (!(file instanceof File)) return NextResponse.json({ error: 'no_file' }, { status: 400 })
  const ext = TYPES[file.type]
  if (!ext) return NextResponse.json({ error: 'type' }, { status: 415 })
  if (file.size > 4 * 1024 * 1024) return NextResponse.json({ error: 'too_big' }, { status: 413 })

  const base = (file.name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-|-$/g, '') || 'rasm').slice(0, 40)

  if (hasBlob()) {
    const { put } = await import('@vercel/blob')
    const blob = await put(`uploads/${base}.${ext}`, file, { access: 'public', addRandomSuffix: true, contentType: file.type })
    return NextResponse.json({ url: blob.url })
  }
  if (process.env.VERCEL) return NextResponse.json({ error: 'no_blob' }, { status: 500 })

  // Local development: save into public/uploads
  const fs = await import('node:fs/promises')
  const path = await import('node:path')
  const dir = path.join(process.cwd(), 'public', 'uploads')
  await fs.mkdir(dir, { recursive: true })
  const name = `${base}-${Date.now().toString(36)}.${ext}`
  await fs.writeFile(path.join(dir, name), Buffer.from(await file.arrayBuffer()))
  return NextResponse.json({ url: `/uploads/${name}` })
}
