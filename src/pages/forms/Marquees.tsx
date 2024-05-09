import React, { useEffect, useState, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import AuthModal from "../../components/Modal";
import { Alert } from "react-bootstrap";

import { useForm } from "react-hook-form";
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

export interface HeaderType {
  _id: string;
  noticeTitle: string;
  documentlnk: string;
  noticeLink: string;
  image: string;
  isNew: boolean;
  new: Boolean;
}

// ----------------------------------  add marque   ----------------------------

const AddMarque = () => {
  const [validated, setValidated] = useState<boolean>(false);

  const [eventData, setEventData] = useState<HeaderType[]>([]);
  const [noticeTitle, setNoticeTitle] = useState("");
  const [documentlnk, setDocumentlnk] = useState("");
  const [noticeLink, setNoticeLink] = useState("");
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

  const addEvents = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("noticeTitle", noticeTitle);
      formData.append("documentlnk", documentlnk);
      formData.append("noticeLink", noticeLink);
      if (image) {
        formData.append("image", image);
      }

      // const addData: any = await apiService.post("api/event", formData);
      // const addData: any = await apiService.post("api/event", formData);
      try {
        const response = await fetch(
          `http://165.22.219.69:5002/add/marquees/${profileId}/${Key_Key}`,
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
          alert("Data Added");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error during edit the banner:", error);
      }
    }
    setValidated(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
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
            <h4>Add Marquees</h4>
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
                  Notice Title <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="Title"
                required
                defaultValue=""
                onChange={(e) => setNoticeTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Document Link</h5>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Document Link"
                defaultValue=""
                onChange={(e) => setDocumentlnk(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Notice Link</h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="Notice Link "
                defaultValue=""
                onChange={(e) => setNoticeLink(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex pt-1 justify-content-start">
                <h5>Gif</h5>
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
              <Button type="submit">Add marquees</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

// ---------------------------------------delete marquees

const DeleteMarquees = () => {
  const [validated, setValidated] = useState<boolean>(false);

  const [marqueesData, setMarqueesData] = useState<HeaderType[]>([]);
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
        `http://165.22.219.69:5002/delete/marquees/${itemId}/${profileId}/${Key_Key}`,
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
      if (response.ok) {
        alert("Data deleted");
        window.location.reload();
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error during edit the banner:", error);
    }
  };

  const MarkAsOld = async (itemId: string) => {
    try {
      const response = await fetch(
        `http://165.22.219.69:5002/old/marquees/${itemId}/${profileId}/${Key_Key}`,
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
      if (response.ok) {
        alert("Old Marked");
        window.location.reload();
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error during edit the banner:", error);
    }
  };

  useEffect(() => {
    fetch("http://165.22.219.69:5002/get/marquees")
      .then((response) => response.json())
      .then((res) => setMarqueesData(res)); // resolve this response/ promise
  }, []);
  //   console.log("marqueesData--------", marqueesData);

  return (
    <>
      <Card>
        <Card.Body>
          <h4>Delete Marquees</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Notice Title</th>
                <th>Actions</th> {/* New column for actions */}
              </tr>
            </thead>
            <tbody>
              {(marqueesData || []).map((item, i) => (
                <tr key={item._id}>
                  <td>{i + 1}</td> {/* You can use i+1 as the index */}
                  <td>{item.noticeTitle}</td>
                  <td>
                    {/* Delete button */}
                    <div className="d-flex">
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="btn btn-danger"
                      >
                        Delt
                      </button>
                      {item?.new == true ? (
                        <button
                          onClick={() => MarkAsOld(item._id)}
                          className="btn btn-primary marginLeft-2px"
                        >
                          Old
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
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
          { label: "Forms", path: "/forms/marquees" },
          { label: "Validation", path: "/forms/marquees", active: true },
        ]}
        title={"Marquees section"}
      />
      <Row>
        <Col lg={6}>
          <AddMarque />
        </Col>
        <Col lg={6}>
          <DeleteMarquees />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default FormValidation;
