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

interface CommitteeMembershipsInfo {
  committeeName: string;
  role: string;
  year: string;
  endYear: string;
  currentlyWorking: boolean;
  _id?: string;
}

interface CommitteProps {
  item: CommitteeMembershipsInfo;
  handleCommitteeMembershipsSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: CommitteeMembershipsInfo
  ) => Promise<void>;
  setCommitteeMemberships: React.Dispatch<
    React.SetStateAction<CommitteeMembershipsInfo>
  >;
  isApiHit: boolean;
  committeeMembershipsData: CommitteeMembershipsInfo[];
}

const CommitteesSection = ({
  item,
  handleCommitteeMembershipsSubmit,
  setCommitteeMemberships,
  isApiHit,
  committeeMembershipsData,
}: CommitteProps) => {
  const [newTaskModal, setNewTaskModal] = useState<boolean>(false);
  const [profileItemId, setProfileItemId] = useState<string>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const [committeeMemberships, setCommitteeMembershipsInfo] =
    useState<CommitteeMembershipsInfo>({
      committeeName: "",
      role: "",
      year: "",
      endYear: "",
      currentlyWorking: false,
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

  const section = "committeeMemberships";

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
        setCommitteeMembershipsInfo(data?.data);

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
      setCommitteeMemberships((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setCommitteeMemberships((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setCommitteeMemberships((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setCommitteeMemberships((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleUpdateChange = (e: React.ChangeEvent<any>) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      // If the input type is a checkbox, update the state with the checked status
      setCommitteeMembershipsInfo((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setCommitteeMembershipsInfo((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setCommitteeMembershipsInfo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setCommitteeMembershipsInfo((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleCommitteeMembershipsUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
    committeeInfo: CommitteeMembershipsInfo
  ) => {
    event.preventDefault();
    const { committeeName, role, year, endYear, currentlyWorking } =
      committeeInfo;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("committeeName", committeeName);
    formData.append("role", role);
    formData.append("year", year);
    // formData.append("endYear", endYear);
    currentlyWorking
      ? formData.append("endYear", "")
      : formData.append("endYear", endYear);
    formData.append("currentlyWorking", currentlyWorking.toString());

    const section = "committeeMemberships";

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
        alert("Committee Memberships Updated Successfully");
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
                onSubmit={(e) => handleCommitteeMembershipsSubmit(e, item)}
              >
                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Name<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="committeeName"
                    placeholder="Enter Name of the Committee"
                    value={item?.committeeName}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3 mt-2" onChange={handleChange}>
                  <Form.Label>Role</Form.Label>
                  <Form.Select name="role" value={item?.role}>
                    <option value="" disabled>
                      Select Role
                    </option>
                    <option value="Chairperson">Chairperson</option>
                    <option value="Co-chairperson">Co-chairperson</option>
                    <option value="Nodal Officer">Nodal Officer</option>
                    <option value="Officer In-Charge">Officer In-Charge</option>
                    <option value="Co-ordinator">Co-ordinator</option>
                    <option value="Member Secretary"> Member Secretary</option>
                    <option value="Member">Member</option>
                    <option value="Advisor">Advisor</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>

                {/* <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Role<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="role"
                    placeholder="Enter Role"
                    value={item?.role}
                    required
                    onChange={handleChange}
                  />
                </Form.Group> */}

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Start Year(from)<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="year"
                    value={item?.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Year</option>
                    {generateYearOptions(1900, 2100)}{" "}
                    {/* Adjust the range as needed */}
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    End Year(to)<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="endYear"
                    // value={item?.endYear}
                    onChange={handleChange}
                    value={item?.currentlyWorking ? "" : item?.endYear}
                    required
                    disabled={item?.currentlyWorking} // Disable if currentlyWorking is checked
                  >
                    <option value="">Select Year</option>
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
                    name="year"
                    placeholder="Year"
                    value={item?.year}
                    required
                    onChange={handleChange}
                  />
                </Form.Group> */}

                <Form.Group className="d-flex pt-2 justify-content-start">
                  <Form.Check
                    type="checkbox"
                    id="currentlyWorkingCheckbox"
                    label="I currently work here"
                    name="currentlyWorking"
                    checked={item?.currentlyWorking}
                    onChange={handleChange}
                  />
                </Form.Group>

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

      {committeeMembershipsData?.length >= 1 ? (
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
                      <th>Designation</th>
                      <th>Year</th>
                      <th>Action</th>
                      {/* {Role.Role === "Chess" ? <th>Action</th> : ""} */}
                    </tr>
                  </thead>
                  <tbody>
                    {committeeMembershipsData?.length >= 1
                      ? committeeMembershipsData?.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item?.committeeName}</td>
                            <td>{item.role}</td>
                            <td>{item.year}</td>
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
            <h4 className="modal-title">Edit Committee Memberships</h4>
          </Modal.Header>
          <Modal.Body>
            <Form
              style={{ width: "100%" }}
              onSubmit={(e) =>
                handleCommitteeMembershipsUpdate(e, committeeMemberships)
              }
            >
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Name<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="committeeName"
                  placeholder="Enter Name of the Committee"
                  value={committeeMemberships?.committeeName}
                  required
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 mt-2" onChange={handleUpdateChange}>
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" value={committeeMemberships?.role}>
                  <option value="" disabled>
                    Select Role
                  </option>
                  <option value="Chairperson">Chairperson</option>
                  <option value="Co-chairperson">Co-chairperson</option>
                  <option value="Nodal Officer">Nodal Officer</option>
                  <option value="Co-ordinator">Co-ordinator</option>
                  <option value="Member Secretary"> Member Secretary</option>
                  <option value="Member">Member</option>
                  <option value="Advisor">Advisor</option>
                  <option value="Other">Other</option>
                </Form.Select>
              </Form.Group>

              {/* <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Role<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="role"
                  placeholder="Enter Role"
                  value={committeeMemberships?.role}
                  required
                  onChange={handleUpdateChange}
                />
              </Form.Group> */}

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Start Year(from)<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="year"
                  value={committeeMemberships?.year}
                  required
                  onChange={handleUpdateChange}
                >
                  <option value="">Select Year</option>
                  {generateYearOptions(1900, 2100)}{" "}
                  {/* Adjust the range as needed */}
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  End Year(to)<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  name="endYear"
                  // value={committeeMemberships?.endYear}
                  value={
                    committeeMemberships?.currentlyWorking
                      ? ""
                      : committeeMemberships?.endYear
                  }
                  onChange={handleUpdateChange}
                  required
                  disabled={committeeMemberships?.currentlyWorking} // Disable if currentlyWorking is checked
                >
                  <option value="">Select Year</option>
                  {generateYearOptions(1900, 2100)}{" "}
                  {/* Adjust the range as needed */}
                </Form.Control>
              </Form.Group>

              <Form.Group className="d-flex pt-2 justify-content-start">
                <Form.Check
                  type="checkbox"
                  id="currentlyWorkingCheckbox"
                  label="I currently work here"
                  name="currentlyWorking"
                  checked={committeeMemberships?.currentlyWorking}
                  onChange={handleUpdateChange}
                />
              </Form.Group>

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

export default CommitteesSection;
