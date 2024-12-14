const CACHE_NAME = 'my-cache-v2';
const urlsToCache = [
  '/',
  'rock.jpg',
  'scissors.png',
  'app.js',
  'paper.png',
  'style.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return Promise.all(
          urlsToCache.map((url) => {
            return fetch(url)
              .then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                  console.warn(`Ressource ignorée ou invalide : ${url}`);
                  return null; // Continue même si la ressource est invalide
                }
                return cache.put(url, response.clone()); // Clone la réponse avant de la mettre en cache
              })
              .catch((error) => {
                console.error(`Erreur lors de la récupération de ${url}:`, error);
              });
          })
        );
      })
      .then(() => {
        console.log('Toutes les ressources valides ont été mises en cache.');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ouverture du cache:', error);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Renvoie la ressource en cache si disponible, sinon la récupère sur le réseau
        return response || fetch(event.request).catch(() => {
          // Fournissez un fallback en cas d'échec (ex. : une page ou une image par défaut)
          if (event.request.destination === 'image') {
            return caches.match('/fallback-image.png'); // Assurez-vous que cette ressource existe
          }
          return caches.match('/offline.html'); // Une page de fallback pour les erreurs
        });
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              console.log(`Suppression de l'ancien cache : ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});
