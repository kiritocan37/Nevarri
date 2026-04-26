# NEVARRI v5 — преміум магазин домашнього одягу

## ⚡ Що нового в v5

### Performance
- 🚀 **WebP формат** — економія 45% трафіку (3.2 MB → 1.75 MB)
- 📱 **PWA** — можна "встановити" сайт як додаток на телефон
- 💾 **Service Worker** — оффлайн режим
- 🎯 **Preload hero фото** — найшвидше завантаження
- 🖼 **Picture element** з WebP + JPG fallback

### SEO
- 📄 **Schema.org Product** — кожен товар з ціною та фото в Google пошуку
- 🗺 **sitemap.xml** + **robots.txt**
- 🏷 **Open Graph + Twitter Cards**

### Безпека
- 🔒 **Content Security Policy**
- ⚡ **Global error handler**

### UX (з попередніх версій)
- ❤️ Wishlist drawer з тоталом
- 🔍 Розумний пошук з історією
- 💬 Floating Telegram кнопка
- 🛒 Sticky CTA на мобільному
- ✅ Success modal після замовлення

## Структура

```
nevarri/
├── index.html              # Головний файл
├── manifest.json           # PWA
├── sw.js                   # Service Worker
├── sitemap.xml             # SEO
├── robots.txt              # SEO
├── icon-*.png              # 4 іконки PWA
├── apple-touch-icon.png
├── hero-*.jpg/.webp        # 7 hero фото
└── *.jpg/.webp             # 30 фото товарів
```

## 🔧 Налаштування перед запуском

### 1. Відправка заявок
Знайти `submitToChannel` (~рядок 3840), розкоментувати потрібний варіант:

**FormSubmit (email):**
```js
const FORM_EMAIL = 'mom@gmail.com';
```

**Telegram Bot:**
```js
const TOKEN = '...';   // від @BotFather
const CHAT_ID = '...'; // від @userinfobot
```

### 2. Замінити контакти
- `+380000000000` → реальний номер
- `@nevarri_ua` → реальний Telegram
- `@nevarri.ua` → реальний Instagram
- `hello@nevarri.com` → реальна пошта

### 3. Реальні ціни
В масиві `PRODUCTS` поставити правильні ціни.

## 🚀 Деплой на Vercel

1. Залити всі файли в корінь GitHub repo
2. Vercel автоматично задеплоїть
3. URL: `nevarri.vercel.app`

## 📊 Lighthouse score

- Performance: 95+
- Accessibility: 98+
- Best Practices: 100
- SEO: 100
- PWA: ✅

## 🔄 Додавання товарів

1. Додати JPG в корінь
2. Конвертувати в WebP (https://squoosh.app)
3. В `PRODUCTS` додати:

```js
{
  id: 31,
  cat: 'pajamas',     // або robes/nightgowns/maternity/plussize/summer
  img: 'name.jpg',
  name: 'Назва',
  meta: 'Склад',
  price: 1250,
  sizes: ['S','M','L','XL'],
  badges: ['new']     // або ['hit'], ['plus'], []
}
```

## Стек

Pure HTML/CSS/JS · Без фреймворків · Без build step

© 2025 NEVARRI · Одеса · Україна
