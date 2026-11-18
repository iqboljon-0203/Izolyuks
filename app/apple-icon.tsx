import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', background: '#1b3aa8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 64, fontWeight: 800, letterSpacing: -2 }}>
        <span style={{ color: '#ff5a62' }}>IZ</span>
        <span>L</span>
      </div>
    ),
    size,
  )
}
