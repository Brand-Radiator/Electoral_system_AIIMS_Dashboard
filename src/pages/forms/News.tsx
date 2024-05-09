import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// components
import PageTitle from "../../components/PageTitle";
import { FormInput, VerticalForm } from "../../components";
import { logoutUser } from "../../redux/actions";

interface newsValidator {
  _id: string;
  title: string;
  description: string;
  image: string;
  postUrl: string;
}

// ------------------------news add section-------------------------------

const NewsCreateCard = () => {
  const [validated, setValidated] = useState<boolean>(false);

  const [galleryData, setGalleryData] = useState<newsValidator[]>([]);
  const [title, setNewsTitle] = useState("");
  const [description, setDescription] = useState("");
  const [postUrl, setPostUrl] = useState("");
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

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleAddNews = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("postUrl", postUrl);
      if (image) {
        formData.append("image", image);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/news/${profileId}/${Key_Key}`,
          {
            method: "POST",
            body: formData,
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
          alert("News added successfully.");
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
      {isError && (
        <Alert variant="danger" className="my-2">
          {isResponse}
        </Alert>
      )}
      {showModal && <AuthModal />}
      <Card>
        <Card.Body>
          <Form
            style={{ width: "100%" }}
            onSubmit={handleAddNews}
            encType="multipart/form-data"
          >
            <h4 className="header-title">Add News </h4>
            {/* <> */}
            <Form.Group
              className="position-relative mb-3"
              controlId="validationTooltip01"
            >
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                News Title <span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="title"
                required
                defaultValue=""
                onChange={(e) => setNewsTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="position-relative mb-3"
              controlId="validationTooltip02"
            >
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                News description <span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="News description"
                required
                defaultValue=""
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="position-relative mb-3"
              controlId="validationTooltip03"
            >
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                News refrence link <span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="https://www.google.com"
                defaultValue=""
                required
                onChange={(e) => setPostUrl(e.target.value)}
              />
            </Form.Group>

            <Form.Group
              className="position-relative"
              controlId="validationTooltip04"
            >
              <Form.Label className="d-flex pt-1 justify-content-start">
                News image <span style={{ color: "red" }}> *</span>
              </Form.Label>
              <Form.Control
                type="file"
                required
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group className="pt-5 pb-3">
              <Button type="submit">Add News</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

// ---------------------------------      Delete   ------------------------------
const DeleteNews = () => {
  const [validated, setValidated] = useState<boolean>(false);

  const [newsData, setNewsData] = useState<newsValidator[]>([]);
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
        `http://165.22.219.69:5002/api/news/${itemId}/${profileId}/${Key_Key}`,
        {
          method: "PATCH",
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
      if (data) {
        alert("News deleted successfully.");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during edit the banner:", error);
    }
  };

  useEffect(() => {
    fetch("http://165.22.219.69:5002/api/news")
      .then((response) => response.json())
      .then((res) => setNewsData(res.newData)); // resolve this response/ promise
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <h4 className="header-title">Delete News </h4>
          <Table striped bordered hover width="100">
            <thead>
              <tr>
                <th>SN</th>
                <th>News Title</th>
                <th>Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {newsData &&
                newsData?.map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td> {/* You can use i+1 as the index */}
                    <td>{item.title}</td>
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
  );
};

const News = () => {
  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Home", path: "/form/news" },
          {
            label: "News",
            path: "/form/news",
            active: true,
          },
        ]}
        title={"News"}
      />
      <Row>
        <Col lg={6}>
          <NewsCreateCard />
        </Col>
        <Col lg={6}>
          <DeleteNews />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default News;
