import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import AuthModal from "../../components/Modal";
import { Alert } from "react-bootstrap";
import { logoutUser } from "../../redux/actions";

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

interface missionAndVisionAchievement {
  _id: string;
  bannerUrl: string;
  missionUrl: string;
  missionDescription: string;
  VisionUrl: string;
  VisionDescription: string;
  mobileBannerUrl: string;
  objectiveUrl: string;
  objectiveDescription: string;
}

const NormalFormValidation = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [missionandvision, setMissionandVision] = useState<
    missionAndVisionAchievement[]
  >([]);
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

  const [playerName, setPlayerName] = useState("");
  const [achievement, setAchievement] = useState("");
  const [year, setYear] = useState("");

  const [missionDescription, setMissionDescription] = useState("");
  const [VisionDescription, setVisionDescription] = useState("");
  const [objectiveDescription, setObjectiveDescription] = useState("");

  const [bannerUrl, setBannerUrl] = useState<File | null>(null);
  const [missionUrl, setMissionUrl] = useState<File | null>(null);
  const [VisionUrl, setVisionUrl] = useState<File | null>(null);
  const [mobileBannerUrl, setMobileBannerUrl] = useState<File | null>(null);
  const [objectiveUrl, setObjectiveUrl] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState("");

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  useEffect(() => {
    fetch("http://165.22.219.69:5002/get/missionandvission")
      // fetch("http://localhost/5002/get/missionandvission")

      .then((response) => response.json())
      .then((res) => setMissionandVision(res)); // resolve this response/ promise
  }, []);

  //   ------------------------------------------ setting image in the input--------------------------------
  const handleBannerUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBannerUrl(e.target.files[0]);
    }
  };

  const handleMissionUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMissionUrl(e.target.files[0]);
    }
  };

  const handleVisionUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVisionUrl(e.target.files[0]);
    }
  };

  const handleMobileBannerUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMobileBannerUrl(e.target.files[0]);
    }
  };

  const ObjectiveUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setObjectiveUrl(e.target.files[0]);
    }
  };

  const addGallery = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("missionDescription", missionDescription);
      formData.append("VisionDescription", VisionDescription);
      formData.append("objectiveDescription", objectiveDescription);

      if (bannerUrl) {
        formData.append("bannerUrl", bannerUrl);
      }
      if (missionUrl) {
        formData.append("missionUrl", missionUrl);
      }
      if (objectiveUrl) {
        formData.append("objectiveUrl", objectiveUrl);
      }
      if (VisionUrl) {
        formData.append("VisionUrl", VisionUrl);
      }
      if (mobileBannerUrl) {
        formData.append("mobileBannerUrl", mobileBannerUrl);
      }

      console.log("formData-------,", formData);

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/add/missionandvission/${profileId}/${Key_Key}`,

          {
            method: "POST",
            body: formData,
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
            onSubmit={addGallery}
            encType="multipart/form-data"
          >
            <h4>Add Mission, Vision and objective</h4>
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
                  Mission Content <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                required
                placeholder="Mission Content"
                defaultValue=""
                onChange={(e) => setMissionDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>
                  Vision Content <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Vision Content"
                required
                defaultValue=""
                onChange={(e) => setVisionDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>
                  Objective Description <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Objective Description"
                required
                defaultValue=""
                onChange={(e) => setObjectiveDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex pt-1 justify-content-start">
                <h5>
                  Banner Image <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                type="file"
                id="image"
                required
                name="bannerUrl"
                accept="image/*"
                onChange={handleBannerUrl}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex pt-1 justify-content-start">
                <h5>
                  Mission Image <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                type="file"
                id="image"
                name="missionUrl"
                required
                accept="image/*"
                onChange={handleMissionUrl}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex pt-1 justify-content-start">
                <h5>
                  Vision Image <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                type="file"
                required
                id="image"
                name="VisionUrl"
                accept="image/*"
                onChange={handleVisionUrl}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex pt-1 justify-content-start">
                <h5>
                  Mission Image <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                type="file"
                required
                id="image"
                name="missionUrl"
                accept="image/*"
                onChange={ObjectiveUrl}
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
                required
                accept="image/*"
                onChange={handleMobileBannerUrl}
              />
            </Form.Group>

            <Form.Group className="pt-5 pb-5">
              <Button type="submit">Add</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

const UpdateMissionAndVision = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [missionandvision, setMissionandVision] = useState<
    missionAndVisionAchievement[]
  >([]);
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

  const [playerName, setPlayerName] = useState("");
  const [achievement, setAchievement] = useState("");
  const [year, setYear] = useState("");

  const [missionDescription, setMissionDescription] = useState("");
  const [VisionDescription, setVisionDescription] = useState("");
  const [objectiveDescription, setObjectiveDescription] = useState("");

  const [bannerUrl, setBannerUrl] = useState<File | null>(null);
  const [missionUrl, setMissionUrl] = useState<File | null>(null);
  const [VisionUrl, setVisionUrl] = useState<File | null>(null);
  const [mobileBannerUrl, setMobileBannerUrl] = useState<File | null>(null);
  const [objectiveUrl, setObjectiveUrl] = useState<File | null>(null);

  useEffect(() => {
    fetch("http://165.22.219.69:5002/get/missionandvission")
      .then((response) => response.json())
      .then((res) => setMissionandVision(res)); // resolve this response/ promise
  }, []);

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
      setBannerUrl(e.target.files[0]);
    }
  };

  const handleMissionUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMissionUrl(e.target.files[0]);
    }
  };
  const handleMobileBannerUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMobileBannerUrl(e.target.files[0]);
    }
  };
  const ObjectiveUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setObjectiveUrl(e.target.files[0]);
    }
  };

  const handleVisionUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVisionUrl(e.target.files[0]);
    }
  };

  const updateMissionandVision = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("missionDescription", missionDescription);
      formData.append("VisionDescription", VisionDescription);
      formData.append("objectiveDescription", objectiveDescription);

      if (bannerUrl) {
        formData.append("bannerUrl", bannerUrl);
      }
      if (missionUrl) {
        formData.append("missionUrl", missionUrl);
      }
      if (VisionUrl) {
        formData.append("VisionUrl", VisionUrl);
      }
      if (mobileBannerUrl) {
        formData.append("mobileBannerUrl", mobileBannerUrl);
      }

      if (objectiveUrl) {
        formData.append("objectiveUrl", objectiveUrl);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/update/missionandvission/${missionandvision[0]?._id}/${profileId}/${Key_Key}`,
          // `http://localhost/5002/update/missionandvission/${missionandvision[0]?._id}`,

          {
            method: "PATCH",
            body: formData,
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
    setValidated(true);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Form
            style={{ width: "100%" }}
            onSubmit={updateMissionandVision}
            encType="multipart/form-data"
          >
            <h4>Update Mission, Vision and Objective</h4>
            {isError && (
              <Alert variant="danger" className="my-2">
                {isResponse}
              </Alert>
            )}
            {showModal && <AuthModal />}
            {/* <> */}
            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Mission Content</h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder={missionandvision[0]?.missionDescription}
                defaultValue={missionandvision[0]?.missionDescription}
                onChange={(e) => setMissionDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Vision Content</h5>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={missionandvision[0]?.VisionDescription}
                defaultValue={missionandvision[0]?.VisionDescription}
                onChange={(e) => setVisionDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Objective Description </h5>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder={missionandvision[0]?.objectiveDescription}
                defaultValue={missionandvision[0]?.objectiveDescription}
                onChange={(e) => setObjectiveDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex pt-1 justify-content-start">
                <h5>Banner Image</h5>
              </Form.Label>
              <Form.Control
                type="file"
                placeholder="fhfhfhfh"
                id="image"
                name="bannerUrl"
                accept="image/*"
                onChange={handleBannerUrl}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex pt-1 justify-content-start">
                <h5>Mission Image</h5>
              </Form.Label>
              <Form.Control
                type="file"
                id="image"
                name="missionUrl"
                accept="image/*"
                onChange={handleMissionUrl}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex pt-1 justify-content-start">
                <h5>Vision Image</h5>
              </Form.Label>
              <Form.Control
                type="file"
                id="image"
                name="VisionUrl"
                accept="image/*"
                onChange={handleVisionUrl}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex pt-1 justify-content-start">
                <h5>Mission Image</h5>
              </Form.Label>
              <Form.Control
                type="file"
                id="image"
                name="missionUrl"
                accept="image/*"
                onChange={ObjectiveUrl}
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

            <Form.Group className="pt-5 pb-5">
              <Button type="submit">Update</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
// ___________________________________________________________________________________________________
// ---------------------------------      Delete   ------------------------------
const DeleteMissionAndVision = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const [missionandvision, setMissionandVision] = useState<
    missionAndVisionAchievement[]
  >([]);
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

  const deleteItem = async (itemId: string) => {
    try {
      const response = await fetch(
        `http://165.22.219.69:5002/delete/missionandvission/${itemId}/${profileId}/${Key_Key}`,
        {
          method: "PATCH",
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
      if (data) {
        alert("Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during edit the banner:", error);
    }
  };
  useEffect(() => {
    fetch("http://165.22.219.69:5002/get/missionandvission")
      .then((response) => response.json())
      .then((res) => setMissionandVision(res)); // resolve this response/ promise
  }, []);

  return (
    <>
      {(missionandvision || []).map((item, i) => (
        <>
          <h4>Delete Mission and vision</h4>

          <Card>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Notice Title</th>
                    <th>Actions</th> {/* New column for actions */}
                  </tr>
                </thead>
                <tbody>
                  <tr key={item._id}>
                    <td>{i + 1}</td> {/* You can use i+1 as the index */}
                    <td>{item.VisionDescription}</td>
                    <td>
                      {/* Delete button */}
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </>
      ))}
    </>
  );
};

const FormValidation = () => {
  const [missionandvision, setMissionandVision] = useState<
    missionAndVisionAchievement[]
  >([]);

  useEffect(() => {
    fetch("http://165.22.219.69:5002/get/missionandvission")
      .then((response) => response.json())
      .then((res) => setMissionandVision(res)); // resolve this response/ promise
  }, []);

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          // { label: "Forms", path: "/forms/gallery" },
          // { label: "Validation", path: "/forms/gallery", active: true },

          { label: "Pages", path: "/pages/internationalachievement" },
          {
            label: "International Achievements",
            path: "/pages/internationalachievement",
            active: true,
          },
        ]}
        title={"Mission, Vision and Objective Section"}
      />
      <Row>
        {missionandvision.length >= 1 ? (
          <Col lg={10}>
            <UpdateMissionAndVision />
          </Col>
        ) : (
          <Col lg={10}>
            <NormalFormValidation />
          </Col>
        )}
      </Row>
      <Row>
        <Col lg={12}>
          <DeleteMissionAndVision />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FormValidation;
