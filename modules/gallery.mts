import { API, reponsePhotos } from "./config.mts";
import { loadResource } from "./photoloeader.mts";

let currentGallery: reponsePhotos | null = null;
let nextGallery: reponsePhotos | null = null;
let prevGallery: reponsePhotos | null = null;
let firstGallery: reponsePhotos | null = null;
let lastGallery: reponsePhotos | null = null;


export async function load(uri?: string): Promise<reponsePhotos> {
  const target = uri ?? `${API}/photos`;
  const galerie = await loadResource<reponsePhotos>(target);
  currentGallery = galerie;

  const targetNext = currentGallery?.links?.next?.href ?? `${API}/photos`;
  nextGallery = await loadResource<reponsePhotos>(targetNext);

  const targetPrev = currentGallery?.links?.prev?.href ?? `${API}/photos`;
  prevGallery = await loadResource<reponsePhotos>(targetPrev);

  const targetFirst = currentGallery?.links?.first?.href ?? `${API}/photos`;
  prevGallery = await loadResource<reponsePhotos>(targetFirst);
  
  const targetLast = currentGallery?.links?.last?.href ?? `${API}/photos`;
  prevGallery = await loadResource<reponsePhotos>(targetLast);

  return galerie;
}

export function getCurrentGallery(): reponsePhotos | null {
  return currentGallery;
}

export function getNextGallery(): reponsePhotos | null {
  return nextGallery;
}

export function getPreviousGallery(): reponsePhotos | null {
  return prevGallery;
}

export function getFirstGallery(): reponsePhotos | null {
  return prevGallery;
}

export function getLastGallery(): reponsePhotos | null {
  return prevGallery;
}
