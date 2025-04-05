const CACHE_NAME = "my-nextjs-cache-v1";
const urlsToCache = ["/about"]; // Pre-cache only /about

// Install event: Cache the /about page
self.addEventListener("install", (event) => {
   event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
         console.log("Opened cache");
         return cache.addAll(urlsToCache);
      })
   );
});

// Fetch event: Cache only /about and its CSS, with offline fallback
self.addEventListener("fetch", (event) => {
   const requestUrl = event.request.url;
   const isAboutPage = requestUrl.endsWith("/about");
   const isCss = requestUrl.includes(".css"); // Assuming Tailwind CSS is in a .css file

   event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
         // Serve cached response if available (only /about or its CSS should be cached)
         if (cachedResponse) {
            return cachedResponse;
         }

         // Only cache /about and its CSS
         if (isAboutPage || isCss) {
            return fetch(event.request)
               .then((networkResponse) => {
                  if (!networkResponse || networkResponse.status !== 200) {
                     return networkResponse;
                  }

                  // Cache /about or CSS
                  return caches.open(CACHE_NAME).then((cache) => {
                     cache.put(event.request, networkResponse.clone());
                     return networkResponse;
                  });
               })
               .catch(() => {
                  // Offline fallback for navigation requests
                  if (event.request.mode === "navigate") {
                     return new Response(
                        "<h1>You are offline</h1><p>Please check your internet connection and try again.</p><a href='/about'>Go to About page</a>",
                        {
                           headers: { "Content-Type": "text/html" },
                        }
                     );
                  }
               });
         }

         // For all other requests (e.g., home page), fetch without caching
         return fetch(event.request).catch(() => {
            // Offline fallback for navigation requests
            if (event.request.mode === "navigate") {
               return new Response(
                  "<h1>You are offline</h1><p>Please check your internet connection and try again.</p><a href='/about'>Go to About page</a>",
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
