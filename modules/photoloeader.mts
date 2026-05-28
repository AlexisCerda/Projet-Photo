import { API, reponsePhoto } from "./config.mts";


export async function loadPicture(idPicture: number) {
    try {
        const response = await fetch(API + `/photos/${idPicture}`, { credentials: 'include' });
        const pictures: reponsePhoto = await response.json();
        console.log(pictures);
        return pictures;
    } catch (err: any) {
        console.log(err.message);
    }

}   

export async function loadResource<T = any>(uri: string): Promise<T> {
  try {
    const response = await fetch(uri);

    if (!response.ok) {
      throw new Error(`Erreur ${response.status} sur ${uri}`);
    }

    const data: T = await response.json();
    return data;

  } catch (error) {
    console.error("Erreur loadResource :", error);
    throw error;
  }
}                                                                                                                                                                                                    

