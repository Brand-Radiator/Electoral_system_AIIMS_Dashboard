// import { height } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";

import AuthModal from "../../components/Modal";
import { Alert } from "react-bootstrap";
import { logoutUser } from "../../redux/actions";

interface Child {
  _id?: string | "";
  name?: string | "";
  sportName: string;
  description: string;
  pageTitle: string;
  pageContent: string;
  pageDescription: string;
  bannerUrl: string;
  mobileBannerUrl: string;
  image: string;
  url: string;
  isDeleted: boolean;
}
interface Parent {
  _id?: string | "";
  name?: string;
  sportName?: string;
  description?: string;
  image?: string;
  url?: string;
  id?: string;
  pageTitle?: string;
  pageContent?: string;
  pageDescription?: string;
  bannerUrl?: string;
  mobileBannerUrl?: string;
  // sportLegacy: [Child], // Embed the AboutUs data as an array of objects
  userData?: string;
  isDeleted?: boolean;
  itemId?: string;
  parentId?: string;
  innerData?: [];
}

interface Props {
  itemId?: string; // Replace 'boolean' with the appropriate type if needed
  parentId?: string;
  innerdata?: Child[];
  metaData?: Child[] | undefined;
}

interface metaData {
  _id?: string | "";
  name?: string | "";
  sportName: string;
  description: string;
  pageTitle: string;
  pageContent: string;
  pageDescription: string;
  bannerUrl: string;
  mobileBannerUrl: string;
  image: string;
  url: string;
  isDeleted: boolean;
}

