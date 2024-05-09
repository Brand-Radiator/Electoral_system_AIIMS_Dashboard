import axios from "axios";
import cryptoJS from "crypto-js";
import { API_BASE_URL } from "../../apiservices/apiService";
// import config from "../../config";

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.baseURL = config.API_URL;
axios.defaults.baseURL = API_BASE_URL;


// intercepting to capture errors
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    let message;

    if (error && error.response && error.response.status === 404) {
      // window.location.href = '/not-found';
    } else if (error && error.response && error.response.status === 403) {
      window.location.href = "/access-denied";
    } else {
      switch (error.response.status) {
        case 401:
          message = "Invalid credentials";
          break;
        case 403:
          message = "Access Forbidden";
          break;
        case 404:
          message = "Sorry! the data you are looking for could not be found";
          break;
        case 429:
          message = "Too many requests from this IP, please try again later.";
          break;
        default: {
          message =
            error.response && error.response.data
              ? error.response.data["message"]
              : error.message || error;
        }
      }
      return Promise.reject(message);
    }
    // console.log("message---", message)
  }
);

// interface UserData {
//   createdAt: string;
//   hobbies: string;
//   imageUrl: string;
//   name: string;
//   sessionId: string;
//   updatedAt: string;
// }

// const AUTH_SESSION_KEY = "appSession-2h3jlk5";

// /**
//  * Sets the default authorization
//  * @param {*} token
//  */
const setAuthorization = (token: string | null) => {
  if (token) axios.defaults.headers.common["Authorization"] = "JWT" + token;
  else delete axios.defaults.headers.common["Authorization"];
};

const secretKey = '49720f6edc5c2840fb376e3c2b205cdf85d54e4868010f7f3edb7f59cfe073f7';


// start Encrypt the data in cookies day 03/01/2024

// Function to encode and set user data in a cookie
function setEncodedUserDataInCookie(session : any, secretKey : any) {
  try {
    if (session) {
      // Convert user data to a JSON string
      const userDataJSON = JSON.stringify(session);

      // Append the secret key in a way that is distinguishable during decoding
      const encodedUserData = btoa(userDataJSON + '|' + secretKey);

      // Set the encoded data in a cookie
      const expirationInSeconds = 3600; // 1 hour
      const encypt = cryptoJS.AES.encrypt(JSON.stringify(userDataJSON),secretKey).toString();
      const expirationDate = new Date(Date.now() + expirationInSeconds * 1000).toUTCString();
      // console.log('-----', expirationDate, 'encypt--',encypt)
      // document.cookie = `encypt${encodeURIComponent(encypt)}; expires=${expirationDate}; path=/`;
      document.cookie = `_enco_data14_ga=${encodeURIComponent(encypt)}; expires=${expirationDate};  SameSite=Lax; path=/`;

      // document.cookie = `_enco_data14_ga=${encodeURIComponent(encodedUserData)}; expires=${expirationDate}; path=/`;
    }
  } catch (error) {
    console.error('Error encoding user data:', error);
  }
}


// Function to decode user data from a cookie
function getDecodedUserDataFromCookie(secretKey : any) {
  try {
    // Retrieve the cookie string
    const cookieString = document.cookie;
    // console.log('cookies--cookieString-', cookieString)

    // Split the cookie string into individual cookies
    const cookies = cookieString.split(';');

    // Find the cookie containing encoded user data
    const encodedUserDataCookie = cookies.find(cookie => cookie.trim().startsWith('_enco_data14_ga='));

    if (encodedUserDataCookie) {
      // Extract and decode the encoded user data from the cookie
      const encodedUserDataString = encodedUserDataCookie.split('=')[1];
      const decodedEncodedUserData = decodeURIComponent(encodedUserDataString);

      // Base64 decode the encoded data
      const decodedUserData = atob(decodedEncodedUserData);
      const dencypt = cryptoJS.AES.decrypt(decodedEncodedUserData,secretKey)
      const deData = JSON.parse(dencypt.toString(cryptoJS.enc.Utf8))
      // Split the decoded data to separate JSON and secret key
      // console.log('deData---',deData)
      // const [userDataJSON, receivedSecretKey] = decodedUserData.split('|');
      // const [userDataJSON, receivedSecretKey] = deData;


      // Verify the secret key matches the expected value
      // if (receivedSecretKey === secretKey) {
        // Parse the JSON string to get the user data object
        return JSON.parse(deData);
      // }
    }
  } catch (error) {
    console.error('Error decoding user data:', error);
  }

  return null; // Return null if the encoded user data cookie is not found or there is an error
}


// End Encrypt the data in cookies day 03/01/2024


const getUserFromCookie = () => {


return getDecodedUserDataFromCookie(secretKey)


  // const encryptedUser = sessionStorage.getItem(AUTH_SESSION_KEY);
  // if (encryptedUser) {
  //   const jsonString = atob(encryptedUser);
  //   return JSON.parse(jsonString);
  // }
  // const user = sessionStorage.getItem(AUTH_SESSION_KEY);

  // console.log(user, "USERRRR");

  // Function to get the value of a cookie by name

  // const getCookie = (name: string) => {
  //   const cookies = document.cookie.split(";");
  //   for (let i = 0; i < cookies.length; i++) {
  //     const cookie = cookies[i].trim();
  //     if (cookie.startsWith(name + "=")) {
  //       return cookie.substring(name.length + 1);
  //     }
  //   }
  //   return null;
  // };

  // const cookieValue: string | null = getCookie("token");

  // if (cookieValue !== null && cookieValue !== undefined) {
  //   const decoded: any = jwtDecode(cookieValue);
  //   // console.log(decoded, "TOKEN");

  //   // if (token !== undefined && user !== undefined) {
  //   const newKey = "_id";
  //   if (!(newKey in decoded)) {
  //     decoded[newKey] = decoded.key;
  //   }
  //   // return decoded;

  //   return decoded
  //     ? typeof decoded == "object"
  //       ? decoded
  //       : JSON.parse(decoded)
  //     : null;
  // }

  // return encryptedUser
  //   ? typeof encryptedUser == "object"
  //     ? encryptedUser
  //     : JSON.parse(encryptedUser)
  //   : null;
};








