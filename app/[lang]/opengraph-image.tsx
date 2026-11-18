import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'IZOLYUKS — XPS penopleks va sintifon ishlab chiqaruvchisi'

export default async function OG({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  const line = lang === 'ru' ? 'Penopleks XPS i sintifon — napryamuyu s zavoda' : "XPS penopleks va sintifon — to'g'ridan-to'g'ri zavoddan"
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#f6f4ef', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', fontSize: 84, fontWeight: 800, letterSpacing: -2 }}>
          <span style={{ color: '#e0232d' }}>IZO</span>
          <span style={{ color: '#22379b' }}>LYUKS</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 54, fontWeight: 700, color: '#0d1326', lineHeight: 1.1, maxWidth: 980 }}>{line}</div>
          <div style={{ display: 'flex', gap: 24, marginTop: 34, fontSize: 28, color: '#5d6478' }}>
            <span>2013+</span><span>·</span><span>Toshkent</span><span>·</span><span>izolyuks.uz</span>
          </div>
        </div>
        <div style={{ display: 'flex', height: 14, background: '#22379b', borderRadius: 7 }} />
      </div>
    ),
    size,
  )
}
