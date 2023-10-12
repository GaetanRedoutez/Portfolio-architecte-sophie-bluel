import { httpPost } from "./request.js";

//Find HTML Node
const loginForm = document.querySelector("[rel=js-login-form]");
const inputUsername = document.querySelector("[rel=js-username]");
const inputPassword = document.querySelector("[rel=js-password]");
const loginStatus = document.querySelector("[rel=js-login-status] p");
const logout = document.querySelector("[rel=js-logout]");

// Setup the url to access the login API
const urlLogin = "http://localhost:5678/api/users/login";

//Declaration variable
let username="";
let password="";

// Don't execute this if we're not on the login page
if (window.location.pathname == '/login.html'){
  //Detect input username event
  inputUsername.addEventListener('input',(e) => {
    username = e.target.value;
  });

  //Detect input password event
  inputPassword.addEventListener('input',(e) => {
    password = e.target.value;
  });
}

function configLoginRequest (usr,pwd){
  // Setup the body for a request to the login API
  const bodyRequest = JSON.stringify({
    email: usr, //sophie.bluel@test.tld
    password: pwd, //S0phie
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

function confirmConnection (token){
  if (token !== ''){
    loginStatus.innerHTML = "Connecté";
    loginStatus.style.color = "green";
    setTimeout(() => {
      window.location.href = "./index.html"
    }, 500);
  } else {
    loginStatus.innerHTML = "Nom d'utilisateur ou mot de passe erroné";
    loginStatus.style.color = "red";
  }
}

export async function manageLogin() {
  // Submit login form
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    //Reset sessionStorage
    window.sessionStorage.clear();

    //Load login request config
    const loginOption = configLoginRequest (username,password);
    const logResponse = await httpPost(urlLogin,loginOption);

    //Set session storage with user data
    window.sessionStorage.setItem("userId",logResponse.userId);
    window.sessionStorage.setItem("userToken",logResponse.token);

    //Connection status
    confirmConnection(logResponse.token);
  });
}


//Simul logout 
logout.addEventListener('click', async (e)=>{
  e.preventDefault();
  //Reset sessionStorage
  window.sessionStorage.clear();

  //Load login request config
  const loginOption = configLoginRequest ("","");
  const logResponse = await httpPost(urlLogin,loginOption);

  window.location.reload();
})