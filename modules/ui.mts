import { API_IMAGE, API_LOW, Photo, reponseCategorie, reponseComment, reponsePhoto, reponsePhotos, PhotoGalerie } from "./config.mts";
import Handlebars from "handlebars";
import { loadPicture, loadResource } from "./photoloeader.mts";
import { getCurrentGallery } from "./gallery.mts";

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
const prevButton = document.getElementById('prev');
const closeButton = document.getElementById('close');


// LIstener sur les boutons

closeButton?.addEventListener('click', closeLightbox);
prevButton?.addEventListener('click', prev);
nextButton?.addEventListener('click', next);

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

// Ouvrir l'interface de la lightbox

export function openLightbox() {
    init();

    if (currentPhoto === null) {
        return;
    }

    // On récupère la photo courante 
    const photo = currentPhoto.photo;
    console.log(API_IMAGE + currentPhoto.photo.url.href);
    img.src = API_IMAGE + photo.url.href;
    title.textContent = photo.titre;

    //On affiche
    lightbox.classList.remove("hidden");
}

function closeLightbox() {
    lightbox.classList.add("hidden");
}

async function next() {

// On augmente l'index et on va recharger la photo avec le bon id

    currentIndex += 1;
    const photo = currentGalerie?.photos[currentIndex]?.photo;
    if (!photo) return;

    currentPhoto = await loadPicture(photo.id);

    // On refresh l'interface

    refreshLightbox();
    updateButtons();
}

async function prev() {

    // On diminue l'index et on va recharger la photo avec le bon id

    currentIndex -= 1;
    const photo = currentGalerie?.photos[currentIndex]?.photo;
    if (!photo) return;

    currentPhoto = await loadPicture(photo.id);
    refreshLightbox();
    updateButtons();
}

export function setPhoto(rep: reponsePhoto) {

    // On set tous les attributs importants

    currentPhoto = rep;
    currentGalerie = getCurrentGallery();
    currentIndex = currentGalerie?.photos.findIndex((galerie) => galerie.photo.id === rep.photo.id) ?? 0;
    updateButtons();
}

function updateButtons() {
    if (currentGalerie !== null) {

    // Modifie l'affichage des boutons en fonction de l'index

        prevButton?.classList.toggle("hidden", currentIndex <= 0);
        nextButton?.classList.toggle("hidden", currentIndex >= currentGalerie.photos.length - 1) 
    }
}

function refreshLightbox() {
    if (currentPhoto !== null) {
        img.src = API_IMAGE + currentPhoto.photo.url.href;
        title.textContent = currentPhoto.photo.titre;
    }
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