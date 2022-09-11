const CACHE_NAME = "V1_cache_portafolio_cv",
  urlsToCache = [
    "./",
    "./styles.css",
    "./app.js",
    "./script.js",
    "https://kit.fontawesome.com/0308592a26.js",
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Roboto&display=swap",
    "./assets/portfolio-img.jpeg",
    "./assets/icon/icon.png",
    "./assets/icon/icon_1024.png",
    "./assets/icon/icon_512.png",
    "./assets/icon/icon_384.png",
    "./assets/icon/icon_256.png",
    "./assets/icon/icon_192.png",
    "./assets/icon/icon_128.png",
    "./assets/icon/icon_96.png",
    "./assets/icon/icon_64.png",
    "./assets/icon/icon_32.png",
    "./assets/icon/favicon.png",
    "./assets/hobbies/hobby_gaming.jpg",
    "./assets/hobbies/hobby_gym.jpg",
    "./assets/hobbies/hobby_investments.jpg",
    "./assets/hobbies/hobby_sports.jpg",
    "./assets/experiencies/ik_exp.jpeg",
    "./assets/experiencies/tes_exp.jpeg",
    "./assets/projects/project_atlantida.png",
    "./assets/projects/project_calculator.png",
    "./assets/projects/project_checkout_page.png",
    "./assets/projects/project_color_flipper.png",
    "./assets/projects/project_counter.png",
    "./assets/projects/project_drumpad.png",
    "./assets/projects/project_edie_homepage.png",
    "./assets/projects/project_gallery.png",
    "./assets/projects/project_hogwarts.png",
    "./assets/projects/project_image_slider.png",
    "./assets/projects/project_interior_consultant.png",
    "./assets/projects/project_newyear_countdown.png",
    "./assets/projects/project_pomodoro.png",
    "./assets/projects/project_quotes.png",
    "./assets/projects/project_recipe_page.png",
    "./assets/projects/project_reviews_carousel.png",
    "./assets/projects/project_search_song.png",
    "./assets/projects/project_tabs.png",
    "./assets/projects/project_teampage.png",
    "./assets/projects/project_todolist.png",
    "./assets/projects/project_reusable_button.png",
    "./assets/projects/project_reusable_input.png",
    "./assets/projects/project_windbnb.png"
  ];

self.addEventListener("install", e => {
  // Abre el espacio nuevo de caché
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
      })
      .then(() => self.skipWaiting())
  )
  // .catch(err => console.log("Falló el registro de caché", err))
});

self.addEventListener("activate", e => {
  const cacheWhiteList = [CACHE_NAME];

  e.waitUntil(
    caches.keys()
      .then(cachesNames => {
        cachesNames.map(cacheName => {
          // Elimina lo que ya no se necesita en caché
          if (cacheWhiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      })
      // Indica al SW que active la caché actual
      .then(() => self.clients.claim())
  )
});

// Cuando el navegador recupera la conexión y recupera una URL
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          // Recupera del caché
          return res;
        }

        // Recupera la petición de la URL
        return fetch(e.request);
      })
  )
});