# IZOLYUKS — SEO qo'llanma va tayyor matnlar

Saytning texnik SEO qismi tayyor: sitemap, robots.txt, hreflang (uz/ru), JSON-LD (Organization, LocalBusiness, Product, FAQPage, BreadcrumbList), Open Graph, kalit so'zli sarlavhalar. Quyidagi ishlar **sizning akkauntlaringiz** orqali bajariladi — har biri uchun kiritiladigan matnlar tayyor.

> Hech kim Google'da 1-o'rinni kafolatlay olmaydi. Indekslanish odatda bir necha hafta oladi. Bu ro'yxat imkoniyatni maksimal oshiradi.

---

## 0. Avval: domenni ishga tushirish

`izolyuks.uz` ro'yxatdan o'tgan, lekin uning DNS serveri (`91.98.193.184`) so'rovlarga **REFUSED** deb javob beryapti — domen sotib olingan joyda DNS zonasi yaratilmagan. Provayder panelida **bittasini** qiling:

**A) NS'ni Vercel'ga topshirish (eng oson):**
`ns1.vercel-dns.com`, `ns2.vercel-dns.com`

**B) Yoki yozuvlarni qo'lda qo'shish:**

| Turi | Nomi | Qiymati |
|---|---|---|
| A | @ | 216.198.79.1 |
| A | @ | 64.29.17.1 |
| CNAME | www | 3fbaca0ef825f36e.vercel-dns-017.com |
| CNAME | admin | 3fbaca0ef825f36e.vercel-dns-017.com |

---

## 1. Google Search Console

1. https://search.google.com/search-console → **Add property** → **URL prefix** → `https://izolyuks.uz`
2. Tasdiqlash usuli: **HTML tag** → `content="..."` ichidagi kodni nusxalang.
3. Kodni Vercel → izolyuks → Settings → Environment Variables → `NEXT_PUBLIC_GOOGLE_VERIFICATION` ga qo'ying → **Redeploy** → Search Console'da **Verify**.
4. **Sitemaps** → `https://izolyuks.uz/sitemap.xml` → Submit.
5. **URL Inspection** → quyidagilar uchun **Request indexing**:
   - `https://izolyuks.uz/uz`, `https://izolyuks.uz/ru`
   - `https://izolyuks.uz/uz/mahsulotlar`, `https://izolyuks.uz/ru/mahsulotlar`
   - `https://izolyuks.uz/uz/mahsulotlar/xps-premium`
   - `https://izolyuks.uz/uz/mahsulotlar/sintifon-folgali`

## 2. Yandex Webmaster

1. https://webmaster.yandex.ru → **Добавить сайт** → `https://izolyuks.uz`
2. Tasdiqlash: **Мета-тег** → kodni `NEXT_PUBLIC_YANDEX_VERIFICATION` ga qo'ying → Redeploy → **Проверить**.
3. **Индексирование → Файлы Sitemap** → `https://izolyuks.uz/sitemap.xml`
4. **Региональность** → Ташкент.

---

## 3. Google Business Profile (Google Xaritalar)

https://business.google.com → **Add business**

| Maydon | Qiymat |
|---|---|
| Nomi | **IZOLYUKS** (Google qoidasi: faqat haqiqiy nom, kalit so'z qo'shmang — aks holda profil bloklanishi mumkin) |
| Asosiy toifa | Insulation materials store / Магазин теплоизоляционных материалов |
| Qo'shimcha toifalar | Manufacturer · Building materials supplier · Building materials store |
| Manzil | Toshkent sh., Uchtepa tumani, Xondamir mahallasi, Dilkash ko'chasi, 2 (nuqta: 41.313527, 69.180819; Plus kod 857J+C88) |
| Telefon | +998 99 766 90 99 |
| Sayt | https://izolyuks.uz/uz |
| Ish vaqti | Du–Sh 09:00–18:00 (haqiqiysini kiriting) |

**Tavsif (UZ, 750 belgigacha):**
> IZOLYUKS — 2013-yildan beri Toshkentda XPS penopleks va sintifon (penopolietilen) ishlab chiqaruvchi zavod. Mahsulotlar: XPS PREMIUM (32–36 kg/m³) va XPS STANDARD penopleks, folgali sintifon (2–10 mm), PPI-P qadoqlash polietileni, PPI-OTD va laminatsiyalangan quvur izolyatsiyasi, gidro-bug' izolyatsiya plyonkasi, yakorli skoba va «Parashyut» dyubellari. Zavod narxida, ulgurji va chakana savdo. Bepul namuna beramiz. Fura hajmidagi buyurtmalarga O'zbekiston bo'ylab bepul yetkazib berish, Qozog'iston, Tojikiston, Turkmaniston va Qirg'izistonga eksport.

