import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import classNames from "classnames";
import FeatherIcons from "feather-icons-react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "../../redux/store";
import { RootState, AppDispatch } from "../redux/store";

//actions
// import { logoutUser } from "../../redux/actions";
import { logoutUser } from "../redux/actions";
import { API_BASE_URL } from "../apiservices/apiService";

const TimerAuthCheck = () => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState("");

  const [initialTimestamp, setInitialTimestamp] = useState<number>(Date.now());
  const [remainingTime, setRemainingTime] = useState({
    minutes: 0,
    seconds: 0,
  });
  const oneHourInMilliseconds = 60 * 60 * 1000; // 1 hrs
  // const oneHourInMilliseconds = 60 * 1000; // 1 min

  const [showTimeOut, setShowTimeOut] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const { user, userLoggedIn, loading, error, userId } = useSelector(
    (state: RootState) => ({
      user: state.Auth.user,
      loading: state.Auth.loading,
      error: state.Auth.error,
      userLoggedIn: state.Auth.userLoggedIn,
      userId: state.Auth._id,
    })
  );
  let Login_Time = user.LoginTime
    ? user.LoginTime
    : user.user
    ? user.user.LoginTime
    : "";
  let profileId = user._id ? user._id : user.user ? user.user._id : "";
  const Key_Key = user.moniterd_ttl
    ? user.moniterd_ttl
    : user.user
    ? user.user.moniterd_ttl
    : "";

  const [currentTime, setCurrentTime] = useState(new Date().getTime());

  let RemainingTime = Login_Time + oneHourInMilliseconds;
  // let expiry_time = Login_Time + oneHourInMilliseconds - currentTime ;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().getTime());
    }, 1000);
    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (currentTime >= RemainingTime) {
      // alert("Session is expired. Please log in again");
      dispatch(logoutUser());
      window.location.href = "http://165.22.219.69:3002/auth/login";
    }
  }, [currentTime, RemainingTime, dispatch]);

  // }

  // useEffect(() => {
  //   const checkSessionExpiration = async () => {
  //     if (currentTime > RemainingTime) {
  //       alert("Session is expired. Please log in again");
  //       dispatch(logoutUser());
  //       window.location.href = "https://admin.biharsports.org/auth/login";
  //       // try {
  //       //   // Replace the following URL with your actual logout API endpoint
  //       //   const response = await fetch(
  //       //     `http://165.22.219.69:5002/auth/logout/${profileId}`,
  //       //     {
  //       //       method: "POST", // or 'GET' or any other HTTP method
  //       //       headers: {
  //       //         "Content-Type": "application/json",
  //       //         // Add any other headers your API requires
  //       //       },
  //       //       credentials: "include", // Include cookies in the request
  //       //       // You can include a request body if needed
  //       //       // body: JSON.stringify({}),
  //       //     }
  //       //   );

  //       //   // // Check if the request was successful (status code 2xx)
  //       //   // if(response.status==400){
  //       //   //   // console.log(await response.json(),'400')
  //       //   //   return
  //       //   // }

  //       //   if (response.ok) {
  //       //     // console.log('Logout successful');
  //       //     // useEffect(() => {
  //       //     dispatch(logoutUser());
  //       //     // }, [dispatch]);
  //       //     Login_Time = null;
  //       //     window.location.href = "https://admin.biharsports.org/auth/login";
  //       //   } else {
  //       //     window.location.href = "https://admin.biharsports.org/auth/login";
  //       //     // alert("Login failed");
  //       //     // console.error("Logout failed:", response.statusText);
  //       //   }
  //       //   // console.log('Login_Time---after null--', Login_Time)
  //       // } catch (error) {
  //       //   console.error("Error during logout:", error);
  //       // }
  //     } else {
  //       // console.log("Not time to logout yet");
  //     }
  //   };

  //   checkSessionExpiration();
  // }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const elapsedMilliseconds = Date.now() - initialTimestamp;
      const remainingSeconds = Math.max(
        3600 - Math.floor(elapsedMilliseconds / 1000),
        0
      );
      const remainingMinutes = Math.floor(remainingSeconds / 60);
      setRemainingTime({
        minutes: remainingMinutes,
        seconds: remainingSeconds % 60,
      });
    }, 1000);
    // handleBeforeUnload()
    // handleVisibilityChange();

    return () => clearInterval(intervalId);
  }, [initialTimestamp]);
  const handlePageRefresh = () => {
    setInitialTimestamp(Date.now());
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  // Create a new Date object using the timestamp
  const date = new Date(RemainingTime);
  // Extract the components of the date
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are zero-based, so add 1
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const dateTwo = new Date(currentTime);
  // Extract the components of the date
  const yearTwo = dateTwo.getFullYear();
  const monthTwo = dateTwo.getMonth() + 1; // Months are zero-based, so add 1
  const dayTwo = dateTwo.getDate();
  const hoursTwo = dateTwo.getHours();
  const minutesTwo = dateTwo.getMinutes();
  const secondsTwo = dateTwo.getSeconds();

  //  function for logout
  // const handleBeforeUnload =async () => {
  //   // Make your API call here
  //   const fetchData = async () => {
  //     try {
  //       console.log(profileId,Key_Key )
  //       const response = await fetch(
  //         `http://165.22.219.69:5002/api/auth/${profileId}/${Key_Key}`,
  //         // `http://165.22.219.69:5002/auth/login`,
  //         {
  //           method: 'POST',
  //           credentials: 'include',
  //         }
  //       );
  //       if (!response.ok) {
  //         // Handle non-successful response (optional)
  //         console.error('Error fetching data:', response.statusText);
  //       }
  //       if (response.status === 440) {
  //         alert('Session Expired')
  //         dispatch(logoutUser());
  //         window.location.href = 'https://admin.biharsports.org/auth/login'; // Use the full URL, including the protocol (http or https)
  //       }
  //       console.log('getData')
  //     } catch (error) {
  //       // Handle fetch error
  //       console.error('Error during fetch:', error);
  //     }
  //   };

  //   fetchData(); // Call the async function directly

  // };

  //  useEffect for concurrent user

  // useEffect(() => {
  //   window.addEventListener('unload', handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener('unload', handleBeforeUnload);
  //   };
  // }, [initialTimestamp]); // The empty dependency array ensures the effect runs only once, similar to componentDidMount

  useEffect(() => {
    const handleVisibilityChange = async () => {
      try {
        const response = await fetch(
          // `${API_BASE_URL}/api/auth/${profileId}/${Key_Key}`,
          `${API_BASE_URL}/api/doc/auth/${profileId}/${Key_Key}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 440) {
          alert("Session Expired");
          sessionStorage.removeItem("appSession-2h3jlk5");
          dispatch(logoutUser());
          window.location.href = "http://165.22.219.69:3002/auth/login"; // Use the full URL, including the protocol (http or https)
        }
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error during edit the Hrader:", error);
      }
      if (document.visibilityState === "hidden") {
        // Page is being refreshed or user is navigating away
        // console.log('Window is being refreshed or navigated away');
        // Perform actions specific to refresh or navigation
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        id="dropdown-apps"
        as="a"
        onClick={toggleDropdown}
        className={classNames("nav-link", "cursor-pointer", {
          show: dropdownOpen,
        })}
      >
        {/* <div>{`Session Expire at :- ${hours}:${minutes}:${seconds} ${",  "} current Time :- ${hoursTwo}:${minutesTwo}:${secondsTwo}`} </div> */}
        <div className="form-check-label">
          Session Expire at :-{" "}
          <span style={{ color: "red" }}>
            {" "}
            {hours}:{minutes}:{seconds}
          </span>{" "}
          {",  "}Current Time :-{" "}
          <span>
            {hoursTwo}:{minutesTwo}:{secondsTwo}{" "}
          </span>
        </div>
        {/* <div>{new Date(initialTimestamp).toLocaleTimeString()}</div> */}
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu-animated dropdown-lg p-0"></Dropdown.Menu>
      {/*
      <div>
        {showTimeOut &&
         <>
        <div>
          <p>log out</p>
        </div>
        </>}


      </div> */}
    </Dropdown>
  );
};
export default TimerAuthCheck;
