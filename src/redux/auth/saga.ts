import { all, fork, put, takeEvery, call } from "redux-saga/effects"; // takeEvery call any saga function whenever they will get any type
import { SagaIterator } from "@redux-saga/core";
// import Cookies from "js-cookie";
// apicore
import { APICore, setAuthorization } from "../../helpers/api/apiCore";

// helpers
import {
  login as loginApi,
  logout as logoutApi,
  signup as signupApi,
  forgotPassword as forgotPasswordApi,
} from "../../helpers/";

// actions
import { authApiResponseSuccess, authApiResponseError } from "./actions";

// constants
import { AuthActionTypes } from "./constants";
import { API_BASE_URL } from "../../apiservices/apiService";


interface UserData {
  payload: {
    username: string;
    password: string;
    fullname: string;
    email: string;
  };
  type: string;
}

const api = new APICore();

/**
 * Login the user
 * @param {*} payload - username and password
 */

// function* login({
//   payload: { email, password },
//   type,
// }: UserData): SagaIterator {
//   try {
//     // console.log("compiler inside login function auth>saga.ts");
//     const response = yield call(loginApi, { email, password });
//     console.log(response, "STATUS");

//     if (response.status === "Success") {
//       // console.log("inside success function1");

//       // console.log("inside success function2", document.cookie);

//       // Function to get the value of a cookie by name
//       // const getCookie = (name: string) => {
//       //   const cookies = document.cookie.split(";");
//       //   console.log(cookies,"IN 55 inside getCookie");

//       //   for (let i = 0; i < cookies.length; i++) {
//       //     const cookie = cookies[i].trim();
//       //     if (cookie.startsWith(name + "=")) {
//       //       return cookie.substring(name.length + 1);
//       //     }
//       //   }
//       //   return null;
//       // };

//     // const userData = here I need to make one api call which will give me user data

//       let userData = {};

//       // const cookieValue = Cookies.get('token');

//       // const cookieValue: string | null = getCookie('yourCookieName');
//       // const cookieValue: string | null = getCookie("token");
//       // console.log(cookieValue, "TOKEN IN COOKIE inside success saga")

//       if (userData) {
//         // const decoded: any = jwtDecode(cookieValue);
//         // console.log(decoded, "TOKEN");
//         // console.log(response, "RESPONSEEEE");

//         // if (token !== undefined && user !== undefined) {
//         // const newKey = "_id";
//         // if (!(newKey in decoded)) {
//         //   decoded[newKey] = decoded.key;
//         // }

//         // console.log(decoded, "MODIFIED");

//         // console.log(decoded, "DECODED USER");

//         api.setLoggedInUser(userData);
//         // console.log(typeof cookieValue, "TOKEN IN COOKIE");

//         // setAuthorization(cookieValue);

//         yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, userData));
//       }else{
//         alert("Token not found")
//       }
//     }

//     // else {
//     //   // Handle the case where the cookie value is null
//     //   alert('Something went wrong')
//     // }

//     // const decoded: any = jwtDecode(cookieValue);

//     // const { user, token } = response;
//     // // NOTE - You can change this according to response format from your api
//     // const users = {
//     //   user,
//     //   token,
//     // };

//     // if (token !== undefined && user !== undefined) {
//     //   const newKey = "token";
//     //   if (!(newKey in user)) {
//     //     user[newKey] = token;
//     //   }

//     //   api.setLoggedInUser(user);

//     //   setAuthorization(token);

//     //   yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, user));
//     // }
//     else {
//       // alert("Invalid credentials");
//       yield put(
//         authApiResponseError(AuthActionTypes.LOGIN_USER, "Invalid credentials")
//       );
//       api.setLoggedInUser(null);
//       setAuthorization(null);
//     }

//     // To get the token from cookies
//     // const token = Cookies.get("token");

