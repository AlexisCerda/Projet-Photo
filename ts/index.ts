
import { loadPicture } from "../modules/photoloeader.mts";
import { Photo, reponsePhoto } from "../modules/config.mts";
import { displayCateg, displayComment, displayPicture } from "../modules/ui.mts";



async function getPicture(idPicture: number) {
  const resphoto: reponsePhoto | undefined = await loadPicture(idPicture);
  
  if(resphoto !== undefined){
    displayPicture(resphoto);
    displayCateg(resphoto);
    displayComment(resphoto);
  }else{
     console.error(`Photo introuvable.`);
      return;
  } 
}

getPicture(105);
//getPicture(window.location.hash ? window.location.hash.substr(1) : 105);
