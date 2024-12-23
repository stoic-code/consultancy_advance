const CACHE_NAME = "assets-cache-v1";
const urlsToCache = [
  "/hero1.webp",
  "/hero2.webp",
  "/hero3.webp",
  "/hero4.webp",
  "/logo.svg",
  "/home/section2-bg.svg",
  "/home/section2-front.webp",
  "/start-journey/rocket.svg",
  "/for-instutions/hero-img.webp",
  "/for-instutions/hero-bg.webp",
  "/for-instutions/how-it-works.svg",
  "/for-students/hero-bg.webp",
  "/for-students/hero-img.webp",
  "/for-partners/hero-bg.svg",
  "/for-partners/hero-img.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      // Not found in cache - fetch and cache
      return fetch(event.request).then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // Clone the response since it's a stream and can only be consumed once
        const responseToCache = response.clone();

        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return response;
      });
    }),
  );
});

// Function to periodically check for updates and revalidate the cache
function checkForUpdates() {
  setInterval(
    () => {
      caches.open(CACHE_NAME).then((cache) => {
        cache.keys().then((keys) => {
          keys.forEach((key) => {
            fetch(key).then((response) => {
              if (response.status === 200) {
                cache.put(key, response);
              }
            });
          });
        });
      });
    },
    0.5 * 60 * 60 * 1000,
  ); // Check for updates once every 30 mins
}

// Call the function to start checking for updates
checkForUpdates();
