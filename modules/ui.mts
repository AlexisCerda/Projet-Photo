import { API_IMAGE, API_LOW, Photo, reponseCategorie, reponseComment, reponsePhoto, reponsePhotos } from "./config.mts";
import Handlebars from "handlebars";
import { loadResource } from "./photoloeader.mts";

// Liste des données dont j'ai besoin pour la lightbox

let currentData: any = {};
let currentPhoto: reponsePhoto | null = null;
let currentIndex: number = 0;
let currentGalerie: reponsePhotos | null = null;

// LIste des éléments html

let lightbox!: HTMLElement;
let img!: HTMLImageElement;
let title!: HTMLElement;

// Boutons de la lighBox

const nextButton = document.getElementById('next');
const prevButton = document.getElementById('next');
const closeButton = document.getElementById('next');


// LIstener sur les boutons

closeButton?.addEventListener('click', closeLightbox);
prevButton?.addEventListener('click', prev);
nextButton?.addEventListener('click',next);

// Fonction d'initialisation qui va récupérer les éléments html

function init() {
     lightbox = document.getElementById("lightbox")!;
     img = document.getElementById("lightbox-img") as HTMLImageElement;
     title = document.getElementById("lb-title")!;
}

function updateHTML() {
    const template1 = document.getElementById("photoTemplate")?.innerHTML;
    if (!template1 || template1 === undefined) {
        return;
    }

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
        url: API_IMAGE + photo.url.href,
        titre: photo.titre,
    };

    updateHTML();
}


export function openLightbox(){
    init();

    if (currentPhoto === null){
        return; 
    } 

    const photo = currentPhoto.photo;
    console.log( API_IMAGE + currentPhoto.photo.url.href);
    img.src = API_IMAGE + photo.url.href;
    title.textContent = photo.titre;
    lightbox.classList.remove("hidden");
}

function closeLightbox() {
    lightbox.classList.add("hidden");
}

async function next() {
    currentIndex += 1;
    currentPhoto = currentGalerie?.photos[currentIndex].photo;
}

async function prev() {
    currentIndex -= 1;
    currentPhoto = currentGalerie?.photos[currentIndex].photo;
}

export function setPhoto(rep : reponsePhoto){
    currentPhoto = rep;
    currentIndex = currentGalerie?.photos.findIndex((galerie) => galerie.photo.id = galerie.photo.id) ?? 0;
}

// Fonctions maintenant inutiles

export async function displayCateg(repPhoto: reponsePhoto) {
    //const categ = await loadResource(API_LOW + repPhoto.links.categorie.href);
    //currentData.categorie = categ.categorie;
    //updateHTML();
}

export async function displayComment(repPhoto: reponsePhoto) {
    //const comment = await loadResource(API_LOW + repPhoto.links.comments.href);
    //currentData.comments = comment.comments;
    //updateHTML();
}