**Описание (RU):**
> IZOLYUKS — завод в Ташкенте, с 2013 года производящий пеноплекс XPS и синтифон (вспененный полиэтилен). Продукция: пеноплекс XPS PREMIUM (32–36 кг/м³) и XPS STANDARD, синтифон с фольгой (2–10 мм), упаковочный ППИ-П, изоляция труб ППИ-ОТД и ламинированная оболочка, гидро-пароизоляция, якорные скобы и дюбели «Парашют». Цены завода, опт и розница, бесплатные образцы. Бесплатная доставка по Узбекистану при заказе от фуры, экспорт в Казахстан, Таджикистан, Туркменистан и Кыргызстан.

**Mahsulotlar bo'limi:** har bir mahsulotni rasm + sayt havolasi bilan qo'shing (havolalar `https://izolyuks.uz/uz/mahsulotlar/...`).

**Rasmlar:** logotip, zavod, mahsulotlar (`public/img/` dagi rasmlar), imkon bo'lsa haqiqiy zavod fotolari.

**Tasdiqlash:** Google odatda video yoki pochta orqali tasdiqlaydi — bu bosqichni faqat egasi bajaradi.

### Sharhlar (reviews)
- Faqat **haqiqiy mijozlardan** so'rang: yetkazib berilgandan keyin Telegram'da sharh havolasini yuboring.
- Tanishlar yoki soxta sharhlar yozdirmang — Google ularni o'chiradi va profilni jazolashi mumkin.
- Har bir sharhga (salbiysiga ham) xushmuomala javob yozing.

## 4. Yandex Biznes (Yandex Kartalar)

https://yandex.uz/sprav → **Добавить организацию** — yuqoridagi RU tavsif, toifa **«Теплоизоляционные материалы»** + **«Строительные материалы»**, manzil, telefon, sayt `https://izolyuks.uz/ru`.

---

## 5. Kataloglar (tashqi havolalar)

Har birida kompaniya sahifasi oching va sayt havolasini qoldiring:

| Sayt | Nima qilish |
|---|---|
| goldenpages.uz | Kompaniya kartochkasi |
| yellowpages.uz | Kompaniya kartochkasi |
| orginfo.uz | Kompaniya ma'lumoti tekshirish/qo'shish |
| prom.uz | Do'kon + mahsulotlar |
| glotr.uz | Kompaniya + mahsulotlar |
| olx.uz | E'lonlar (pastdagi shablon) |

**Qisqa tavsif (UZ):** IZOLYUKS — XPS penopleks va sintifon ishlab chiqaruvchisi (2013-yildan). Zavod narxi, ulgurji va chakana, O'zbekiston bo'ylab yetkazib berish. izolyuks.uz

**Краткое описание (RU):** IZOLYUKS — производитель пеноплекса XPS и синтифона с 2013 года. Цены завода, опт и розница, доставка по Узбекистану. izolyuks.uz

## 6. Ijtimoiy tarmoqlar

- **Instagram bio:** havolani `https://izolyuks.uz` ga almashtiring (hozir t.me havolasi turibdi).
- **Telegram kanal tavsifi:** `🌐 izolyuks.uz — katalog va narx kalkulyatori`
- Postlarda mahsulot sahifasiga havola bering, masalan: `izolyuks.uz/uz/mahsulotlar/xps-premium`

## 7. OLX e'lon shabloni

> **Penopleks XPS Premium 32–36 — zavod narxida, Toshkent**
> IZOLYUKS zavodidan to'g'ridan-to'g'ri. Plotnost 32–36 kg/m³, qalinlik 20–100 mm, o'lcham 1200×600. Issiq pol, fundament, sokol uchun. Ulgurji va chakana, bepul namuna.
> 📞 +998 99 766 90 99
> 🌐 Katalog va kalkulyator: izolyuks.uz

---

## 8. Kalit so'zlar (sayt sarlavhalariga kiritilgan)

| Klaster | UZ | RU |
|---|---|---|
| Penopleks | penopleks toshkent, penopleks narxi, xps penopleks, penopleks zavod, penopleks optom | пеноплекс ташкент, купить пеноплекс в ташкенте, пеноплекс цена, экструдированный пенополистирол |
| Sintifon | sintifon toshkent, folgali sintifon narxi, sintifon optom | синтифон ташкент, фольгированный синтифон цена, синтифон оптом |
| Qo'llanish | issiq pol penopleks, fundament izolyatsiyasi, tom izolyatsiyasi | пеноплекс для теплого пола, утепление фундамента, утепление фасада |

Har bir mahsulot va yechim sahifasining Google sarlavhasini admin panelda **«Google sarlavhasi»** maydonidan o'zgartirish mumkin.

## 9. Har oy

- Search Console → **Performance**: qaysi so'zlar bilan topishyapti, CTR past sahifalar sarlavhasini yaxshilang.
- Admin panelda narxlarni yangilab turing (narx ko'rsatilgan sahifalar Google'da narx bilan chiqishi mumkin).
- Yangi mahsulot yoki loyiha rasmlarini qo'shing.
- Google Business'ga oyiga 2–4 ta post (yangi mahsulot, aksiya, yetkazilgan buyurtma).
