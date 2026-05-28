import { API_IMAGE, API_LOW, Photo, reponseCategorie, reponseComment, reponsePhoto } from "./config.mts";
import Handlebars from "handlebars";


export async function displayPicture(repPhoto: reponsePhoto) {

    const photo = repPhoto?.photo;
    if (!photo && photo == undefined) {
        console.error(`Photo introuvable.`);
        return;
    }


    const template1 = document.getElementById("template1")?.innerHTML;
    const template1Final = Handlebars.compile(template1);
    let mainSection = document.getElementById("photo");

    if (mainSection) {

        mainSection.innerHTML = template1Final({
            id: photo.id,
            url: API_IMAGE + photo.url.href,
            width: photo.width,
            height: photo.height,
            titre: photo.titre,
            descr: photo.descr,
            format: photo.format,
            size: photo.size,
        });
    }

}

export async function displayCateg(repPhoto: reponsePhoto) {

    const photo = repPhoto?.photo;
    if (!photo && photo == undefined) {
        console.error(`Photo introuvable.`);
        return;
    }


    const template1 = document.getElementById("template1")?.innerHTML;
    const template1Final = Handlebars.compile(template1);
    let mainSection = document.getElementById("photo");

    if (mainSection) {

        const repCategorie = await fetch(API_LOW + repPhoto.links.categorie.href);
        const categ: reponseCategorie = await repCategorie.json();

        mainSection.innerHTML = template1Final({
            categorie: categ.categorie,
        });
    }

}

export async function displayComment(repPhoto: reponsePhoto) {

    const photo = repPhoto?.photo;
    if (!photo && photo == undefined) {
        console.error(`Photo introuvable.`);
        return;
    }


    const template1 = document.getElementById("template1")?.innerHTML;
    const template1Final = Handlebars.compile(template1);
    let mainSection = document.getElementById("photo");

    if (mainSection) {

        const repComment = await fetch(API_LOW + repPhoto.links.comments.href);
        const comment: reponseComment = await repComment.json();

        mainSection.innerHTML = template1Final({
            comment: comment.comments,
        });
    }

}