// const DeleteOriStru: React.FC<parentId> = () => {
const DeleteSportLegacyPage: React.FC<Props> = ({ metaData = [] }: Props) => {
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
        `http://165.22.219.69:5002/api/delete/sportlegacy/${itemId}/${profileId}/${Key_Key}`,
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

  return (
    <>
      <>
        <Card>
          <Card.Body>
            <h4>Delete Sport Legacy Page</h4>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr. N</th>
                  <th>Title</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {(metaData || []).map((item: Child, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td> {/* You can use i+1 as the index */}
                    <td>{item?.pageTitle}</td>
                    <td>
                      {/* Delete button */}
                      <button
                        onClick={() => {
                          if (item._id !== undefined && item._id !== "") {
                            deleteItem(item._id);
                          }
                        }}
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
const UpdateSportLegacyItem: React.FC<Props> = ({
  itemId,
  parentId,
  innerdata,
}) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [sportName, setSportName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
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
      formData.append("name", name);
      formData.append("sportName", sportName);
      formData.append("description", description);
      formData.append("url", url);

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/update/sportlegacy/${parentId}/sportlegacyitem/${itemId}/${profileId}/${Key_Key}`,
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

  // const innerUndefined = () => {
  //   innerdata == undefined
  // }

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
                <h4>Update</h4>
                {/* <> */}
                {isError && (
                  <Alert variant="danger" className="my-2">
                    {isResponse}
                  </Alert>
                )}
                {showModal && <AuthModal />}

                <Form.Group>
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>Name</h5>
                  </Form.Label>
                  <Form.Control
                    className="accordion-item"
                    type="text"
                    placeholder="Name"
                    defaultValue={filterItem.name}
                    onChange={(e) => setSportName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>Sport Name</h5>
                  </Form.Label>
                  <Form.Control
                    className="accordion-item"
                    type="text"
                    placeholder="Sport Name"
                    defaultValue={filterItem.sportName}
                    onChange={(e) => setSportName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>Sport Details</h5>
                  </Form.Label>
                  <Form.Control
                    className="accordion-item"
                    type="text"
                    placeholder="Sport Details"
                    defaultValue={filterItem.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>Url</h5>
                  </Form.Label>
                  <Form.Control
                    className="accordion-item"
                    type="text"
                    placeholder="Url"
                    defaultValue={filterItem.url}
                    onChange={(e) => setUrl(e.target.value)}
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
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Row>
                  <Col lg={3}>
                    <Form.Group className="pt-2 pb-2">
                      <Button type="submit">Update</Button>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            ))}
        </Card.Body>
      </Card>
    </>
  );
};
// _________________________________________________________

// const DeleteOriStruItem = ({id}) => {
const DeleteSportLegacyPageItem: React.FC<Parent> = ({ id }) => {
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
    fetch(`http://165.22.219.69:5002/api/sportlegacy/${id}`)
      .then((response) => response.json())
      .then((res) => setInnerData(res.filteredData));
  }, []);

  // --delete org str item
  const deleteItem = async (itemId: string) => {
    try {
      const response = await fetch(
        `http://165.22.219.69:5002/api/delete/sportlegacy/${id}/sportlegacyitem/${itemId}/${profileId}/${Key_Key}`,
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
      const data = await response.json();
      if (data) {
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
              <UpdateSportLegacyItem
                itemId={isEditItem}
                parentId={id}
                innerdata={innerdata}
              />
            )}
          </Col>
        </Row>
      ) : (
        <>
          <h4>Update or delete Sport Legacy Data</h4>

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
                {(innerdata || []).map((item: Child, i) => (
                  <>
                    <tbody>
                      <tr key={item._id}>
                        <td>{i + 1}</td> {/* You can use i+1 as the index */}
                        <td>{item?.sportName}</td>
                        <td>
                          {/* Delete button */}
                          <Row>
                            <Col lg={4}>
                              <button
                                onClick={() => {
                                  if (
                                    item._id !== undefined &&
                                    item._id !== ""
                                  ) {
                                    deleteItem(item._id);
                                  }
                                }}
                                className="btn btn-danger"
                              >
                                Delete
                              </button>
                            </Col>

                            <Col lg={4}>
                              <button
                                onClick={() => {
                                  if (
                                    item._id !== undefined &&
                                    item._id !== ""
                                  ) {
                                    editItem(item._id);
                                  }
                                }}
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

const AddSportLegacyPageItem: React.FC<Parent> = ({ id }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [sportName, setSportName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
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
      formData.append("sportName", sportName);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("url", url);

      if (image) {
        formData.append("image", image);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/sportlegacy/${id}/${profileId}/${Key_Key}`,
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
          alert("added");
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
            <h4>Add Sport Legacy Item</h4>
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
                placeholder="Name"
                defaultValue=""
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>
                  Sport Name <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="Sport Name"
                defaultValue=""
                required
                onChange={(e) => setSportName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>
                  Description <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="Description"
                defaultValue=""
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Link</h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="Description"
                defaultValue=""
                onChange={(e) => setUrl(e.target.value)}
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

const SportLegacy = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [data, setData] = useState<Child[]>([]);

  const [pageTitle, setPageTitle] = useState("");
  const [pageContent, setPageContent] = useState("");
  const [pageDescription, setPageDescription] = useState("");
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
    fetch("http://165.22.219.69:5002/api/sportlegacy")
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
      formData.append("pageTitle", pageTitle);
      formData.append("pageContent", pageContent);
      formData.append("pageDescription", pageDescription);

      if (bannerUrl) {
        formData.append("bannerUrl", bannerUrl);
      }
      if (mobileBannerUrl) {
        formData.append("mobileBannerUrl", mobileBannerUrl);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/sportlegacy/${profileId}/${Key_Key}`,
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
      formData.append("pageTitle", pageTitle);
      formData.append("pageContent", pageContent);
      formData.append("pageDescription", pageDescription);

      if (bannerUrl) {
        formData.append("bannerUrl", bannerUrl);
      }
      if (mobileBannerUrl) {
        formData.append("mobileBannerUrl", mobileBannerUrl);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/update/sportlegacy/${objectId}/${profileId}/${Key_Key}`,
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
                    <h4>Add Sport legacy Page</h4>
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
                          Page Title <span style={{ color: "red" }}> *</span>
                        </h5>
                      </Form.Label>
                      <Form.Control
                        className="accordion-item"
                        type="text"
                        placeholder="Page Title"
                        defaultValue=""
                        required
                        onChange={(e) => setPageTitle(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>
                          Content <span style={{ color: "red" }}> *</span>
                        </h5>
                      </Form.Label>
                      <Form.Control
                        className="accordion-item"
                        type="text"
                        placeholder="Content"
                        defaultValue=""
                        required
                        onChange={(e) => setPageContent(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>
                          Description <span style={{ color: "red" }}> *</span>
                        </h5>
                      </Form.Label>
                      <Form.Control
                        className="accordion-item"
                        type="text"
                        placeholder="Description"
                        defaultValue=""
                        required
                        onChange={(e) => setPageDescription(e.target.value)}
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
                    <h4>Update Sport Legacy Page</h4>
                    {isError && (
                      <Alert variant="danger" className="my-2">
                        {isResponse}
                      </Alert>
                    )}
                    {showModal && <AuthModal />}
                    {/* <> */}

                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>Page Title</h5>
                      </Form.Label>
                      <Form.Control
                        className="accordion-item"
                        type="text"
                        placeholder="Page Title"
                        defaultValue={data[0]?.pageTitle}
                        onChange={(e) => setPageTitle(e.target.value)}
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
                        defaultValue={data[0]?.pageContent}
                        onChange={(e) => setPageContent(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>Description</h5>
                      </Form.Label>
                      <Form.Control
                        className="accordion-item"
                        type="text"
                        placeholder="Description"
                        defaultValue={data[0]?.pageDescription}
                        onChange={(e) => setPageDescription(e.target.value)}
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
              <Col lg={6}>
                {data && <DeleteSportLegacyPage metaData={data} />}
              </Col>
            </Row>
            <div
              style={{ width: "100%", height: "1px", backgroundColor: "red" }}
            ></div>

            <Row>
              <Col lg={6}>
                <AddSportLegacyPageItem id={objectId} />
              </Col>
              <Col lg={6}>
                {objectId && data && (
                  <DeleteSportLegacyPageItem id={objectId} />
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default SportLegacy;
