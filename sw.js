const CACHE_NAME = 'my-cache-v1';
const urlsToCache = [
  '/',
  '/chifoumi/rock.jpg',
  '/chifoumi/scissors.png',
  '/chifoumi/app.js',
  '/chifoumi/paper.png',
  '/chifoumi/style.css'
];

self.addEventListener('install', (event) => {
  // Installation du service worker et mise en cache des ressources statiques
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  // Intercepte les requêtes réseau
  event.respondWith(
    // Vérifie si la ressource est en cache
    caches.match(event.request)
      .then((cachedResponse) => {
        // Si la ressource est en cache, la renvoie
        if (cachedResponse) {
          return cachedResponse;
        }

        // Sinon, effectue la requête réseau et met à jour le cache
        return fetch(event.request)
          .then((response) => {
            // Vérifie si la réponse est valide
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Met à jour le cache avec la nouvelle réponse
            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(event.request, responseToCache));

            return response;
          });
      })
  );
});

self.addEventListener('activate', (event) => {
  // Supprime les anciens caches lorsqu'une nouvelle version est activée
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          })
        );
      })
  );
});
