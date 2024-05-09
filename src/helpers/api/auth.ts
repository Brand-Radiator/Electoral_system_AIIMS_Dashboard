// import jwtDecode from "jwt-decode";
import { API_BASE_URL } from "../../apiservices/apiService";
import { APICore, getDecodedUserDataFromCookie } from "./apiCore";
// import Cookies from "js-cookie";

const api = new APICore();

// account
function login(params: { email: string; password: string }) {
  // const baseUrl = "/login/";

  const baseUrl = `${API_BASE_URL}/auth/login`

  

  return api.create(`${baseUrl}`, params);
}

// function logout() {
//   const baseUrl = "/logout/";
//   return api.create(`${baseUrl}`, {});
// }

// const AUTH_SESSION_KEY = "bssa_dashboard_user";

// const getUserFromCookie = () => {
//   const user = sessionStorage.getItem(AUTH_SESSION_KEY);

//   return user ? (typeof user == "object" ? user : JSON.parse(user)) : null;
// };

// const getUserFromCookie = () => {


//   const cookieValue = Cookies.get("token");

//   if (cookieValue !== null && cookieValue !== undefined) {
//     const decoded: any = jwtDecode(cookieValue);
//     const newKey = "_id";
//     if (!(newKey in decoded)) {
//       decoded[newKey] = decoded.key;
//     }
//     return decoded
//       ? typeof decoded == "object"
//         ? decoded
//         : JSON.parse(decoded)
//       : null;
//   }
// };

// const AUTH_SESSION_KEY = "appSession-2h3jlk5";

const secretKey = '49720f6edc5c2840fb376e3c2b205cdf85d54e4868010f7f3edb7f59cfe073f7'; 


const getUserFromSession = () => {
  // const user = sessionStorage.getItem(AUTH_SESSION_KEY);


  return getDecodedUserDataFromCookie(secretKey)

  // const encryptedUser = sessionStorage.getItem(AUTH_SESSION_KEY);
  // if (encryptedUser) {
  //   const jsonString = atob(encryptedUser);
  //   return JSON.parse(jsonString);
  // }

  // return encryptedUser ? (typeof encryptedUser == "object" ? encryptedUser : JSON.parse(encryptedUser)) : null;
};

function logout() {
  
  const baseUrl = `${API_BASE_URL}/auth/logout/${getUserFromSession()?._id}/${getUserFromSession()?.moniterd_ttl}`;
  if(getUserFromSession()?._id !== undefined && getUserFromSession()?._id !== null){

    return api.create(`${baseUrl}`,{}, );
  }
}

function signup(params: { fullname: string; email: string; password: string }) {
  const baseUrl = "/register/";
  return api.create(`${baseUrl}`, params);
}

function forgotPassword(params: { email: string }) {
  const baseUrl = "/forget-password/";
  return api.create(`${baseUrl}`, params);
}

export { login, logout, signup, forgotPassword };
