import { API_IMAGE, API_LOW, Photo, reponseCategorie, reponseComment, reponsePhoto } from "./config.mts";
import Handlebars from "handlebars";

let mainSection = document.getElementById("photo");

export async function displayPicture(repPhoto: reponsePhoto) {

    const photo = repPhoto?.photo;
    if (!photo && photo == undefined) {
        console.error(`Photo introuvable.`);
        return;
    }

    const template1 = document.getElementById("template1")?.innerHTML;
    const template1Final = Handlebars.compile(template1);

    if (mainSection) {

        const repComment = await fetch(API_LOW + repPhoto.links.comments.href);
        const comment: reponseComment = await repComment.json();

        const repCategorie = await fetch(API_LOW + repPhoto.links.categorie.href);
        const categ: reponseCategorie = await repCategorie.json();

        console.log(categ.categorie);

        mainSection.innerHTML = template1Final({
            id: photo.id,
            url: API_IMAGE + photo.url.href,
            width: photo.width,
            height: photo.height,
            titre: photo.titre,
            descr: photo.descr,
            format: photo.format,
            size: photo.size,
            links: API_LOW + repPhoto.links.categorie.href,

            categorie: categ.categorie,
            comments: comment.comments,
        });
    }

    window.location.hash = "" + photo.id;

}