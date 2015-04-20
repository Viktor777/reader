importScripts('cache-polyfill.js');

var CACHE_NAME = 'reader-v1',
    urls = [
        '/reader/',
        '/reader/index.html',
        '/reader/config.json',
        '/reader/assets/build/reader.min.js',
        '/reader/assets/build/styles.css'
    ];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urls).then(function () {
                console.log('Resources are cached.');
            });
        }).catch(function (error) {
            console.error('Install failed:', error);
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

                if (response) {
                    return response;
                }
                fetchRequest = event.request.clone();

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
                ).catch(function () {
                    console.log('Fetch failed:', error);
                });
            })
    );
});