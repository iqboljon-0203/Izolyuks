import type { Lang } from './types'

const uz = {
  nav: { home: 'Bosh sahifa', finder: 'Tanlash', products: 'Mahsulotlar', solutions: 'Yechimlar', calc: 'Kalkulyator', factory: 'Zavod', contact: 'Aloqa' },
  cta: "Narx so'rash",
  heroBtn1: 'Material tanlash',
  heroBtn2: 'Bepul namuna olish',
  now: 'Hozir',
  tag1: "plita o'lchami, mm",
  tag2: 'qalinlik variantlari',
  marquee: ['XPS Penopleks', 'Sintifon', 'Folgali', 'Issiq pol', 'Ulgurji va chakana', 'Eksport', '2013-yildan beri'],
  aud: {
    eb: 'Kim uchun', t: 'Bitta zavod — *ikki xil* yondashuv', p: "Bir xona ta'mirlayapsizmi yoki butun obyekt quryapsizmi — sizga mos yo'lni tanlang.",
    retail: { eb: 'Chakana', t: 'Uy va kvartira uchun', items: ['Kam miqdorda ham sotamiz', 'Bepul namuna va maslahat', 'Qaysi material kerakligini tanlashda yordam', "Toshkent bo'ylab tez yetkazish"], b: 'Material tanlash' },
    pro: { eb: 'Ulgurji · B2B', t: 'Quruvchi va dilerlar uchun', items: ['Zavod narxi va ulgurji chegirmalar', 'Fura hajmida — bepul yetkazish', "Buyurtma bo'yicha o'lcham va qalinlik", 'Eksport: KZ · TJ · TM · KG'], b: "Ulgurji narx so'rash" },
  },
  finder: { eb: 'Material tanlash', t: 'Qayerni *izolyatsiya* qilasiz?', p: "Uyning qismini tanlang — qaysi mahsulot va qanday qalinlik kerakligini ko'rsatamiz.", hint: 'Sxemadagi qismni bosing', zones: { roof: 'Tom', wall: 'Devor', floor: 'Pol', fund: 'Fundament' }, rec: 'Tavsiya etamiz', th: 'Qalinlik:', more: 'Batafsil' },
  catalog: { eb: 'Katalog', t: "O'zimiz ishlab chiqaramiz — *har qanday* obyekt uchun", p: "Ulgurji va chakana savdo. Turli o'lcham va qalinliklar buyurtma asosida tayyorlanadi.", all: 'Barchasi', cats: { xps: 'XPS', sint: 'Sintifon', pipe: 'Quvur izolyatsiyasi', film: 'Plyonkalar', acc: 'Mahkamlagichlar' }, more: 'Batafsil', ask: "Narx so'rash", viewAll: "Barcha mahsulotlar" },
  price: { from: 'dan', onRequest: "Narxi so'rov bo'yicha", per: 'uchun', currency: "so'm" },
  xps: { eb: 'Sifatli XPS izlayapsizmi?', t: 'Ikki variant — *vazifangizga* qarab', p: "Plotnost (zichlik) qancha yuqori bo'lsa, plita yukka va deformatsiyaga shuncha chidamli bo'ladi.", std: 'Standart', pro: 'Tavsiya etamiz · Premium' },
  factory: { eb: 'Zavodimiz', t: "Har bir plita — *o'z* ishlab chiqarishimizdan", p: 'Toza xomashyo, zamonaviy liniya va har partiyada sifat nazorati.' },
  why: { eb: 'Nega IZOLYUKS', t: 'Biz diler emasmiz — *biz ishlab chiqaruvchimiz*' },
  steps: { eb: 'Qanday ishlaymiz', t: 'Arizadan *yetkazishgacha*' },
  calc: {
    eb: 'Kalkulyator', t: 'Qancha *material* va qancha *pul* kerak?', p: "Maydonni kiriting — miqdor va taxminiy narxni darhol hisoblaymiz. Aniq narx uchun ariza qoldiring.",
    material: '1. Material', area: '2. Maydon, m²', thickness: '3. Qalinligi', reserve: '4. Zaxira (kesish uchun)', need: 'Sizga kerak bo\'ladi',
    sheets: 'dona list', rolls: 'rulon', areaRes: 'Zaxira bilan maydon', volume: 'Hajm, m³', packs: 'Qadoq', rollSize: 'Rulon', cost: 'Taxminiy narx', costNA: "Narx so'rov bo'yicha", how: 'Qanday hisoblandi', rollArea: '1 rulon', sheetArea: '1 list', inPack: 'Qadoqda', listUnit: 'list', rollUnit: 'rulon', packOf: 'listdan',
    note: "* Hisob taxminiy. Qadoqdagi soni va narx qalinlikka qarab o'zgaradi — aniq ma'lumotni menejer beradi.", btn: "Shu hisob bo'yicha buyurtma berish", page: "To'liq kalkulyator",
  },
  delivery: { eb: 'Yetkazib berish' },
  faq: { eb: 'Savol-javob', t: "Ko'p beriladigan *savollar*" },
  contact: {
    eb: 'Aloqa', t: "Narx va namuna uchun *bog'laning*", address: 'Manzil', map: 'xaritada', company: 'Kompaniya', hours: 'Ish vaqti',
    form: { t: 'Ariza qoldiring', p: "Arizangiz darhol menejerimizga Telegram orqali yetib boradi.", name: 'Ismingiz', phone: 'Telefon raqamingiz', product: 'Mahsulot', msg: 'Hajm, qalinlik, manzil...', send: 'Arizani yuborish', sending: 'Yuborilmoqda...', ok: "Rahmat! Arizangiz qabul qilindi — tez orada qo'ng'iroq qilamiz.", fallback: 'Ariza matni nusxalandi. Telegram chatiga joylashtirib (Ctrl+V) yuboring.', err: "Iltimos, ism va telefon raqamini to'g'ri kiriting.", wholesale: 'Ulgurji buyurtma' },
  },
  product: { specs: 'Xususiyatlari', features: 'Afzalliklari', about: 'Mahsulot haqida', uses: "Qo'llanilishi", related: "O'xshash mahsulotlar", order: 'Buyurtma berish', back: 'Barcha mahsulotlar' },
  solution: { eb: 'Yechim', products: 'Tavsiya etilgan mahsulotlar', thickness: 'Tavsiya etilgan qalinlik', others: 'Boshqa yechimlar', calc: 'Miqdorni hisoblash' },
  footer: { rights: 'Barcha huquqlar himoyalangan.', about: "Issiqlik izolyatsiyasi mahsulotlari ishlab chiqaruvchisi. XPS plitalar, sintifon, quvur izolyatsiyasi, plyonkalar va mahkamlagichlar." },
  notFound: { t: 'Sahifa topilmadi', p: "Siz qidirgan sahifa o'chirilgan yoki manzil noto'g'ri.", b: 'Bosh sahifaga' },
  theme: 'Mavzuni almashtirish',
}

