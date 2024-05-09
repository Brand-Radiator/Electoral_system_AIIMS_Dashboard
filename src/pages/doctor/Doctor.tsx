// import { height } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/actions";
import AuthModal from "../../components/Modal";
import { Alert } from "react-bootstrap";

// components
import PageTitle from "../../components/PageTitle";

import PersonalDetails from "../other/Profile/PersonalDetails";
import OtherDetails from "../other/Profile/OtherDetails";

// dummy data
import { userInfo } from "../other/Profile/data";
import { API_BASE_URL } from "../../apiservices/apiService";

interface OrgtnalSruItem {
  _id?: string;
  aboutText?: string;
  isDeleted?: boolean;
}

interface userData {
  name?: string;
  email?: string;
  password?: string;
  hobbies?: string;
  role?: string;
  isDeleted?: boolean;
  imageUrl?: string;
  _id?: string;
}

interface OrgtnalStru {
  _id: string;
  name?: string;
  bannerUrl?: string;
  mobileBannerUrl?: string;
  aboutText?: string;
  // OrgtnalSruItem:array;
  isDeleted: boolean;
  email?: string;
  hobbies?: string;
  role?: string;
  innerData?: userData[] | [];
}

interface UpdateServiceSectionProps {
  itemId: string; // Replace 'boolean' with the appropriate type if needed
  parentId?: string;
  innerdata: userData[];
  setIsUpdateModal: Function;
}
interface ParentId {
  itemId?: string; // Replace 'boolean' with the appropriate type if needed
  id?: string;
  parentId?: string;
}
interface id {
  id?: string;
}

const data = {
  _id: "65532cf56b5921d169e5f760",
  name: "Test",
  email: "test@gmail.com",
  password: "$2b$10$vYOp7Zoce3ra2CpjM7GSKOeeqDRYT/4ClclaNQQR2npjwbOFxVG.m",
  role: "Admin",
  isDeleted: "false",
  imageUrl: "public\\images\\image_1699949812161.jpeg",
  __v: 0,
};

