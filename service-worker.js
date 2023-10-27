const version = "231027.1604";

if (typeof Site === "undefined") { var Site = {}; }

self.addEventListener('install', event => {
  let now = new Date();

  console.info('[Service Worker] Installing Service Worker');

  event.waitUntil(
    caches.open(Site.ServiceWorker.PRECACHE)
      .then(cache => {
        console.info('[Service Worker] Pre-fetching');

        let cachePromises = Site.ServiceWorker.PRECACHE_URLS.map(function (preCacheUrl) {
          let url = new URL(preCacheUrl, location.href);
          url.search += `${(url.search ? '&' : '?')}cache-bust=${now.valueOf()}`;
          return fetch(new Request(url, { mode: 'no-cors' })).then((response) => {
            if (response.status >= 400) { throw new Error(`[Service Worker] Request for ${preCacheUrl} failed with status ${response.statusText}`); }
            return cache.put(preCacheUrl, response);
          }).catch((error) => {
            console.error(`[Service Worker] Not caching ${preCacheUrl} due to ${error}`);
          });
        });

        return Promise.all(cachePromises).then(function () {
          console.info('[Service Worker] Pre-fetching complete');
        });
      })
      .then(() => {
        console.info('[ServiceWorker] Skip waiting on install');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Pre-fetching failed:', error);
      })
  );
});

self.addEventListener('activate', event => {
  console.info('[Service Worker] Activating Service Worker');

  const currentCaches = [Site.ServiceWorker.PRECACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).finally(() => {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) { /* Skip cross-origin requests. */
    if (!event.request.url.startsWith(`${self.location.origin}/api`)) { /* Skip local API requests. */
      event.respondWith(
        caches.match(event.request, { cacheName: Site.ServiceWorker.PRECACHE })
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            } else {
              return fetch(event.request);
            }
          })
      );
    }
  }
});

Site.ServiceWorker = {
  PRECACHE: `cache-${version}`,
  PRECACHE_URLS: [
    '/',
    'manifest.json',
    'index.html',
    'maths.html',
    'bootstrap-5.3.2-dist/css/bootstrap.min.css',
    'bootstrap-5.3.2-dist/js/bootstrap.min.js',
    'css/site.css',
    'favicon/android-icon-36x36.png',
    'favicon/android-icon-48x48.png',
    'favicon/android-icon-72x72.png',
    'favicon/android-icon-96x96.png',
    'favicon/android-icon-144x144.png',
    'favicon/android-icon-192x192.png',
    'favicon/apple-icon.png',
    'favicon/apple-icon-57x57.png',
    'favicon/apple-icon-60x60.png',
    'favicon/apple-icon-72x72.png',
    'favicon/apple-icon-76x76.png',
    'favicon/apple-icon-114x114.png',
    'favicon/apple-icon-120x120.png',
    'favicon/apple-icon-144x144.png',
    'favicon/apple-icon-152x152.png',
    'favicon/apple-icon-180x180.png',
    'favicon/apple-icon-precomposed.png',
    'favicon/favicon.ico',
    'favicon/favicon-16x16.png',
    'favicon/favicon-32x32.png',
    'favicon/favicon-96x96.png',
    'favicon/ms-icon-70x70.png',
    'favicon/ms-icon-144x144.png',
    'favicon/ms-icon-150x150.png',
    'favicon/ms-icon-310x310.png',
    'scripts/jquery-3.7.1.min.js',
    'scripts/site.js'
  ]
}
