# IZOLYUKS — izolyuks.uz

Next.js 16 (App Router) sayti: ikki tilli (UZ/RU), har bir mahsulot va yechim uchun alohida sahifa, narx kalkulyatori, kengaytirilgan SEO, Telegram'ga buyurtma va admin panel.

## Tuzilma

| Yo'l | Nima |
|---|---|
| `/uz`, `/ru` | Bosh sahifa (landing) |
| `/{til}/mahsulotlar` | Katalog |
| `/{til}/mahsulotlar/{slug}` | Har bir mahsulot sahifasi (Product + Offer schema) |
| `/{til}/yechimlar/{slug}` | Fundament, pol, devor, tom — alohida SEO sahifalar |
| `/{til}/kalkulyator` | Miqdor va narx kalkulyatori |
| `/{til}/aloqa` | Kontaktlar, xarita, ariza |
| `/admin` | Admin panel (parol bilan) |
| `/sitemap.xml`, `/robots.txt` | Avtomatik, hreflang bilan |

Kontent `data/content.json` faylidan boshlanadi. Admin panelda saqlangan o'zgarishlar **Vercel Blob**'ga yoziladi va sayt sahifalari darhol yangilanadi.

## Ishga tushirish (lokal)

```bash
npm install
cp .env.example .env.local   # va qiymatlarni to'ldiring
npm run dev                  # http://localhost:3000
```

Lokalda Blob tokeni bo'lmasa, admin o'zgarishlari to'g'ridan-to'g'ri `data/content.json` ga yoziladi, rasmlar esa `public/uploads/` ga tushadi.

## Vercel sozlamalari

Vercel → Project → Settings → Environment Variables:

| O'zgaruvchi | Nima uchun |
|---|---|
| `ADMIN_PASSWORD` | `/admin` paroli |
| `ADMIN_SECRET` | Sessiyani imzolash uchun uzun tasodifiy satr |
| `NEXT_PUBLIC_SITE_URL` | `https://izolyuks.uz` |
| `TELEGRAM_BOT_TOKEN` | @BotFather'dan olingan bot tokeni |
| `TELEGRAM_CHAT_ID` | Arizalar keladigan chat yoki guruh ID |
| `BLOB_READ_WRITE_TOKEN` | Vercel → Storage → Blob yaratilganda avtomatik qo'shiladi |
| `NEXT_PUBLIC_GOOGLE_VERIFICATION` | Google Search Console kodi (ixtiyoriy) |
| `NEXT_PUBLIC_YANDEX_VERIFICATION` | Yandex Webmaster kodi (ixtiyoriy) |

O'zgaruvchilarni qo'shgach, **Redeploy** qiling.

### Telegram bot

1. Telegram'da @BotFather → `/newbot` → tokenni `TELEGRAM_BOT_TOKEN` ga qo'ying.
2. Botni arizalar keladigan guruhga qo'shing (yoki botga o'zingiz `/start` yozing).
3. `https://api.telegram.org/bot<TOKEN>/getUpdates` ni oching va `chat.id` ni `TELEGRAM_CHAT_ID` ga yozing (guruh ID odatda `-100...` bilan boshlanadi).

Bot sozlanmagan bo'lsa, forma ariza matnini nusxalab, Telegram chatini ochadi — ariza baribir yo'qolmaydi.

### Domen (izolyuks.uz)

Vercel loyihasiga `izolyuks.uz`, `www.izolyuks.uz` va `admin.izolyuks.uz` qo'shilgan. Domen ro'yxatdan o'tgan joyda (DNS) quyidagilarni qo'shing:

| Turi | Nomi (Host) | Qiymati |
|---|---|---|
| `A` | `@` | `216.198.79.1` |
| `A` | `@` | `64.29.17.1` |
| `CNAME` | `www` | `3fbaca0ef825f36e.vercel-dns-017.com` |
| `CNAME` | `admin` | `3fbaca0ef825f36e.vercel-dns-017.com` |

Yoki DNS'ni to'liq Vercel'ga topshirish mumkin: domen NS yozuvlarini `ns1.vercel-dns.com` va `ns2.vercel-dns.com` ga o'zgartiring.

Tekshirish: `vercel domains verify izolyuks.uz` (va `admin.izolyuks.uz`). SSL sertifikat avtomatik beriladi.

Ishlash tartibi:
- `izolyuks.uz` — sayt (`/` → `/uz`).
- `www.izolyuks.uz` → `izolyuks.uz` ga yo'naltiriladi.
- `admin.izolyuks.uz` — admin panel. `izolyuks.uz/admin` ham shu yerga yo'naltiriladi. Admin domeni Google'da indekslanmaydi.

### Google'da ko'rinish

1. [Google Search Console](https://search.google.com/search-console) → domen qo'shing → tasdiqlash kodini `NEXT_PUBLIC_GOOGLE_VERIFICATION` ga qo'ying.
2. Sitemap yuboring: `https://izolyuks.uz/sitemap.xml`.
3. Xuddi shuni [Yandex Webmaster](https://webmaster.yandex.ru) uchun ham qiling.

Indekslanish odatda bir necha hafta oladi.

## Admin panel

`https://admin.izolyuks.uz` (domen ulanguncha: `https://izolyuks.vercel.app/admin`) → parol. Bo'limlar: Mahsulotlar, Narxlar · Kalkulyator, Bosh sahifa, Yechimlar, Galereya, Savol-javob, Kontaktlar, SEO.

- Rasm yuklash: «Rasm yuklash» tugmasi — rasm avtomatik kichraytiriladi (1800px, JPEG).
- Narx `0` bo'lsa — saytda «Narxi so'rov bo'yicha» chiqadi.
- Sarlavhada `*so'z*` yozilsa — u kursiv bilan ajratiladi.
- Yangi mahsulot qo'shilganda «Saytda ko'rsatish» belgisini yoqing — u o'z sahifasi bilan saytda va sitemap'da paydo bo'ladi.
