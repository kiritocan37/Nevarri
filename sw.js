// NEVARRI Service Worker v1
// Cache-first для статики, network-first для HTML

const CACHE_NAME = 'nevarri-v1';
const RUNTIME_CACHE = 'nevarri-runtime-v1';
const FONTS_CACHE = 'nevarri-fonts-v1';

// Файлы которые кешируем сразу при установке
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json'
];

// Install — кешируем основные файлы
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS).catch(() => {
        // Если какой-то файл не загрузится — не падаем
      }))
      .then(() => self.skipWaiting())
  );
});

// Activate — чистим старые кеши
self.addEventListener('activate', (event) => {
  const validCaches = [CACHE_NAME, RUNTIME_CACHE, FONTS_CACHE];
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys
        .filter(key => !validCaches.includes(key))
        .map(key => caches.delete(key))
    )).then(() => self.clients.claim())
  );
});

// Fetch — стратегии в зависимости от типа ресурса
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only GET
  if (request.method !== 'GET') return;

  // Шрифты Google — отдельный кеш с длинным TTL
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(FONTS_CACHE).then(cache =>
        cache.match(request).then(cached => {
          if (cached) return cached;
          return fetch(request).then(response => {
            if (response.ok) cache.put(request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  // Cross-origin (всё кроме нашего домена и шрифтов) — пропускаем
  if (url.origin !== location.origin) {
    return;
  }

  // HTML — network first (всегда свежий контент когда онлайн)
  if (request.mode === 'navigate' ||
      (request.headers.get('accept') && request.headers.get('accept').includes('text/html'))) {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => cache.put(request, copy));
          }
          return response;
        })
        .catch(() => caches.match(request).then(r => r || caches.match('/index.html')))
    );
    return;
  }

  // Изображения и статика — cache first
  if (request.destination === 'image' ||
      request.destination === 'style' ||
      request.destination === 'script' ||
      request.destination === 'font') {
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
        return fetch(request).then(response => {
          if (response.ok) {
            const copy = response.clone();
            caches.open(RUNTIME_CACHE).then(cache => cache.put(request, copy));
          }
          return response;
        }).catch(() => {
          // Если фото не загрузилось — отдаём прозрачный пиксель
          if (request.destination === 'image') {
            return new Response(
              'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"><rect fill="#f4f1ec" width="1" height="1"/></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }
        });
      })
    );
    return;
  }

  // Остальное — стандартный network с fallback
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
