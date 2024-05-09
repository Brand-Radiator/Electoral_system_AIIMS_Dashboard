import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import api from "../../utils/ApiMethod";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";

interface missionAndVisionAchievement {
  _id: string;
  bannerUrl: string;
  mobileBannerUrl: string;
  pageImage: string;
  heading: string;
  paragraph: string;
}

const DeletePolicy = () => {
  const [validated, setValidated] = useState<boolean>(false);

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

  const deleteItem = async (itemId: string) => {
    try {
      const response = await fetch(
        `http://165.22.219.69:5002/api/policypage/${itemId}/${profileId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
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
    fetch("http://165.22.219.69:5002/api/policypage")
      .then((response) => response.json())
      .then((res) => setMissionandVision(res));
  }, []);

  return (
    <>
      <>
        <h4>Delete Policy</h4>

        <Card>
          <Card.Body>
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

const OurPolicy = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [introductionData, setIntroductionData] = useState<
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

  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");

  const [bannerUrl, setBannerUrl] = useState<File | null>(null);
  const [mobileBannerUrl, setMobileUrl] = useState<File | null>(null);
  const [pageImage, setPageImageUrl] = useState<File | null>(null);

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleFetchData = async () => {
    try {
      // const data = await api.fetchData("/api/policypage");
      fetch("http://165.22.219.69:5002/api/policypage")
        .then((response) => response.json())
        .then((res) => setIntroductionData(res));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleFetchData();
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
          `http://165.22.219.69:5002/api/Policypage/${profileId}`,
          { method: "POST", body: formData, credentials: "include" }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Assuming you want to parse the JSON response
        const data = await response.json();
        if (data) {
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
          `http://165.22.219.69:5002/api/introduction/${objectId}/${profileId}`,
          {
            method: "PATCH",
            body: formData,
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Assuming you want to parse the JSON response
        const data = await response.json();
      } catch (error) {
        console.error("Error during edit the banner:", error);
      }
    }
    setValidated(true);
  };

  return (
    <>
      <div>
        <PageTitle
          breadCrumbItems={[
            { label: "Pages", path: "/pages/our-policy" },
            { label: "Our Policy", path: "/pages/our-policy", active: true },
          ]}
          title={"Our Policy"}
        />
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
                    <h4>Our Policy </h4>
                    {/* <> */}
                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>Heading</h5>
                      </Form.Label>
                      <Form.Control
                        className="accordion-item"
                        type="text"
                        placeholder="Heading"
                        defaultValue=""
                        onChange={(e) => setHeading(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>Paragraph</h5>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Paragraph"
                        defaultValue=""
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
                        <h5>Introduction Image</h5>
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
                    <h4>Our Policy </h4>
                    {/* <> */}
                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>Title</h5>
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
                        <h5>Description</h5>
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
                        <h5>Desktop Banner Image</h5>
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
                        <h5>Upload documents</h5>
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
                      <Button type="submit">Edit Form</Button>
                    </Form.Group>
                  </Form>
                </Col>
              )}

              {/* -------------------------- update data--------------------------------------------- */}
            </Row>
          </Card.Body>
        </Card>

        <DeletePolicy />
      </div>
    </>
  );
};

export default OurPolicy;
