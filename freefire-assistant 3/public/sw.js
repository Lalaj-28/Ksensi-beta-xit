// Service Worker para PWA - Permite que la app funcione como nativa
const CACHE_NAME = "freefire-assistant-v1"
const urlsToCache = ["/", "/manifest.json", "/icon-192.jpg", "/icon-512.jpg"]

// Instalar service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[SW] Opened cache")
      return cache.addAll(urlsToCache)
    }),
  )
})

// Activar service worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log("[SW] Deleting old cache:", cacheName)
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
})

// Interceptar peticiones
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request)
    }),
  )
})

// Manejar deep links de Free Fire
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "LAUNCH_FREEFIRE") {
    const deepLink = event.data.deepLink || "com.dts.freefireth://"
    clients.matchAll({ type: "window" }).then((clientList) => {
      if (clientList.length > 0) {
        clientList[0].postMessage({
          type: "OPEN_DEEPLINK",
          url: deepLink,
        })
      }
    })
  }
})
