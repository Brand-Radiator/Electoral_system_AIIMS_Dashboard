import React, { useEffect, useState } from "react";
import { Button, Alert, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import FeatherIcons from "feather-icons-react";

//actions
import { resetAuth, forgotPassword, logoutUser } from "../../redux/actions";
import { RootState, AppDispatch } from "../../redux/store";

// components
import { VerticalForm, FormInput } from "../../components/";

import AuthLayout from "./AuthLayout";

// images
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
// import bssaLogo from "../../assets/images/BSSA-logo.png";
import bssaLogo from "../../assets/images/upums_logo_desktop2.png";
import { API_BASE_URL } from "../../apiservices/apiService";

interface UserData {
  // email: string;
  password: string;
  newPassword: string;
}

interface ResetPasswordProps {
  isPassReset: any;
  SetIsPassReset: React.Dispatch<React.SetStateAction<any>>; // Change 'any' to the appropriate type
}

/* bottom link */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col xs={12} className="text-center">
        <p className="text-muted">
          {t("Back to")}{" "}
          <Link to={"/auth/login"} className="text-primary fw-bold ms-1">
            {t("Login")}
          </Link>
        </p>
      </Col>
    </Row>
  );
};

const ResetPassword: React.FC<ResetPasswordProps> = ({
  isPassReset,
  SetIsPassReset,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const [isResetPasswordSuccess, setResetPasswordSuccess] = useState("");

  const [isResponse, setIsResponse] = useState("");

  // useEffect(() => {
  //   dispatch(resetAuth());
  // }, [dispatch]);

  // const { loading, passwordReset, resetPasswordSuccess, error } = useSelector(
  //   (state: RootState) => ({
  //     loading: state.Auth.loading,
  //     user: state.Auth.user,
  //     error: state.Auth.error,
  //     passwordReset: state.Auth.passwordReset,
  //     resetPasswordSuccess: state.Auth.resetPasswordSuccess,
  //   })
  // );

  const { user, userLoggedIn, loading, error, _id } = useSelector(
    (state: RootState) => ({
      user: state.Auth.user,
      loading: state.Auth.loading,
      error: state.Auth.error,
      userLoggedIn: state.Auth.userLoggedIn,
      _id: state.Auth._id,
    })
  );

  let profileId = user?._id;
  const Key_Key = user?.moniterd_ttl;
  // let doctorDataProfileId = user?.doctorProfileId;

  const isPasswordReset = user.passwordReset
    ? user.passwordReset
    : user.user
    ? user.user.passwordReset
    : "";

  // console.log(isPasswordReset, "IS RESET");

  /*
   * form validation schema
   */
  const schemaResolver = yupResolver(
    yup.object().shape({
      // email: yup.string().required(t("Please enter Email")),
      password: yup.string().required(t("Please enter your current Password")),
      newPassword: yup.string().required(t("Please enter your new Password")),
    })
  );

  /*
   * form validation schema
   */
  // const schemaResolver = yupResolver(
  //   yup.object().shape({
  //     // email: yup.string().required(t("Please enter Email")),
  //     password: yup
  //       .string()
  //       .required(t("Please enter your current Password"))
  //       .matches(
  //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/,
  //         t(
  //           "Password must be 8 to 15 characters long and contain at least one lowercase letter, one uppercase letter, and one numeric digit."
  //         )
  //       ),
  //     newPassword: yup
  //       .string()
  //       .required(t("Please enter your new Password"))
  //       .matches(
  //         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,15}$/,
  //         t(
  //           "Password must be 8 to 15 characters long and contain at least one lowercase letter, one uppercase letter, and one numeric digit."
  //         )
  //       ),
  //   })
  // );

  /*
   * handle form submission
   */
  const onSubmit = async (userData: UserData) => {
    // dispatch(forgotPassword(formData["email"]));
    // console.log(userData, "form data");
    const formData = new FormData();
    formData.append("password", userData?.password);
    formData.append("newPassword", userData?.newPassword);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/doc/passreset/user/${profileId}/employee/${profileId}/${Key_Key}`,

        {
          method: "PATCH",
          body: formData,
          credentials: "include",
        }
      );

      if (response.status === 440) {
        alert("Session Expired");
        dispatch(logoutUser());
        window.location.href = "http://165.22.219.69:3002/auth/login"; // Use the full URL, including the protocol (http or https)
      }
      if (response.status === 429) {
        // setShowModal(true);
      }
      if (response.status === 400) {
        // setIsError(true);
        let errorMsg = await response.json();
        setIsResponse(errorMsg.message);
      }
      if (!response.status == true) {
        let errorMsg = await response.json();
        setIsResponse(errorMsg.message);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (response.status == 200 || response.status == 201) {
        setResetPasswordSuccess("success");
        dispatch(logoutUser());
        window.location.href = "http://165.22.219.69:3002/auth/login";
      }
    } catch (error: any) {
      console.error("Error during edit the banner:", error);
    }

    // SetIsPassReset(true);
  };

  // const UpdateOrgStruItem = async (event: React.FormEvent<HTMLFormElement>) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();6
  //   } else {
  //     event.preventDefault();
  //     const formData = new FormData();
  //     formData.append("password", password);
  //     formData.append("newPassword", newPassword);

  //     try {
  //       const response = await api.updatePatchData(
  //         `/api/passreset/user/${profileId}/employee/${itemId}/${Key_Key}`,
  //         formData
  //       );
  //       if (response.status === 440) {
  //         alert("Session Expired");
  //         dispatch(logoutUser());
  //         window.location.href = "http://165.22.219.69:3001/auth/login"; // Use the full URL, including the protocol (http or https)
  //       }
  //       if (response.status === 429) {
  //         setShowModal(true);
  //       }
  //       if (response.status === 400) {
  //         setIsError(true);
  //         let errorMessage = await response.message;
  //         setIsResponse(errorMessage);
  //       }
  //       if (!response.status == true) {
  //         let errorMsg = await response.json();
  //         setIsResponse(errorMsg.message);
  //         throw new Error(`HTTP error! Status: ${response.status}`);
  //       }
  //       if (response.status == 200 || response.status == 201) {
  //         dispatch(logoutUser());
  //         window.location.href = "http://165.22.219.69:3001/auth/login";
  //       }
  //     } catch (error: any) {
  //       console.error("Error during edit the banner:", error);
  //     }
  //   }
  //   setValidated(true);
  // };

  return (
    <>
      {/* <AuthLayout
      //  bottomLinks={<BottomLink />}
      > */}
      <div className="auth-logo mx-auto">
        <Link to="/" className="logo logo-dark text-center">
          <span className="logo-lg">
            <img src={bssaLogo} alt="" className="img-fluid" height="24" />
          </span>
        </Link>

        <Link to="/" className="logo logo-light text-center">
          <span className="logo-lg">
            <img src={bssaLogo} alt="" className="img-fluid" height="24" />
          </span>
        </Link>
      </div>

      <h6 className="h5 mb-0 mt-3">{t("Reset Password")}</h6>
      <p className="text-muted mt-1 mb-1">
        {t("Please change your password to proceed further.")}
      </p>
      <p className="text-muted mb-1">
        {t(
          "Password should be valid min 8 and max 15 and also contain atleast one lowercase one uppercase and one numeric."
        )}
      </p>

      {isResetPasswordSuccess && (
        <Alert variant="success">{isResetPasswordSuccess}</Alert>
      )}

      {isResponse && (
        <Alert variant="danger" className="my-2">
          {isResponse}
        </Alert>
      )}

      {!isPasswordReset && (
        <VerticalForm<UserData>
          onSubmit={onSubmit}
          resolver={schemaResolver}
          defaultValues={{}}
          formClass="authentication-form"
        >
          <FormInput
            type="password"
            name="password"
            label={t("Current Password")}
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
            placeholder={t("Enter your current Password")}
            containerClass={"mb-3"}
            required
          ></FormInput>

          <FormInput
            type="password"
            name="newPassword"
            label={t("New Password")}
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
            placeholder={t("Enter your New Password")}
            containerClass={"mb-3"}
            required
          ></FormInput>

          {/* <FormInput
              label={t("Email Address")}
              type="email"
              name="email"
              startIcon={<FeatherIcons icon={"mail"} className="icon-dual" />}
              placeholder={t("hello@gmail.com")}
              containerClass={"mb-3"}
            /> */}

          <div className="mb-0 text-center">
            <Button className="w-100" type="submit" disabled={loading}>
              {t("Reset")}
            </Button>
          </div>
        </VerticalForm>
      )}
      {/* </AuthLayout> */}
    </>
  );
};

export default ResetPassword;
