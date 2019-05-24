const myCache = 'restaurantCacheV14';

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(myCache).then(function(cache) {
      return cache.addAll([
        'index.html',
        'restaurant.html',
        'img/manifest-icon.jpg',
        'img/1.jpg',
        'img/2.jpg',
        'img/3.jpg',
        'img/4.jpg',
        'img/5.jpg',
        'img/6.jpg',
        'img/7.jpg',
        'img/8.jpg',
        'img/9.jpg',
        'img/10.jpg',
        'data/restaurants.json',
        'js/dbhelper.js',
        'js/restaurant_info.js',
        'js/main.js',
        'css/styles.css',
        'manifest.json',
        '/Restaurant-App/'
      ]);
    })
  );
})

self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('restaurantCache') &&
                 cacheName != myCache;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open(myCache).then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request)
      });
    })
  );
});