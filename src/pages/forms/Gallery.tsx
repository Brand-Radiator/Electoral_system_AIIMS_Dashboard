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
// import Table from "../../components/Table";

interface galleryData3 {
  _id: string;
  title: string;
  paragraph: string;
  eventType: string;
  image: string;
}

const NormalFormValidation = () => {
  const [validated, setValidated] = useState<boolean>(false);

  const [galleryData, setGalleryData] = useState<galleryData3[]>([]);
  const [title, setTitle] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [eventType, setEventType] = useState("");
  const [image, setImage] = useState<File | null>(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const addGallery = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("paragraph", paragraph);
      formData.append("eventType", eventType);
      if (image) {
        formData.append("image", image);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/gallery/${profileId}/${Key_Key}`,
          // `http://165.22.219.69:5002/api/gallery/${profileId}`,
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
          dispatch(logoutUser());
          window.location.href = "https://admin.biharsports.org/auth/login";
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
          alert("Gallery Added");
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
          <Form style={{ width: "100%" }} onSubmit={addGallery}>
            <h1>Add gallery</h1>
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
                placeholder="Title"
                defaultValue=""
                required
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Paragraph</h5>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter paragraph"
                defaultValue=""
                onChange={(e) => setParagraph(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>
                  Event Name <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="enter Event Type"
                required
                defaultValue=""
                onChange={(e) => setEventType(e.target.value)}
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
                id="image"
                name="image"
                accept="image/*"
                required
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group className="pt-5 pb-5">
              <Button type="submit">Add image</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

// ----------------------- delete gallery section------------------------
const DeleteGallery = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [rerender, setRerender] = useState<boolean>(false);
  const [galleryData, setGalleryData] = useState<galleryData3[]>([]);
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
        `http://165.22.219.69:5002/api/delete/gallery/${itemId}/${profileId}/${Key_Key}`,
        // `http://165.22.219.69:5002/api/delete/gallery/${itemId}/${profileId}`,

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
        window.location.href = "https://admin.biharsports.org/auth/login";
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Assuming you want to parse the JSON response
      const data = await response.json();
      alert("Image Deleted");
    } catch (error) {
      console.error("Error during edit the banner:", error);
    }
  };

  useEffect(() => {
    fetch("http://165.22.219.69:5002/api/gallery")
      // fetch("http://165.22.219.69:5002/api/gallery")
      .then((response) => response.json())
      .then((res) => setGalleryData(res)); // resolve this response/ promise
  }, [rerender]);

  return (
    <>
      {galleryData.length >= 1 ? (
        <>
          <h4>Delete Sponsers</h4>

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
                  {(galleryData || []).map((item, i) => (
                    <tr key={item._id}>
                      <td>{i + 1}</td> {/* You can use i+1 as the index */}
                      <td>{item.title}</td>
                      <td>
                        {/* Delete button */}
                        <button
                          onClick={() => deleteItem(item?._id)}
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
      ) : (
        ""
      )}
    </>
  );
};

const FormValidation = () => {
  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Forms", path: "/forms/gallery" },
          { label: "Validation", path: "/forms/gallery", active: true },
        ]}
        title={"Edit Gallery Page"}
      />
      <Row>
        <Col lg={10}>
          <NormalFormValidation />
        </Col>
      </Row>
      <Row>
        <Col lg={10}>
          <DeleteGallery />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FormValidation;
