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
  url?: string;
  title?: string;
  sportDetails: string;
  image: string;
  isDeleted: boolean;
  address?: string;
  pin?: string;
  bgColor?: string;
}

interface link {
  _id: string;
  title: string;
  url: string;
  image: string;
  pin: string;
  isDeleted: boolean;
}
interface address {
  _id: string;
  title: string;
  address: string;
  pin: string;
  isDeleted: boolean;
}

interface Parent {
  _id: string;
  text?: string;
  content?: string;
  bannerUrl?: string;
  mobileBannerUrl?: string;
  link?: string; // An array of OrgtnalSruItem objects
  address?: string;
  joinUs?: string;
  importantLink?: string;
  name?: string;
  numberOfVisitors: string;
  data: [];

  // OrgtnalSruItem:array;
  isDeleted: boolean;
}

interface id {
  id: string;
  link?: string;
  name?: string;
}

interface Props {
  itemId: string; // Replace 'boolean' with the appropriate type if needed
  parentId?: string;
  innerdata: Child[];
  name?: string;
}
interface parentId {
  itemId?: string; // Replace 'boolean' with the appropriate type if needed
  id?: string;
  _id?: string | "";
  text?: string;
  parentId?: string;
  // data?: typeof parent[];
  data?: Parent[]; // Specify the correct prop type

  link?: string; // An array of OrgtnalSruItem objects
  address?: string;
  joinus?: string;
  inportantLink?: string;
  name?: string;
}

const footerItems = [
  { name: "link" },
  { name: "address" },
  { name: "joinUs" },
  { name: "importantLink" },
  // { name: "numberOfVisitors" }
];

