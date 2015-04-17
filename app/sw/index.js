var CACHE_NAME = 'reader-v0.0.3',
    url = [
        '/reader/assets/build/reader.min.js',
        '/reader/assets/build/screen.css',
        '/reader/config.json'
    ];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(url);
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .catch(function () {
                return fetch(event.request);
            })
            .then(function (response) {
                var fetchRequest;
console.log(response, event.request);
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