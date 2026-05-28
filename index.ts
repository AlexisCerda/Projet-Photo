import Handlebars from "handlebars";
import { loadPicture, Photo } from "./photoloeader.mts";

 let mainSection = document.getElementById("la_photo");

async function afficherPhoto(idPicture : number){
    const photo = await loadPicture(idPicture);
    
    if (!photo) {
        console.error(`Photo ${idPicture} introuvable.`);
        return;
    }

    const template1 = document.getElementById('template1')?.innerHTML;
    const template1Final = Handlebars.compile(template1);

    if (mainSection) {
                mainSection.innerHTML = template1Final({
                    id: photo.id,
                    url: photo.url,
                    width : photo.width,
                    height: photo.height,
                    titre: photo.titre,
                    descr: photo.descr,
                    format: photo.format,
                    size : photo.size,
                    categorie: photo.categorie,
                    comments : photo.comments,
                    links : photo.links,
                });
            }
   
}



//getPicture(window.location.hash ? window.location.hash.substr(1) : 105);
