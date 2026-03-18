const cacheName = 'judo-v6';
const assets = [
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css'
];

// Install the Service Worker and Cache Assets
self.addEventListener('install', e => {
  self.skipWaiting(); // Forces the waiting service worker to become active
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Clean up old caches when the new version activates
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch Assets from Cache or Network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});