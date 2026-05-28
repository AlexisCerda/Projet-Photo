import { API, reponsePhotos } from "./config.mts";
import { loadResource } from "./photoloeader.mts";

let currentGallery: reponsePhotos | null = null;

export async function load(uri?: string): Promise<reponsePhotos> {
  const target = uri ?? `${API}/photos`;
  const galerie = await loadResource<reponsePhotos>(target);
  currentGallery = galerie;
  return galerie;
}

export function getCurrentGallery(): reponsePhotos | null {
  return currentGallery;
}
