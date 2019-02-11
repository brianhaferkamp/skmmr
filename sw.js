// Service Worker code
// version 2.0.2

importScripts('service-worker-cache-polyfill.js');

const cacheName = 'version-2.2';

// example usage:
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/assets/css/main.css',
       '/assets/js/app.js'
     ]);
   })
  );
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);

  event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
   );
});
