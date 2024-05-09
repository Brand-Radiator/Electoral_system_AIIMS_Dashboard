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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import apiService from "../../apiservices/apiService";

// components
import PageTitle from "../../components/PageTitle";
import { FormInput, VerticalForm } from "../../components";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/actions";

interface eventData {
  _id: string;
  title: string;
  description: string;
  eventDate: string;
  image: string;
}

const AddEvents = () => {
  const [validated, setValidated] = useState<boolean>(false);

  const [eventData, setEventData] = useState<eventData[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
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

  const addEvents = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("eventDate", eventDate);

      if (image) {
        formData.append("image", image);
      }
      // const addData: any = await apiService.post("api/event", formData);
      // const addData: any = await apiService.post("api/event", formData);

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/Event/${profileId}/${Key_Key}`,
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
          alert("Added Successfully");
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
            onSubmit={addEvents}
            encType="multipart/form-data"
          >
            <h1>Add Events</h1>
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
                required
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
                  Event Date <span style={{ color: "red" }}> *</span>{" "}
                </h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="Event Date"
                defaultValue=""
                required
                onChange={(e) => setEventDate(e.target.value)}
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
                required
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group className="pt-5 pb-5">
              <Button type="submit">Add Events</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
const DeleteEvent = () => {
  const [validated, setValidated] = useState<boolean>(false);

  const [eventData, setEventData] = useState<eventData[]>([]);
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
        `http://165.22.219.69:5002/delete/event/${itemId}/${profileId}/${Key_Key}`,
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
        alert("Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during edit the banner:", error);
    }
  };

  useEffect(() => {
    fetch("http://165.22.219.69:5002/get/event")
      .then((response) => response.json())
      .then((res) => setEventData(res)); // resolve this response/ promise
  }, []);

  return (
    <>
      <h4>Delete Marquees</h4>

      <Card>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {(eventData || []).map((item, i) => (
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
const FormValidation = () => {
  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Forms", path: "/forms/gallery" },
          { label: "Validation", path: "/forms/gallery", active: true },
        ]}
        title={"Event Section"}
      />
      <Row>
        <Col lg={10}>
          <AddEvents />
        </Col>
      </Row>
      <Row>
        <Col lg={10}>
          <DeleteEvent />
        </Col>
      </Row>
    </React.Fragment>
  );
};
export default FormValidation;
