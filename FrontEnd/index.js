import { homeFunction } from "./app/home.js";
import { loginFunction } from "./app/login.js";
import { Modal } from "./app/modal.js";

const homeLocation = window.location.pathname;
const filterBar = document.querySelector(".projects-filter");
const btnModal = document.querySelector(".btn-modal");
const editorMode = document.querySelector('.editor-mode')
const navLogout = document.querySelector('.logout')
const navLogin = document.querySelector('.login')

if (homeLocation === "/login.html") {
  loginFunction().then(() => {});
} else homeFunction();

const userConnected = window.sessionStorage.getItem("userId");
console.log(userConnected);
if (userConnected !== null) {
  filterBar.style.visibility = "hidden";
  editorMode.style.display = "flex";
  navLogout.style.display = "contents";
  navLogin.style.display = "none";

  Modal();
} else btnModal.style.display = "none";
