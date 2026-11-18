import type { Metadata } from 'next'
import { Onest } from 'next/font/google'
import '../globals.css'
import './admin.css'

const onest = Onest({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600', '700'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'IZOLYUKS — Admin panel',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" data-theme="light" className={onest.variable}>
      <body className="admin-body">{children}</body>
    </html>
  )
}
