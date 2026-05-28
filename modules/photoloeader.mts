import { API, reponsePhoto } from "./config.mts";


export async function loadPicture(idPicture: number): Promise<reponsePhoto>{
    try {
        const response = await fetch(API + `/photos/${idPicture}`, { credentials: 'include' });
        const pictures: reponsePhoto = await response.json();
        console.log(pictures);
        return pictures;
    } catch (err: any) {
        console.log(err.message);
        // pour ne pas rien renvoyer
        throw err;
    }

}   

export async function loadResource<T = any>(uri: string): Promise<T> {
  try {
    const response = await fetch(uri);

    if (!response.ok) {
      throw new Error(`Erreur sur ${uri}`);
    }

    const data: T = await response.json();
    return data;

  } catch (err: any) {
        console.log(err.message);
         // pour ne pas rien renvoyer
        throw err;
        
    }
}                                                                                                                                                                                                    

