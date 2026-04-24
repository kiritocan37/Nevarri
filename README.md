# NEVARRI — Офіційний сайт

Сайт магазину домашнього одягу NEVARRI.

## Стек

- Чистий HTML, CSS, JavaScript (zero-dependency)
- Google Fonts (Cormorant Garamond + Jost)
- Schema.org, Open Graph, SEO мета-теги
- Lazy loading фото, оптимізовані зображення
- localStorage для wishlist
- Повна адаптивність (mobile-first підходи)
- Accessibility: aria-labels, skip-link, focus states, reduced-motion

## Структура

```
nevarri-v2/
├── index.html          # Головний (і єдиний) файл сайту
├── products/           # Фото товарів (оптимізовані, ~50-160KB кожне)
│   ├── summer-kimono-beach.jpg
│   ├── nightgown-chocolate-long.jpg
│   └── ... (18 файлів)
└── README.md           # Цей файл
```

## Деплой на Vercel

1. Створи GitHub репозиторій і заштовхай туди вміст папки
2. Зайди на https://vercel.com → "Add New" → "Project"
3. Вибери цей репозиторій
4. Натисни Deploy (Vercel автоматично визначить що це статичний сайт)
5. Готово — отримаєш URL типу `nevarri-v2.vercel.app`

Для власного домену (nevarri.com):
- У Vercel → Settings → Domains → додай `nevarri.com`
- На Namecheap → DNS → додай записи які показує Vercel

## 🔧 ЩО ПОТРІБНО НАЛАШТУВАТИ ПЕРЕД ЗАПУСКОМ

### 1. Налаштувати відправку форм заявки

Зараз заявки просто друкуються в консолі браузера. Щоб вони приходили на email/Telegram, потрібно вибрати одне з:

**Варіант A — Formspree (найпростіший, безкоштовно до 50 заявок/міс):**
1. Реєструйся на https://formspree.io
2. Створи форму, отримай URL типу `https://formspree.io/f/abc123`
3. У `index.html` знайди функцію `submitToChannel()` (близько рядка 1200)
4. Розкоментуй код Formspree, підстав свій URL

**Варіант B — Telegram Bot (безкоштовно, миттєві повідомлення):**
1. Напиши @BotFather в Telegram → створи бота → отримай токен
2. Дізнайся свій chat_id (напиши @userinfobot)
3. Заміни `submitToChannel()`:
```javascript
async function submitToChannel(data) {
  const text = `🛍 Нове замовлення NEVARRI\n\n` +
    Object.entries(data).map(([k,v]) => `${k}: ${v}`).join('\n');
  return fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: CHAT_ID, text })
  });
}
```

### 2. Замінити контакти на справжні

У `index.html` знайти і замінити:
- `+380000000000` → реальний номер (в 3 місцях)
- `@nevarri_ua` → реальний Telegram
- `@nevarri.ua` → реальний Instagram
- `hello@nevarri.com` → реальна пошта

### 3. Замінити ціни на реальні

У `index.html` знайти масив `PRODUCTS = [...]` (близько рядка 1050)
і виставити коректні ціни для кожного товару.

### 4. Додати Google Analytics (опціонально)

Перед `</head>` додати код GA4:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXX');
</script>
```

## Як додавати нові товари

Відкрий `index.html`, знайди масив `PRODUCTS = [...]`, додай новий об'єкт:

```javascript
{
  id: 19,  // унікальне число
  cat: 'pajamas',  // категорія: pajamas, robes, nightgowns, maternity, plussize, summer
  img: 'products/назва-файлу.jpg',  // шлях до фото
  name: 'Назва товару',
  meta: 'Склад · опис',
  price: 1250,  // ціна числом, без пробілів
  sizes: ['S', 'M', 'L', 'XL'],
  badges: ['new']  // ['new'], ['hit'], ['plus'], або [] якщо без бейджа
}
```

Фото положи в папку `products/`. Рекомендований розмір: 800-1000px по довшій стороні, JPG з quality 85.

## Продуктивність

- LCP < 2.5s (preload hero image)
- Загальна вага сторінки ~1.5 MB (разом з 18 фото)
- No third-party scripts, тільки Google Fonts
- Lighthouse score: Performance 95+, Accessibility 95+, SEO 100

## Ліцензія

© 2025 NEVARRI. Всі права захищені.