type Dict = typeof uz

const ru: Dict = {
  nav: { home: 'Главная', finder: 'Подбор', products: 'Продукция', solutions: 'Решения', calc: 'Калькулятор', factory: 'Завод', contact: 'Контакты' },
  cta: 'Узнать цену',
  heroBtn1: 'Подобрать материал',
  heroBtn2: 'Получить бесплатный образец',
  now: 'Сейчас',
  tag1: 'размер плиты, мм',
  tag2: 'варианты толщины',
  marquee: ['Пеноплекс XPS', 'Синтифон', 'Фольгированный', 'Тёплый пол', 'Опт и розница', 'Экспорт', 'С 2013 года'],
  aud: {
    eb: 'Для кого', t: 'Один завод — *два* подхода', p: 'Ремонтируете одну комнату или строите целый объект — выберите подходящий путь.',
    retail: { eb: 'Розница', t: 'Для дома и квартиры', items: ['Продаём даже в небольших объёмах', 'Бесплатный образец и консультация', 'Поможем выбрать нужный материал', 'Быстрая доставка по Ташкенту'], b: 'Подобрать материал' },
    pro: { eb: 'Опт · B2B', t: 'Для строителей и дилеров', items: ['Заводская цена и оптовые скидки', 'Объём фуры — бесплатная доставка', 'Размеры и толщины под заказ', 'Экспорт: KZ · TJ · TM · KG'], b: 'Запросить оптовую цену' },
  },
  finder: { eb: 'Подбор материала', t: 'Что вы *утепляете*?', p: 'Выберите часть дома — покажем, какой продукт и какая толщина нужны.', hint: 'Нажмите на часть схемы', zones: { roof: 'Кровля', wall: 'Стены', floor: 'Пол', fund: 'Фундамент' }, rec: 'Рекомендуем', th: 'Толщина:', more: 'Подробнее' },
  catalog: { eb: 'Каталог', t: 'Производим сами — *для любого* объекта', p: 'Опт и розница. Разные размеры и толщины изготавливаем под заказ.', all: 'Все', cats: { xps: 'XPS', sint: 'Синтифон', pipe: 'Изоляция труб', film: 'Плёнки', acc: 'Крепёж' }, more: 'Подробнее', ask: 'Узнать цену', viewAll: 'Вся продукция' },
  price: { from: 'от', onRequest: 'Цена по запросу', per: 'за', currency: 'сум' },
  xps: { eb: 'Ищете качественный XPS?', t: 'Два варианта — *под вашу* задачу', p: 'Чем выше плотность, тем лучше плита выдерживает нагрузку и деформацию.', std: 'Стандарт', pro: 'Рекомендуем · Premium' },
  factory: { eb: 'Наш завод', t: 'Каждая плита — *собственного* производства', p: 'Чистое сырьё, современная линия и контроль качества каждой партии.' },
  why: { eb: 'Почему IZOLYUKS', t: 'Мы не дилер — *мы производитель*' },
  steps: { eb: 'Как мы работаем', t: 'От заявки *до доставки*' },
  calc: {
    eb: 'Калькулятор', t: 'Сколько нужно *материала* и *денег*?', p: 'Введите площадь — сразу посчитаем количество и примерную стоимость. Для точной цены оставьте заявку.',
    material: '1. Материал', area: '2. Площадь, м²', thickness: '3. Толщина', reserve: '4. Запас (на подрезку)', need: 'Вам понадобится',
    sheets: 'листов', rolls: 'рулонов', areaRes: 'Площадь с запасом', volume: 'Объём, м³', packs: 'Упаковок', rollSize: 'Рулон', cost: 'Примерная стоимость', costNA: 'Цена по запросу', how: 'Как посчитано', rollArea: '1 рулон', sheetArea: '1 лист', inPack: 'В упаковке', listUnit: 'лист.', rollUnit: 'рул.', packOf: 'листов',
    note: '* Расчёт примерный. Количество в упаковке и цена зависят от толщины — точные данные даст менеджер.', btn: 'Заказать по этому расчёту', page: 'Полный калькулятор',
  },
  delivery: { eb: 'Доставка' },
  faq: { eb: 'Вопрос-ответ', t: 'Частые *вопросы*' },
  contact: {
    eb: 'Контакты', t: 'Свяжитесь для цены *и образца*', address: 'Адрес', map: 'на карте', company: 'Компания', hours: 'Время работы',
    form: { t: 'Оставьте заявку', p: 'Заявка сразу поступит нашему менеджеру в Telegram.', name: 'Ваше имя', phone: 'Ваш телефон', product: 'Продукт', msg: 'Объём, толщина, адрес...', send: 'Отправить заявку', sending: 'Отправка...', ok: 'Спасибо! Заявка принята — скоро перезвоним.', fallback: 'Текст заявки скопирован. Вставьте его в чат Telegram (Ctrl+V) и отправьте.', err: 'Пожалуйста, укажите имя и корректный телефон.', wholesale: 'Оптовый заказ' },
  },
  product: { specs: 'Характеристики', features: 'Преимущества', about: 'О продукте', uses: 'Применение', related: 'Похожие товары', order: 'Заказать', back: 'Вся продукция' },
  solution: { eb: 'Решение', products: 'Рекомендуемые продукты', thickness: 'Рекомендуемая толщина', others: 'Другие решения', calc: 'Рассчитать количество' },
  footer: { rights: 'Все права защищены.', about: 'Производитель теплоизоляционных материалов. Плиты XPS, синтифон, изоляция труб, плёнки и крепёж.' },
  notFound: { t: 'Страница не найдена', p: 'Страница удалена или адрес указан неверно.', b: 'На главную' },
  theme: 'Сменить тему',
}

const dicts: Record<Lang, Dict> = { uz, ru }
export const getDict = (lang: Lang) => dicts[lang]
export type { Dict }

export const localeTag: Record<Lang, string> = { uz: 'uz_UZ', ru: 'ru_RU' }

export function formatPrice(n: number) {
  return new Intl.NumberFormat('ru-RU').format(Math.round(n))
}