//     // if (token) {
//     //   // Token exists, you can use it for authorization
//     //   console.log("Token from cookies:", token);
//     // } else {
//     //   // Token doesn't exist in cookies
//     //   console.log("Token not found in cookies");
//     // }
//     // setAuthorization(user["token"]);

//     //  type
//   } catch (error: any) {
//     // console.log("INSIDE CATCH BLOCK");
//     yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
//     api.setLoggedInUser(null);
//     setAuthorization(null);
//   }
// }

function* login({ payload: { email, password } }: UserData): SagaIterator {
  try {
    const response = yield call(loginApi, { email, password });
    // console.log(response, "STATUS");

    // console.log("response--",response)

    if (response.status === "Success") {
      // Make an additional API call to fetch user data
      // console.log( response.moniterd_ttl, "DSDSDSDSDS")
      const userDataResponse = yield call(fetchUserDataApi, response.data, response.moniterd_ttl);
      // console.log(userDataResponse, "USER DATA");

      if (userDataResponse.status === "Success") {
        const userData = userDataResponse?.data?.data;
        
        const newKey = "_id";
        if (!(newKey in userData)) {
          userData[newKey] = response.data;
        }

        const loginTime = "LoginTime";
        if (!(loginTime in userData)) {
          userData[loginTime] = response.loginTime;
        }

        api.setLoggedInUser(userData);
        // setAuthorization('token');
        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, userData));
      } else {
        yield put(
          authApiResponseError(
            AuthActionTypes.LOGIN_USER,
            "Error fetching user data"
          )
        );
        api.setLoggedInUser(null);
        setAuthorization(null);
      }
    } else {
      yield put(
        authApiResponseError(AuthActionTypes.LOGIN_USER, "Invalid credentials")
      );
      api.setLoggedInUser(null);
      setAuthorization(null);
    }
  } catch (error: any) {
    console.error("Error:", error);
    yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
    api.setLoggedInUser(null);
    setAuthorization(null);
  }
}

// Additional saga to fetch user data
function* fetchUserDataApi(userId: string, moniterd_ttl: string): SagaIterator {
  // console.log(moniterd_ttl, "GETTTTTT")
  try {
    const response = yield call(
      fetch,
      // `http://64.227.150.195:5002/api/auth/${userId}/${moniterd_ttl}`,
      // `${API_BASE_URL}/api/auth/${userId}/${moniterd_ttl}`,
      `${API_BASE_URL}/api/doc/auth/${userId}/${moniterd_ttl}`,

      {
        method: "GET",
        credentials: "include",

      }
    );


    if (response.ok) {
      const userData = yield response.json();
      return { status: "Success", data: userData };
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Error:", error);
    return { status: "Error", data: null };
  }
}

/**
 * Logout the user
 */
function* logout(): SagaIterator {
  try {
    yield call(logoutApi);

    setAuthorization(null);
    yield put(authApiResponseSuccess(AuthActionTypes.LOGOUT_USER, {}));
    api.setLoggedInUser(null);
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.LOGOUT_USER, error));
  }
}

function* signup({
  payload: { fullname, email, password },
}: UserData): SagaIterator {
  try {
    const response = yield call(signupApi, { fullname, email, password });
    const user = response.data;
    // api.setLoggedInUser(user);
    // setAuthorization(user['token']);
    yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, user));
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
    api.setLoggedInUser(null);
    setAuthorization(null);
  }
}

function* forgotPassword({ payload: { email } }: UserData): SagaIterator {
  try {
    const response = yield call(forgotPasswordApi, { email });
    yield put(
      authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data)
    );
  } catch (error: any) {
    yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
  }
}
export function* watchLoginUser() {
  yield takeEvery(AuthActionTypes.LOGIN_USER, login);
  //              actionlist.function we have to call,
}

export function* watchLogout() {
  yield takeEvery(AuthActionTypes.LOGOUT_USER, logout);
}

export function* watchSignup(): any {
  yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchForgotPassword(): any {
  yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

function* authSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchForgotPassword),
  ]);
}

export default authSaga;
