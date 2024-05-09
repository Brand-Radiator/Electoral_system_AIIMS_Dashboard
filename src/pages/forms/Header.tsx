import React, { useEffect, useState, FormEvent } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Card, Button, InputGroup, Form } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import AuthModal from "../../components/Modal";
import { Alert } from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";
import { FormInput, VerticalForm } from "../../components";
import { logoutUser } from "../../redux/actions";
import { API_BASE_URL } from "../../apiservices/apiService";

export interface HeaderType {
  _id: string;
  designation: string;
  profileName: string;
  slogan: string;
  state: string;
  cmImage: string;
  buttonImage: string;
}

// ------------------------------------------add Header -----------------
const AddHeader = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [headerData, setHeaderData] = useState<HeaderType[]>([]);
  const [designation, setDesignation] = useState<string>("");
  const [profileName, setProfileName] = useState<string>("");
  const [slogan, setSlogan] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [cmImage, setCmImage] = useState<File | null>(null);
  const [buttonImage, setButtonImage] = useState<File | null>(null);
  const [mobileLogo, setMobileLogo] = useState<File | null>(null);
  const [desktopLogo, setDesktopLogo] = useState<File | null>(null);
  const [background, setBackground] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState("");
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
  let profileId = user._id ? user._id : user.user ? user.user._id : "";
  const Key_Key = user.moniterd_ttl
    ? user.moniterd_ttl
    : user.user
    ? user.user.moniterd_ttl
    : "";

  useEffect(() => {
    fetch("${API_BASE_URL}/get/header")
      // fetch("http:localhost/5002/get/header")

      .then((response) => response.json())
      .then((res) => setHeaderData(res)); // resolve this response/ promise
  }, []);

  const handleCmImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCmImage(e.target.files[0]);
    }
  };

  const handleButtonImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setButtonImage(e.target.files[0]);
    }
  };

  const handleMobileLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMobileLogo(e.target.files[0]);
    }
  };

  const handleDesktopLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDesktopLogo(e.target.files[0]);
    }
  };
  const handleBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBackground(e.target.files[0]);
    }
  };

  // const handleSubmit = async (event: any) => {
  //   const form = event.currentTarget;
  //   if (form.checkValidity() === false) {
  //     event.preventDefault();
  //     event.stopPropagation();
  //   } else {
  //     await addHeader(); // Call the editBanner function
  //   }

  //   setValidated(true);
  // };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("designation", designation);
      formData.append("profileName", profileName);
      formData.append("slogan", slogan);
      formData.append("state", state);
      if (cmImage) {
        formData.append("cmImage", cmImage);
      }
      if (buttonImage) {
        formData.append("buttonImage", buttonImage);
      }
      if (mobileLogo) {
        formData.append("mobileLogo", mobileLogo);
      }
      if (desktopLogo) {
        formData.append("desktopLogo", desktopLogo);
      }
      if (background) {
        formData.append("background", background);
      }
      try {
        const response = await fetch(
          `${API_BASE_URL}/add/header/${profileId}/${Key_Key}`,
          // `http:localhost/5002/add/header/${profileId}`
          {
            method: "POST",
            body: formData,
            // headers: {
            //   token: `${user?.token}`,
            // },
            credentials: "include",
          }
        );

        if (response.status === 440) {
          alert("Session Expired");
          sessionStorage.removeItem("appSession-2h3jlk5");
          dispatch(logoutUser());
          window.location.href = "https://admin.biharsports.org/auth/login"; // Use the full URL, including the protocol (http or https)
        }

        if (response.status === 429) {
          // console.log("response---6566656", response)
          setShowModal(true);
        }
        // console.log("response--statue", response)

        if (response.status === 400) {
          setIsError(true);
          let errorMessage = await response.json();
          setIsResponse(errorMessage.message);
        }

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Assuming you want to parse the JSON response
        const data = await response.json();
        if (response.ok) {
          alert("Added");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error during edit the Hrader:", error);
      }
    }
  };
  //   -------------------- function for edit the header section ---------------------------

  // ----------------------------------------------------------------------------------------
  return (
    <>
      {headerData.length == 0 ? (
        <Card>
          <Card.Body>
            {isError && (
              <Alert variant="danger" className="my-2">
                {isResponse}
              </Alert>
            )}
            {showModal && <AuthModal />}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-1" controlId="validationCustom01">
                <Form.Label>
                  Designation <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Designation"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-1" controlId="validationCustom02">
                <Form.Label>
                  Profile Name <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Profile Name"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-1" controlId="validationCustom02">
                <Form.Label>
                  Slogan<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Slogan"
                  value={slogan}
                  onChange={(e) => setSlogan(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-1" controlId="validationCustom02">
                <Form.Label>
                  State<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-1 justify-content-start">
                  <h5>
                    CM Image<span style={{ color: "red" }}> *</span>
                    <span style={{ color: "gray" }}>
                      , Dimension: (300 × 300)px
                    </span>{" "}
                  </h5>
                </Form.Label>
                <Form.Control
                  type="file"
                  id="image"
                  name="cmImage"
                  accept="image/*"
                  required
                  onChange={handleCmImage}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-1 justify-content-start">
                  <h5>
                    Button image<span style={{ color: "red" }}> *</span>{" "}
                    <span style={{ color: "gray" }}>
                      , Dimension: (49 × 35)px
                    </span>{" "}
                  </h5>
                </Form.Label>
                <Form.Control
                  type="file"
                  id="image"
                  name="buttonImage"
                  accept="image/*"
                  required
                  onChange={handleButtonImage}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-1 justify-content-start">
                  <h5>
                    {" "}
                    Desktop Logo
                    <span style={{ color: "gray" }}>
                      , Dimension: (113 × 73 )px
                    </span>{" "}
                  </h5>
                </Form.Label>
                <Form.Control
                  type="file"
                  id="image"
                  name="desktopLogo"
                  required
                  accept="image/*"
                  onChange={handleDesktopLogo}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-1 justify-content-start">
                  <h5>
                    {" "}
                    Mobile Logo
                    <span style={{ color: "gray" }}>
                      , Dimension: ( 87 × 56 )px
                    </span>{" "}
                  </h5>
                </Form.Label>
                <Form.Control
                  type="file"
                  id="image"
                  name="mobileLogo"
                  required
                  accept="image/*"
                  onChange={handleMobileLogo}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-1 justify-content-start">
                  <h5>
                    Background Image
                    <span style={{ color: "gray" }}>
                      , Dimension: ( 365 × 265 )px
                    </span>{" "}
                  </h5>
                </Form.Label>
                <Form.Control
                  type="file"
                  id="image"
                  name="background"
                  required
                  accept="image/*"
                  onChange={handleBackground}
                />
              </Form.Group>

              <Form.Group className="pt-2 pb-1">
                <Button type="submit">Add Header</Button>
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
      ) : (
        ""
      )}
    </>
  );
};

// ---------------------------------------edit header code start
const UpdateHeader = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState("");

  const [headerData, setHeaderData] = useState<HeaderType[]>([]);
  const [designation, setDesignation] = useState<string>("");
  const [profileName, setProfileName] = useState<string>("");
  const [slogan, setSlogan] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [cmImage, setCmImage] = useState<File | null>(null);
  const [buttonImage, setButtonImage] = useState<File | null>(null);

  const [mobileLogo, setMobileLogo] = useState<File | null>(null);
  const [desktopLogo, setDesktopLogo] = useState<File | null>(null);
  const [background, setBackground] = useState<File | null>(null);
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
  let profileId = user._id ? user._id : user.user ? user.user._id : "";
  const Key_Key = user.moniterd_ttl
    ? user.moniterd_ttl
    : user.user
    ? user.user.moniterd_ttl
    : "";

  useEffect(() => {
    fetch("${API_BASE_URL}/get/header")
      // fetch("http:localhost/5002/get/header")

      .then((response) => response.json())
      .then((res) => setHeaderData(res)); // resolve this response/ promise
  }, []);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     if (e.target.files && e.target.files.length > 0) {
  //       setImage(e.target.files[0]);
  //     }
  //   };

  const handleImage1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCmImage(e.target.files[0]);
    }
  };

  const handleImage2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setButtonImage(e.target.files[0]);
    }
  };
  const handleMobileLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMobileLogo(e.target.files[0]);
    }
  };

  const handleDesktopLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDesktopLogo(e.target.files[0]);
    }
  };
  const handleBackground = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBackground(e.target.files[0]);
    }
  };

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault(); // Prevent the default form submission
    }

    // setValidated(true);
  };

  const editHeader = async (event: React.FormEvent<HTMLFormElement>) => {
    const form: EventTarget & HTMLFormElement = event.currentTarget;
    // if (form.checkValidity() === false) {
    //   event.preventDefault();
    //   event.stopPropagation();
    // } else {

    event.preventDefault();
    const formData = new FormData();
    formData.append("designation", designation);
    formData.append("profileName", profileName);
    formData.append("slogan", slogan);
    formData.append("state", state);

    if (cmImage) {
      formData.append("cmImage", cmImage);
    }
    if (buttonImage) {
      formData.append("buttonImage", buttonImage);
    }
    if (mobileLogo) {
      formData.append("mobileLogo", mobileLogo);
    }
    if (desktopLogo) {
      formData.append("desktopLogo", desktopLogo);
    }
    if (background) {
      formData.append("background", background);
    }
    try {
      const response = await fetch(
        `${API_BASE_URL}/update/header/${headerData[0]?._id}/${profileId}/${Key_Key}`,
        // `http:localhost/5002/update/header/${headerData[0]?._id}/${profileId}`,
        {
          method: "PATCH",
          body: formData,
          // headers: {
          //   token: `${user?.token}`,
          // },
          credentials: "include",
        }
      );

      // console.log("response---", response);

      if (response.status === 440) {
        alert("Session Expired");
        dispatch(logoutUser());
        window.location.href = "https://admin.biharsports.org/auth/login";
      }

      if (response.status === 429) {
        // console.log("response---6566656 429", response);
        setShowModal(true);
      }
      // console.log("response--statue", response)
      if (response.status === 400) {
        // console.log("response--statue 400", response)

        setIsError(true);
        let errorMessage = await response.json();
        setIsResponse(errorMessage.message);
      }
      // console.log('response-- ',response)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Assuming you want to parse the JSON response
      const data = await response.json();
      if (data) {
        alert("Updated");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during edit the banner:", error);
    }
    // }
    // setValidated(true);
  };
  // console.log("from update user");
  return (
    <>
      <Card>
        <Card.Body>
          {isError && (
            <Alert variant="danger" className="my-2">
              {isResponse}
            </Alert>
          )}
          {showModal && <AuthModal />}
          <Form noValidate validated={validated} onSubmit={editHeader}>
            {(headerData || []).map((item, i) => (
              <div key={i}>
                <Form.Group className="mb-1" controlId="validationCustom01">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={item.designation}
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-1" controlId="validationCustom02">
                  <Form.Label>Profile Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={item.profileName}
                    value={profileName}
                    onChange={(e) => setProfileName(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-1" controlId="validationCustom02">
                  <Form.Label>Slogan</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={item.slogan}
                    value={slogan}
                    onChange={(e) => setSlogan(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-1" controlId="validationCustom02">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={item.state}
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-1 justify-content-start">
                    <h5>
                      CM Image{" "}
                      <span style={{ color: "gray" }}>
                        , Dimension: (300 × 300)px
                      </span>{" "}
                    </h5>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="image"
                    name="cmImage"
                    accept="image/*"
                    onChange={handleImage1Change}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-1 justify-content-start">
                    <h5>
                      Button image{" "}
                      <span style={{ color: "gray" }}>
                        , Dimension: (49 × 35)px
                      </span>{" "}
                    </h5>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="image"
                    name="buttonImage"
                    accept="image/*"
                    onChange={handleImage2Change}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-1 justify-content-start">
                    <h5>
                      {" "}
                      Desktop Logo
                      <span style={{ color: "gray" }}>
                        , Dimension: ( 113 × 73 )px
                      </span>{" "}
                    </h5>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="image"
                    name="desktopLogo"
                    required
                    accept="image/*"
                    onChange={handleDesktopLogo}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-1 justify-content-start">
                    <h5>
                      {" "}
                      Mobile Logo
                      <span style={{ color: "gray" }}>
                        , Dimension: ( 87 × 56 )px
                      </span>{" "}
                    </h5>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="image"
                    name="mobileLogo"
                    required
                    accept="image/*"
                    onChange={handleMobileLogo}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-1 justify-content-start">
                    <h5>
                      Background Image{" "}
                      <span style={{ color: "gray" }}>
                        , Dimension: ( 365 × 265 )px
                      </span>{" "}
                    </h5>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="image"
                    name="background"
                    required
                    accept="image/*"
                    onChange={handleBackground}
                  />
                </Form.Group>

                <Form.Group className="pt-2 pb-1">
                  <Button type="submit">Update</Button>
                </Form.Group>
              </div>
            ))}
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
// ----------------------------------------- edit header code ends----------------------------------

const FormValidation = () => {
  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Home", path: "/home/header" },
          { label: "Header", path: "/home/header", active: true },
        ]}
        title={"Edit Header section"}
      />

      <Row>
        <Col lg={6}>
          <UpdateHeader />
        </Col>

        <Col lg={6}>
          <AddHeader />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FormValidation;
