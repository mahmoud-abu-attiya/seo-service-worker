const CACHE_NAME = "my-nextjs-cache-v1";

// Pre-cache /about and specific images
const urlsToCache = [
   "/about",
   "/images/team/ceo.webp",
   "/images/team/project-manager.webp",
   "/images/team/lead-developer.webp",
];

// Install event: Cache /about and images
self.addEventListener("install", (event) => {
   event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
         console.log("Opened cache");
         return cache.addAll(urlsToCache);
      })
   );
});

// Fetch event: Cache /about, its CSS, and images, with offline fallback
self.addEventListener("fetch", (event) => {
   const requestUrl = event.request.url;
   const isAboutPage = requestUrl.endsWith("/about");
   const isCss = requestUrl.includes(".css");
   const isImage = /\.(jpg|jpeg|png|gif|webp)$/.test(requestUrl); // Match common image extensions

   event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
         // Serve cached response if available
         if (cachedResponse) {
            return cachedResponse;
         }

         // Only cache /about, its CSS, and images
         if (isAboutPage || isCss || isImage) {
            return fetch(event.request)
               .then((networkResponse) => {
                  if (!networkResponse || networkResponse.status !== 200) {
                     return networkResponse;
                  }

                  // Cache /about, CSS, or images
                  return caches.open(CACHE_NAME).then((cache) => {
                     cache.put(event.request, networkResponse.clone());
                     return networkResponse;
                  });
               })
               .catch(() => {
                  // Offline fallback for navigation requests
                  if (event.request.mode === "navigate") {
                     return new Response(
                        "<h1>You are offline</h1><p>Please check your internet connection and try again.</p>",
                        {
                           headers: { "Content-Type": "text/html" },
                        }
                     );
                  }
               });
         }

         // For all other requests (e.g., home page), fetch without caching
         return fetch(event.request).catch(() => {
            if (event.request.mode === "navigate") {
               return new Response(
                  "<h1>You are offline</h1><p>Please check your internet connection and try again.</p>",
                  {
                     headers: { "Content-Type": "text/html" },
                  }
               );
            }
         });
      })
   );
});

// Activate event: Clean up old caches
self.addEventListener("activate", (event) => {
   const cacheWhitelist = [CACHE_NAME];
   event.waitUntil(
      caches.keys().then((cacheNames) =>
         Promise.all(
            cacheNames.map((cacheName) => {
               if (!cacheWhitelist.includes(cacheName)) {
                  return caches.delete(cacheName);
               }
            })
         )
      )
   );
});
