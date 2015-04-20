importScripts('cache-polyfill.js');

var CACHE_NAME = 'reader-v0.1.1',
    urls = [
        '/reader/',
        '/reader/config.json',
        '/reader/assets/build/reader.min.js',
        '/reader/assets/build/styles.css'
    ];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log(cache);
            return cache.addAll(urls);
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                var fetchRequest;
console.log(response);
                if (response) {
                    return response;
                }
                fetchRequest = event.request.clone();
console.log(fetchRequest);
                return fetch(fetchRequest, {
                    mode: 'no-cors'
                }).then(
                    function (response) {
                        var responseToCache;

                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        responseToCache = response.clone();
                        caches.open(CACHE_NAME).then(function (cache) {
                            cache.put(event.request, responseToCache);
                        });

                        return response;
                    }
                );
            })
    );
});