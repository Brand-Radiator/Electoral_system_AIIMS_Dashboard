import React, { useEffect } from "react";
import { Button, Alert, Row, Col } from "react-bootstrap";
import { Link, useLocation, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import FeatherIcons from "feather-icons-react";

// actions
import { resetAuth, loginUser, setUser } from "../../redux/actions";

// store
import { RootState, AppDispatch } from "../../redux/store";

// components
import { VerticalForm, FormInput } from "../../components/";

import AuthLayout from "./AuthLayout";

// images
import logoDark from "../../assets/images/logo-dark.png";
// import logoLight from "../../assets/images/logo-light.png";
import logoLight from "../../assets/images/logoAIIMS.jpg";

interface UserData {
  email: string;
  password: string;
}

/* bottom links */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col xs={12} className="text-center">
        <p className="text-muted">
          {t("Don't have an account?")}{" "}
          <Link to={"/auth/register"} className="text-primary fw-bold ms-1">
            {t("Sign Up")}
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const Login = () => {
  const { t } = useTranslation();
  // dispatch helps to send data from react to redux action
  const dispatch = useDispatch<AppDispatch>();

  // takes user details from store
  const { user, userLoggedIn, loading, error } = useSelector(
    (state: RootState) => ({
      user: state.Auth.user,
      loading: state.Auth.loading,
      error: state.Auth.error,
      userLoggedIn: state.Auth.userLoggedIn,
    })
  );

  useEffect(() => {
    dispatch(resetAuth());
  }, [dispatch]);

  /*
    form validation schema
    */
  const schemaResolver = yupResolver(
    yup.object().shape({
      email: yup.string().required(t("Please enter Email")),
      password: yup.string().required(t("Please enter Password")),
      checkbox: yup.bool().oneOf([true]),
    })
  );

  /*
    handle form submission
    */
  const onSubmit = async (formData: UserData) => {
    dispatch(loginUser(formData["email"], formData["password"]));
    // console.log(formData, "FOEM");
    // try {
    //   const response = await fetch(`http://165.22.219.69:5002/login`, {
    //     method: "POST",
    //     body: JSON.stringify(formData), // Convert object to JSON string
    //     headers: {
    //       "Content-Type": "application/json", // Specify content type as JSON
    //     },
    //   });
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }
    //   // Assuming you want to parse the JSON response
    //   const data = await response.json();
    //   console.log(data, "TEST response");
    //   alert("Login successfull");
    // } catch (error) {
    //   console.error("Error during edit the banner:", error);
    // }
  };

  const location = useLocation();
  const redirectUrl = location?.search?.slice(6) || "/";
  // console.log("from login component redirectUrl", redirectUrl);

  return (
    <>
      {userLoggedIn || user ? <Navigate to={redirectUrl}></Navigate> : null}
      {/* bottomLinks={<BottomLink />} */}
      <AuthLayout>
        <div className="auth-logo mx-auto">
          <Link to="/" className="logo logo-dark text-center">
            <span className="logo-lg">
              <img
                src={logoLight}
                alt=""
                // height="30"
                // width="90"
                className="img-fluid"
              />
            </span>
          </Link>

          <Link to="/" className="logo logo-light text-center">
            <span className="logo-lg">
              <img src={logoLight} alt="" height="24" />
            </span>
          </Link>
        </div>

        <h6 className="h5 mb-0 mt-3">{t("Welcome back!")}</h6>
        <p className="text-muted mt-1 mb-4">
          {t("Enter your email address and password to access admin panel.")}
        </p>

        {error && (
          <Alert variant="danger" className="my-2">
            {error}
          </Alert>
        )}

        <VerticalForm<UserData>
          onSubmit={onSubmit}
          resolver={schemaResolver}
          defaultValues={{ email: "", password: "" }}
          // defaultValues={{ email: "shreyu@coderthemes.com", password: "test" }}
          formClass="authentication-form"
        >
          <FormInput
            type="email"
            name="email"
            label={t("Email Address")}
            autoComplete="off"
            startIcon={<FeatherIcons icon={"mail"} className="icon-dual" />}
            placeholder={t("hello@gmail.com")}
            containerClass={"mb-3"}
          />
          <FormInput
            type="password"
            name="password"
            label={t("Password")}
            autoComplete="off"
            startIcon={<FeatherIcons icon={"lock"} className="icon-dual" />}
            // action={
            //   <Link
            //     to="/auth/forget-password"
            //     className="float-end text-muted text-unline-dashed ms-1"
            //   >
            //     {t("Forgot your password?")}
            //   </Link>
            // }
            placeholder={t("Enter your Password")}
            containerClass={"mb-3"}
          ></FormInput>

          <FormInput
            type="checkbox"
            name="checkbox"
            label={t("By clicking Log In, you agree to our Terms & conditions")}
            containerClass={"mb-3"}
            defaultChecked
          />

          <div className="mb-3 text-center d-grid">
            <Button type="submit" disabled={loading}>
              {t("Log In")}
            </Button>
          </div>
        </VerticalForm>
      </AuthLayout>
    </>
  );
};
export default Login;

