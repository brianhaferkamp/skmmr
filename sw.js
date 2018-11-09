// Service Worker code

importScripts('service-worker-cache-polyfill.js');

// example usage:
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('skmmr').then(function(cache) {
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
