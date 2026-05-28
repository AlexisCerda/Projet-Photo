(() => {
  // modules/config.mts
  var API = "https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api";
  var API_LOW = "https://webetu.iutnc.univ-lorraine.fr";
  var API_IMAGE = "https://webetu.iutnc.univ-lorraine.fr/";

  // modules/photoloeader.mts
  async function loadResource(uri) {
    try {
      const response = await fetch(uri);
      if (!response.ok) {
        throw new Error(`Erreur sur ${uri}`);
      }
      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err.message);
      throw err;
    }
  }

  // modules/gallery.mts
  var currentGallery = null;
  function buildUrl(href) {
    if (!href) return `${API}/photos`;
    if (href.startsWith("http")) return href;
    return `${API_LOW}${href}`;
  }
  async function load(uri) {
    const target = buildUrl(uri);
    const galerie = await loadResource(target);
    currentGallery = galerie;
    return galerie;
  }
  function getCurrentGallery() {
    return currentGallery;
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
      const photo = item.photo;
      const li = document.createElement("li");
      li.className = "gallery-item";
      li.dataset.photoId = "" + photo.id;
      const img = document.createElement("img");
      img.src = API_IMAGE + photo.thumbnail.href;
      img.alt = photo.titre;
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
  var nextButton = document.getElementById("Nload-gallery");
  var previousButton = document.getElementById("Pload-gallery");
  var firstButton = document.getElementById("Fload-gallery");
  var lastButton = document.getElementById("Lload-gallery");
  if (loadButton) {
    loadButton.addEventListener("click", async () => {
      try {
        var galerie = getCurrentGallery();
        if (!galerie) {
          galerie = await load();
        }
        display_galerie(galerie);
      } catch (error) {
        console.error("Impossible de charger la galerie.", error);
      }
    });
  } else {
    console.warn("Bouton de chargement introuvable.");
  }
  if (nextButton) {
    nextButton.addEventListener("click", async () => {
      try {
        const current = getCurrentGallery();
        if (current && current.links?.next?.href) {
          const newGalerie = await load(current.links.next.href);
          display_galerie(newGalerie);
        } else {
          console.warn("Il n'y a pas de page suivante ou la galerie n'a pas encore \xE9t\xE9 charg\xE9e initialement.");
        }
      } catch (error) {
        console.error("Impossible de charger la galerie suivante.", error);
      }
    });
  } else {
    console.warn("Bouton de chargement suivant introuvable.");
  }
  if (previousButton) {
    previousButton.addEventListener("click", async () => {
      try {
        const current = getCurrentGallery();
        if (current && current.links?.prev?.href) {
          const newGalerie = await load(current.links.prev.href);
          display_galerie(newGalerie);
        } else {
          console.warn("Il n'y a pas de page pr\xE9c\xE9dente ou la galerie n'a pas encore \xE9t\xE9 charg\xE9e initialement.");
        }
      } catch (error) {
        console.error("Impossible de charger la galerie pr\xE9c\xE9dente.", error);
      }
    });
  } else {
    console.warn("Bouton de chargement pr\xE9c\xE9dent introuvable.");
  }
  if (firstButton) {
    firstButton.addEventListener("click", async () => {
      try {
        const current = getCurrentGallery();
        if (current && current.links?.first?.href) {
          const newGalerie = await load(current.links.first.href);
          display_galerie(newGalerie);
        } else {
          console.warn("Il n'y a pas de premi\xE8re page ou la galerie n'a pas encore \xE9t\xE9 charg\xE9e initialement.");
        }
      } catch (error) {
        console.error("Impossible de charger la premi\xE8re page.", error);
      }
    });
  } else {
    console.warn("Bouton de chargement premi\xE8re page introuvable.");
  }
  if (lastButton) {
    lastButton.addEventListener("click", async () => {
      try {
        const current = getCurrentGallery();
        if (current && current.links?.last?.href) {
          const newGalerie = await load(current.links.last.href);
          display_galerie(newGalerie);
        } else {
          console.warn("Il n'y a pas de derni\xE8re page ou la galerie n'a pas encore \xE9t\xE9 charg\xE9e initialement.");
        }
      } catch (error) {
        console.error("Impossible de charger la derni\xE8re page.", error);
      }
    });
  } else {
    console.warn("Bouton de chargement derni\xE8re page introuvable.");
  }
})();
//# sourceMappingURL=index.js.map
