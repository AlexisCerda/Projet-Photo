import { API, API_LOW, reponsePhotos } from "./config.mts";
import { loadResource } from "./photoloeader.mts";

let currentGallery: reponsePhotos | null = null;
let nextGallery: reponsePhotos | null = null;
let prevGallery: reponsePhotos | null = null;
let firstGallery: reponsePhotos | null = null;
let lastGallery: reponsePhotos | null = null;

function buildUrl(href?: string): string {
    if (!href) return `${API}/photos`;
    if (href.startsWith('http')) return href;
    return `${API_LOW}${href}`;
}

export async function load(uri?: string): Promise<reponsePhotos> {
  const target = uri ?? `${API}/photos`;
  const galerie = await loadResource<reponsePhotos>(target);
  currentGallery = galerie;

  const targetNext = buildUrl(currentGallery?.links?.next?.href);
  nextGallery = await loadResource<reponsePhotos>(targetNext);

  const targetPrev = buildUrl(currentGallery?.links?.prev?.href);
  prevGallery = await loadResource<reponsePhotos>(targetPrev);

  const targetFirst = buildUrl(currentGallery?.links?.first?.href);
  firstGallery = await loadResource<reponsePhotos>(targetFirst);
  
  const targetLast = buildUrl(currentGallery?.links?.last?.href);
  lastGallery = await loadResource<reponsePhotos>(targetLast);

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
  return firstGallery;
}

export function getLastGallery(): reponsePhotos | null {
  return lastGallery;
}
