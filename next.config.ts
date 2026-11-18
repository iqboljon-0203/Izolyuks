import type { NextConfig } from 'next'

const ADMIN_HOST = 'admin.izolyuks.uz'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '*.public.blob.vercel-storage.com' }],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      // www → asosiy domen
      { source: '/:path*', has: [{ type: 'host', value: 'www.izolyuks.uz' }], destination: 'https://izolyuks.uz/:path*', permanent: true },
      // Asosiy domendagi /admin → admin.izolyuks.uz
      { source: '/admin', has: [{ type: 'host', value: 'izolyuks.uz' }], destination: 'https://admin.izolyuks.uz', permanent: true },
      // admin.izolyuks.uz da sayt sahifalari ochilmaydi → asosiy domenga
      { source: '/:lang(uz|ru)/:path*', has: [{ type: 'host', value: ADMIN_HOST }], destination: 'https://izolyuks.uz/:lang/:path*', permanent: false },
      // Bosh sahifa → /uz (admin domenidan tashqari)
      { source: '/', missing: [{ type: 'host', value: ADMIN_HOST }], destination: '/uz', permanent: false },
    ]
  },
  async rewrites() {
    return {
      // admin.izolyuks.uz/ → /admin sahifasi (manzil satrida "/" bo'lib qoladi)
      beforeFiles: [{ source: '/', has: [{ type: 'host', value: ADMIN_HOST }], destination: '/admin' }],
      afterFiles: [],
      fallback: [],
    }
  },
  async headers() {
    return [
      { source: '/:path*', has: [{ type: 'host', value: ADMIN_HOST }], headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
      { source: '/admin/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] },
    ]
  },
}

export default nextConfig
