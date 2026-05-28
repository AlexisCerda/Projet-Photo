export const API : string = "https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api";
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
export interface reponsePhoto {
  type : string,
  photo : Photo,
  links : string,
}