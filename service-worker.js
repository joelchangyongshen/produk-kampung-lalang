const CACHE_NAME = 'pkl-cache-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/icons/kuih.svg',
  '/assets/icons/kuih-melayu.svg',
  '/assets/icons/snack.svg',
  '/assets/icons/kuih-muih.svg',
  '/assets/icons/ketupat.svg',
  '/assets/icons/bahan.svg',
  '/assets/icons/barangan.svg',
  '/assets/icons/lain.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request).then(r => {
      return caches.open(CACHE_NAME).then(cache => { cache.put(event.request, r.clone()); return r; });
    })).catch(() => caches.match('/index.html'))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))));
});
