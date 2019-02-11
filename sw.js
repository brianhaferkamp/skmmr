// Service Worker code
// version 2.2

importScripts('service-worker-cache-polyfill.js');

const cacheName = 'version-2.3';

// example usage:
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html'
       '/assets/css/main.css',
       '/assets/js/app.js'
     ]);
   })
  );
});

// self.addEventListener('activate', event => {
//   // delete any caches that aren't in expectedCaches
//   // which will get rid of previous versions
//   event.waitUntil(
//     caches.keys().then(keys => Promise.all(
//       keys.map(key => {
//         if (!cacheName.includes(key)) {
//           return caches.delete(key);
//         }
//       })
//     )).then(() => {
//       console.log(cacheName + ' now ready to handle fetches!');
//     })
//   );
// });

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);

  event.respondWith(
   caches.match(event.request).then(function(response) {
     return response || fetch(event.request);
   })
   );
});
