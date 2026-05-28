const API = "https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api";

 export interface Photo {
        id: string,
        titre: string,
        file: string,
        thumbnail: string,
        original: string,
        links: string,
    }


export async function loadPicture(idPicture: number) {
    try {
        const response = await fetch(API + `/photos/${idPicture}`, { credentials: 'include' });
        const pictures: Photo = await response.json();
        return pictures;
    } catch (err: any) {
        console.log(err.message);
    }




}