const DeleteFooterPage: React.FC<parentId> = ({ data }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  // const [data, setData] = useState<Parent[]>([]);

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
        // `http://165.22.219.69:5002/api/delete/footerpage/${itemId}`,
        `http://165.22.219.69:5002/api/delete/footerpage/${itemId}/${profileId}/${Key_Key}`,
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
      const userConfirmed = window.confirm("Deleted");

      if (userConfirmed) {
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
            <h4>Delete Footer Page</h4>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr. N</th>
                  <th>Title</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {(data || []).map((item: parentId, i) => (
                  <tr key={item?._id}>
                    <td>{i + 1}</td> {/* You can use i+1 as the index */}
                    <td>{item?.text}</td>
                    <td>
                      {/* Delete button */}

                      <button
                        onClick={() => deleteItem(item?._id ?? "")}
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

// -------------------------------add org item----------------

const AddFooterItem: React.FC<id> = ({ id: id, link, name }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bgColor, setBgColor] = useState("");

  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const [image, setImage] = useState<File | null>(null);

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

  const addFooterItem = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("pin", pin);
      formData.append("address", address);
      formData.append("bgColor", bgColor);

      formData.append("url", url);
      if (image) {
        formData.append("image", image);
      }
      try {
        // const response = await fetch("http://165.22.219.69:5002/api/footerpage");
        // let url = "";
        // if (name === "link") {
        //   url = `http://165.22.219.69:5002/api/footerlinkitem`;
        // } else if (name === "address") {
        //   url = `http://165.22.219.69:5002/api/footeraddressitem`;
        // } else if (name === "joinUs") {
        //   url = `http://165.22.219.69:5002/api/footerjoinusitem`;
        // } else if (name === "importantLink") {
        //   url = `http://165.22.219.69:5002/api/footerimportantlinkitem`;
        // }

        let url = "";
        if (name === "link") {
          url = `http://165.22.219.69:5002/api/footerlinkitem`;
        } else if (name === "address") {
          url = `http://165.22.219.69:5002/api/footeraddressitem`;
        } else if (name === "joinUs") {
          url = `http://165.22.219.69:5002/api/footerjoinusitem`;
        } else if (name === "importantLink") {
          url = `http://165.22.219.69:5002/api/footerimportantlinkitem`;
        }

        const response = await fetch(`${url}/${id}/${profileId}/${Key_Key}`, {
          method: "POST",
          body: formData,
          credentials: "include",
        });

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
          <h4>
            Add{" "}
            <span style={{ fontSize: "20px", color: "red" }}>
              {name ? name : "Select from Right"}
            </span>{" "}
            in footer section
          </h4>
          {isError && (
            <Alert variant="danger" className="my-2">
              {isResponse}
            </Alert>
          )}
          {showModal && <AuthModal />}
          {name && (
            <Form
              style={{ width: "100%" }}
              onSubmit={addFooterItem}
              encType="multipart/form-data"
            >
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
                  placeholder="Link Title"
                  required
                  defaultValue=""
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              {name == "address" ? (
                <>
                  <Form.Group>
                    <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                      <h5>
                        Address <span style={{ color: "red" }}> *</span>
                      </h5>
                    </Form.Label>
                    <Form.Control
                      className="accordion-item"
                      type="text"
                      placeholder="address"
                      required
                      defaultValue=""
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                      <h5>
                        Pin <span style={{ color: "red" }}> *</span>
                      </h5>
                    </Form.Label>
                    <Form.Control
                      className="accordion-item"
                      type="text"
                      placeholder="pin"
                      required
                      defaultValue=""
                      onChange={(e) => setPin(e.target.value)}
                    />
                  </Form.Group>
                </>
              ) : (
                ""
              )}

              {name == "joinUs" ? (
                <Form.Group>
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>
                      Enter Background Color{" "}
                      <span style={{ color: "red" }}> *</span>
                    </h5>
                  </Form.Label>
                  <Form.Control
                    className="accordion-item"
                    type="text"
                    placeholder="Background Color"
                    required
                    defaultValue=""
                    onChange={(e) => setBgColor(e.target.value)}
                  />
                </Form.Group>
              ) : (
                ""
              )}

              {name == "link" || name == "joinUs" || name == "importantLink" ? (
                <>
                  <Form.Group>
                    <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                      <h5>
                        Enter url <span style={{ color: "red" }}> *</span>
                      </h5>
                    </Form.Label>
                    <Form.Control
                      className="accordion-item"
                      type="text"
                      placeholder="url"
                      required
                      defaultValue=""
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="d-flex pt-1 justify-content-start">
                      <h5>
                        Image{" "}
                        {name == "importantLink" ? (
                          <span style={{ color: "gray" }}>
                            , Dimension: ( 232 × 58 )px
                          </span>
                        ) : name == "joinUs" ? (
                          <span style={{ color: "gray" }}>
                            , Dimension: ( 150 × 150 )px
                          </span>
                        ) : (
                          ""
                        )}
                      </h5>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      id="image"
                      name="bannerUrl"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </Form.Group>
                </>
              ) : (
                ""
              )}

              <Form.Group className="pt-2 pb-2">
                <Button type="submit">Add</Button>
              </Form.Group>
            </Form>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

const UpdateFooterItem: React.FC<Props> = ({
  itemId,
  parentId,
  innerdata,
  name,
}) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [serviceSection, setServiceSection] = useState<Parent[]>([]);
  const [sportName, setSportName] = useState("");
  const [showCom, setShowCom] = useState(true);
  const [address, setAddress] = useState("");
  const [bgColor, setBgColor] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState("");
  const [pin, setPin] = useState("");
  const [title, setTitle] = useState("");

  const [url, setUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
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

  const cancle = () => {
    const userConfirmed = window.confirm("Cancled");

    if (userConfirmed) {
      window.location.reload();
    }
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
      formData.append("title", title);
      formData.append("bgColor", bgColor);

      formData.append("pin", pin);
      formData.append("address", address);
      formData.append("url", url);
      if (image) {
        formData.append("image", image);
      }

      try {
        // let url = "";
        // if (name === "link") {
        //   url = `http://165.22.219.69:5002/api/footerlinkitem`;
        // } else if (name === "address") {
        //   url = `http://165.22.219.69:5002/api/footeraddressitem`;
        // } else if (name === "joinUs") {
        //   url = `http://165.22.219.69:5002/api/footerjoinusitem`;
        // } else if (name === "importantLink") {
        //   url = `http://165.22.219.69:5002/api/footerimportantlinkitem`;
        // }

        let url = "";
        if (name === "link") {
          url = `http://165.22.219.69:5002/api/update/footerlinkitem`;
        } else if (name === "address") {
          url = `http://165.22.219.69:5002/api/update/footeraddressitem`;
        } else if (name === "joinUs") {
          url = `http://165.22.219.69:5002/api/update/footerjoinusitem`;
        } else if (name === "importantLink") {
          url = `http://165.22.219.69:5002/api/update/footerimportantlinkitem`;
        }

        const response = await fetch(
          `${url}/${parentId}/childid/${itemId}/${profileId}/${Key_Key}`,
          {
            method: "PATCH",
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
        const userConfirmed = window.confirm("updated");

        if (userConfirmed) {
          window.location.reload();
        }
      } catch (error) {
        console.error("Error during edit the banner:", error);
      }
    }
    setValidated(true);
  };

  useEffect(() => {
    // This code will run every time itemId changes
    // console.log('itemId has changed:', itemId);
    // You can add any additional logic or updates you want here
  }, [itemId]);

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
                {name == "address" ? (
                  <>
                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>Address</h5>
                      </Form.Label>
                      <Form.Control
                        className="accordion-item"
                        type="text"
                        placeholder={filterItem?.address}
                        defaultValue={filterItem?.address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>Pin</h5>
                      </Form.Label>
                      <Form.Control
                        className="accordion-item"
                        type="text"
                        placeholder={filterItem?.pin}
                        defaultValue={filterItem?.pin}
                        onChange={(e) => setPin(e.target.value)}
                      />
                    </Form.Group>
                  </>
                ) : (
                  ""
                )}

                {name == "joinUs" ? (
                  <Form.Group>
                    <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                      <h5>Enter Background Color</h5>
                    </Form.Label>
                    <Form.Control
                      className="accordion-item"
                      type="text"
                      placeholder={filterItem?.bgColor}
                      defaultValue=""
                      onChange={(e) => setBgColor(e.target.value)}
                    />
                  </Form.Group>
                ) : (
                  ""
                )}

                {name == "link" ||
                name == "joinUs" ||
                name == "importantLink" ? (
                  <>
                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>Enter url</h5>
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
                      <Form.Label className="d-flex pt-1 justify-content-start">
                        <h5>Image </h5>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        id="image"
                        name="bannerUrl"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </Form.Group>
                  </>
                ) : (
                  ""
                )}

                <Row>
                  <Col lg={3}>
                    <Form.Group className="pt-2 pb-2">
                      <Button type="submit">Update</Button>
                    </Form.Group>
                  </Col>
                  <Col lg={3}>
                    <Form.Group className="pt-2 pb-2">
                      <Button
                        className="btn btn-danger"
                        type="button"
                        onClick={() => cancle()}
                      >
                        Cancle
                      </Button>
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
const DeleteFooterItem: React.FC<parentId> = ({ id, link, name }) => {
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
    const fetchData = async () => {
      // const response = await fetch("http://165.22.219.69:5002/api/footerpage");
      // let url = "";
      // if (name === "link") {
      //   url = `http://165.22.219.69:5002/api/footerlinkitem`;
      // } else if (name === "address") {
      //   url = `http://165.22.219.69:5002/api/footeraddressitem`;
      // } else if (name === "joinUs") {
      //   url = `http://165.22.219.69:5002/api/footerjoinusitem`;
      // } else if (name === "importantLink") {
      //   url = `http://165.22.219.69:5002/api/footerimportantlinkitem`;
      // }
      let url = "";
      if (name === "link") {
        url = `http://165.22.219.69:5002/api/footerlinkitem`;
      } else if (name === "address") {
        url = `http://165.22.219.69:5002/api/footeraddressitem`;
      } else if (name === "joinUs") {
        url = `http://165.22.219.69:5002/api/footerjoinusitem`;
      } else if (name === "importantLink") {
        url = `http://165.22.219.69:5002/api/footerimportantlinkitem`;
      }

      try {
        const response = await fetch(`${url}/${id}`);
        if (response.status === 440) {
          alert("Session Expired");
          dispatch(logoutUser());
          window.location.href = "https://admin.biharsports.org/auth/login";
        }
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.length > 0) {
          // Assuming you want to set the pageId to the first item's _id
          // setPageId(data[0]._id);
        }
        setInnerData(data.filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function to fetch and set data
  }, [name]);

  // --delete org str item
  const deleteItem = async (itemId: string) => {
    try {
      // let url = "";
      // if (name === "link") {
      //   url = `http://165.22.219.69:5002/api/delete/footerlinkitem`;
      // } else if (name === "address") {
      //   url = `http://165.22.219.69:5002/api/delete/footeraddressitem`;
      // } else if (name === "joinUs") {
      //   url = `http://165.22.219.69:5002/api/delete/footerjoinusitem`;
      // } else if (name === "importantLink") {
      //   url = `http://165.22.219.69:5002/api/delete/footerimportantlinkitem`;
      // }

      let url = "";
      if (name === "link") {
        url = `http://165.22.219.69:5002/api/delete/footerlinkitem`;
      } else if (name === "address") {
        url = `http://165.22.219.69:5002/api/delete/footeraddressitem`;
      } else if (name === "joinUs") {
        url = `http://165.22.219.69:5002/api/delete/footerjoinusitem`;
      } else if (name === "importantLink") {
        url = `http://165.22.219.69:5002/api/delete/footerimportantlinkitem`;
      }

      const response = await fetch(
        `${url}/${id}/childid/${itemId}/${profileId}/${Key_Key}`,
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
      const userConfirmed = window.confirm("Deleted");

      if (userConfirmed) {
        window.location.reload();
      }
    } catch (error) {
      console.log("Error during edit the banner:", error);
    }
  };

  // const editItem = async (id: string) => {
  //   let newEditItem = innerdata.find((elem) => {
  //     return elem._id === id;
  //   });
  //   setIsEditItem(id);
  // };

  const editItem = async (id: string) => {
    let newEditItem = innerdata.find((elem) => {
      return elem._id === id;
    });
    setIsEditItem(id);
  };

  // useEffect(() => {
  //   fetch(`http://165.22.219.69:5002/api/statelevelachievementitem/${id}`)
  //     .then((response) => response.json())
  //     .then((res) => setInnerData(res.filteredData));
  // }, []);

  return (
    // <>
    //   <Row>
    //     {isEditItem ? (

    //       <Col lg={10}>
    //         <UpdateFooterItem itemId={isEditItem} parentId={id} innerdata={innerdata} link={innerdata} name={name} />
    //       </Col>
    //     ) : (
    //       <>

    //         <Col lg={10}>
    //           <Card>
    //             <Card.Body>
    //               <h4>Update or delete <span style={{ fontSize: '20px', color: 'red' }} >{name ? name : 'Select'}</span></h4>

    //               <Table striped bordered hover>
    //                 <thead>
    //                   <tr>
    //                     <th className="w-5px">#</th>
    //                     <th className="w-60">Notice Title</th>
    //                     <th>Actions</th> {/* New column for actions */}
    //                   </tr>
    //                 </thead>
    //                 {(innerdata || []).map((item, i) => (
    //                   <>
    //                     <tbody>
    //                       <tr key={item._id}>
    //                         <td>{i + 1}</td> {/* You can use i+1 as the index */}
    //                         <td>{item?.title}</td>
    //                         <td>
    //                           {/* Delete button */}
    //                           <Row>
    //                             <Col lg={4}>
    //                               <button
    //                                 onClick={() => deleteItem(item._id)}
    //                                 className="btn btn-danger"
    //                               >
    //                                 Delete
    //                               </button>
    //                             </Col>

    //                             <Col lg={4}>
    //                               <button
    //                                 onClick={() => editItem(item._id)}
    //                                 className="btn btn-primary"
    //                               >
    //                                 Update
    //                               </button>
    //                             </Col>

    //                           </Row>

    //                         </td>
    //                       </tr>
    //                     </tbody>
    //                   </>
    //                 ))}
    //               </Table>
    //             </Card.Body>
    //           </Card>
    //         </Col>

    //       </>
    //     )}
    //   </Row>

    // </>
    <div>
      <Row>
        <Col lg={6}>
          <Card>
            <Card.Body>
              <h4>
                Update or delete{" "}
                <span style={{ fontSize: "20px", color: "red" }}>
                  {name ? name : "Select"}
                </span>
              </h4>

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
                        <td>{item?.title}</td>
                        <td>
                          {/* Delete button */}
                          <Row>
                            <Col lg={4}>
                              <button
                                onClick={() => deleteItem(item._id)}
                                className="btn btn-danger"
                              >
                                Delete
                              </button>
                            </Col>

                            <Col lg={4}>
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
        </Col>
        {isEditItem ? (
          <Col lg={6}>
            <UpdateFooterItem
              itemId={isEditItem}
              parentId={id}
              innerdata={innerdata}
              name={name}
            />
          </Col>
        ) : (
          ""
        )}
      </Row>
    </div>
  );
};

// _______________________________________________________________

const Footer = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [data, setData] = useState<Parent[]>([]);
  const [text, setText] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [innerData, setInnerData] = useState("");
  const [name, setName] = useState("");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://165.22.219.69:5002/api/footerpage"
        );

        // const response = await fetch("http://165.22.219.69:5002/api/footerpage");

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.length > 0) {
          // Assuming you want to set the pageId to the first item's _id
          // setPageId(data[0]._id);
        }

        setData(data);
        setLink(data[0]?.link);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function to fetch and set data
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
  const handleBannerUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
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
      if (image) {
        formData.append("image", image);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/footerpage/${profileId}/${Key_Key}`,
          // const response = await fetch(`http://165.22.219.69:5002/api/footerpage`,

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
          alert("Data Added");
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

      if (image) {
        formData.append("image", image);
      }

      try {
        const response = await fetch(
          // `http://165.22.219.69:5002/api/update/footerpage/${objectId}`,
          `http://165.22.219.69:5002/api/update/footerpage/${objectId}/${profileId}/${Key_Key}`,
          {
            method: "PATCH",
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
        // const userConfirmed = window.confirm("updated");

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

  const showItem = (item: any) => {
    // if (item === 'link') setInnerData(data[0]?.link); setName(item);
    if (item === "link") {
      if (data[0]?.link !== undefined) {
        setInnerData(data[0]?.link);
        setName(item);
      }
    }

    if (item === "address") {
      if (data[0]?.address !== undefined) {
        setInnerData(data[0]?.address);
        setName(item);
      }
    }

    if (item === "joinUs") {
      if (data[0]?.joinUs !== undefined) {
        setInnerData(data[0]?.joinUs);
        setName(item);
      }
    }
    if (item === "importantLink") {
      if (data[0]?.importantLink !== undefined) {
        setInnerData(data[0]?.importantLink);
        setName(item);
      }
    }
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
                    <h4>Add Footer Page</h4>
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
                          Heading <span style={{ color: "red" }}> *</span>
                        </h5>
                      </Form.Label>
                      <Form.Control
                        className="accordion-item"
                        type="text"
                        placeholder="Heading"
                        required
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
                        <h5>Image</h5>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        id="image"
                        name="bannerUrl"
                        accept="image/*"
                        onChange={handleBannerUrl}
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
                    <h4>Update Footer Page</h4>
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
                          Heading <span style={{ color: "red" }}> *</span>{" "}
                        </h5>
                      </Form.Label>
                      <Form.Control
                        className="accordion-item"
                        type="text"
                        required
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
                        <h5>Image</h5>
                      </Form.Label>
                      <Form.Control
                        type="file"
                        id="image"
                        name="bannerUrl"
                        accept="image/*"
                        onChange={handleBannerUrl}
                      />
                    </Form.Group>

                    <Form.Group className="pt-2 pb-1">
                      <Button type="submit">Update</Button>
                    </Form.Group>
                  </Form>
                </Col>
              )}

              {/* =============== practice ---------------- */}

              {/* -------------------------- update data--------------------------------------------- */}
              <Col lg={6}>{data && <DeleteFooterPage data={data} />}</Col>
            </Row>
            <div
              style={{ width: "100%", height: "1px", backgroundColor: "red" }}
            ></div>

            <Row>
              <Col lg={6}>
                {data && (
                  <AddFooterItem id={objectId} link={innerData} name={name} />
                )}
              </Col>

              <Col lg={6}>
                <h3>Choose the following item to work on it</h3>
                <div className="d-flex  flex-wrap w-100">
                  {(footerItems || []).map((item, index) => (
                    <div style={{ fontSize: "20px", padding: "10px 20px" }}>
                      <Button onClick={() => showItem(item.name)}>
                        <h4>{item.name}</h4>
                      </Button>
                    </div>
                  ))}
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                {objectId && data && (
                  <DeleteFooterItem
                    id={objectId}
                    link={innerData}
                    name={name}
                  />
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Footer;
