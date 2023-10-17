import { manageHomeGallery } from "./app/home.js";
import { manageLogin } from "./app/login.js";
import { manageModal } from "./app/modal.js";

//Retrive user id of the actual session
const userConnected = window.sessionStorage.getItem("userId");

//Find HTML Node
const editorMode = document.querySelector("[rel=js-editor-mode]");
const navLogout = document.querySelector("[rel=js-logout]");
const navLogin = document.querySelector("[rel=js-login]");
const filterBar = document.querySelector("[rel=js-projects-filter]");
const btnModal = document.querySelector("[rel=js-open-modal]");
const modalGallery = document.querySelector("[rel=js-modal-gallery]");

if (window.location.pathname.includes('/login.html')){
  manageLogin();
} else 
  {manageHomeGallery();
    
  // Modify content if user is connected
  if (userConnected !== null) {
    editorMode.style.display = "flex";
    navLogout.style.display = "contents";
    navLogin.style.display = "none";
    manageModal();
  } else btnModal.style.display = "none";
  }


/* ---------- Question ------------
 
  Comment faire un refresh propre des galleries principal & modal sans appeler les fcts de création?

  Git pull comment ça fonctionne exactement car je l'utilise de manière très simple 
    pour récup mes modifs entre mes 2 pc mais j'ai vu qu'il y avait plein de commande possible.

  Vérifier la fonction de la preview d'image je suis pas sûr d'avoir utiliser la bonne méthode

  Vérifier la méthode de fonctionnement de la modal
  
  Vérifier l'appel de la fonction de refresh

*/