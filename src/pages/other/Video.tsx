import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row, Table } from "react-bootstrap";
import PageTitle from "../../components/PageTitle";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import AuthModal from "../../components/Modal";
import { Alert } from "react-bootstrap";
import { logoutUser } from "../../redux/actions";

interface missionAndVisionAchievement {
  _id: string;
  bannerUrl: string;
  mobileBannerUrl: string;
  description: string;
  title: string;
  eventName: string;
  videoUrl: string;
}

interface parentId {
  itemId?: string; // Replace 'boolean' with the appropriate type if needed
  id?: string;
  parentId?: string;
  innerdata?: [];
}
interface id {
  id: string;
}
interface ChildComponentProps {
  refreshFlag: number;
}

const DeleteVideo: React.FC<ChildComponentProps> = ({ refreshFlag }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [missionandvision, setMissionandVision] = useState<
    missionAndVisionAchievement[]
  >([]);

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
        `http://165.22.219.69:5002/api/delete/video/${itemId}/${profileId}/${Key_Key}`,
        // `http://165.22.219.69:5002/api/delete/video/${itemId}/${profileId}`,

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
        window.location.href = "https://admin.biharsports.org/auth/login"; // Use the full URL, including the protocol (http or https)
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
  useEffect(() => {
    fetch("http://165.22.219.69:5002/api/video")
      // fetch("http://165.22.219.69:5002/api/video")
      .then((response) => response.json())
      .then((res) => setMissionandVision(res));
  }, []);

  return (
    <>
      <>
        <h4>Delete Video Page </h4>

        <Card>
          <Card.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Sr. N</th>
                  <th>Title</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {(missionandvision || []).map((item, i) => (
                  <tr key={item._id}>
                    <td>{i + 1}</td> {/* You can use i+1 as the index */}
                    <td>{item?.title}</td>
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

const UpdateVideoItem: React.FC<parentId> = ({ itemId, parentId }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [data, setData] = useState<missionAndVisionAchievement[]>([]);
  const [description, setDescription] = useState("");
  const [eventName, setEventName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
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
    fetch(`http://165.22.219.69:5002/api/video/${parentId}`)
      // fetch(`http://165.22.219.69:5002/api/video/${parentId}`)
      .then((response) => response.json())
      .then((res) => setData(res.filteredData)); // resolve this response/ promise
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
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setThumbnail(e.target.files[0]);
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
      formData.append("eventName", eventName);
      formData.append("videoUrl", videoUrl);
      formData.append("description", description);
      if (thumbnail) formData.append("thumbnail", thumbnail);

      try {
        const response = await fetch(
          `https://.biharsports.org/api/update/video/${parentId}/videoItem/${itemId}/${profileId}/${Key_Key}`,
          // `http://165.22.219.69:5002/api/update/video/${parentId}/videoItem/${itemId}/${profileId}`,

          {
            method: "PATCH",
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
        // console.log("response----", response);
        if (!response.ok) {
          const errorData = await response.json(); // Parse error response body
          throw new Error(
            `HTTP error! Status: ${response.status}, Message: ${errorData.message}`
          );
        }
        // Assuming you want to parse the JSON response
        const data = await response.json();

        if (data) {
          alert("updated");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error during edit the banner:", error);
      }
    }
    setValidated(true);
  };

  const cancleRequest = () => {
    const userConfirmed = window.confirm("want to cancle");
    if (userConfirmed) window.location.reload();
  };
  // const cancleRequest =() = >{
  // const userConfirmed = window.confirm("Deleted");

  // if (userConfirmed) {
  //   window.location.reload();
  // }
  // }

  return (
    <>
      <Card>
        <Card.Body>
          {(data || [])
            .filter((item) => {
              // console.log("from the line 248--", item._ === itemId);
              return item._id === itemId;
            })
            .map((filterItem, index) => (
              <Form
                style={{ width: "100%" }}
                onSubmit={UpdateOrgStruItem}
                encType="multipart/form-data"
              >
                <h4>Update Service</h4>
                {isError && (
                  <Alert variant="danger" className="my-2">
                    {isResponse}
                  </Alert>
                )}
                {showModal && <AuthModal />}
                {/* <> */}
                <Form.Group>
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>Title</h5>
                  </Form.Label>
                  <Form.Control
                    className="accordion-item"
                    type="text"
                    placeholder={filterItem?.eventName}
                    defaultValue={filterItem?.eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>Video Url</h5>
                  </Form.Label>
                  <Form.Control
                    className="accordion-item"
                    type="text"
                    placeholder={filterItem?.videoUrl}
                    defaultValue={filterItem?.videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                    <h5>Title</h5>
                  </Form.Label>
                  <Form.Control
                    className="accordion-item"
                    type="text"
                    placeholder={filterItem?.description}
                    defaultValue={filterItem?.description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-1 justify-content-start">
                    <h5>Thumbnail</h5>
                  </Form.Label>
                  <Form.Control
                    type="file"
                    id="image"
                    name="thumbnail"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Form.Group>
                <Row>
                  <Col lg={3}>
                    <Form.Group className="pt-5 pb-5">
                      <Button type="submit">Update</Button>
                    </Form.Group>
                  </Col>

                  <Col lg={3}>
                    <Form.Group className="pt-5 pb-5">
                      <Button type="button" onClick={() => cancleRequest()}>
                        cancle
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
const DeleteVideoItem: React.FC<id> = ({ id }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [innerdata, setInnerData] = useState<missionAndVisionAchievement[]>([]);
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
      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/video/${id}`
          // `http://165.22.219.69:5002/api/video/${id}`
        );
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
  }, []);

  // --delete org str item
  const deleteItem = async (itemId: string) => {
    try {
      const response = await fetch(
        `http://165.22.219.69:5002/api/delete/video/${id}/videoItem/${itemId}/${profileId}/${Key_Key}`,
        // `http://165.22.219.69:5002/api/delete/video/${id}/videoItem/${itemId}/${profileId}`,

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
        window.location.href = "https://admin.biharsports.org/auth/login"; // Use the full URL, including the protocol (http or https)
      }
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      if (response.ok) {
        alert("Data deleted");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error during delete Video Item:", error);
    }
  };

  const editItem = async (id: string) => {
    let newEditItem = innerdata.find((elem) => {
      return elem._id === id;
    });
    setIsEditItem(id);
  };

  // const updateItem = async (itemId: string) => {
  //   console.log("hello", itemId);
  // };

  // console.log('innerdata', innerdata, 'id from delete --------', id)

  return (
    <>
      {isEditItem ? (
        <Row>
          <Col lg={10}>
            <UpdateVideoItem itemId={isEditItem} parentId={id} />
          </Col>
        </Row>
      ) : (
        <>
          <h4>Update or delete videos inside Video Page</h4>

          <Card>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th className="w-5px">#</th>
                    <th className="w-60">Video Title</th>
                    <th>Actions</th> {/* New column for actions */}
                  </tr>
                </thead>
                {(innerdata || []).map((item, i) => (
                  <>
                    <tbody>
                      <tr key={item._id}>
                        <td>{i + 1}</td> {/* You can use i+1 as the index */}
                        <td>{item.eventName}</td>
                        <td>
                          {/* Delete button */}
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

const AddVideoItem: React.FC<id> = ({ id }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [description, setDescription] = useState("");
  const [eventName, setEventName] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isResponse, setIsResponse] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
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

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  const addVideoItem = async (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      const formData = new FormData();
      formData.append("eventName", eventName);
      formData.append("videoUrl", videoUrl);
      formData.append("description", description);
      if (thumbnail) formData.append("thumbnail", thumbnail);
      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/video/${id}/${profileId}/${Key_Key}`,
          // `http://165.22.219.69:5002/api/video/${id}/${profileId}`,
          {
            method: "POST",
            body: formData,
            // headers: {
            //   token: `${user?.token}`, // Add the token to the Authorization header
            // },
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
        const userConfirmed = window.confirm("Deleted");

        if (userConfirmed) {
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
      setThumbnail(e.target.files[0]);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Form
            style={{ width: "100%" }}
            onSubmit={addVideoItem}
            encType="multipart/form-data"
          >
            <h4>Add Videos in video page</h4>
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
                  Event Name <span style={{ color: "red" }}> *</span>{" "}
                </h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="Event Name"
                required
                defaultValue=""
                onChange={(e) => setEventName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>
                  Video Url <span style={{ color: "red" }}> *</span>{" "}
                </h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="videoUrl"
                required
                defaultValue=""
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                <h5>
                  Title <span style={{ color: "red" }}> *</span>{" "}
                </h5>
              </Form.Label>
              <Form.Control
                className="accordion-item"
                type="text"
                placeholder="description"
                required
                defaultValue=""
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="d-flex pt-1 justify-content-start">
                <h5>Thumbnail</h5>
              </Form.Label>
              <Form.Control
                type="file"
                id="image"
                name="thumbnail"
                accept="image/*"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group className="pt-5 pb-5">
              <Button type="submit">Add</Button>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

const AddVideo = () => {
  const [validated, setValidated] = useState<boolean>(false);
  const [introductionData, setIntroductionData] = useState<
    missionAndVisionAchievement[]
  >([]);
  const [refreshFlag, setRefreshFlag] = useState<number>(0);

  const [description, setDescription] = useState("");
  const [title, setTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
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
    fetch("http://165.22.219.69:5002/api/video")
      // fetch("http://165.22.219.69:5002/api/video")
      .then((response) => response.json())
      .then((res) => setIntroductionData(res)); // resolve this response/ promise
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
      formData.append("description", description);
      formData.append("title", title);
      formData.append("videoUrl", videoUrl);
      if (bannerUrl) {
        formData.append("bannerUrl", bannerUrl);
      }
      if (mobileBannerUrl) {
        formData.append("mobileBannerUrl", mobileBannerUrl);
      }

      try {
        // const response = await fetch(`http://165.22.219.69:5002/api/video`, {
        const response = await fetch(
          // `http://165.22.219.69:5002/api/video/${profileId}`,
          `http://165.22.219.69:5002/api/video/${profileId}/${Key_Key}`,
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
        const userConfirmed = window.confirm("Deleted");

        if (userConfirmed) {
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
  if (introductionData.length > 0) {
    const { _id } = introductionData[0];
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
      formData.append("description", description);
      formData.append("title", title);

      if (bannerUrl) {
        formData.append("bannerUrl", bannerUrl);
      }
      if (mobileBannerUrl) {
        formData.append("mobileBannerUrl", mobileBannerUrl);
      }

      try {
        const response = await fetch(
          `http://165.22.219.69:5002/api/update/video/${objectId}/${profileId}/${Key_Key}`,
          // `http://165.22.219.69:5002/api/update/video/${objectId}/${profileId}`,
          {
            method: "PATCH",
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

  return (
    <>
      <div>
        <PageTitle
          breadCrumbItems={[
            { label: "Pages", path: "/pages/prerna-policy" },
            {
              label: "Video",
              path: "/pages/video",
              active: true,
            },
          ]}
          title={"Video"}
        />
        <Card>
          <Card.Body>
            <Row>
              {introductionData.length === 1 ? (
                <Col lg={6}>
                  <Form
                    style={{ width: "100%" }}
                    onSubmit={handleUpdate}
                    encType="multipart/form-data"
                  >
                    <h4>Update Video Page</h4>
                    {isError && (
                      <Alert variant="danger" className="my-2">
                        {isResponse}
                      </Alert>
                    )}
                    {showModal && <AuthModal />}
                    {/* <> */}
                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>Title</h5>
                      </Form.Label>
                      <Form.Control
                        className="accordion-item"
                        type="text"
                        placeholder="Event Name"
                        defaultValue={introductionData[0]?.title}
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
                        defaultValue={introductionData[0]?.description}
                        onChange={(e) => setDescription(e.target.value)}
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

                    <Form.Group className="pt-5 pb-5">
                      <Button type="submit">Update</Button>
                    </Form.Group>
                  </Form>
                </Col>
              ) : (
                <Col lg={6}>
                  <Form
                    style={{ width: "100%" }}
                    onSubmit={handleFormSubmit}
                    encType="multipart/form-data"
                  >
                    <h4>Add Video Page</h4>
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
                        required
                        placeholder="Event Name"
                        defaultValue={introductionData[0]?.title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group>
                      <Form.Label className="d-flex  pt-2justify-content-start font-weight-bold">
                        <h5>
                          Description <span style={{ color: "red" }}> *</span>
                        </h5>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Description"
                        required
                        defaultValue={introductionData[0]?.description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        required
                        id="image"
                        name="mobileBannerUrl"
                        accept="image/*"
                        onChange={handleMobileUrl}
                      />
                    </Form.Group>

                    <Form.Group className="pt-5 pb-5">
                      <Button type="submit">Add</Button>
                    </Form.Group>
                  </Form>
                </Col>
              )}

              {/* -------------------------- update data--------------------------------------------- */}

              <Col lg={6}>
                <DeleteVideo refreshFlag={refreshFlag} />
              </Col>
              {/* for adding and deleting the video from video page */}
            </Row>
            <Row>
              <Col lg={6}>
                <AddVideoItem id={objectId} />
              </Col>
              <Col lg={6}>{objectId && <DeleteVideoItem id={objectId} />}</Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default AddVideo;
