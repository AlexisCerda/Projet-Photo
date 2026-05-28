import Handlebars from "handlebars";
import { loadPicture } from "./photoloeader.mts";
import { Photo, reponsePhoto } from "./config.mts";

let mainSection = document.getElementById("photo");

async function afficherPhoto(idPicture: number) {
  const resphoto: reponsePhoto | undefined = await loadPicture(idPicture);
  const photo = resphoto?.photo;
  if (!photo && photo == undefined) {
    console.error(`Photo ${idPicture} introuvable.`);
    return;
  }

  const template1 = document.getElementById("template1")?.innerHTML;
  const template1Final = Handlebars.compile(template1);

  if (mainSection) {
    mainSection.innerHTML = template1Final({
      id: photo.id,
      url: photo.url,
      width: photo.width,
      height: photo.height,
      titre: photo.titre,
      descr: photo.descr,
      format: photo.format,
      size: photo.size,
      categorie: photo.categorie,
      comments: photo.comments,
      links: photo.links,
    });
  }
}
afficherPhoto(39);
//getPicture(window.location.hash ? window.location.hash.substr(1) : 105);
