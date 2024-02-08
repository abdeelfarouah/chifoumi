// Définissez la variable CACHE_NAME avant de l'utiliser
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
                // Vérifiez si la réponse est valide avant de mettre en cache
                if (!response || response.status !== 200 || response.type !== 'basic') {
                  throw new Error('Échec du téléchargement de la ressource: ' + url);
                }

                return cache.put(url, response);
              })
              .catch((error) => {
                console.error('Erreur lors du téléchargement de la ressource:', error);
                // Gestion des erreurs, peut être ignorée ou traitée selon les besoins
              });
          })
        );
      })
  );
});