// -------------------------------------  for organizational Structured Item  ---------------
// ---999999999999999999 for update item
const UpdateEmployee: React.FC<UpdateServiceSectionProps> = ({
  itemId,
  parentId,
  innerdata,
  setIsUpdateModal,
}) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [serviceSection, setServiceSection] = useState<OrgtnalStru[]>([]);
  const [aboutText, setAboutText] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [isError, setIsError] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  // console.log("You are in the update section");
  // ------------------------- for saving the data to updte
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
          `${API_BASE_URL}/user/${profileId}/${Key_Key}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (!response.ok) {
          // Handle non-successful response (optional)
          console.error("Error fetching data:", response.statusText);
          return;
        }
        if (response.status === 440) {
          alert("Session Expired");
          dispatch(logoutUser());
          window.location.href = "http://165.22.219.69:3002/auth/login"; // Use the full URL, including the protocol (http or https)
        }
        const data = await response.json();
        setServiceSection(data);
      } catch (error) {
        // Handle fetch error
        console.error("Error during fetch:", error);
      }
    };
    fetchData(); // Call the async function directly
    // Note: You may want to add a cleanup function here if needed
  }, [profileId, Key_Key]); // Include dependencies if needed

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

  const UpdateOrgStruItem = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("aboutText", aboutText);
      formData.append("name", name);
      formData.append("role", role);
      if (image) {
        formData.append("image", image);
      }
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/update/user/${profileId}/editor/${itemId}/${Key_Key}`,
          // `${API_BASE_URL}/api/update/user/${profileId}/editor/${itemId}`,
          {
            method: "PATCH",
            body: formData,
            credentials: "include",
          }
        );
        if (response.status === 440) {
          alert("Session Expired");
          dispatch(logoutUser());
          window.location.href = "http://165.22.219.69:3002/auth/login"; // Use the full URL, including the protocol (http or https)
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
          // console.log("response--", await response.json())
          let errorMsg = await response.json();
          setIsResponse(errorMsg.message);
          // console.log("response from update user---",response)
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Assuming you want to parse the JSON response
        const data = await response.json();
        if (response.ok) {
          alert("Data updated");
          setIsUpdateModal(false);
          window.location.reload();
        }
      } catch (error: any) {
        // setIsError(true);
        // setIsResponse(error.message)
        console.error("Error during edit the banner:", error);
      }
    }
    setValidated(true);
  };
  let Role = user.hobbies ? user.hobbies : user.user.hobbies;

  // console.log(setServiceSection, 'setServiceSection')

  return (
    <>
      <Card>
        <Card.Body>
          {(innerdata || [])
            ?.filter((item) => {
              return item._id === itemId;
            })
            ?.map((filterItem, index) => (
              <Form
                style={{ width: "100%" }}
                onSubmit={UpdateOrgStruItem}
                encType="multipart/form-data"
              >
                <h4>Update User</h4>

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
                    placeholder={filterItem?.name}
                    defaultValue={filterItem?.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3 mt-2"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setRole(e.target.value)
                  }
                >
                  <Form.Select>
                    <option disabled selected>
                      {filterItem?.role}
                    </option>
                    {Role === "Chess" ? (
                      <option value="Super Admin">Super Admin</option>
                    ) : (
                      ""
                    )}
                    <option value="Admin">Admin</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-1 justify-content-start">
                    <h5>Profile Image</h5>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="image"
                    name="mobileBannerUrl"
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
// _________________________________________________________

// const DeleteOriStruItem = ({id}) =>
const DeleteEmployee: React.FC<ParentId> = ({ id }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [innerdata, setInnerData] = useState<OrgtnalSruItem[]>([]);
  const [isEditItem, setIsEditItem] = useState<string>("");
  const [isResponse, setIsResponse] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const [data, setData] = useState<OrgtnalStru[]>([]);

  const { user, userLoggedIn, loading, error, userId } = useSelector(
    (state: RootState) => ({
      user: state.Auth.user,
      loading: state.Auth.loading,
      error: state.Auth.error,
      userLoggedIn: state.Auth.userLoggedIn,
      userId: state.Auth.id,
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
    // console.log(user, "user.token");
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/delete/user/${profileId}/employee/${itemId}/${Key_Key}`,
        // `${API_BASE_URL}/api/delete/user/${profileId}/employee/${itemId}`,

        {
          method: "PATCH",
          // headers: {
          //   token: `${user?.token}`, // Add the token to the Authorization header
          // },
          credentials: "include",
        }
      );
      if (response.status === 440) {
        alert("Session Expired");
        dispatch(logoutUser());
        window.location.href = "http://165.22.219.69:3002/auth/login"; // Use the full URL, including the protocol (http or https)
      }
      if (!response.ok) {
        let errorMsg = await response.json();
        setIsResponse(errorMsg.message);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      // Assuming you want to parse the JSON response
      const data = await response.json();

      if (data) {
        alert("Deleted");
        window.location.reload();
      }
    } catch (error) {
      // setIsResponse("Try after Some time")
      setShowModal(true);

      console.error("Error during delete the employee:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/user/${profileId}/${Key_Key}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.status === 440) {
          alert("Session Expired");
          dispatch(logoutUser());
          window.location.href = "http://165.22.219.69:3002/auth/login"; // Use the full URL, including the protocol (http or https)
        }
        if (!response.ok) {
          // Handle non-successful response (optional)
          console.error("Error fetching data:", response.statusText);
          return;
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        // Handle fetch error
        console.error("Error during fetch:", error);
      }
    };

    fetchData(); // Call the async function directly

    // Note: You may want to add a cleanup function here if needed
  }, [profileId, Key_Key]); // Include dependencies if needed

  const editItem = async (id: string) => {
    let newEditItem = data.find((elem) => {
      return elem._id === id;
    });
    setIsEditItem(id);
  };
  let Role = user.hobbies ? user.hobbies : user.user.hobbies;

  return (
    // <h1>hi</h1>
    <>
      {isEditItem ? (
        <Row>
          <Col lg={10}>
            {data && (
              // <UpdateEmployee
              //   itemId={isEditItem}
              //   parentId={id}
              //   innerdata={data}

              // />
              <></>
            )}
          </Col>
        </Row>
      ) : (
        <>
          <Card>
            <Card.Body>
              <h4>Update or delete Roles</h4>
              {isResponse && (
                <Alert variant="danger" className="my-2">
                  {isResponse}
                </Alert>
              )}
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sr. N</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      {Role.Role === "Chess" ? <th>Action</th> : ""}
                    </tr>
                  </thead>
                  <tbody>
                    {data.length >= 1
                      ? data.map((item, i) => (
                          <tr key={item._id}>
                            <td>{i + 1}</td>{" "}
                            {/* You can use i+1 as the index */}
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.role}</td>
                            <td>
                              {Role && Role === "Chess" ? (
                                <Row>
                                  <Col lg={5}>
                                    <button
                                      onClick={() => deleteItem(item._id)}
                                      className="btn btn-danger"
                                    >
                                      Delete
                                    </button>
                                  </Col>
                                  <Col lg={5}>
                                    <button
                                      onClick={() => editItem(item._id)}
                                      className="btn btn-primary"
                                    >
                                      Update
                                    </button>
                                  </Col>
                                </Row>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        ))
                      : ""}
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

// -------------------------------add org item----------------

// _______________________________________________________________

const Doctor = () => {
  const { user, userLoggedIn, loading, error, _id } = useSelector(
    (state: RootState) => ({
      user: state.Auth.user,
      loading: state.Auth.loading,
      error: state.Auth.error,
      userLoggedIn: state.Auth.userLoggedIn,
      _id: state.Auth._id,
    })
  );

  let profileId = user._id ? user._id : user.user ? user.user._id : "";
  const Key_Key = user.moniterd_ttl
    ? user.moniterd_ttl
    : user.user
    ? user.user.moniterd_ttl
    : "";

  // const user = useSelector((state)=> state.user)
  const [data, setData] = useState<userData[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [role, setRole] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState("");
  const [isUpdateModal, setIsUpdateModal] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  // console.log(profileId);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("role", role);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(
        // `${API_BASE_URL}/signup/${profileId}/${Key_Key}`,
        `${API_BASE_URL}/signup/${profileId}/${Key_Key}`,

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
        window.location.href = "http://165.22.219.69:3002/auth/login"; // Use the full URL, including the protocol (http or https)
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

      // Assuming you want to parse the JSON response
      const data = await response.json();
      // console.log("response---", response);
      if (data) {
        alert("Added");
        window.location.reload();
      }
    } catch (error: any) {
      // setIsResponse(error)
      // setShowModal(true)
      console.error("Error during add employee:", error);
    }
  };

  // console.log(user, "USER", profileId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/user/${profileId}/${Key_Key}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          // Handle non-successful response (optional)
          console.error("Error fetching data:", response.statusText);
          return;
        }
        if (response.status === 440) {
          alert("Session Expired");
          dispatch(logoutUser());
          window.location.href = "http://165.22.219.69:3002/auth/login"; // Use the full URL, including the protocol (http or https)
        }

        const res = await response.json();
        setData(res);
      } catch (error) {
        // Handle fetch error
        console.error("Error during fetch:", error);
      }
    };

    fetchData(); // Call the async function directly

    // Note: You may want to add a cleanup function here if needed
  }, [profileId, Key_Key]); // Include dependencies if needed

  //   ------------------------------------------ setting image in the input--------------------------------
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  /*----------------  handle update----------------*/
  let Role = user.hobbies ? user.hobbies : user.user.hobbies;

  // console.log(data, "DATAAAAA");

  return (
    <>
      <div
      //  style={{ border: "2px solid red" }}
      >
        <PageTitle
          breadCrumbItems={[
            { label: "Pages", path: "/pages/profile" },
            { label: "Profile", path: "/pages/profile", active: true },
          ]}
          title={"Faculty Profile"}
        />

        {/* {isUpdateModal ? (
          <UpdateEmployee
            itemId="65532cf56b5921d169e5f760"
            parentId="65532cf56b5921d169e5f760"
            innerdata={data}
            setIsUpdateModal={setIsUpdateModal}
          />
        ) : ( */}
        <Row>
          <Col lg={4} xl={3}>
            {/* <PersonalDetails userInfo={userInfo} /> */}
            <PersonalDetails />
          </Col>

          <Col lg={8} xl={9}>
            <OtherDetails />
            {/* <button style={{}} onClick={() => setIsUpdateModal(true)}>
                Edit
              </button> */}
          </Col>
        </Row>
        {/* )} */}
      </div>
    </>
  );
};

export default Doctor;
