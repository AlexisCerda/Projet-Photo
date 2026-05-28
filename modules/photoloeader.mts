import { API, Photo, reponsePhoto } from "./config.mts";


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