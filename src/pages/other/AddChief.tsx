import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import AuthModal from "../../components/Modal";
import { Alert } from "react-bootstrap";
import { logoutUser } from "../../redux/actions";
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

const DeleteCmMessage = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const [missionandvision, setMissionandVision] = useState<
    missionAndVisionAchievement[]
  >([]);

  const deleteItem = async (itemId: string) => {
    try {
      const response = await fetch(
        `http://165.22.219.69:5002/api/delete/cmmessage/${itemId}`,
        {
          method: "PATCH",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Assuming you want to parse the JSON response
      const data = await response.json();
      alert("Deleted");
      // console.log("data -----------", data);
    } catch (error) {
      console.error("Error during edit the banner:", error);
    }
  };
  useEffect(() => {
    fetch("http://165.22.219.69:5002/api/cmmessage")
      .then((response) => response.json())
      .then((res) => setMissionandVision(res));
  }, []);

  return (
    <>
      <>
        <h4>Delete Chief Minister Info</h4>

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

const Introduction = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [introductionData, setIntroductionData] = useState<
    missionAndVisionAchievement[]
  >([]);

  const [heading, setHeading] = useState("");
  const [paragraph, setParagraph] = useState("");

  const [bannerUrl, setBannerUrl] = useState<File | null>(null);
  const [mobileBannerUrl, setMobileUrl] = useState<File | null>(null);
  const [pageImage, setPageImageUrl] = useState<File | null>(null);
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
    fetch("http://165.22.219.69:5002/api/cmmessage")
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
          `http://165.22.219.69:5002/api/cmmessage`,
          {
            method: "POST",
            body: formData,
          }
        );
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
        alert("Data added");
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
          `http://165.22.219.69:5002/api/introduction/${objectId}`,
          {
            method: "PATCH",
            body: formData,
          }
        );
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
                    <h4>Add Chief Minister Info</h4>
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
                        defaultValue=""
                        onChange={(e) => setHeading(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>Message</h5>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Message"
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
                        <h5>CM Image</h5>
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
                    <h4>Update Chief Minister Info</h4>
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
                        <h5>CM Image</h5>
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

        <DeleteCmMessage />
      </div>
    </>
  );
};

export default Introduction;
