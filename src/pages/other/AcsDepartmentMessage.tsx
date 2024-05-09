import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { logoutUser } from "../../redux/actions";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import AuthModal from "../../components/Modal";
import { Alert } from "react-bootstrap";

interface missionAndVisionAchievement {
  _id: string;
  bannerUrl: string;
  mobileBannerUrl: string;
  pageImage: string;
  heading: string;
  paragraph: string;
  designation: string;
}

const DeleteCmMessage = () => {
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

  const deleteItem = async (itemId: string) => {
    try {
      const response = await fetch(
        `http://165.22.219.69:5002/api/delete/acsdepartmentmessage/${itemId}/${profileId}/${Key_Key}`,

        // `http://165.22.219.69:5002/api/delete/dyptcmmessage/${itemId}`,
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
    fetch("http://165.22.219.69:5002/api/acsdepartmentmessage")
      // fetch("http://165.22.219.69:5002/api/acsdepartmentmessage")
      .then((response) => response.json())
      .then((res) => setMissionandVision(res));
  }, []);

  return (
    <>
      <>
        <Card>
          <Card.Body>
            <h4>Delete depty Chief Minister Info</h4>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr. N</th>
                  <th>Title</th>
                  <th>Paragraph</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {(missionandvision || []).map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td> {/* You can use i+1 as the index */}
                    <td>{item.heading}</td>
                    <td>{item.paragraph}</td>
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
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </>
    </>
  );
};

const Introduction = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [introductionData, setIntroductionData] = useState<
    missionAndVisionAchievement[]
  >([]);

  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [designation, setDesignation] = useState("");

  const [bannerUrl, setBannerUrl] = useState<File | null>(null);
  const [mobileBannerUrl, setMobileUrl] = useState<File | null>(null);
  const [pageImage, setPageImageUrl] = useState<File | null>(null);
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
    fetch("http://165.22.219.69:5002/api/acsdepartmentmessage")
      // fetch("http://165.22.219.69:5002/api/acsdepartmentmessage")
      .then((response) => response.json())
      .then((res) => setIntroductionData(res)); // resolve this response/ promise
  }, []);

  //   ------------------------------------------ setting image in the input--------------------------------
  const handleBannerUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setBannerUrl(e.target.files[0]);
    }
  };

  const handleMobileUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMobileUrl(e.target.files[0]);
    }
  };

  const handlePageImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPageImageUrl(e.target.files[0]);
    }
  };

  /*---------------- handle Form submit ---------------------------------------*/

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("heading", heading);
      formData.append("paragraph", paragraph);
      formData.append("designation", designation);

      if (bannerUrl) {
        formData.append("bannerUrl", bannerUrl);
      }
      if (mobileBannerUrl) {
        formData.append("mobileBannerUrl", mobileBannerUrl);
      }
      if (pageImage) {
        formData.append("pageImage", pageImage);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/acsdepartmentmessage/${profileId}/${Key_Key}`,
          // "http://165.22.219.69:5002/api/acsdepartmentmessage",
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

  /*----------------  handle update----------------*/

  let objectId: any;

  if (introductionData.length > 0) {
    const { _id } = introductionData[0];
    objectId = _id;
  }

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("heading", heading);
      formData.append("paragraph", paragraph);
      formData.append("designation", designation);

      if (bannerUrl) {
        formData.append("bannerUrl", bannerUrl);
      }
      if (mobileBannerUrl) {
        formData.append("mobileBannerUrl", mobileBannerUrl);
      }
      if (pageImage) {
        formData.append("pageImage", pageImage);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/update/acsdepartmentmessage/${objectId}/${profileId}/${Key_Key}`,
          // `http://165.22.219.69:5002/api/update/acsdepartmentmessage/${objectId}`,

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
          alert("Data updated");
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
      <div>
        <Card>
          <Card.Body>
            <Row>
              {introductionData.length === 0 ? (
                <Col lg={6}>
                  <Form
                    style={{ width: "100%" }}
                    onSubmit={handleFormSubmit}
                    encType="multipart/form-data"
                  >
                    <h4>Add Acs Department Info</h4>
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
                          Name <span style={{ color: "red" }}> *</span>{" "}
                        </h5>
                      </Form.Label>
                      <Form.Control
                        className="accordion-item"
                        type="text"
                        placeholder="Heading"
                        required
                        defaultValue=""
                        onChange={(e) => setHeading(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>
                          Designation <span style={{ color: "red" }}> *</span>
                        </h5>
                      </Form.Label>
                      <Form.Control
                        className="accordion-item"
                        required
                        type="text"
                        placeholder="Designation"
                        defaultValue=""
                        onChange={(e) => setDesignation(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>
                          Message <span style={{ color: "red" }}> *</span>
                        </h5>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Message"
                        required
                        defaultValue=""
                        onChange={(e) => setParagraph(e.target.value)}
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
                          Mobile Banner Image{" "}
                          <span style={{ color: "red" }}> *</span>
                        </h5>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        id="image"
                        required
                        name="mobileBannerUrl"
                        accept="image/*"
                        onChange={handleMobileUrl}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex pt-1 justify-content-start">
                        <h5>
                          depty Chief Minister Image{" "}
                          <span style={{ color: "red" }}> *</span>
                        </h5>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        required
                        id="image"
                        name="pageImage"
                        accept="image/*"
                        onChange={handlePageImageUrl}
                      />
                    </Form.Group>

                    <Form.Group className="pt-5 pb-5">
                      <Button type="submit">Add</Button>
                    </Form.Group>
                  </Form>
                </Col>
              ) : (
                <Col lg={6}>
                  <Form
                    style={{ width: "100%" }}
                    onSubmit={handleUpdate}
                    encType="multipart/form-data"
                  >
                    <h4>Update Acs Department Info</h4>
                    {isError && (
                      <Alert variant="danger" className="my-2">
                        {isResponse}
                      </Alert>
                    )}
                    {showModal && <AuthModal />}
                    {/* <> */}
                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>Heading</h5>
                      </Form.Label>
                      <Form.Control
                        className="accordion-item"
                        type="text"
                        placeholder="Heading"
                        defaultValue={introductionData[0]?.heading}
                        onChange={(e) => setHeading(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>Designation</h5>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Designation"
                        defaultValue={introductionData[0]?.designation}
                        onChange={(e) => setDesignation(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>Message</h5>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Paragraph"
                        defaultValue={introductionData[0]?.paragraph}
                        onChange={(e) => setParagraph(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex pt-1 justify-content-start">
                        <h5>Banner Image</h5>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        id="image"
                        name="bannerUrl"
                        accept="image/*"
                        onChange={handleBannerUrl}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex pt-1 justify-content-start">
                        <h5>Mobile Banner Image</h5>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        id="image"
                        name="mobileBannerUrl"
                        accept="image/*"
                        onChange={handleMobileUrl}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex pt-1 justify-content-start">
                        <h5>depty Chief Minister Image</h5>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        id="image"
                        name="pageImage"
                        accept="image/*"
                        onChange={handlePageImageUrl}
                      />
                    </Form.Group>

                    <Form.Group className="pt-5 pb-5">
                      <Button type="submit">Update</Button>
                    </Form.Group>
                  </Form>
                </Col>
              )}

              {/* -------------------------- update data--------------------------------------------- */}
            </Row>
          </Card.Body>
        </Card>

        <DeleteCmMessage />
      </div>
    </>
  );
};

export default Introduction;
