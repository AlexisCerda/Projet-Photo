import { API_IMAGE, Photo, reponsePhoto, reponsePhotos } from "./config.mts";
import { loadPicture } from "./photoloeader.mts";
import { displayCateg, displayComment, displayPicture, openLightbox, setPhoto } from "./ui.mts";

export async function display_galerie(galerie: reponsePhotos) {
  const container = document.getElementById("gallery");
  if (!container) {
    console.error("Conteneur de galerie introuvable.");
    return;
  }

  container.innerHTML = "";

  const list = document.createElement("ul");
  list.className = "gallery-list";

    await Promise.all(
    galerie.photos.map(async (item) => {
      const photo = item.photo;

      const li = document.createElement("li");
      li.className = "gallery-item";
      li.dataset.photoId = String(photo.id);

      const img = document.createElement("img");
      img.className = "images";
      img.src = API_IMAGE + photo.thumbnail.href;
      img.alt = photo.titre;

     

      img.addEventListener("click", async () => {
        const resphoto = await loadPicture(photo.id);
        setPhoto(resphoto);
        openLightbox();
      });

      li.append(img);
      list.appendChild(li);
    })
  );

  container.appendChild(list);
}