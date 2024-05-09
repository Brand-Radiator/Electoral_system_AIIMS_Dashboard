import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import AuthModal from "../../components/Modal";
import { Alert } from "react-bootstrap";

import {
  Row,
  Col,
  Card,
  Button,
  InputGroup,
  Form,
  Table,
} from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import PageTitle from "../../components/PageTitle";
import { FormInput, VerticalForm } from "../../components";
import { logoutUser } from "../../redux/actions";

interface Child {
  _id?: string;
  bannerTitle?: string;
  description?: string;
  mobileBannerUrl?: string;
  desktopBannerUrl?: string;
  id?: string;
  itemId?: string;
}

interface banner {
  _id?: string;
  bannerTitle?: string;
  description?: string;
  mobileBannerUrl?: string;
  desktopBannerUrl?: string;
  id?: string;
  itemId?: string;
  innerData?: Child[] | [];
}

const AddBanner = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [bannerData, setBannerData] = useState<banner[]>([]);

  const [bannerTitle, setBannerTitle] = useState("");
  const [description, setDescription] = useState("");
  const [desktopBannerUrl, setDesktopBannerUrl] = useState<File | null>(null);
  const [mobileBannerUrl, setMobileBannerUrl] = useState<File | null>(null);
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

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
    fetch("http://165.22.219.69:5002/get/banner")
      // fetch("http://165.22.219.69:5002/get/banner")

      .then((response) => response.json())
      .then((res) => setBannerData(res)); // resolve this response/ promise
  }, []);

  //   ------------------------------------------ setting image in the input--------------------------------
  const handleMobileBannerUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMobileBannerUrl(e.target.files[0]);
    }
  };

  const handleDesktopBannerUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDesktopBannerUrl(e.target.files[0]);
    }
  };

  const addBanner = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("bannerTitle", bannerTitle);
      formData.append("description", description);

      if (mobileBannerUrl) {
        formData.append("mobileBannerUrl", mobileBannerUrl);
      }
      if (desktopBannerUrl) {
        formData.append("desktopBannerUrl", desktopBannerUrl);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/add/banner/${profileId}/${Key_Key}`,
          {
            // const response = await fetch(`http://165.22.219.69:5002/add/banner`, {

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
        if (data) {
          alert("Added");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error during edit the banner:", error);
      }
    }
    setValidated(true);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <Form
            style={{ width: "100%" }}
            onSubmit={addBanner}
            encType="multipart/form-data"
          >
            <h4>Add Banner</h4>
            {isError && (
              <Alert variant="danger" className="my-2">
                {isResponse}
              </Alert>
            )}
            {showModal && <AuthModal />}

            {/* <> */}
            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>
                  Banner Title <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="Banner Title"
                required
                defaultValue=""
                onChange={(e) => setBannerTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Description</h5>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                defaultValue=""
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex pt-1 justify-content-start">
                <h5>
                  Desktop Banner <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                type="file"
                id="image"
                name="desktopBannerUrl"
                required
                accept="image/*"
                onChange={handleDesktopBannerUrl}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex pt-1 justify-content-start">
                <h5>
                  Mobile Banner <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>

              <Form.Control
                type="file"
                id="image"
                name="mobileBannerUrl"
                accept="image/*"
                required
                onChange={handleMobileBannerUrl}
              />
            </Form.Group>

            <Form.Group className="pt-5 pb-5">
              <Button type="submit">Add Banner</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

const UpdateBanner: React.FC<banner> = ({ itemId, innerData }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [missionandvision, setMissionandVision] = useState<banner[]>([]);
  const [bannerData, setBannerData] = useState<banner[]>([]);

  const [bannerTitle, setBannerTitle] = useState("");
  const [description, setDescription] = useState("");
  const [desktopBannerUrl, setDesktopBannerUrl] = useState<File | null>(null);
  const [mobileBannerUrl, setMobileBannerUrl] = useState<File | null>(null);
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

  // useEffect(() => {
  //   fetch('http://165.22.219.69:5002/get/banner')
  //     .then(response => response.json())
  //     .then(res => setBannerData(res))// resolve this response/ promise
  // }, [])

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  //   ------------------------------------------ setting image in the input--------------------------------
  const handleBannerUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDesktopBannerUrl(e.target.files[0]);
    }
  };

  const handleMobileBannerUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMobileBannerUrl(e.target.files[0]);
    }
  };

  const updateBanner = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("bannerTitle", bannerTitle);
      formData.append("description", description);

      if (mobileBannerUrl) {
        formData.append("mobileBannerUrl", mobileBannerUrl);
      }
      if (desktopBannerUrl) {
        formData.append("desktopBannerUrl", desktopBannerUrl);
      }
      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/update/${itemId}/${profileId}/${Key_Key}`,
          // `http://165.22.219.69:5002/api/update/${itemId}`,

          {
            method: "PATCH",
            body: formData,
            // headers: {
            //   token: `${user?.token}`,
            // },
            credentials: "include",
          }
        );

        if (response.status === 440) {
          alert("Session Expired");
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
        if (data) {
          alert("Updated");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error during edit the banner:", error);
      }
    }
    // setValidated(true);
  };

  return (
    <>
      <Card>
        <Card.Body>
          {(innerData || [])
            .filter((item: Child) => {
              return item._id === itemId;
            })
            .map((filterItem: Child, index: number) => (
              <Form
                style={{ width: "100%" }}
                onSubmit={updateBanner}
                encType="multipart/form-data"
              >
                <h4>Update Banner</h4>
                {isError && (
                  <Alert variant="danger" className="my-2">
                    {isResponse}
                  </Alert>
                )}
                {showModal && <AuthModal />}
                {/* <> */}
                <Form.Group>
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>Banner Title</h5>
                  </Form.Label>
                  <Form.Control
                    className="accordion-item"
                    type="text"
                    placeholder={filterItem?.bannerTitle}
                    defaultValue={filterItem?.bannerTitle}
                    onChange={(e) => setBannerTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>Description</h5>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={filterItem?.description}
                    defaultValue={filterItem?.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-1 justify-content-start">
                    <h5>Desktop Banner</h5>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="image"
                    name="desktopBannerUrl"
                    accept="image/*"
                    onChange={handleBannerUrl}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-1 justify-content-start">
                    <h5>Mobile Banner</h5>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="image"
                    name="mobileBannerUrl"
                    accept="image/*"
                    onChange={handleMobileBannerUrl}
                  />
                </Form.Group>
                <Form.Group className="pt-2 pb-2">
                  <Button type="submit">Update</Button>
                </Form.Group>
              </Form>
            ))}
        </Card.Body>
      </Card>
    </>
  );
};

// ---------------------------------      Delete   ------------------------------
const DeleteBanner: React.FC<banner> = () => {
  const [validated, setValidated] = useState<boolean>(false);

  const [bannerData, setBannerData] = useState<banner[]>([]);
  const [isEditItem, setIsEditItem] = useState<string>("");
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

  // useEffect(() => {
  //   fetch(`http://165.22.219.69:5002/api/banner`)
  //     .then((response) => response.json())
  //     .then((res) => setInnerData(res.filteredData));
  // }, []);

  const deleteItem = async (itemId: string) => {
    try {
      const response = await fetch(
        `http://165.22.219.69:5002/delete/banner/${itemId}/${profileId}/${Key_Key}`,
        // `http://165.22.219.69:5002/delete/banner/${itemId}`,

        {
          method: "PATCH",
          // headers: {
          //   token: `${user?.token}`,
          // },
          credentials: "include",
        }
      );

      if (response.status === 440) {
        alert("Session Expired");
        dispatch(logoutUser());
        window.location.href = "https://admin.biharsports.org/auth/login"; // Use the full URL, including the protocol (http or https)
      }

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Assuming you want to parse the JSON response
      const data = await response.json();
    } catch (error) {
      console.error("Error during edit the banner:", error);
    }
  };
  useEffect(() => {
    fetch("http://165.22.219.69:5002/get/banner")
      // fetch("http://165.22.219.69:5002/get/banner")

      .then((response) => response.json())
      .then((res) => setBannerData(res)); // resolve this response/ promise
  }, []);

  const editItem = async (id: string) => {
    let newEditItem = bannerData.find((elem) => {
      return elem._id === id;
    });
    setIsEditItem(id);
  };

  return (
    <>
      <Row>
        {isEditItem ? (
          <Col lg={10}>
            {bannerData && (
              <UpdateBanner itemId={isEditItem} innerData={bannerData} />
            )}
          </Col>
        ) : (
          <Card>
            <h4>Delete Banner</h4>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Notice Title</th>
                    <th>Actions</th> {/* New column for actions */}
                  </tr>
                </thead>
                {(bannerData || []).map((item, i) => (
                  <tbody>
                    <tr key={item._id}>
                      <td>{i + 1}</td> {/* You can use i+1 as the index */}
                      <td>{item.bannerTitle}</td>
                      <td>
                        <Row>
                          <Col lg={4}>
                            {/* Delete button */}
                            <button
                              onClick={() => deleteItem(item?._id ?? "")}
                              className="btn btn-danger"
                            >
                              Delete
                            </button>
                          </Col>

                          <Col lg={4}>
                            <button
                              onClick={() => editItem(item._id ?? "")}
                              className="btn btn-primary"
                            >
                              Update
                            </button>
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </Card.Body>
          </Card>
        )}
      </Row>
    </>
  );
};

const FormValidation = () => {
  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          // { label: "Forms", path: "/forms/gallery" },
          // { label: "Validation", path: "/forms/gallery", active: true },

          { label: "Pages", path: "/pages/banner" },
          {
            label: "Banner ",
            path: "/pages/banner",
            active: true,
          },
        ]}
        title={"Banner Section"}
      />
      <Row>
        {/* <Col lg={6}>
                        <UpdateBanner />
                    </Col> */}
        <Col lg={6}>
          <AddBanner />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <DeleteBanner />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FormValidation;
