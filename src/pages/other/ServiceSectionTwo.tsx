// import { height } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";

interface Child {
  _id: string;
  sportName: string;
  sportDetails: string;
  image: string;
  text?: string;
  isDeleted: boolean;
  data?: [];
}

interface Parent {
  _id?: string;
  id?: string;
  text?: string;
  content?: string;
  bannerUrl?: string;
  mobileBannerUrl?: string;
  StateLevel?: Child[]; // An array of OrgtnalSruItem objects
  // OrgtnalSruItem:array;
  isDeleted?: boolean;
  data?: any;
}

interface Props {
  itemId: string; // Replace 'boolean' with the appropriate type if needed
  parentId?: string;
  innerdata: Child[];
}
interface parentId {
  itemId: string; // Replace 'boolean' with the appropriate type if needed
  id?: string;
  _id?: string;
  parentId?: string | undefined;
  innerdata: Child[];
}
interface item {
  child?: [];
}
// const DeleteOriStru: React.FC<parentId> = () => {
const DeleteServicePage: React.FC<Parent> = ({ data }) => {
  const [validated, setValidated] = useState<boolean>(false);
  // const [comingData, setComingData] = useState<Parent[]>([]);

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
        `http://165.22.219.69:5002/api/delete/statelevelachievement/${itemId}/${profileId}`,
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
      alert("Deleted");
    } catch (error) {
      console.error("Error during edit the banner:", error);
    }
  };
  // useEffect(() => {
  //   fetch("http://165.22.219.69:5002/api/prioritysport")
  //     .then((response) => response.json())
  //     .then((res) => setComingData(res));
  // }, []);

  return (
    <>
      <>
        <Card>
          <Card.Body>
            <h4>Delete Service Page</h4>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr. N</th>
                  <th>Title</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {(data || []).map((item: Child, i: number) => (
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
const UpdateServicePageItem: React.FC<Props> = ({
  itemId,
  parentId,
  innerdata,
}) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [serviceSection, setServiceSection] = useState<Parent[]>([]);
  const [sportName, setSportName] = useState("");
  const [showCom, setShowCom] = useState(true);
  const [sportDetails, setSportDetails] = useState("");
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
      formData.append("sportName", sportName);
      formData.append("sportDetails", sportDetails);

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/update/statelevelachievement/${parentId}/statelevelachievementitem/${itemId}/${profileId}`,
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
        alert("Updated");
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
                <h4>Update</h4>
                {/* <> */}

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
                    defaultValue={filterItem.sportDetails}
                    onChange={(e) => setSportDetails(e.target.value)}
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
const DeleteServiePageItem: React.FC<Parent> = ({ id }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [innerdata, setInnerData] = useState<Child[]>([]);
  const [isEditItem, setIsEditItem] = useState<string>("");

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

  // --delete org str item
  const deleteItem = async (itemId: string) => {
    try {
      const response = await fetch(
        `http://165.22.219.69:5002/api/delete/statelevelachievement/${id}/statelevelachievementitem/${itemId}/${profileId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert("Deleted");
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

  useEffect(() => {
    fetch(`http://165.22.219.69:5002/api/statelevelachievementitem/${id}`)
      .then((response) => response.json())
      .then((res) => setInnerData(res.filteredData));
  }, []);

  return (
    <>
      {isEditItem ? (
        <Row>
          <Col lg={10}>
            <UpdateServicePageItem
              itemId={isEditItem}
              parentId={id}
              innerdata={innerdata}
            />
          </Col>
        </Row>
      ) : (
        <>
          <h4>Update or delete Service Section Item</h4>

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
                        <td>{item?.sportName}</td>
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
        </>
      )}
    </>
  );
};

// -------------------------------add org item----------------

const AddServicePageItem: React.FC<Parent> = ({ id }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [text, setText] = useState("");
  const [contant, setContant] = useState("");
  const [description, setDescription] = useState("");
  const [bannerUrl, setBannerUrl] = useState<File | null>(null);
  const [mobileBannerUrl, setMobileUrl] = useState<File | null>(null);

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

  const addOrgItem = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("text", text);
      formData.append("contant", contant);
      formData.append("description", description);
      if (bannerUrl) {
        formData.append("bannerUrl", bannerUrl);
      }
      if (mobileBannerUrl) {
        formData.append("mobileBannerUrl", mobileBannerUrl);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/statelevelachievementitem/${id}/${profileId}`,
          {
            method: "POST",
            body: formData,
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Assuming you want to parse the JSON response
        const data = await response.json();
        alert("added");
      } catch (error) {
        console.error("Error during edit the banner:", error);
      }
    }
    setValidated(true);
  };

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

  return (
    <>
      <Card>
        <Card.Body>
          <Form
            style={{ width: "100%" }}
            onSubmit={addOrgItem}
            encType="multipart/form-data"
          >
            <h4>Add Service Section Item</h4>
            {/* <> */}
            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>
                  Name <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="Name"
                defaultValue="Name"
                onChange={(e) => setText(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Contant</h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="Sport Details"
                defaultValue="Contant"
                onChange={(e) => setContant(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>Description</h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="Sport Details"
                defaultValue="Description"
                onChange={(e) => setDescription(e.target.value)}
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
                  Mobile Banner Image <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                type="file"
                required
                id="image"
                name="mobileBannerUrl"
                accept="image/*"
                onChange={handleMobileUrl}
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

const UpdateServicePageNestedItem: React.FC<Props> = ({
  itemId,
  parentId,
  innerdata,
}) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [serviceSection, setServiceSection] = useState<Parent[]>([]);
  const [sportName, setSportName] = useState("");
  const [showCom, setShowCom] = useState(true);
  const [sportDetails, setSportDetails] = useState("");
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
      formData.append("sportName", sportName);
      formData.append("sportDetails", sportDetails);

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/update/statelevelachievement/${parentId}/statelevelachievementitem/${itemId}/${profileId}`,
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
        alert("Updated");
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
                <h4>Update</h4>
                {/* <> */}

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
                    defaultValue={filterItem.sportDetails}
                    onChange={(e) => setSportDetails(e.target.value)}
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
const DeleteServiePageNestedItem: React.FC<Parent> = ({ id }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [innerdata, setInnerData] = useState<Child[]>([]);
  const [isEditItem, setIsEditItem] = useState<string>("");

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

  // --delete org str item
  const deleteItem = async (itemId: string) => {
    try {
      const response = await fetch(
        `http://165.22.219.69:5002/api/delete/statelevelachievement/${id}/statelevelachievementitem/${itemId}/${profileId}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      alert("Deleted");
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

  useEffect(() => {
    fetch(`http://165.22.219.69:5002/api/statelevelachievementitem/${id}`)
      .then((response) => response.json())
      .then((res) => setInnerData(res.filteredData));
  }, []);

  return (
    <>
      {isEditItem ? (
        <Row>
          <Col lg={10}>
            <UpdateServicePageNestedItem
              itemId={isEditItem}
              parentId={id}
              innerdata={innerdata}
            />
          </Col>
        </Row>
      ) : (
        <>
          <h4>Update or delete inside Service Item</h4>

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
                        <td>{item?.sportName}</td>
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
        </>
      )}
    </>
  );
};

// -------------------------------add org item----------------

const AddServicePageNestedItem: React.FC<Parent> = ({ id }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [sportName, setSportName] = useState("");
  const [sportDetails, setSportDetails] = useState("");
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
      formData.append("sportDetails", sportDetails);
      if (image) {
        formData.append("image", image);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/statelevelachievementitem/${id}/${profileId}`,
          {
            method: "POST",
            body: formData,
            credentials: "include",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Assuming you want to parse the JSON response
        const data = await response.json();
        alert("added");
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
            <h4>Add date inside Service Item</h4>
            {/* <> */}

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>
                  Name <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                required
                placeholder="Name"
                defaultValue=""
                onChange={(e) => setSportName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>
                  Details <span style={{ color: "red" }}> *</span>
                </h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                required
                placeholder="Details"
                defaultValue=""
                onChange={(e) => setSportDetails(e.target.value)}
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

const ServicePage = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [data, setData] = useState<Parent[]>([]);

  const [text, setText] = useState("");
  const [contant, setContant] = useState("");

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

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  useEffect(() => {
    fetch("http://165.22.219.69:5002/api/servicepage")
      .then((response) => response.json())
      .then((res) => setData(res));
  }, []);

  //   ------------------------------------------ setting image in the input--------------------------------

  const handleMobileUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      formData.append("contant", contant);

      if (image) {
        formData.append("image", image);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/servicepage/${profileId}`,
          {
            method: "POST",
            body: formData,
            credentials: "include",
          }
        );
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
      formData.append("contant", contant);
      if (image) {
        formData.append("image", image);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/update/servicepage/${objectId}/${profileId}`,
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
        alert("Updated");
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
                    <h4>Add Service Page</h4>
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
                        onChange={(e) => setContant(e.target.value)}
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
                    <h4>Update Service Page</h4>
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
                        onChange={(e) => setContant(e.target.value)}
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
                      <Button type="submit">Edit Form</Button>
                    </Form.Group>
                  </Form>
                </Col>
              )}
              {/* -------------------------- update data--------------------------------------------- */}
              <Col lg={6}>{data && <DeleteServicePage data={data} />}</Col>
            </Row>
            <div
              style={{ width: "100%", height: "1px", backgroundColor: "red" }}
            ></div>
            <Row>
              <Col lg={6}>
                <AddServicePageItem id={objectId} />
              </Col>
              <Col lg={6}>
                {objectId && data && <DeleteServiePageItem id={objectId} />}
              </Col>
            </Row>
            <div
              style={{ width: "100%", height: "1px", backgroundColor: "blue" }}
            ></div>

            <Row>
              <Col lg={6}>
                <AddServicePageNestedItem id={objectId} />
              </Col>
              <Col lg={6}>
                {objectId && data && (
                  <DeleteServiePageNestedItem id={objectId} />
                )}
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default ServicePage;
