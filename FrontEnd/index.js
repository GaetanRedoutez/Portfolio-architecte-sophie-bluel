import { homeFunction } from "./app/home.js";
import { loginFunction } from "./app/login.js";



let userId = 0;
let userToken = "responseData.token";
let connected =false;

loginFunction().then((responseData) => {
  window.sessionStorage.clear()
  console.log(window.sessionStorage);
  userId = responseData.userId;
  userToken = responseData.token;
  console.log("User Id :", userId);
  console.log("User Token :", userToken);
  if (userId !== 0 && userToken !== "") {
    window.sessionStorage.setItem('userId',userId);
    window.sessionStorage.setItem('userToken',userToken);
    console.log(window.sessionStorage);
  }
});
 if (userId !== 0 && userToken !== "") {
    connected=true;
    
  }
homeFunction(connected);