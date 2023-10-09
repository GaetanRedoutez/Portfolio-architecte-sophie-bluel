import { homeFunction } from "./app/home.js";
import { loginFunction } from "./app/login.js";

const currentPage = window.location.pathname;

if (currentPage === "/index.html") {
  homeFunction();
} else if (currentPage === "/login.html") {
  loginFunction();
}
