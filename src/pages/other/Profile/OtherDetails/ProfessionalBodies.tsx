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

interface ProfessionalMembershipsInfo {
  bodyName: string;
  employeeId: string;
  memberType: string;
  awardedYear: string;
  _id?: string;
}

interface ProfessionalMembershipsProps {
  item: ProfessionalMembershipsInfo;
  handleProfessionalMembershipsSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: ProfessionalMembershipsInfo
  ) => Promise<void>;
  setProfessionalMemberships: React.Dispatch<
    React.SetStateAction<ProfessionalMembershipsInfo>
  >;
  isApiHit: boolean;
  professionalMembershipsData: ProfessionalMembershipsInfo[];
}

const ProfessionalBodies = ({
  item,
  handleProfessionalMembershipsSubmit,
  setProfessionalMemberships,
  isApiHit,
  professionalMembershipsData,
}: ProfessionalMembershipsProps) => {
  const [newTaskModal, setNewTaskModal] = useState<boolean>(false);
  const [profileItemId, setProfileItemId] = useState<string>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const [professionalMemberships, setProfessionalMembershipsInfo] =
    useState<ProfessionalMembershipsInfo>({
      bodyName: "",
      employeeId: "",
      memberType: "",
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

  const section = "professionalMemberships";

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
        setProfessionalMembershipsInfo(data?.data);

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
      setProfessionalMemberships((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setProfessionalMemberships((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setProfessionalMemberships((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setProfessionalMemberships((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUpdateChange = (e: React.ChangeEvent<any>) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      // If the input type is a checkbox, update the state with the checked status
      setProfessionalMembershipsInfo((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setProfessionalMembershipsInfo((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setProfessionalMembershipsInfo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setProfessionalMembershipsInfo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleProfessionalMembershipsUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
    professionalInfo: ProfessionalMembershipsInfo
  ) => {
    event.preventDefault();
    const { bodyName, memberType, awardedYear, employeeId } = professionalInfo;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("bodyName", bodyName);
    formData.append("employeeId", employeeId);
    formData.append("memberType", memberType);
    formData.append("awardedYear", awardedYear);

    const section = "professionalMemberships";

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
        alert("Professional Membership Updated Successfully");
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
                onSubmit={(e) => handleProfessionalMembershipsSubmit(e, item)}
              >
                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Name
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="bodyName"
                    placeholder="Enter Professional Body Name"
                    value={item?.bodyName}
                    // required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Membership Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="employeeId"
                    placeholder="Enter Membership Number"
                    value={item?.employeeId}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Member type
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="memberType"
                    placeholder="Member type"
                    value={item?.memberType}
                    // required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Year
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="awardedYear"
                    value={item?.awardedYear}
                    onChange={handleChange}
                    // required
                  >
                    <option value="">Select Year</option>
                    {generateYearOptions(1900, 2100)}{" "}
                    {/* Adjust the range as needed */}
                  </Form.Control>
                </Form.Group>

                {/* <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Year<span style={{ color: "red" }}> *</span>
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

      {professionalMembershipsData?.length >= 1 ? (
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
                      <th>Member type</th>
                      <th>Year</th>
                      <th>Action</th>
                      {/* {Role.Role === "Chess" ? <th>Action</th> : ""} */}
                    </tr>
                  </thead>
                  <tbody>
                    {professionalMembershipsData?.length >= 1
                      ? professionalMembershipsData?.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item?.bodyName}</td>
                            <td>{item.memberType}</td>
                            <td>{item.awardedYear}</td>
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
            <h4 className="modal-title">Edit Professional Membership</h4>
          </Modal.Header>
          <Modal.Body>
            <Form
              style={{ width: "100%" }}
              onSubmit={(e) =>
                handleProfessionalMembershipsUpdate(e, professionalMemberships)
              }
            >
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Name
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="bodyName"
                  placeholder="Enter Professional Body Name"
                  value={professionalMemberships?.bodyName}
                  // required
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Membership Number
                </Form.Label>
                <Form.Control
                  type="text"
                  name="employeeId"
                  placeholder="Enter Membership Number"
                  value={professionalMemberships?.employeeId}
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Member type
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="memberType"
                  placeholder="Member type"
                  value={professionalMemberships?.memberType}
                  // required
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Year
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  as="select"
                  name="awardedYear"
                  value={professionalMemberships?.awardedYear}
                  onChange={handleUpdateChange}
                  // required
                >
                  <option value="">Select Year</option>
                  {generateYearOptions(1900, 2100)}{" "}
                  {/* Adjust the range as needed */}
                </Form.Control>
              </Form.Group>

              {/* <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Year<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="awardedYear"
                  placeholder="Year"
                  value={professionalMemberships?.awardedYear}
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

export default ProfessionalBodies;
