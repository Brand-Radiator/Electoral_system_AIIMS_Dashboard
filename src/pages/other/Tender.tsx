// import { height } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";

import AuthModal from "../../components/Modal";
import { Alert } from "react-bootstrap";
import { logoutUser } from "../../redux/actions";

interface Child {
  _id: string;
  tenderName: string;
  tenderDescription: string;
  image: string;
  text?: string;
  content?: string;
  isDeleted: boolean;
  url?: string;
  publishDate?: string;
  lastDate?: string;
  openingDate?: string;
}

interface Parent {
  _id?: string;
  id?: string;
  text?: string;
  tenderName?: string;
  tenderDescription?: string;
  image?: string;
  content?: string;
  bannerUrl?: string;
  mobileBannerUrl?: string;
  StateLevel?: Child[]; // An array of OrgtnalSruItem objects
  // OrgtnalSruItem:array;
  isDeleted?: boolean;
  userData?: Child[];
}

interface Props {
  itemId: string; // Replace 'boolean' with the appropriate type if needed
  parentId?: string;
  innerdata: Child[] | [];
}
// interface parentId {
//   itemId?: string; // Replace 'boolean' with the appropriate type if needed
//   id?: string;
//   _id?:string;
//   // parentId?: string;
//   data?: [];
// }

