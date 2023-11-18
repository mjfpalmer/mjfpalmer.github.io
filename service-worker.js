const version = "231118.1800";

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
    'fonts/photograph_signature-webfont.woff',
    'fonts/photograph_signature-webfont.woff2',
    'images/categories/weight.png',
    'images/categories/first.png',
    'images/categories/general.png',
    'images/categories/gift.png',
    'images/categories/height.png',
    'images/categories/quote.png',
    'images/categories/tooth.png',
    'images/clocks/0000.svg',
    'images/clocks/0005.svg',
    'images/clocks/0010.svg',
    'images/clocks/0015.svg',
    'images/clocks/0020.svg',
    'images/clocks/0025.svg',
    'images/clocks/0030.svg',
    'images/clocks/0035.svg',
    'images/clocks/0040.svg',
    'images/clocks/0045.svg',
    'images/clocks/0050.svg',
    'images/clocks/0055.svg',
    'images/clocks/0100.svg',
    'images/clocks/0105.svg',
    'images/clocks/0110.svg',
    'images/clocks/0115.svg',
    'images/clocks/0120.svg',
    'images/clocks/0125.svg',
    'images/clocks/0130.svg',
    'images/clocks/0135.svg',
    'images/clocks/0140.svg',
    'images/clocks/0145.svg',
    'images/clocks/0150.svg',
    'images/clocks/0155.svg',
    'images/clocks/0200.svg',
    'images/clocks/0205.svg',
    'images/clocks/0210.svg',
    'images/clocks/0215.svg',
    'images/clocks/0220.svg',
    'images/clocks/0225.svg',
    'images/clocks/0230.svg',
    'images/clocks/0235.svg',
    'images/clocks/0240.svg',
    'images/clocks/0245.svg',
    'images/clocks/0250.svg',
    'images/clocks/0255.svg',
    'images/clocks/0300.svg',
    'images/clocks/0305.svg',
    'images/clocks/0310.svg',
    'images/clocks/0315.svg',
    'images/clocks/0320.svg',
    'images/clocks/0325.svg',
    'images/clocks/0330.svg',
    'images/clocks/0335.svg',
    'images/clocks/0340.svg',
    'images/clocks/0345.svg',
    'images/clocks/0350.svg',
    'images/clocks/0355.svg',
    'images/clocks/0400.svg',
    'images/clocks/0405.svg',
    'images/clocks/0410.svg',
    'images/clocks/0415.svg',
    'images/clocks/0420.svg',
    'images/clocks/0425.svg',
    'images/clocks/0430.svg',
    'images/clocks/0435.svg',
    'images/clocks/0440.svg',
    'images/clocks/0445.svg',
    'images/clocks/0450.svg',
    'images/clocks/0455.svg',
    'images/clocks/0500.svg',
    'images/clocks/0505.svg',
    'images/clocks/0510.svg',
    'images/clocks/0515.svg',
    'images/clocks/0520.svg',
    'images/clocks/0525.svg',
    'images/clocks/0530.svg',
    'images/clocks/0535.svg',
    'images/clocks/0540.svg',
    'images/clocks/0545.svg',
    'images/clocks/0550.svg',
    'images/clocks/0555.svg',
    'images/clocks/0600.svg',
    'images/clocks/0605.svg',
    'images/clocks/0610.svg',
    'images/clocks/0615.svg',
    'images/clocks/0620.svg',
    'images/clocks/0625.svg',
    'images/clocks/0630.svg',
    'images/clocks/0635.svg',
    'images/clocks/0640.svg',
    'images/clocks/0645.svg',
    'images/clocks/0650.svg',
    'images/clocks/0655.svg',
    'images/clocks/0700.svg',
    'images/clocks/0705.svg',
    'images/clocks/0710.svg',
    'images/clocks/0715.svg',
    'images/clocks/0720.svg',
    'images/clocks/0725.svg',
    'images/clocks/0730.svg',
    'images/clocks/0735.svg',
    'images/clocks/0740.svg',
    'images/clocks/0745.svg',
    'images/clocks/0750.svg',
    'images/clocks/0755.svg',
    'images/clocks/0800.svg',
    'images/clocks/0805.svg',
    'images/clocks/0810.svg',
    'images/clocks/0815.svg',
    'images/clocks/0820.svg',
    'images/clocks/0825.svg',
    'images/clocks/0830.svg',
    'images/clocks/0835.svg',
    'images/clocks/0840.svg',
    'images/clocks/0845.svg',
    'images/clocks/0850.svg',
    'images/clocks/0855.svg',
    'images/clocks/0900.svg',
    'images/clocks/0905.svg',
    'images/clocks/0910.svg',
    'images/clocks/0915.svg',
    'images/clocks/0920.svg',
    'images/clocks/0925.svg',
    'images/clocks/0930.svg',
    'images/clocks/0935.svg',
    'images/clocks/0940.svg',
    'images/clocks/0945.svg',
    'images/clocks/0950.svg',
    'images/clocks/0955.svg',
    'images/clocks/1000.svg',
    'images/clocks/1005.svg',
    'images/clocks/1010.svg',
    'images/clocks/1015.svg',
    'images/clocks/1020.svg',
    'images/clocks/1025.svg',
    'images/clocks/1030.svg',
    'images/clocks/1035.svg',
    'images/clocks/1040.svg',
    'images/clocks/1045.svg',
    'images/clocks/1050.svg',
    'images/clocks/1055.svg',
    'images/clocks/1100.svg',
    'images/clocks/1105.svg',
    'images/clocks/1110.svg',
    'images/clocks/1115.svg',
    'images/clocks/1120.svg',
    'images/clocks/1125.svg',
    'images/clocks/1130.svg',
    'images/clocks/1135.svg',
    'images/clocks/1140.svg',
    'images/clocks/1145.svg',
    'images/clocks/1150.svg',
    'images/clocks/1155.svg',
    'images/elements/scroll-y.png',
    'images/icons/github.svg',
    'images/icons/linkedin.svg',
    'images/icons/twitter.svg',
    'lib/bootstrap-5.3.2-dist/css/bootstrap.min.css',
    'lib/bootstrap-5.3.2-dist/js/bootstrap.min.js',
    'lib/jquery/jquery-3.7.1.min.js',
    'lib/jquery-ui/jquery-ui.theme.min.css',
    'lib/jquery-ui/jquery-ui.css',
    'lib/jquery-ui/jquery-ui.js',
    'lib/jquery-ui/jquery-ui.min.css',
    'lib/jquery-ui/jquery-ui.min.js',
    'lib/jquery-ui/jquery-ui.structure.css',
    'lib/jquery-ui/jquery-ui.structure.min.css',
    'lib/jquery-ui/jquery.ui.touch-punch.js',
    'lib/jquery-ui/jquery.ui.touch-punch.min.js',
    'maths/maths.html',
    'maths/maths.js',
    'scripts/site.js',
    'timelines/anika.html',
    'timelines/sean.html',
    'timelines/css/anika.css',
    'timelines/css/sean.css',
    'timelines/css/timeline.css',
    'timelines/data/anika.json',
    'timelines/data/sean.json',
    'timelines/images/anika-192.png',
    'timelines/images/anika-512.png',
    'timelines/images/sean-192.png',
    'timelines/images/sean-512.png',
    'timelines/scripts/timeline.js',
  ]
}
