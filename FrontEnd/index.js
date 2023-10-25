import { manageHomeGallery } from "./app/home.js";
import { manageLogin } from "./app/login.js";
import { createModal } from "./app/modal.js";

//Retrieve user id of the actual session
const userConnected = window.sessionStorage.getItem("userId");

//Find HTML Node
const editorMode = document.querySelector("[rel=js-editor-mode]");
const navLogout  = document.querySelector("[rel=js-logout]");
const navLogin   = document.querySelector("[rel=js-login]");
const btnModal   = document.querySelector("[rel=js-open-modal]");

// Control location to execute this part of code
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