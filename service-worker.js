const cacheName = 'nysc-smart-cache-v1';
const assetsToCache = [
  '/',
  '/nysc-smart-companion/index.html',
  '/nysc-smart-companion/corper.png',
  '/nysc-smart-companion/icon-192.png',
  '/nysc-smart-companion/icon-512.png',
  '/nysc-smart-companion/manifest.json'
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(cacheName).then(cache=>cache.addAll(assetsToCache)));
  self.skipWaiting();
});

self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==cacheName).map(k=>caches.delete(k)))));
});

self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(resp=>resp || fetch(e.request)));
});