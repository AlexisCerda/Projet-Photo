import { API_IMAGE, API_LOW, Photo, reponseCategorie, reponseComment, reponsePhoto } from "./config.mts";
import Handlebars from "handlebars";
import { loadResource } from "./photoloeader.mts";

let currentData: any = {};

function updateHTML() {
    const template1 = document.getElementById("template1")?.innerHTML;
    if (!template1) return;
    const template1Final = Handlebars.compile(template1);
    let mainSection = document.getElementById("photo");
    if (mainSection) {
        mainSection.innerHTML = template1Final(currentData);
    }
}

export async function displayPicture(repPhoto: reponsePhoto) {
    const photo = repPhoto?.photo;
    if (!photo) {
        console.error(`Photo introuvable.`);
        return;
    }

    currentData = {
        ...currentData,
        id: photo.id,
        url: API_IMAGE + photo.url.href,
        width: photo.width,
        height: photo.height,
        titre: photo.titre,
        descr: photo.descr,
        format: photo.format,
        size: photo.size,
    };

    updateHTML();
}

export async function displayCateg(repPhoto: reponsePhoto) {
    if (!repPhoto?.links?.categorie?.href) return;

    const repCategorie = await fetch(API_LOW + repPhoto.links.categorie.href);
    const categ: reponseCategorie = await repCategorie.json();

    currentData.categorie = categ.categorie;
    updateHTML();
}

export async function displayComment(repPhoto: reponsePhoto) {
    if (!repPhoto?.links?.comments?.href) return;

    const comment = await loadResource(API_LOW + repPhoto.links.comments.href);

    currentData.comments = comment.comments;
    updateHTML();
}