//Déclaration des variables
const login = document.getElementById("login-form");
const inputUsername = document.getElementById("username");
const inputPassword = document.getElementById("password");

let username = "";
let password = "";

inputUsername.addEventListener("input", (e) => {
  username = e.target.value;
});

inputPassword.addEventListener("input", (e) => {
  password = e.target.value;
});

//Création de la demande de login

const apiUrlLogin = "http://localhost:5678/api/users/login";
const bodyRequest = JSON.stringify({
  email: "sophie.bluel@test.tld",
  password: "S0phie",
});

const requestOptions = {
  method: "POST",
  headers: {
    "accept": "application/json",
    "Content-Type": "application/json",
  },
  body: bodyRequest,
};

const loginForm = document.getElementById("login"); // Ajoutez l'ID de votre formulaire ici

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
    const response = await fetch(apiUrlLogin, requestOptions);
    console.log(response);
});
 