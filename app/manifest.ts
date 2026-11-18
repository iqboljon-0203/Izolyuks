import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IZOLYUKS — XPS penopleks va sintifon',
    short_name: 'IZOLYUKS',
    description: 'XPS penopleks va sintifon ishlab chiqaruvchi zavod, Toshkent',
    start_url: '/uz',
    display: 'standalone',
    background_color: '#f6f4ef',
    theme_color: '#1b3aa8',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