// import React, { useState } from 'react';
// import {Button, Col, Container, Form, Row, DropdownButton, Dropdown, Alert } from 'react-bootstrap'
// import { Link } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';
// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from "../../redux/store";

// const Login =()=>{
//   const dispatch = useDispatch<AppDispatch>();

//   const { user, userLoggedIn, loading, error } = useSelector(
//     (state: RootState) => ({
//       user: state.Auth.user,
//       loading: state.Auth.loading,
//       error: state.Auth.error,
//       userLoggedIn: state.Auth.userLoggedIn,
//     })
//   );

//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>){
//     event.preventDefault();
//     const formData = new FormData();
//     formData.append("email", email);
//     formData.append("password", password);
//     try {
//       const response = await fetch(`http://165.22.219.69:5002/login`, {
//         method: "POST",
//         body: formData,
//       });
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
//       // Assuming you want to parse the JSON response
//       const data = await response.json();
//       alert("Login successfull")
//     } catch (error) {
//       console.error("Error during edit the banner:", error);
//     }

//   }

// //   const handleLogin = () => {
// //     axios
// //       .post('http://localhost:3400/login', { username, password })
// //       .then((response) => {
// //         const { token, message } = response.data;
// //         setMessage(message);
// //         // Save the token in local storage or a secure cookie
// //         localStorage.setItem('token', token);
// //       })
// //       .catch((error) => setMessage(error.response.data.message));
// //   };
// // function handleLogin(e){

// // }

//   return (
//     <Container className='pt-5 shadow-lg p-3 border mt-2 border-2 border-light'>
//         {/* <Row> */}
//             <Col className='container signup__form--container bg-primary align-self-centerd-flex shadow-lg p-3 pt-4 border border-2 border-muted mb-5 bg-white rounded'>
//                 <Form style={{width:"100%"}} onSubmit={handleSubmit}>
//                     <h1>Login to your BSSA CMS account</h1>
//                     {/* {user && <h1>hello</h1>} */}
//                     <Form.Group>
//                         <Form.Label className='d-flex pt-2 justify-content-start font-weight-bold'><h5>Email address</h5></Form.Label>
//                         <Form.Control  type='email' placeholder='Enter Email' value={email} required onChange={(e)=>setEmail(e.target.value)}/>
//                     </Form.Group>

//                     <Form.Group>
//                         <Form.Label className='d-flex pt-2 justify-content-start font-weight-bold'><h5>Enter Password</h5></Form.Label>
//                         <Form.Control type='password' placeholder='Enter password' value={password} required onChange={(e)=>setPassword(e.target.value)}/>
//                     </Form.Group>

//                      <Form.Group className='pt-5 pb-5'>
//                         <Button type='submit'>Login</Button>

//                     </Form.Group>
//                     {/* {user && } */}
//                     { user? <Navigate to="/dashboard" /> : <Navigate to="/login"/>}
//                 </Form>
//             </Col>
//     </Container>
//   );
// }

// export default Login
