import Handlebars from "handlebars";
import { loadPicture, Photo } from "./photoloeader.mts";

 let mainSection = document.getElementById("la_photo");

async function afficherPhoto(idPicture : number){
    const photo : Photo = loadPicture(2);

    const template1 = document.getElementById('template1')?.innerHTML;
    const template1Final = Handlebars.compile(template1);

    if (mainSection) {
                mainSection.innerHTML = template1FInal({
                    name: books[i].name,
                    isbn: books[i].isbn,
                    authors: books[i].authors.join(", "),
                    numberOfPages: books[i].numberOfPages,
                    characters: books[i].characters.length,
                    topCharacters: books[i].characters.slice(0, 10)
                });
            }
   
}



//getPicture(window.location.hash ? window.location.hash.substr(1) : 105);
