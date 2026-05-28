const API = "https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api";

export interface Photo {
    id: number,
    titre: string,
    descr: string,
    format: string,
    size: number,
    width: number,
    height: number,
    url: string,
    links: string,
    categorie: string,
    comments: string,
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