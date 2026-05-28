(() => {
  // modules/config.mts
  var API = "https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api";
  var API_IMAGE = "https://webetu.iutnc.univ-lorraine.fr/";

  // modules/photoloeader.mts
  async function loadResource(uri) {
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`Erreur ${response.status} sur ${uri}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur loadResource :", error);
      throw error;
    }
  }

  // modules/gallery.mts
  var currentGallery = null;
  var nextGallery = null;
  var prevGallery = null;
  async function load(uri) {
    const target = uri ?? `${API}/photos`;
    const galerie = await loadResource(target);
    currentGallery = galerie;
    const targetNext = currentGallery?.links?.next?.href ?? `${API}/photos`;
    nextGallery = await loadResource(targetNext);
    const targetPrev = currentGallery?.links?.prev?.href ?? `${API}/photos`;
    prevGallery = await loadResource(targetPrev);
    const targetFirst = currentGallery?.links?.first?.href ?? `${API}/photos`;
    prevGallery = await loadResource(targetFirst);
    const targetLast = currentGallery?.links?.last?.href ?? `${API}/photos`;
    prevGallery = await loadResource(targetLast);
    return galerie;
  }

  // modules/gallery_ui.mts
  function display_galerie(galerie) {
    const container = document.getElementById("gallery");
    if (!container) {
      console.error("Conteneur de galerie introuvable.");
      return;
    }
    container.innerHTML = "";
    const list = document.createElement("ul");
    list.className = "gallery-list";
    galerie.photos.forEach((item) => {
      const { photo } = item;
      const li = document.createElement("li");
      li.className = "gallery-item";
      li.dataset.photoId = String(photo.id);
      const img = document.createElement("img");
      img.src = API_IMAGE + photo.thumbnail.href;
      img.alt = photo.titre;
      img.loading = "lazy";
      const title = document.createElement("p");
      title.className = "gallery-title";
      title.textContent = photo.titre;
      li.append(img, title);
      list.appendChild(li);
    });
    container.appendChild(list);
  }

  // ts/index.ts
  var loadButton = document.getElementById("load-gallery");
  if (loadButton) {
    loadButton.addEventListener("click", async () => {
      try {
        const galerie = await load();
        display_galerie(galerie);
      } catch (error) {
        console.error("Impossible de charger la galerie.", error);
      }
    });
  } else {
    console.warn("Bouton de chargement introuvable.");
  }
})();
//# sourceMappingURL=index.js.map
