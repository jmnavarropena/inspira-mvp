const CACHE_NAME = "inspira-cl-v1.0.0";
const STATIC_CACHE_URLS = [
  "/",
  "/manifest.json",
  "/logo_inspira2.png",
  "/logo_cl_grupo.png",
  "/logo_globo_bg.png",
];

// Instalación del Service Worker
self.addEventListener("install", (event) => {
  console.log("Service Worker: Instalando...");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Service Worker: Cacheando archivos estáticos");
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .catch((error) => {
        console.error("Error al cachear archivos:", error);
      })
  );
  self.skipWaiting();
});

// Activación del Service Worker
self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activando...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(
              "Service Worker: Eliminando caché obsoleta:",
              cacheName
            );
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Estrategia de fetch - Network First con fallback a cache
self.addEventListener("fetch", (event) => {
  // Solo manejar requests HTTP/HTTPS
  if (!event.request.url.startsWith("http")) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, clonamos y guardamos en caché
        if (response.status === 200) {
          const responseClone = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            // Solo cachear GET requests
            if (event.request.method === "GET") {
              cache.put(event.request, responseClone);
            }
          });
        }
        return response;
      })
      .catch(() => {
        // Si falla la red, intentamos servir desde caché
        return caches.match(event.request).then((response) => {
          if (response) {
            return response;
          }

          // Si es una navegación y no tenemos caché, mostrar página offline
          if (event.request.mode === "navigate") {
            return (
              caches.match("/") ||
              new Response(
                `
              <!DOCTYPE html>
              <html lang="es">
                <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Inspira CL - Sin Conexión</title>
                  <style>
                    body {
                      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      min-height: 100vh;
                      margin: 0;
                      background: linear-gradient(135deg, #0B1426 0%, #1E3A8A 100%);
                      color: white;
                      text-align: center;
                      padding: 20px;
                    }
                    .offline-container {
                      max-width: 400px;
                      padding: 40px 20px;
                      border-radius: 12px;
                      background: rgba(255, 255, 255, 0.1);
                      backdrop-filter: blur(10px);
                    }
                    .offline-icon {
                      font-size: 64px;
                      margin-bottom: 20px;
                    }
                    h1 {
                      font-size: 24px;
                      margin-bottom: 16px;
                      color: #3B82F6;
                    }
                    p {
                      font-size: 16px;
                      line-height: 1.5;
                      opacity: 0.9;
                      margin-bottom: 20px;
                    }
                    .retry-btn {
                      background: #3B82F6;
                      color: white;
                      border: none;
                      padding: 12px 24px;
                      border-radius: 8px;
                      font-size: 16px;
                      cursor: pointer;
                      transition: background 0.3s;
                    }
                    .retry-btn:hover {
                      background: #2563EB;
                    }
                  </style>
                </head>
                <body>
                  <div class="offline-container">
                    <div class="offline-icon">📡</div>
                    <h1>Sin Conexión</h1>
                    <p>No pudimos conectar con Inspira CL. Por favor, verifica tu conexión a internet e inténtalo de nuevo.</p>
                    <button class="retry-btn" onclick="window.location.reload()">
                      Reintentar
                    </button>
                  </div>
                </body>
              </html>
            `,
                {
                  headers: { "Content-Type": "text/html" },
                }
              )
            );
          }

          return new Response("Sin conexión", {
            status: 503,
            statusText: "Service Unavailable",
          });
        });
      })
  );
});

// Manejo de mensajes desde la aplicación
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Notificaciones push (para futuras implementaciones)
self.addEventListener("push", (event) => {
  const options = {
    body: event.data ? event.data.text() : "Nueva notificación de Inspira CL",
    icon: "/logo_inspira2.png",
    badge: "/logo_inspira2.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    actions: [
      {
        action: "explore",
        title: "Ver Detalles",
        icon: "/logo_inspira2.png",
      },
      {
        action: "close",
        title: "Cerrar",
        icon: "/logo_inspira2.png",
      },
    ],
  };

  event.waitUntil(self.registration.showNotification("Inspira CL", options));
});

// Manejo de clicks en notificaciones
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  if (event.action === "explore") {
    event.waitUntil(self.clients.openWindow("/"));
  }
});
