import { API, API_LOW, reponsePhotos } from "./config.mts";
import { loadResource } from "./photoloeader.mts";

let currentGallery: reponsePhotos | null = null;

function buildUrl(href?: string): string {
    if (!href) return `${API}/photos`;
    if (href.startsWith('http')) return href;
    return `${API_LOW}${href}`;
}

export async function load(uri?: string): Promise<reponsePhotos> {
  const target = buildUrl(uri);
  const galerie = await loadResource<reponsePhotos>(target);
  currentGallery = galerie;

  return galerie;
}

export function getCurrentGallery(): reponsePhotos | null {
  return currentGallery;
}
