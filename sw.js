self.addEventListener('install', (e) => {

    console.log('[Service Worker] Install');
    var cacheName = 'ginko-v1';

    var contentToCache = [
        'index.html',
        // '/app.js',
        // '/style.css',
        // '/favicon.ico',
        // '/icons/icon-32.png',
        // '/icons/icon-64.png',
        // '/icons/icon-96.png',
        // '/icons/icon-128.png',
        // '/icons/icon-168.png',
        // '/icons/icon-180.png',
        // '/icons/icon-192.png',
        // '/icons/icon-256.png',
        // '/icons/icon-512.png',
        // '/icons/maskable_icon.png'
    ];

    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(contentToCache);
        })
    );

});





self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((r) => {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
            return r || fetch(e.request).then((response) => {
                return caches.open(cacheName).then((cache) => {
                    console.log('[Service Worker] Caching new resource: '+e.request.url);
                    cache.put(e.request, response.clone());
                    return response;
                });
            });
        })
    );
});