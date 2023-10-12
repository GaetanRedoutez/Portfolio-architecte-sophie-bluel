import { manageHomeGallery } from "./app/home.js";
import { manageLogin } from "./app/login.js";
import { manageModal } from "./app/modal.js";

//Retrieve actual location
const homeLocation = window.location.pathname;

//Retrive user id of the actual session
const userConnected = window.sessionStorage.getItem("userId");

//Find HTML Node
const editorMode = document.querySelector("[rel=js-editor-mode]");
const navLogout = document.querySelector("[rel=js-logout]");
const navLogin = document.querySelector("[rel=js-login]");
const filterBar = document.querySelector("[rel=js-projects-filter]");
const btnModal = document.querySelector("[rel=js-open-modal]");
const modalGallery = document.querySelector("[rel=js-modal-gallery]");

if (window.location.pathname === '/login.html'){
  manageLogin();
} else {manageHomeGallery();}

// Modify content if user is connected
if (userConnected !== null) {
  editorMode.style.display = "flex";
  navLogout.style.display = "contents";
  navLogin.style.display = "none";
  manageModal();
} else btnModal.style.display = "none";
