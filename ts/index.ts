import { getCurrentGallery, load } from "../modules/gallery.mts";
import { display_galerie } from "../modules/gallery_ui.mts";
import { displayPicture } from "../modules/ui.mts";

const loadButton = document.getElementById("load-gallery");
const nextButton= document.getElementById("Nload-gallery");
const previousButton= document.getElementById("Pload-gallery");
const firstButton= document.getElementById("Fload-gallery");
const lastButton= document.getElementById("Lload-gallery");

if (loadButton) {
  loadButton.addEventListener("click", async () => {
    try {
      var galerie = getCurrentGallery();
      if (!galerie) {
        galerie = await load();
      }
      await display_galerie(galerie);      
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
        await display_galerie(newGalerie);
      } else {
        console.warn("Il n'y a pas de page suivante ou la galerie n'a pas encore été chargée initialement.");
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
        await display_galerie(newGalerie);
      } else {
        console.warn("Il n'y a pas de page précédente ou la galerie n'a pas encore été chargée initialement.");
      }
    } catch (error) {
      console.error("Impossible de charger la galerie précédente.", error);
    }
  });
} else {
  console.warn("Bouton de chargement précédent introuvable.");
}

if (firstButton) {
  firstButton.addEventListener("click", async () => {
    try {
      const current = getCurrentGallery();
      if (current && current.links?.first?.href) {
        const newGalerie = await load(current.links.first.href);
        await display_galerie(newGalerie);
      } else {
        console.warn("Il n'y a pas de première page ou la galerie n'a pas encore été chargée initialement.");
      }
    } catch (error) {
      console.error("Impossible de charger la première page.", error);
    }
  });
} else {
  console.warn("Bouton de chargement première page introuvable.");
}

if (lastButton) {
  lastButton.addEventListener("click", async () => {
    try {
      const current = getCurrentGallery();
      if (current && current.links?.last?.href) {
        const newGalerie = await load(current.links.last.href);
        await display_galerie(newGalerie);
      } else {
        console.warn("Il n'y a pas de dernière page ou la galerie n'a pas encore été chargée initialement.");
      }
    } catch (error) {
      console.error("Impossible de charger la dernière page.", error);
    }
  });
} else {
  console.warn("Bouton de chargement dernière page introuvable.");
}

