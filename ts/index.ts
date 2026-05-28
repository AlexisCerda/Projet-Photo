
import { load } from "../modules/gallery.mts";
import { display_galerie } from "../modules/gallery_ui.mts";

const loadButton = document.getElementById("load-gallery");

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
