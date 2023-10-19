import { manageHomeGallery } from "./app/home.js";
import { manageLogin } from "./app/login.js";
import { createModal } from "./app/modal.js";

//Retrieve user id of the actual session
const userConnected = window.sessionStorage.getItem("userId");

//Find HTML Node
const editorMode = document.querySelector("[rel=js-editor-mode]");
const navLogout = document.querySelector("[rel=js-logout]");
const navLogin = document.querySelector("[rel=js-login]");
const btnModal = document.querySelector("[rel=js-open-modal]");

if (window.location.pathname.includes('/login.html')){
  manageLogin();
} else 
  {
    manageHomeGallery();
    // Modify content if user is connected
    if (userConnected !== null) {
      editorMode.style.display = "flex";
      navLogout.style.display = "contents";
      navLogin.style.display = "none";
      createModal();
    } else btnModal.style.display = "none";
  }


// TODO : Récup cours Github https://github.com/support-de-cours/SE23-178498
// https://www.notion.so/osw3/JavaScript-0b15b877f4474ab886c56433391b93e3?pvs=4
// fonction closest
// Chaine https://www.youtube.com/@DevTheory
// https://www.youtube.com/@JamesQQuick
// https://www.youtube.com/@AniaKubow
// Notions

