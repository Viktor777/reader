var CACHE_NAME = 'reader-v0.1.1',
    urls = [
        '/reader/config.json',
        '/reader/assets/build/reader.min.js',
        '/reader/assets/build/screen.css'
    ];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urls);
        })
    );
});

self.addEventListener('activate', function (event) {
    event.waitUntil(caches.delete(CACHE_NAME));
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

                return fetch(fetchRequest).then(
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