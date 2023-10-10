export async function loginFunction() {
  return new Promise(async (resolve, error) => {
    //Déclaration des variables
    const loginForm = document.getElementById("login-form");
    const inputUsername = document.getElementById("username");
    const inputPassword = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");

    let userId = 0;
    let userToken = "responseData.token";
    let username = "";
    let password = "";

    inputUsername.addEventListener("input", (e) => {
      username = e.target.value;
    });

    inputPassword.addEventListener("input", (e) => {
      password = e.target.value;
    });

    const test = loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      window.sessionStorage.clear();
      //Création de la demande de login
      const apiUrlLogin = "http://localhost:5678/api/users/login";
      const bodyRequest = JSON.stringify({
        email: username, //sophie.bluel@test.tld
        password: password, //S0phie
      });

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyRequest,
      };
      const response = await fetch(apiUrlLogin, requestOptions);
      const responseData = await response.json();
      if (response.status === 200) {
        errorMessage.innerHTML = "";
        errorMessage.innerHTML += `<p style="color:green">Connecté</p>`;

        userId = responseData.userId;
        userToken = responseData.token;
        if (userId !== 0 && userToken !== "") {
          window.sessionStorage.setItem("userId", userId);
          window.sessionStorage.setItem("userToken", userToken);
          window.location ='/index.html'
        }
        resolve(responseData);
      } else {
        errorMessage.innerHTML = "";
        errorMessage.innerHTML += `<p style="color:red" >Mot de passe ou identifiant erroné</p>`;
        error(false);
      }
    });
  });
}
