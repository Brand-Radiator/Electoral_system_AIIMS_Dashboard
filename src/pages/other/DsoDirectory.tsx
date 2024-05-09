import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";
import { logoutUser } from "../../redux/actions";

import AuthModal from "../../components/Modal";
import { Alert } from "react-bootstrap";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";

interface dsoList {
  _id: string;
  officerName: string;
  isDeleted: boolean;
  mobileNumber: string;
  emailId: string;
  sports: string;
  designation: string;
}

interface OrgtnalStru {
  _id: string;
  aboutText?: string;
  bannerUrl?: string;
  mobileBannerUrl?: string;
  dsoList: dsoList[]; // An array of dsoList objects
  // dsoList:array;
  isDeleted: boolean;
}

interface UpdateServiceSectionProps {
  itemId: string; // Replace 'boolean' with the appropriate type if needed
  parentId: string;
  innerdata: dsoList[];
}
interface parentId {
  itemId: string; // Replace 'boolean' with the appropriate type if needed
  parentId: string;
  id: string;
}

const DeleteDsoDirectory = () => {
  const [validated, setValidated] = useState<boolean>(false);

  const [data, setData] = useState<OrgtnalStru[]>([]);
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
        `http://165.22.219.69:5002/api/delete/dsodirectory/${itemId}/${profileId}/${Key_Key}`,
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
      alert("Deleted");
      // console.log("data -----------", data);
    } catch (error) {
      console.error("Error during edit the banner:", error);
    }
  };
  useEffect(() => {
    fetch("http://165.22.219.69:5002/api/dsodirectory")
      .then((response) => response.json())
      .then((res) => setData(res));
  }, []);

  return (
    <>
      <>
        <Card>
          <Card.Body>
            <h4>Delete DSO Directory Page</h4>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr. N</th>
                  <th>Title</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {(data || []).map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td> {/* You can use i+1 as the index */}
                    <td>{item.aboutText}</td>
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

// ------------------------------Add DSO in this pagesList------------------------------

const AddDSOItem = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [serviceSection, setServiceSection] = useState<OrgtnalStru[]>([]);
  const [officerName, setOfficerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [designation, setDesignation] = useState("");
  const [sports, setSports] = useState("");
  const [pageId, setPageId] = useState("");
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://165.22.219.69:5002/api/dsodirectory"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.length > 0) {
          // Assuming you want to set the pageId to the first item's _id
          setPageId(data[0]._id);
        }

        setServiceSection(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function to fetch and set data
  }, []);

  const addDso = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      // Create a JSON object with the data you want to send
      const data = {
        officerName,
        mobileNumber,
        emailId,
        designation,
        sports,
      };

      const response = await fetch(
        `http://165.22.219.69:5002/api/dso/${pageId}/${profileId}/${Key_Key}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
          body: JSON.stringify(data), // Convert data object to JSON string
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
      const responseData = await response.json();
      if (responseData) {
        alert("DSO Added Successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during add DSO:", error);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Form style={{ width: "100%" }} onSubmit={addDso}>
              <h4>Add DSO</h4>
              {isError && (
                <Alert variant="danger" className="my-2">
                  {isResponse}
                </Alert>
              )}
              {showModal && <AuthModal />}
              {/* <> */}
              <Form.Group className="mb-3">
                <Form.Label>
                  Name <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  required
                  placeholder="Name of officer"
                  //   defaultValue={filterItem?.aboutText}
                  onChange={(e) => setOfficerName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Designation <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Designation"
                  defaultValue=""
                  onChange={(e) => setDesignation(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Mobile Number <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="mobile number"
                  defaultValue=""
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Email Id <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="email Id"
                  defaultValue=""
                  onChange={(e) => setEmailId(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>
                  Sports <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="sport name"
                  defaultValue=""
                  onChange={(e) => setSports(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Button type="submit">Submit</Button>
            </Form>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

// -------------------------------------  for organizational Structured Item  ---------------

const UpdateOriStruItem: React.FC<UpdateServiceSectionProps> = ({
  itemId,
  parentId,
  innerdata,
}) => {
  // console.log(
  //   "from 261",
  //   itemId,
  //   "parent-----",
  //   parentId,
  //   "whole data --",
  //   innerdata
  // );
  const [validated, setValidated] = useState<boolean>(false);
  const [serviceSection, setServiceSection] = useState<OrgtnalStru[]>([]);
  const [officerName, setOfficerName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [emailId, setEmailId] = useState("");
  const [designation, setDesignation] = useState("");
  const [sports, setSports] = useState("");
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

  const UpdateOrgStruItem = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();

      const upDatedData = {
        officerName,
        mobileNumber,
        emailId,
        designation,
        sports,
      };

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/update/dsodirectory/${parentId}/dso/${itemId}/${profileId}/${Key_Key}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
            },
            body: JSON.stringify(upDatedData),
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
        // console.log("data -----------", data);
        if (data) {
          alert("DSO updated successfully!");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error during edit DSO:", error);
      }
    }
    setValidated(true);
  };

  return (
    <>
      <Row>
        {(innerdata || [])
          .filter((item) => {
            // console.log("filter", item._id);
            return item._id === itemId;
          })
          .map((filterItem, index) => (
            <Form
              key={index}
              style={{ width: "100%" }}
              onSubmit={UpdateOrgStruItem}
            >
              <h4>Update DSO</h4>
              {isError && (
                <Alert variant="danger" className="my-2">
                  {isResponse}
                </Alert>
              )}
              {showModal && <AuthModal />}
              <Form.Group className="mb-3">
                <Form.Label className="ustify-content-start">Name</Form.Label>
                <Form.Control
                  className="accordion-item"
                  type="text"
                  placeholder={filterItem?.officerName}
                  defaultValue={filterItem?.officerName}
                  onChange={(e) => setOfficerName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Designation</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder={filterItem?.designation}
                  defaultValue={filterItem?.designation}
                  onChange={(e) => setDesignation(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder={filterItem?.mobileNumber}
                  defaultValue={filterItem?.mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Id</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder={filterItem?.emailId}
                  defaultValue={filterItem?.emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Sports</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder={filterItem?.sports}
                  defaultValue={filterItem?.sports}
                  onChange={(e) => setSports(e.target.value)}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              <Button type="submit">Update</Button>
            </Form>
          ))}
      </Row>
    </>
  );
};
// _________________________________________________________

const DeleteOriStruItem: React.FC<parentId> = ({ id }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [innerdata, setInnerData] = useState<dsoList[]>([]);
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

  // --delete org str item
  const deleteItem = async (itemId: string) => {
    try {
      // console.log("delete fun", id, "-----", itemId);
      const response = await fetch(
        `http://165.22.219.69:5002/api/delete/dsodirectory/${id}/dso/${itemId}/${profileId}/${Key_Key}`,
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
        alert("DSO deleted");
      }
    } catch (error) {
      console.error("Error during edit the banner:", error);
    }
  };

  const editItem = async (id: string) => {
    // console.log("child id----------------", id);
    let newEditItem = innerdata.find((elem) => {
      return elem._id === id;
    });
    setIsEditItem(id);
  };

  const updateItem = async (itemId: string) => {
    // console.log("hello", itemId);
  };

  useEffect(() => {
    // if(id){
    fetch(`http://165.22.219.69:5002/api/dso/${id}`)
      .then((response) => response.json())
      .then((res) => setInnerData(res.filteredData));
    // }
  }, []);

  return (
    // <h1>hi</h1>
    <>
      {isEditItem ? (
        <Card>
          <Card.Body>
            <Row>
              {/* <Col lg={6}> */}
              <UpdateOriStruItem
                itemId={isEditItem}
                parentId={id}
                innerdata={innerdata}
              />
              {/* </Col> */}
            </Row>
          </Card.Body>
        </Card>
      ) : (
        <>
          <h4>Update or delete Orignizational Structure data</h4>

          <Card>
            <Card.Body>
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th className="w-5px">#</th>
                      <th className="w-60">Officer Name</th>
                      <th className="w-60">Mobile Number</th>
                      <th className="w-60">Sports</th>
                      <th>Actions</th> {/* New column for actions */}
                    </tr>
                  </thead>
                  <tbody>
                    {(innerdata || []).map((item, i) => (
                      <tr key={item._id}>
                        <td>{i + 1}</td>
                        <td>{item?.officerName}</td>
                        <td>{item?.mobileNumber}</td>
                        <td>{item?.sports}</td>
                        <td>
                          {/* Delete button */}
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
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

const AddDsoDirectory = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [data, setData] = useState<OrgtnalStru[]>([]);

  const [aboutText, setAboutText] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState("");
  const dispatch = useDispatch<AppDispatch>();

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
    fetch("http://165.22.219.69:5002/api/dsodirectory")
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
      formData.append("aboutText", aboutText);

      if (bannerUrl) {
        formData.append("bannerUrl", bannerUrl);
      }
      if (mobileBannerUrl) {
        formData.append("mobileBannerUrl", mobileBannerUrl);
      }

      // console.log("formData-------,", formData);

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/dsodirectory/${profileId}/${Key_Key}`,
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
        // console.log("data -----------", data);
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
      formData.append("aboutText", aboutText);
      if (bannerUrl) {
        formData.append("bannerUrl", bannerUrl);
      }
      if (mobileBannerUrl) {
        formData.append("mobileBannerUrl", mobileBannerUrl);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/update/dsodirectory/${objectId}/${profileId}/${Key_Key}`,
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
                // <Col lg={6}>
                <Form
                  style={{ width: "100%" }}
                  onSubmit={handleFormSubmit}
                  encType="multipart/form-data"
                >
                  <h4>Add DSO Directory Page</h4>
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
                      placeholder="Heading"
                      defaultValue=""
                      onChange={(e) => setAboutText(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="d-flex pt-1 justify-content-start">
                      <h5>Desktop Banner Image</h5>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      id="image"
                      name="bannerUrl"
                      accept="image/*"
                      onChange={handleBannerUrl}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label className="justify-content-start">
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

                  <Button type="submit">Add</Button>
                </Form>
              ) : (
                // </Col>
                // <Col lg={6}>
                <Form
                  style={{ width: "100%" }}
                  onSubmit={handleUpdate}
                  encType="multipart/form-data"
                >
                  <h4>Update DSO Directory Page</h4>
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
                      placeholder="Heading"
                      defaultValue={data[0]?.aboutText}
                      onChange={(e) => setAboutText(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label className="d-flex pt-1 justify-content-start">
                      <h5> Desktop Banner Image</h5>
                    </Form.Label>
                    <Form.Control
                      type="file"
                      id="image"
                      name="bannerUrl"
                      accept="image/*"
                      onChange={handleBannerUrl}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
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

                  <Button type="submit">Edit Page</Button>
                </Form>
                // </Col>
              )}

              {/* -------------------------- update data--------------------------------------------- */}
            </Row>
          </Card.Body>
        </Card>
        {/*
        <DeleteDsoDirectory /> */}
      </div>
    </>
  );
};

const DsoDirectory = () => {
  //   const [serviceSection, setServiceSection] = useState<serviceSection[]>([]);
  const [data, setData] = useState<OrgtnalStru[]>([]);

  useEffect(() => {
    fetch("http://165.22.219.69:5002/api/dsodirectory")
      .then((response) => response.json())
      .then((res) => setData(res));
  }, []);

  let objectId: any;

  if (data.length > 0) {
    const { _id } = data[0];
    objectId = _id;
  }

  return (
    <React.Fragment>
      <PageTitle
        breadCrumbItems={[
          { label: "Pages", path: "/pages/dso-directory" },
          {
            label: "DSO Directory",
            path: "/pages/dso-directory",
            active: true,
          },
        ]}
        title={"DSO Directory"}
      />
      <Row>
        <Col lg={6}>
          <AddDsoDirectory />
        </Col>

        <Col lg={6}>
          <DeleteDsoDirectory />
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <AddDSOItem />
        </Col>
        <Col lg={12}>
          {objectId && (
            <DeleteOriStruItem id={objectId} itemId={""} parentId={""} />
          )}
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default DsoDirectory;
