import { API_IMAGE, reponsePhotos } from "./config.mts";

export function display_galerie(galerie: reponsePhotos) {
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
    li.dataset.photoId = ""+photo.id;

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