function deleteCookie(cookieName : string) {
  // Set the cookie's expiration date to the past
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}



















class APICore {
  /**
   * Fetches data from given url
   */
  get = (url: string, params: any) => {
    let response;
    if (params) {
      var queryString = params
        ? Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }
    return response;
  };

  getFile = (url: string, params: any) => {
    let response;
    if (params) {
      var queryString = params
        ? Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : "";
      response = axios.get(`${url}?${queryString}`, { responseType: "blob" });
    } else {
      response = axios.get(`${url}`, { responseType: "blob" });
    }
    return response;
  };

  getMultiple = (urls: string, params: any) => {
    const reqs = [];
    let queryString = "";
    if (params) {
      queryString = params
        ? Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : "";
    }

    for (const url of urls) {
      reqs.push(axios.get(`${url}?${queryString}`));
    }
    return axios.all(reqs);
  };

  /**
   * post given data to url
   */
  // create = async (url: string, data: any) => {

  //   return axios.post(url, data);
  // };
  create = async (url: string, data: any) => {
    // console.log(moniterd_ttl, "klmnminjm");

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data), // Convert object to JSON string
        headers: {
          "Content-Type": "application/json", // Specify content type as JSON
        },

        credentials: "include", // Include cookies in the request
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Assuming you want to parse the JSON response
      const result = await response.json();

      return result;
    } catch (error) {
      // throw new Error(`Error during login: ${error}`);
      // console.error("ERROR DURING MAKING REQUEST:", error);
      return error;
    }
  };

  /**
   * Updates patch data
   */
  updatePatch = (url: string, data: any) => {
    return axios.patch(url, data);
  };

  /**
   * Updates data
   */
  update = (url: string, data: any) => {
    return axios.put(url, data);
  };

  /**
   * Deletes data
   */
  delete = (url: string) => {
    return axios.delete(url);
  };

  /**
   * post given data to url with file
   */
  createWithFile = (url: string, data: any) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }

    const config = {
      headers: {
        ...axios.defaults.headers,
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };

  /**
   * post given data to url with file
   */
  updateWithFile = (url: string, data: any) => {
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }

    const config = {
      headers: {
        ...axios.defaults.headers,
        "content-type": "multipart/form-data",
      },
    };
    return axios.patch(url, formData, config);
  };

  isUserAuthenticated = () => {
    const user = this.getLoggedInUser();

    if (!user) {
      return false;
    } else {
      return true;
    }
    // console.log(user,"AUTH")

    // const getCookie = (name: string) => {
    //   const cookies = document.cookie.split(";");
    //   for (let i = 0; i < cookies.length; i++) {
    //     const cookie = cookies[i].trim();
    //     if (cookie.startsWith(name + "=")) {
    //       return cookie.substring(name.length + 1);
    //     }
    //   }
    //   return null;
    // };

    // const cookieValue: string | null = getCookie("token");

    // if (cookieValue !== null && cookieValue !== undefined) {
    //   const decoded: any = jwtDecode(cookieValue);
    //   const currentTime = Date.now() / 1000;
    //   if (decoded.exp < currentTime) {
    //     alert("Token has expired please login again");
    //     // console.warn("access token expired");

    //     return false;
    //   } else {
    //     return true;
    //   }

    // }else{
    //   alert("Token has expired")
    // }
  };










  setLoggedInUser = (session: any) => {

    if (session) {
      // const jsonString = JSON.stringify(session);
      // const encryptedData = btoa(jsonString);


      // start code for store user data inside cookies  03/01/2024

      setEncodedUserDataInCookie(session, secretKey)

      // sessionStorage.setItem(AUTH_SESSION_KEY, encryptedData);
    } else {

      // sessionStorage.removeItem(AUTH_SESSION_KEY);

      deleteCookie('_enco_data14_ga');
    }
  };
  /**
   * Returns the logged in user
   */
  getLoggedInUser = () => {
    // console.log("inside get getLoggedInUser")
    return getUserFromCookie();
  };

  setUserInSession = (modifiedUser: any) => {
    // console.log("setUserInSession MODIFIER");
    // let userInfo = sessionStorage.getItem(AUTH_SESSION_KEY);
    // if (userInfo) {
    //   // console.log(userInfo, "SET USER IN SESSION DOWN");
    //   const { token, user } = JSON.parse(userInfo);
    //   // console.log(token, user, "SET USER IN session, api core ")
    //   // this.setLoggedInUser({ token, ...user, ...modifiedUser });
    // }
  };
}

/*
Check if token available in session
*/
let user = getUserFromCookie();

// console.log("user-----------", user)

if (user) {
  // console.log(user, "token available in session")
  // alert ("inside user in api core")
  const getCookie = (name: string) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  };

  const cookieValue: string | null = getCookie("token");

  // const { token } = user;
  // console.log("token-----",token)
  // console.log('user------',user)
  if (cookieValue) {
    setAuthorization(cookieValue);
  }
}

export { APICore, setAuthorization, getDecodedUserDataFromCookie };
