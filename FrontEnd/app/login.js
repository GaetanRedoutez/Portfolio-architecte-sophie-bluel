import { httpPost } from "./request.js";

//Find HTML Node
const loginForm     = document.querySelector("[rel=js-login-form]");
const inputUsername = document.querySelector("[rel=js-username]");
const inputPassword = document.querySelector("[rel=js-password]");
const loginStatus   = document.querySelector("[rel=js-login-status] p");
const logout        = document.querySelector("[rel=js-logout]");

// Setup the url to access the login API
const urlLogin = "http://localhost:5678/api/users/login";

//Declaration variable 
let username = "";
let password = "";

// Don't execute this if we're not on the login page
if (window.location.pathname.includes('/login.html')) {
  //Detect input username event
  inputUsername.addEventListener('input', (e) => {
    username = e.target.value;
  });

  //Detect input password event
  inputPassword.addEventListener('input', (e) => {
    password = e.target.value;
  });
}

/**
 * Configure option for a login request
 * 
 * @param {string} usr Represent user email
 * @param {string} pwd Represent user password
 * @returns {object} Returns request option
 */
function configLoginRequest(usr, pwd) {
  // Setup the body for a request to the login API
  const bodyRequest = JSON.stringify({
    email: usr,
    password: pwd,
  });

  // Setup the request options for a login request
  return {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyRequest,
  };
}

/**
 * Send login request and save user in session storage
 * 
 * @returns {void}
 */
export async function manageLogin() {
  // Submit login form
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    //Reset sessionStorage
    window.sessionStorage.clear();

    //Load login request config
    const loginOption = configLoginRequest(username, password);
    const logResponse = await httpPost(urlLogin, loginOption);

    //Connection status
    confirmConnection(logResponse);
  });
}

/**
 * 
 * @param {any} response Token returned by API
 */
function confirmConnection(response) {
  if (response !== false) {
    loginStatus.innerHTML = "Connecté";
    loginStatus.style.color = "green";
    //Set session storage with user data
    window.sessionStorage.setItem("userId", response.userId);
    window.sessionStorage.setItem("userToken", response.token);
    setTimeout(() => {
      window.location.href = "./index.html"
    }, 500);
  } else {
    loginStatus.innerHTML = "Nom d'utilisateur ou mot de passe erroné";
    loginStatus.style.color = "red";
  }
}


//Simulation logout 
logout.addEventListener('click', async (e) => {
  e.preventDefault();
  //Reset sessionStorage
  window.sessionStorage.clear();

  //Load login request config
  const loginOption = configLoginRequest("", "");
  const logResponse = await httpPost(urlLogin, loginOption);

  window.location.reload();
})