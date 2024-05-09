import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Card,
  Button,
  Row,
  Col,
  Form,
  Alert,
  Table,
  ButtonGroup,
  Modal,
} from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormInput, VerticalForm } from "../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { API_BASE_URL } from "../../../../apiservices/apiService";
import { logoutUser } from "../../../../redux/actions";

interface DoctoralThesesInfo {
  researcherName: string;
  title: string;
  role: string;
  institute: string;
  batch: string;
  awardedYear: string;
  _id?: string;
}
interface DoctoralThesesProps {
  item: DoctoralThesesInfo;
  handleDoctoralThesesSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: DoctoralThesesInfo
  ) => Promise<void>;
  setDoctoralTheses: React.Dispatch<React.SetStateAction<DoctoralThesesInfo>>;
  isApiHit: boolean;
  doctoralThesesData: DoctoralThesesInfo[];
}

const DoctorThesesSection = ({
  item,
  handleDoctoralThesesSubmit,
  setDoctoralTheses,
  isApiHit,
  doctoralThesesData,
}: DoctoralThesesProps) => {
  const [newTaskModal, setNewTaskModal] = useState<boolean>(false);
  const [profileItemId, setProfileItemId] = useState<string>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const [doctoralTheses, setDoctoralThesesInfo] = useState<DoctoralThesesInfo>({
    researcherName: "",
    title: "",
    role: "",
    institute: "",
    batch: "",
    awardedYear: "",
  });

  const { user, userLoggedIn, loading, error, _id } = useSelector(
    (state: RootState) => ({
      user: state.Auth.user,
      loading: state.Auth.loading,
      error: state.Auth.error,
      userLoggedIn: state.Auth.userLoggedIn,
      _id: state.Auth._id,
    })
  );

  let profileId = user?._id;
  const Key_Key = user?.moniterd_ttl;

  const section = "doctoralTheses";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // setDataLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/api/doctor/nested/${profileId}/${Key_Key}/${section}/${profileItemId}`,
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
        setDoctoralThesesInfo(data?.data);

        // setDataLoading(false);
      } catch (error) {
        // Handle fetch error
        // setDataLoading(false);
        console.error("Error during fetch:", error);
      }
    };
    if (profileItemId) {
      fetchData();
    }

    // Note: You may want to add a cleanup function here if needed
  }, [profileId, Key_Key, profileItemId]); // Include dependencies if needed

  // const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      // If the input type is a checkbox, update the state with the checked status
      setDoctoralTheses((prevData) => ({ ...prevData, [name]: checked }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setDoctoralTheses((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setDoctoralTheses((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setDoctoralTheses((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleUpdateChange = (e: React.ChangeEvent<any>) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      // If the input type is a checkbox, update the state with the checked status
      setDoctoralThesesInfo((prevData) => ({ ...prevData, [name]: checked }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setDoctoralThesesInfo((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setDoctoralThesesInfo((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setDoctoralThesesInfo((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleDoctoralThesesUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
    doctoralThesesInfo: DoctoralThesesInfo
  ) => {
    event.preventDefault();
    const { researcherName, title, role, institute, batch, awardedYear } =
      doctoralThesesInfo;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("researcherName", researcherName);
    formData.append("title", title);
    formData.append("role", role);
    formData.append("institute", institute);
    formData.append("batch", batch);
    formData.append("awardedYear", awardedYear);

    const section = "doctoralTheses";

    try {
      setIsUpdating(true);
      const response = await fetch(
        `${API_BASE_URL}/api/update/doctor/nested/${profileId}/${Key_Key}/${section}/${profileItemId}`,

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
        console.log(response.status, "STATUS 429");
        // setShowModal(true);
      }
      // console.log("response--statue", response)

      if (response.status === 400) {
        // setIsError(true);
        console.log(response.status, "STATUS 400");

        let errorMessage = await response.json();
        // setIsResponse(errorMessage.message);
      }

      // Assuming you want to parse the JSON response
      const data = await response.json();
      // console.log("response---", data);
      if (data) {
        setIsUpdating(false);
        alert("Theses Guided Updated Successfully");
        window.location.reload();
      }
    } catch (error: any) {
      // setIsResponse(error)
      // setShowModal(true)
      console.error("Error during update personal information:", error);
    }
  };

  const deleteItem = async (itemId: string) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/delete/doctor/nested/${profileId}/${Key_Key}/${section}/${itemId}`,

        {
          method: "PATCH",

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
        // setIsResponse(errorMsg.message);
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
      // setShowModal(true);

      console.error("Error during delete the employee:", error);
    }
  };

  /**
   * Toggles the new task modal
   */
  const toggleNewTaskModal = () => {
    setNewTaskModal((prevstate) => !prevstate);
  };

  const editItem = async (id: string) => {
    setProfileItemId(id);
    toggleNewTaskModal();
  };

  const generateYearOptions = (start: any, end: any) => {
    const years = [];
    for (let year = end; year >= start; year--) {
      years.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }
    return years;
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col lg={6}>
              <Form
                style={{ width: "100%" }}
                onSubmit={(e) => handleDoctoralThesesSubmit(e, item)}
              >
                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Name<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="researcherName"
                    placeholder="Enter name of the candidate"
                    value={item?.researcherName}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Role added in thesis */}

                <Form.Group className="mb-3 mt-2" onChange={handleChange}>
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" value={item?.role}>
                    <option value="" disabled>
                      Select Role
                    </option>
                    <option value="Supervisor">Supervisor</option>
                    <option value="Co-supervisor">Co-supervisor</option>
                    <option value="Principal investigator">
                      Principal investigator
                    </option>
                    {/* <option value="others">Others</option> */}
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Thesis Title<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter Thesis Title"
                    value={item?.title}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Institute <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="institute"
                    placeholder="Enter Thesis Award Institute"
                    value={item?.institute}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Subject <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="batch"
                    placeholder="Enter Subject Name"
                    value={item?.batch}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Year<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="awardedYear"
                    value={item?.awardedYear}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Awarded Year</option>
                    {generateYearOptions(1900, 2100)}{" "}
                    {/* Adjust the range as needed */}
                  </Form.Control>
                </Form.Group>

                {/* <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Year <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="awardedYear"
                    placeholder="Year"
                    value={item?.awardedYear}
                    required
                    onChange={handleChange}
                  />
                </Form.Group> */}

                <Form.Group className="pt-2 pb-2  mb-0 d-flex gap-2">
                  {isApiHit ? (
                    <Button variant="primary" type="submit" disabled>
                      Adding
                    </Button>
                  ) : (
                    <Button variant="primary" type="submit">
                      Add
                    </Button>
                  )}

                  {/* <Button variant="secondary" type="reset">
                    Cancel
                  </Button> */}
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {doctoralThesesData?.length >= 1 ? (
        <Row>
          <Card>
            <Card.Body>
              {/* <h4>Update or delete Roles</h4> */}
              {/* {isResponse && (
              <Alert variant="danger" className="my-2">
                {isResponse}
              </Alert>
            )} */}
              <div className="table-responsive">
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sr. N</th>
                      <th>Name</th>
                      <th>Thesis Title</th>
                      <th>Institute</th>
                      <th>Action</th>
                      {/* {Role.Role === "Chess" ? <th>Action</th> : ""} */}
                    </tr>
                  </thead>
                  <tbody>
                    {doctoralThesesData?.length >= 1
                      ? doctoralThesesData?.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item?.researcherName}</td>
                            <td>{item.title}</td>
                            <td>{item.institute}</td>
                            <td>
                              <div>
                                <Col>
                                  <ButtonGroup className="">
                                    <Button
                                      variant="soft-primary"
                                      className="btn btn-soft-primary btn-sm pl-5 pr-5"
                                      onClick={() => editItem(item?._id!)}
                                    >
                                      <i className="uil uil-edit "></i>Edit
                                    </Button>
                                  </ButtonGroup>
                                </Col>

                                <Col>
                                  <ButtonGroup className=" pt-2">
                                    <Button
                                      className="btn btn-soft-danger btn-sm"
                                      onClick={() => deleteItem(item?._id!)}
                                    >
                                      <i className="uil uil-trash-alt me-1"></i>
                                      Delete
                                    </Button>
                                  </ButtonGroup>
                                </Col>
                              </div>
                            </td>
                          </tr>
                        ))
                      : ""}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Row>
      ) : (
        ""
      )}

      {/* edit task modal */}
      {newTaskModal && (
        <Modal
          show={newTaskModal}
          onHide={toggleNewTaskModal}
          size="lg"
          centered
        >
          <Modal.Header closeButton>
            <h4 className="modal-title">Edit Thesis Guided</h4>
          </Modal.Header>
          <Modal.Body>
            <Form
              style={{ width: "100%" }}
              onSubmit={(e) => handleDoctoralThesesUpdate(e, doctoralTheses)}
            >
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Name<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="researcherName"
                  placeholder="Enter name of the candidate"
                  value={doctoralTheses?.researcherName}
                  required
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              {/* Role added in thesis */}

              <Form.Group className="mb-3 mt-2" onChange={handleUpdateChange}>
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" value={doctoralTheses?.role}>
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="Supervisor">Supervisor</option>
                  <option value="Co-supervisor">Co-supervisor</option>
                  <option value="Principal investigator">
                    Principal investigator
                  </option>
                  {/* <option value="others">Others</option> */}
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Thesis Title<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter Thesis Title"
                  value={doctoralTheses?.title}
                  required
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Institute <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="institute"
                  placeholder="Enter Thesis Award Institute"
                  value={doctoralTheses?.institute}
                  required
                  onChange={handleUpdateChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Subject <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="batch"
                  placeholder="Enter Subject Name"
                  value={doctoralTheses?.batch}
                  required
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Year<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="awardedYear"
                  value={doctoralTheses?.awardedYear}
                  onChange={handleUpdateChange}
                  required
                >
                  <option value="">Select Awarded Year</option>
                  {generateYearOptions(1900, 2100)}{" "}
                  {/* Adjust the range as needed */}
                </Form.Control>
              </Form.Group>

              {/* <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Year <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="awardedYear"
                  placeholder="Year"
                  value={doctoralTheses?.awardedYear}
                  required
                  onChange={handleUpdateChange}
                />
              </Form.Group> */}
              <Form.Group className="d-flex justify-content-end gap-2 m-1">
                {isUpdating ? (
                  <Button variant="primary" type="submit" disabled>
                    Saving
                  </Button>
                ) : (
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                )}

                <Button
                  onClick={toggleNewTaskModal}
                  variant="secondary"
                  className="me-1"
                >
                  Cancel
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default DoctorThesesSection;