// const DeleteOriStru: React.FC<parentId> = () => {
const DeleteSTenderPage: React.FC<Parent> = ({ userData }) => {
  const [validated, setValidated] = useState<boolean>(false);
  // const [data, setData] = useState<Parent[]>([]);
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
        `http://165.22.219.69:5002/api/delete/tender/${itemId}/${profileId}/${Key_Key}`,
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
  // useEffect(() => {
  //   fetch("http://165.22.219.69:5002/api/prioritysport")
  //     .then((response) => response.json())
  //     .then((res) => setData(res));
  // }, []);

  return (
    <>
      <>
        <Card>
          <Card.Body>
            <h4>Delete Tender Page</h4>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr. N</th>
                  <th>Title</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {(userData || []).map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td> {/* You can use i+1 as the index */}
                    <td>{item.text}</td>
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

// -------------------------------------  for organizational Structured Item  ---------------
// ---999999999999999999 for update item
const UpdateTenderPageItem: React.FC<Props> = ({
  itemId,
  parentId,
  innerdata,
}) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [tenderName, setTenderName] = useState("");
  const [tenderDescription, setTenderDescription] = useState("");
  const [url, setUrl] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [openingDate, setOpeningDate] = useState("");
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

  // ------------------------- for saving the data to updte

  // useEffect(() => {
  //   fetch("http://165.22.219.69:5002/")
  //     .then((response) => response.json())
  //     .then((res) => setServiceSection(res)); // resolve this response/ promise
  // }, []);

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

  const UpdateProtySpotItem = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("tenderName", tenderName);
      formData.append("tenderDescription", tenderDescription);
      formData.append("url", url);
      formData.append("publishDate", publishDate);
      formData.append("lastDate", lastDate);
      formData.append("openingDate", openingDate);

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/update/tender/${parentId}/tenderitem/${itemId}/${profileId}/${Key_Key}`,
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
          {(innerdata || [])
            .filter((item) => {
              return item._id === itemId;
            })
            .map((filterItem, index) => (
              <Form
                style={{ width: "100%" }}
                onSubmit={UpdateProtySpotItem}
                encType="multipart/form-data"
              >
                <h4>Update Tenders</h4>
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
                      Tender Name <span style={{ color: "red" }}> *</span>
                    </h5>
                  </Form.Label>
                  <Form.Control
                    className="accordion-item"
                    type="text"
                    placeholder={filterItem?.tenderName}
                    defaultValue={filterItem?.tenderName}
                    onChange={(e) => setTenderName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>Tender Description</h5>
                  </Form.Label>
                  <Form.Control
                    className="accordion-item"
                    type="text"
                    placeholder={filterItem?.tenderDescription}
                    defaultValue={filterItem?.tenderDescription}
                    onChange={(e) => setTenderDescription(e.target.value)}
                  />
                </Form.Group>

                {/* 000000000000000000000000000000000 */}
                <Form.Group>
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>Url</h5>
                  </Form.Label>
                  <Form.Control
                    className="accordion-item"
                    type="text"
                    placeholder={filterItem?.url}
                    defaultValue={filterItem?.url}
                    onChange={(e) => setUrl(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>Publish Date</h5>
                  </Form.Label>
                  <Form.Control
                    className="accordion-item"
                    type="text"
                    placeholder={filterItem?.publishDate}
                    defaultValue={filterItem?.publishDate}
                    onChange={(e) => setPublishDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>Last Date</h5>
                  </Form.Label>
                  <Form.Control
                    className="accordion-item"
                    type="text"
                    placeholder={filterItem?.lastDate}
                    defaultValue={filterItem?.lastDate}
                    onChange={(e) => setLastDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>Opening Date</h5>
                  </Form.Label>
                  <Form.Control
                    className="accordion-item"
                    type="text"
                    placeholder={filterItem?.openingDate}
                    defaultValue={filterItem?.openingDate}
                    onChange={(e) => setOpeningDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-1 justify-content-start">
                    <h5>Tender File</h5>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="image"
                    name="bannerUrl"
                    accept="image/*"
                    onChange={handleFileChange}
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
// _________________________________________________________

// const DeleteOriStruItem = ({id}) => {
const DeleteTenderPageItem: React.FC<Parent> = ({ id }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [innerdata, setInnerData] = useState<Child[]>([]);
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

  useEffect(() => {
    fetch(`http://165.22.219.69:5002/api/tender/${id}`)
      .then((response) => response.json())
      .then((res) => setInnerData(res.filteredData));
  }, []);

  // --delete org str item
  const deleteItem = async (itemId: string) => {
    try {
      const response = await fetch(
        `http://165.22.219.69:5002/api/delete/tender/${id}/tenderitem/${itemId}/${profileId}/${Key_Key}`,
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
      if (response.ok) {
        alert("Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during edit the banner:", error);
    }
  };

  const editItem = async (id: string) => {
    let newEditItem = innerdata.find((elem) => {
      return elem._id === id;
    });
    setIsEditItem(id);
  };

  return (
    <>
      {isEditItem ? (
        <Row>
          <Col lg={10}>
            {innerdata && (
              <UpdateTenderPageItem
                itemId={isEditItem}
                parentId={id}
                innerdata={innerdata}
              />
            )}
          </Col>
        </Row>
      ) : (
        <>
          <h4>Update or delete Service Section Data</h4>

          <Card>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className="w-5px">#</th>
                    <th className="w-60">Notice Title</th>
                    <th>Actions</th> {/* New column for actions */}
                  </tr>
                </thead>
                {(innerdata || []).map((item, i) => (
                  <>
                    <tbody>
                      <tr key={item._id}>
                        <td>{i + 1}</td> {/* You can use i+1 as the index */}
                        <td>{item?.tenderName}</td>
                        <td>
                          {/* Delete button */}
                          <Row className="d-flex">
                            <Col lg={6}>
                              <button
                                onClick={() => deleteItem(item._id)}
                                className="btn btn-danger"
                              >
                                Delete
                              </button>
                            </Col>

                            <Col lg={6}>
                              <button
                                onClick={() => editItem(item._id)}
                                className="btn btn-primary"
                              >
                                Update
                              </button>
                            </Col>
                          </Row>
                        </td>
                      </tr>
                    </tbody>
                  </>
                ))}
              </Table>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

// -------------------------------add org item----------------

const AddTenderPageItem: React.FC<Parent> = ({ id }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [tenderName, setTenderName] = useState("");
  const [tenderDescription, setTenderDescription] = useState("");
  const [url, setUrl] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [lastDate, setLastDate] = useState("");
  const [openingDate, setOpeningDate] = useState("");
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

  const addOrgItem = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("tenderName", tenderName);
      formData.append("tenderDescription", tenderDescription);
      formData.append("url", url);
      formData.append("publishDate", publishDate);
      formData.append("lastDate", lastDate);
      formData.append("openingDate", openingDate);

      if (image) {
        formData.append("image", image);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/tender/${id}/${profileId}/${Key_Key}`,
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
            onSubmit={addOrgItem}
            encType="multipart/form-data"
          >
            <h4>Add Tenders</h4>
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
                  Tender Name <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="Tender Name"
                required
                defaultValue=""
                onChange={(e) => setTenderName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Tender Description</h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="Tender Description"
                defaultValue=""
                onChange={(e) => setTenderDescription(e.target.value)}
              />
            </Form.Group>

            {/* 000000000000000000000000000000000 */}
            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Url</h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="Url"
                defaultValue=""
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Publish Date</h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="dd/mm/yyyyy"
                defaultValue=""
                onChange={(e) => setPublishDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Last Date</h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="dd/mm/yyyy"
                defaultValue=""
                onChange={(e) => setLastDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Opening Date</h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="dd/mm/yyyy"
                defaultValue=""
                onChange={(e) => setOpeningDate(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex pt-1 justify-content-start">
                <h5>
                  Tender File <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                type="file"
                id="image"
                name="bannerUrl"
                accept="image/*"
                required
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group className="pt-2 pb-2">
              <Button type="submit">Add</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

// _______________________________________________________________

const Tender = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [data, setData] = useState<Child[]>([]);

  const [text, setText] = useState("");
  const [content, setContent] = useState("");

  const [bannerUrl, setBannerUrl] = useState<File | null>(null);
  const [mobileBannerUrl, setMobileUrl] = useState<File | null>(null);
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
    fetch("http://165.22.219.69:5002/api/tender")
      .then((response) => response.json())
      .then((res) => setData(res));
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

  /*---------------- handle Form submit ---------------------------------------*/

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("text", text);
      formData.append("content", content);
      if (bannerUrl) {
        formData.append("bannerUrl", bannerUrl);
      }
      if (mobileBannerUrl) {
        formData.append("mobileBannerUrl", mobileBannerUrl);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/tender/${profileId}/${Key_Key}`,
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

  if (data.length > 0) {
    const { _id } = data[0];
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
      formData.append("text", text);
      formData.append("content", content);

      if (bannerUrl) {
        formData.append("bannerUrl", bannerUrl);
      }
      if (mobileBannerUrl) {
        formData.append("mobileBannerUrl", mobileBannerUrl);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/update/tender/${objectId}/${profileId}/${Key_Key}`,
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
      <div>
        <Card>
          <Card.Body>
            <Row>
              {data.length === 0 ? (
                <Col lg={6}>
                  <Form
                    style={{ width: "100%" }}
                    onSubmit={handleFormSubmit}
                    encType="multipart/form-data"
                  >
                    <h4>Add Tender Page</h4>
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
                        onChange={(e) => setText(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>Content</h5>
                      </Form.Label>
                      <Form.Control
                        className="accordion-item"
                        type="text"
                        placeholder="Content"
                        defaultValue=""
                        onChange={(e) => setContent(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex pt-1 justify-content-start">
                        <h5>
                          Desktop Banner Image{" "}
                          <span style={{ color: "red" }}> *</span>
                        </h5>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        id="image"
                        name="bannerUrl"
                        required
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

                    <Form.Group className="pt-2 pb-2">
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
                    <h4>Update Tender Page</h4>
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
                        defaultValue={data[0]?.text}
                        onChange={(e) => setText(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>Content</h5>
                      </Form.Label>
                      <Form.Control
                        className="accordion-item"
                        type="text"
                        placeholder="Content"
                        defaultValue={data[0]?.content}
                        onChange={(e) => setContent(e.target.value)}
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

                    <Form.Group className="pt-2 pb-1">
                      <Button type="submit">update</Button>
                    </Form.Group>
                  </Form>
                </Col>
              )}
              {/* -------------------------- update data--------------------------------------------- */}
              <Col lg={6}>{data && <DeleteSTenderPage userData={data} />}</Col>
            </Row>
            <div
              style={{ width: "100%", height: "1px", backgroundColor: "red" }}
            ></div>

            <Row>
              <Col lg={6}>
                <AddTenderPageItem id={objectId} />
              </Col>
              <Col lg={6}>
                {objectId && data && <DeleteTenderPageItem id={objectId} />}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Tender;
