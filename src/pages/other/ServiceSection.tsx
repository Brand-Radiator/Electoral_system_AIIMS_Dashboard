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

interface serviceSection {
  _id: string;
  title: string;
  description: string;
  image: string;
  url: string;
}

interface UpdateServiceSectionProps {
  isEditItem: string; // Replace 'boolean' with the appropriate type if needed
}

const NormalFormValidation = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [serviceSection, setServiceSection] = useState<serviceSection[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState("");

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

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  useEffect(() => {
    fetch("http://165.22.219.69:5002/get/service")
      .then((response) => response.json())
      .then((res) => setServiceSection(res)); // resolve this response/ promise
  }, []);
  //   ------------------------------------------ setting image in the input--------------------------------
  const handleImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
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
      formData.append("title", title);
      formData.append("description", description);
      formData.append("url", url);
      if (image) {
        formData.append("image", image);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/add/service/${profileId}`,
          {
            method: "POST",
            body: formData,
            credentials: "include",
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
        if (data) {
          alert("successfully Added");
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
            <h4>Add Service</h4>
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
                  Title <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                required
                placeholder="Title"
                defaultValue=""
                onChange={(e) => setTitle(e.target.value)}
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
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>
                  Url <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Description"
                required
                defaultValue=""
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex pt-1 justify-content-start">
                <h5>
                  Image <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                type="file"
                required
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageUrl}
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

// ---------------------------------------- update the item-------------------
const UpdateServiceSection: React.FC<UpdateServiceSectionProps> = ({
  isEditItem,
}) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [serviceSection, setServiceSection] = useState<serviceSection[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState("");

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

  // ------------------------- for saving the data to updte

  useEffect(() => {
    fetch("http://165.22.219.69:5002/get/service")
      .then((response) => response.json())
      .then((res) => setServiceSection(res)); // resolve this response/ promise
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
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
      formData.append("title", title);
      formData.append("description", description);
      formData.append("url", url);
      if (image) {
        formData.append("image", image);
      }
      try {
        const response = await fetch(
          `http://165.22.219.69:5002/update/service/${isEditItem}/${profileId}`,
          {
            method: "PATCH",
            body: formData,
            credentials: "include",
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
        if (data) {
          alert("Successful Updated");
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
          {(serviceSection || [])
            .filter((item) => {
              return item._id === isEditItem;
            })
            .map((filterItem, index) => (
              <Form
                style={{ width: "100%" }}
                onSubmit={updateMissionandVision}
                encType="multipart/form-data"
              >
                <h4>Update Service</h4>
                {isError && (
                  <Alert variant="danger" className="my-2">
                    {isResponse}
                  </Alert>
                )}
                {showModal && <AuthModal />}
                {/* <> */}
                <Form.Group>
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>Title</h5>
                  </Form.Label>
                  <Form.Control
                    className="accordion-item"
                    type="text"
                    placeholder={filterItem?.title}
                    defaultValue={filterItem?.title}
                    onChange={(e) => setTitle(e.target.value)}
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
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>url</h5>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={filterItem?.url}
                    defaultValue={filterItem?.url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-1 justify-content-start">
                    <h5>Image</h5>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Form.Group>

                <Form.Group className="pt-5 pb-5">
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
const DeleteServiceSection = () => {
  const [validated, setValidated] = useState<boolean>(false);

  const [serviceSection, setServiceSection] = useState<serviceSection[]>([]);
  const [isEditItem, setEditItem] = useState<string>("");

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
        `http://165.22.219.69:5002/delete/service/${itemId}/${profileId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Assuming you want to parse the JSON response
      const data = await response.json();
      if (data) {
        alert("Successfully Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during edit the banner:", error);
    }
  };

  const editItem = async (id: string) => {
    let newEditItem = serviceSection.find((elem) => {
      return elem._id === id;
    });
    setEditItem(id);
  };

  // const updateItem = async (itemId: string) => {
  //   console.log("hello", itemId);
  // };

  useEffect(() => {
    fetch("http://165.22.219.69:5002/get/service")
      .then((response) => response.json())
      .then((res) => setServiceSection(res)); // resolve this response/ promise
  }, []);

  return (
    <>
      {isEditItem ? (
        <Row>
          <Col lg={10}>
            <UpdateServiceSection isEditItem={isEditItem} />
          </Col>
        </Row>
      ) : (
        <>
          <h4>Update or delete Service</h4>

          <Card>
            <Card.Body>
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="w-5px">#</th>
                      <th className="w-60">Notice Title</th>
                      <th>Actions</th> {/* New column for actions */}
                    </tr>
                  </thead>
                  {(serviceSection || []).map((item, i) => (
                    <>
                      <tbody>
                        <tr key={item._id}>
                          <td>{i + 1}</td> {/* You can use i+1 as the index */}
                          <td>{item.title}</td>
                          <td>
                            <div className="d-flex gap-2 flex-column flex-md-row">
                              <button
                                onClick={() => deleteItem(item._id)}
                                className="btn btn-danger"
                              >
                                Delete
                              </button>

                              <button
                                onClick={() => editItem(item._id)}
                                className="btn btn-primary"
                              >
                                Update
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </>
                  ))}
                </Table>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

const FormValidation = () => {
  const [serviceSection, setServiceSection] = useState<serviceSection[]>([]);

  useEffect(() => {
    fetch("http://165.22.219.69:5002/get/service")
      .then((response) => response.json())
      .then((res) => setServiceSection(res)); // resolve this response/ promise
  }, []);

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          // { label: "Forms", path: "/forms/gallery" },
          // { label: "Validation", path: "/forms/gallery", active: true },

          { label: "Pages", path: "/pages/service" },
          {
            label: "Service section",
            path: "/pages/service",
            active: true,
          },
        ]}
        title={"Service Section"}
      />
      <Row>
        <Col lg={12}>
          <DeleteServiceSection />
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <NormalFormValidation />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FormValidation;
