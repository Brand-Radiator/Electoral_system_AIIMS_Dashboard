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
// import { FormInput, VerticalForm } from "../../../../components";
import { FormInput } from "../../components";
import { API_BASE_URL } from "../../apiservices/apiService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { logoutUser } from "../../redux/actions";
import EditModal from "./EditModal";

interface RegistrationInformation {
  nominationPost: string;
  candidateName: string;
  department: string;
  fatherName: string;
  motherName: string;
  dob: string;
  permanentAddress: string;
  batchYear: string;
  registrationNo: string;
  rollNo: string;
  document: string;
  endDate: string;
  currentlyWorking: boolean;
  _id?: string;
}

interface RegistrationInfoProps {
  item: RegistrationInformation;
  handleRegistrationInfoSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: RegistrationInformation
  ) => Promise<void>;
  setRegistration: React.Dispatch<
    React.SetStateAction<RegistrationInformation>
  >;
  isApiHit: boolean;
  registrationData: RegistrationInformation[];
}

const RegistrationSection = ({
  item,
  handleRegistrationInfoSubmit,
  setRegistration,
  isApiHit,
  registrationData,
}: RegistrationInfoProps) => {
  const [newTaskModal, setNewTaskModal] = useState<boolean>(false);
  const [profileItemId, setProfileItemId] = useState<string>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [registration, setRegistrationInfo] = useState<RegistrationInformation>(
    {
      nominationPost: "",
      candidateName: "",
      department: "",
      fatherName: "",
      motherName: "",
      dob: "",
      permanentAddress: "",
      batchYear: "",
      registrationNo: "",
      rollNo: "",
      document: "",
      endDate: "",
      currentlyWorking: false,
    }
  );

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, files, type, checked, rows } = e.target;

    if (type === "checkbox") {
      // If the input type is a checkbox, update the state with the checked status
      setRegistration((prevData) => ({ ...prevData, [name]: checked }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setRegistration((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setRegistration((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setRegistration((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const { user, userLoggedIn, loading, error, _id } = useSelector(
    (state: RootState) => ({
      user: state.Auth.user,
      loading: state.Auth.loading,
      error: state.Auth.error,
      userLoggedIn: state.Auth.userLoggedIn,
      _id: state.Auth._id,
    })
  );

  const dispatch = useDispatch<AppDispatch>();

  let profileId = user?._id;
  const Key_Key = user?.moniterd_ttl;

  const section = "registration";

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
        setRegistrationInfo(data?.data);

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

  const handleUpdateChange = (e: React.ChangeEvent<any>) => {
    const { name, value, files, type, checked, rows } = e.target;

    if (type === "checkbox") {
      // If the input type is a checkbox, update the state with the checked status
      setRegistrationInfo((prevData) => ({ ...prevData, [name]: checked }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setRegistrationInfo((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setRegistrationInfo((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setRegistrationInfo((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleRegistrationInfoUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
    registrationInfo: RegistrationInformation
  ) => {
    event.preventDefault();

    const {
      nominationPost,
      candidateName,
      department,
      fatherName,
      motherName,
      dob,
      permanentAddress,
      batchYear,
      registrationNo,
      rollNo,
      document,
      endDate,
      currentlyWorking,
    } = registrationInfo;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("nominationPost", nominationPost);
    formData.append("candidateName", candidateName);
    formData.append("department", department);
    formData.append("fatherName", fatherName);
    formData.append("motherName", motherName);
    formData.append("dob", dob);
    formData.append("permanentAddress", permanentAddress);
    formData.append("batchYear", batchYear);
    formData.append("registrationNo", registrationNo);
    formData.append("rollNo", rollNo);
    formData.append("document", document);
    currentlyWorking
      ? formData.append("endDate", "")
      : formData.append("endDate", endDate);

    formData.append("currentlyWorking", currentlyWorking.toString());
    const section = "registration";

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
        alert("Registration Profile Updated Successfully");
        toggleNewTaskModal();
        window.location.reload();
      }
    } catch (error: any) {
      // setIsResponse(error)
      // setShowModal(true)
      console.error("Error during update personal information:", error);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col lg={6}>
              <Form
                style={{ width: "100%" }}
                onSubmit={(e) => handleRegistrationInfoSubmit(e, item)}
              >
                {/* <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Nomination for the post of
                    <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nominationPost"
                    placeholder="Enter Nomination post"
                    value={item?.nominationPost}
                    required
                    onChange={handleChange}
                  />
                </Form.Group> */}

                <Form.Group className="mb-3 mt-2" onChange={handleChange}>
                  <Form.Label>
                    Nomination for the post of
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Select name="nominationPost" required>
                    <option value="" disabled>
                      Select post for the Nomination
                    </option>
                    <option value="government">PRESIDENT</option>
                    <option value="private">VICE PRESIDENT</option>
                    <option value="autonomous">SECRETARY</option>
                    <option value="others">AUDITOR</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Name of the candidate
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="candidateName"
                    placeholder="Enter Candidate Name"
                    value={item?.candidateName}
                    // required
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Father’s Name
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="fatherName"
                    placeholder="Enter Father’s Name"
                    value={item?.fatherName}
                    // required
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Mother’s Name
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="motherName"
                    placeholder="Enter  Mother’s Name"
                    value={item?.motherName}
                    // required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Date of Birth
                  </Form.Label>

                  <Form.Control
                    type="date"
                    name="dob"
                    placeholder="Enter Start Date"
                    value={item?.dob}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Permanent Address (With phone no./ Mobile no.)
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4} // Adjust the number of rows as needed
                    name="permanentAddress"
                    placeholder="Enter Permanent Address (With phone no./ Mobile no.)"
                    value={item?.permanentAddress}
                    // required
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3 mt-2" onChange={handleChange}>
                  <Form.Label>
                    Batch & professional year
                    <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Select name="batchYear" required>
                    <option value="" disabled>
                      Select Batch & professional year
                    </option>
                    <option value="government">2019-2024</option>
                    <option value="private">2020-2025</option>
                    <option value="autonomous">2021-2026</option>
                    <option value="others">2022-2027</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Registration number
                    <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="registrationNo"
                    placeholder="Enter Registration number "
                    value={item?.registrationNo}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Roll number
                    <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="rollNo"
                    placeholder="Enter Roll  number "
                    value={item?.rollNo}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start font-weight-bold">
                    Date of admission in the college (Enclose photocopy of ID
                    Card issued by the college along with candidate’s Aadhar
                    Card).
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </Form.Label>
                  <input
                    type="file"
                    name="document"
                    accept=".pdf,.doc,.docx"
                    onChange={handleChange} // handleDocumentChange function should handle the file change event
                    // required
                  />
                </Form.Group>
                {/* <div className="pt-2">
                  <span style={{ color: "red" }}> Note: </span>The persons
                  proposing and seconding a candidate must be bonafide voters of
                  the college and should sign only one candidate for a post.
                </div> */}

                <div className="pt-2">
                  <h3>Eligibility Conditions:</h3>
                  <ol>
                    <li>
                      Candidates who have been suspended twice are ineligible
                      for filing nominations.{" "}
                    </li>
                    <li>
                      Candidates who have failed in four or more subjects in any
                      Professional Exams are ineligible for filing nominations.
                    </li>
                    <li>
                      Candidates who have been suspended once may file
                      nominations with the approval of the Dean (Student
                      Affairs) and the Executive Director, after an affidavit
                      for the same has been submitted by the candidate.
                    </li>
                  </ol>
                </div>

                <Form.Group className="d-flex pt-2 justify-content-start">
                  <Form.Check
                    type="checkbox"
                    id="currentlyWorkingCheckbox"
                    label="I agree to abide by the conditions laid down in the Constitution of AIIMS Patna Students’ Association (APSA) and fulfill all the eligibility criteria laid down. I am willing to hold and work for the post with my full capacity and integrity."
                    name="currentlyWorking"
                    checked={item?.currentlyWorking}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="pt-2 pb-2  mb-0 d-flex gap-2">
                  {isApiHit ? (
                    <Button variant="primary" type="submit" disabled>
                      Submiting
                    </Button>
                  ) : (
                    <Button variant="primary" type="submit">
                      Submit
                    </Button>
                  )}

                  {/* <Button variant="secondary" type="reset">
                    Cancel
                  </Button> */}
                </Form.Group>
                {/* <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Organisation Url
                    <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="orgURL"
                    placeholder="Enter Organisation URL"
                    value={item?.orgURL}
                    required
                    onChange={handleChange}
                  />
                </Form.Group> */}

                {/* <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    District <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="district"
                    placeholder="Enter District"
                    value={item?.district}
                    onChange={handleChange}
                  />
                </Form.Group> */}

                {/* <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Designation
                    <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="designation"
                    placeholder="Enter designation"
                    value={item?.designation}
                    onChange={handleChange}
                    required
                  />
                </Form.Group> */}

                {/* <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Start Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    placeholder="Enter Start Date"
                    value={item?.startDate}
                    onChange={handleChange}
                  />
                </Form.Group> */}

                {/* <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    End Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    placeholder="Enter End Date"
                    value={item?.currentlyWorking ? "" : item?.endDate}
                    onChange={handleChange}
                    disabled={item?.currentlyWorking} 
                  />
                </Form.Group> */}
              </Form>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {registrationData?.length >= 1 ? (
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
                      <th>Candidate Name</th>
                      <th>Nomination for the post of </th>
                      <th>Batch & professional year </th>
                      <th>Registration number </th>
                      <th>Action</th>
                      {/* {Role.Role === "Chess" ? <th>Action</th> : ""} */}
                    </tr>
                  </thead>
                  <tbody>
                    {registrationData?.length >= 1
                      ? registrationData?.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item?.candidateName}</td>
                            <td>{item.nominationPost}</td>
                            <td>{item.batchYear}</td>
                            <td>{item.registrationNo}</td>
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
            <h4 className="modal-title">Edit Registration</h4>
          </Modal.Header>
          <Modal.Body>
            <Form
              style={{ width: "100%" }}
              onSubmit={(e) => handleRegistrationInfoUpdate(e, registration)}
            >
              {/* <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Nomination for the post of
                  <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="nominationPost"
                  placeholder="Enter Nomination post"
                  defaultValue={registration?.nominationPost}
                  required
                  onChange={handleChange}
                />
              </Form.Group> */}
              <Form.Group className="mb-3 mt-2" onChange={handleChange}>
                <Form.Label>
                  Nomination for the post of
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select name="nominationPost" required>
                  <option defaultValue={registration?.nominationPost} disabled>
                    Select post for the Nomination
                  </option>
                  <option value="government">PRESIDENT</option>
                  <option value="private">VICE PRESIDENT</option>
                  <option value="autonomous">SECRETARY</option>
                  <option value="others">AUDITOR</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Name of the candidate
                  <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="candidateName"
                  placeholder="Enter Candidate Name"
                  defaultValue={registration?.candidateName}
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Father’s Name
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="fatherName"
                  placeholder="Enter Father’s Name"
                  defaultValue={registration?.fatherName}
                  // required
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Mother’s Name
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="motherName"
                  placeholder="Enter  Mother’s Name"
                  defaultValue={registration?.motherName}
                  // required
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Date of Birth
                </Form.Label>

                <Form.Control
                  type="date"
                  name="dob"
                  placeholder="Enter Start Date"
                  defaultValue={registration?.dob}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Permanent Address (With phone no./ Mobile no.)
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4} // Adjust the number of rows as needed
                  name="permanentAddress"
                  placeholder="Enter Permanent Address (With phone no./ Mobile no.)"
                  defaultValue={registration?.permanentAddress}
                  // required
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3 mt-2" onChange={handleChange}>
                <Form.Label>
                  Batch & professional year
                  <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select name="batchYear" required>
                  <option defaultValue="" disabled>
                    Select Batch & professional year
                  </option>
                  <option value="government">2019-2024</option>
                  <option value="private">2020-2025</option>
                  <option value="autonomous">2021-2026</option>
                  <option value="others">2022-2027</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Registration number
                  <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="registrationNo"
                  placeholder="Enter Registration number "
                  defaultValue={registration?.registrationNo}
                  required
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Roll number
                  <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="rollNo"
                  placeholder="Enter Roll  number "
                  defaultValue={item?.rollNo}
                  required
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="d-flex pt-2 justify-content-start">
                <Form.Check
                  type="checkbox"
                  id="currentlyWorkingCheckbox"
                  label="I currently work here"
                  name="currentlyWorking"
                  checked={registration?.currentlyWorking}
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group className="d-flex justify-content-end gap-2">
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

export default RegistrationSection;
