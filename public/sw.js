const CACHE_NAME = "my-nextjs-cache-v1";

// Pre-cache only static assets we know exist
const urlsToCache = [
   "/about",
   "/images/team/ceo.webp",
   "/images/team/project-manager.webp",
   "/images/team/lead-developer.webp",
];
// Install event: Cache static assets, skip failures
self.addEventListener("install", (event) => {
   event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
         console.log("Opened cache");
         return Promise.all(
            urlsToCache.map((url) =>
               fetch(url)
                  .then((response) => {
                     if (!response.ok)
                        throw new Error(`Failed to fetch ${url}`);
                     return cache.put(url, response);
                  })
                  .catch((err) =>
                     console.warn(`Skipping ${url}: ${err.message}`)
                  )
            )
         );
      })
   );
});

// Fetch event: Cache /about and its assets, handle offline
self.addEventListener("fetch", (event) => {
   const requestUrl = event.request.url;
   const isAboutPage = requestUrl.includes("/about");
   const isCss = requestUrl.includes(".css");
   const isImage = /\.(jpg|jpeg|png|gif|webp)$/.test(requestUrl); // Original images
   const isOptimizedImage = requestUrl.includes("/_next/image"); // Next.js optimized images
   const isJs =
      requestUrl.includes(".js") && requestUrl.includes("_next/static");

   event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
         // Serve cached response if available
         if (cachedResponse) {
            return cachedResponse;
         }

         // Cache /about and its dependencies
         if (isAboutPage || isCss || isImage || isOptimizedImage || isJs) {
            return fetch(event.request)
               .then((networkResponse) => {
                  if (!networkResponse || networkResponse.status !== 200) {
                     return networkResponse;
                  }
                  return caches.open(CACHE_NAME).then((cache) => {
                     cache.put(event.request, networkResponse.clone());
                     return networkResponse;
                  });
               })
               .catch(() => {
                  // Offline: Fallback for navigation, placeholder for images
                  if (event.request.mode === "navigate") {
                     return new Response(
                        "<h1>You are offline</h1><p>Please check your internet connection and try again.</p>",
                        {
                           headers: { "Content-Type": "text/html" },
                           status: 503,
                        }
                     );
                  }
                  if (isOptimizedImage || isImage) {
                     // Return a placeholder image or error message
                     return new Response("Image unavailable offline", {
                        status: 503,
                        headers: { "Content-Type": "text/plain" },
                     });
                  }
                  return new Response("Resource unavailable offline", {
                     status: 503,
                     headers: { "Content-Type": "text/plain" },
                  });
               });
         }

         // Other requests: Fetch without caching
         return fetch(event.request).catch(() => {
            if (event.request.mode === "navigate") {
               return new Response(
                  "<h1>You are offline</h1><p>Please check your internet connection and try again.</p>",
                  {
                     headers: { "Content-Type": "text/html" },
                     status: 503,
                  }
               );
            }
            return new Response("Resource unavailable offline", {
               status: 503,
               headers: { "Content-Type": "text/plain" },
            });
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
