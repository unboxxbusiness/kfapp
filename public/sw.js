// Kampus Filter Offline Service Worker v1
const CACHE_NAME = 'kampusfilter-offline-v1';
const STATIC_ASSETS = [
  '/',
  '/favicon.ico',
  '/manifest.webmanifest',
];

// 1. Install: Precache core shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Precache asset failure:', err);
      });
    })
  );
  self.skipWaiting();
});

// 2. Activate: Clean up any outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Fetch: Stale-While-Revalidate for articles & static chunks
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and external API/auth requests
  if (request.method !== 'GET') return;
  if (url.origin !== self.location.origin && !url.hostname.includes('cloudinary.com')) return;
  if (url.pathname.startsWith('/api/')) return;

  // For HTML navigations (articles, categories, homepage):
  // Network first with fallback to offline cache
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;

          // Fallback to cached homepage if specific article not cached
          const cachedHome = await caches.match('/');
          if (cachedHome) return cachedHome;

          return new Response(
            `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="utf-8">
              <title>Offline — Kampus Filter</title>
              <meta name="viewport" content="width=device-width,initial-scale=1">
              <style>
                body { font-family: sans-serif; text-align: center; padding: 4rem 1.5rem; background: #ffffff; color: #14213d; }
                h1 { font-size: 1.8rem; margin-bottom: 0.5rem; }
                p { font-size: 1rem; color: #555; max-width: 400px; margin: 0 auto 1.5rem auto; line-height: 1.6; }
                a { display: inline-block; padding: 0.6rem 1.4rem; background: #fca311; color: #000; font-weight: 800; border-radius: 9999px; text-decoration: none; border: 2px solid #000; }
              </style>
            </head>
            <body>
              <h1>You Are Currently Offline</h1>
              <p>You have lost internet connectivity. Guides you previously opened are stored in your offline reading cache.</p>
              <a href="/">Go to Home</a>
            </body>
            </html>`,
            {
              headers: { 'Content-Type': 'text/html; charset=utf-8' },
            }
          );
        })
    );
    return;
  }

  // For static assets (CSS, JS, images, fonts): Cache-First with background fetch
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch fresh copy in background to revalidate cache
        fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, networkResponse);
              });
            }
          })
          .catch(() => {});
        return cachedResponse;
      }

      return fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, clone);
          });
        }
        return networkResponse;
      });
    })
  );
});
