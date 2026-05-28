export const API : string = "https://webetu.iutnc.univ-lorraine.fr/www/canals5/phox/api";
export interface Photo {
    id: number,
    titre: string,
    descr: string,
    format: string,
    size: number,
    width: number,
    height: number,
    url: {
      href : string
    },
}
export interface reponsePhoto {
  type : string,
  photo : Photo,
  links : {
    categorie : {
      href : string,
    },
    comments : {
      href : string,
    },
  },
}

export interface Comment {
  titre : string,
  content : string,
  pseudo : string,
  created_at : string,
}

export interface reponseComment {
  type :string,
  nombre : number,
  comments : Comment[],
}

export interface Categorie {
  id : number,
  nom :string,
  descr :string,
}

export interface reponseCategorie {
  type : String,
  count : number,
  categories : {
    categorie : Categorie,
    links : {
      photos : {
        href : string,
      }[];
    }
  }[],
}
