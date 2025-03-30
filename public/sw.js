const CACHE_NAME = "site-cache-v1";
const urlsToCache = [
   "/",
   "/about",
   "/images/home.avif",
   "/images/team/ceo.webp",
   "/images/team/project-manager.webp",
   "/images/team/lead-developer.webp",
];

self.addEventListener("install", (event) => {
   event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
         return cache.addAll(urlsToCache);
      })
   );
});

self.addEventListener("fetch", (event) => {
   event.respondWith(
      caches.match(event.request).then((response) => {
         if (response) {
            return response;
         }
         return fetch(event.request).catch(() => {
            return new Response(
               '<div style="text-align: center; padding: 20px; font-family: Arial;"><h1>Oops, You’re Offline!</h1><p>Please check your connection and try again.</p></div>',
               {
                  headers: { "Content-Type": "text/html" },
               }
            );
         });
      })
   );
});

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
