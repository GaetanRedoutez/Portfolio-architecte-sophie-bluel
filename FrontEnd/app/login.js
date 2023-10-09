export async function loginFunction() {
  //Déclaration des variables
  const loginForm = document.getElementById("login-form");
  const inputUsername = document.getElementById("username");
  const inputPassword = document.getElementById("password");
  const errorMessage = document.getElementById("error-message");

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
    email: username,
    password: password,
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: bodyRequest,
  };

  

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    try {
      console.log(username);
    console.log(password);
      const response = await fetch(apiUrlLogin, requestOptions);
      const responseData = await response.json();
      if (response.status === 200) {
        console.log("Connecté :", responseData);
      } else {
        console.log(
          `Utilisateur non autorisé ou non trouvé.  Erreur : ${response.status}`
        );
        errorMessage.innerHTML = "";
        errorMessage.innerHTML += `<p>Mot de passe ou identifiant erroné</p>`;
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  });
}
