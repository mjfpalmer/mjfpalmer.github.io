self.addEventListener('install', event => {
  console.info('[Service Worker] Install');

  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.info('[Service Worker] Activate');
});

self.addEventListener('fetch', event => {
});
