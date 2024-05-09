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
import { API_BASE_URL } from "../../../../apiservices/apiService";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { logoutUser } from "../../../../redux/actions";
import EditModal from "./EditModal";

interface ExperienceInformation {
  organization: string;
  department: string;
  orgType: string;
  orgURL: string;
  district: string;
  designation: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  _id?: string;
}

interface ExperienceInfoProps {
  item: ExperienceInformation;
  handleExperienceInfoSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: ExperienceInformation
  ) => Promise<void>;
  setExperience: React.Dispatch<React.SetStateAction<ExperienceInformation>>;
  isApiHit: boolean;
  experienceData: ExperienceInformation[];
}

const ExperienceSection = ({
  item,
  handleExperienceInfoSubmit,
  setExperience,
  isApiHit,
  experienceData,
}: ExperienceInfoProps) => {
  const [newTaskModal, setNewTaskModal] = useState<boolean>(false);
  const [profileItemId, setProfileItemId] = useState<string>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [experience, setExperienceInfo] = useState<ExperienceInformation>({
    organization: "",
    department: "",
    orgType: "",
    orgURL: "",
    district: "",
    designation: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      // If the input type is a checkbox, update the state with the checked status
      setExperience((prevData) => ({ ...prevData, [name]: checked }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setExperience((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setExperience((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setExperience((prevData) => ({ ...prevData, [name]: value }));
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

  const section = "experience";

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
        setExperienceInfo(data?.data);

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
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      // If the input type is a checkbox, update the state with the checked status
      setExperienceInfo((prevData) => ({ ...prevData, [name]: checked }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setExperienceInfo((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setExperienceInfo((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setExperienceInfo((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleExperienceInfoUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
    experienceInfo: ExperienceInformation
  ) => {
    event.preventDefault();

    const {
      organization,
      department,
      orgType,
      orgURL,
      district,
      designation,
      startDate,
      endDate,
      currentlyWorking,
    } = experienceInfo;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("organization", organization);
    formData.append("department", department);
    formData.append("orgType", orgType);
    formData.append("orgURL", orgURL);
    formData.append("district", district);
    formData.append("designation", designation);
    formData.append("startDate", startDate);
    currentlyWorking
      ? formData.append("endDate", "")
      : formData.append("endDate", endDate);

    formData.append("currentlyWorking", currentlyWorking.toString());
    const section = "experience";

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
        alert("Experience Profile Updated Successfully");
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
                onSubmit={(e) => handleExperienceInfoSubmit(e, item)}
              >
                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Institute
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="organization"
                    placeholder="Enter Organisation"
                    value={item?.organization}
                    // required
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Department
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="department"
                    placeholder="Enter Department"
                    value={item?.department}
                    // required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3 mt-2" onChange={handleChange}>
                  <Form.Label>
                    Organisation Type
                    {/* <span style={{ color: "red" }}>*</span> */}
                  </Form.Label>
                  <Form.Select
                    name="orgType"
                    //  required
                  >
                    <option value="" disabled>
                      Select organisation type
                    </option>
                    <option value="government">Government</option>
                    <option value="private">Private</option>
                    <option value="autonomous">Autonomous</option>
                    <option value="others">Others</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Organisation Url
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="orgURL"
                    placeholder="Enter Organisation URL"
                    value={item?.orgURL}
                    // required
                    onChange={handleChange}
                  />
                </Form.Group>

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

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Designation
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="designation"
                    placeholder="Enter designation"
                    value={item?.designation}
                    onChange={handleChange}
                    // required
                  />
                </Form.Group>

                <Form.Group>
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
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    End Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    placeholder="Enter End Date"
                    value={item?.currentlyWorking ? "" : item?.endDate}
                    onChange={handleChange}
                    disabled={item?.currentlyWorking} // Disable if currentlyWorking is checked
                  />
                </Form.Group>

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

      {experienceData?.length >= 1 ? (
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
                      <th>Organisation</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Action</th>
                      {/* {Role.Role === "Chess" ? <th>Action</th> : ""} */}
                    </tr>
                  </thead>
                  <tbody>
                    {experienceData?.length >= 1
                      ? experienceData?.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item?.organization}</td>
                            <td>{item.department}</td>
                            <td>{item.designation}</td>
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
            <h4 className="modal-title">Edit Experience</h4>
          </Modal.Header>
          <Modal.Body>
            <Form
              style={{ width: "100%" }}
              onSubmit={(e) => handleExperienceInfoUpdate(e, experience)}
            >
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Institute
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="organization"
                  placeholder="Enter Organisation"
                  value={experience?.organization}
                  // required
                  onChange={handleUpdateChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Department
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="department"
                  placeholder="Enter Department"
                  value={experience?.department}
                  // required
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 mt-2" onChange={handleUpdateChange}>
                <Form.Label>
                  Organisation Type
                  {/* <span style={{ color: "red" }}>*</span> */}
                </Form.Label>
                <Form.Select
                  name="orgType"
                  // required
                  value={experience?.orgType}
                >
                  <option value="" disabled>
                    Select organisation type
                  </option>
                  <option value="government">Government</option>
                  <option value="private">Private</option>
                  <option value="autonomous">Autonomous</option>
                  <option value="others">Others</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Organisation Url
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="orgURL"
                  placeholder="Enter Organisation URL"
                  value={experience?.orgURL}
                  // required
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              {/* <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  District <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="district"
                  placeholder="Enter District"
                  value={experience?.district}
                  onChange={handleUpdateChange}
                />
              </Form.Group> */}

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Designation
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="designation"
                  placeholder="Enter designation"
                  value={experience?.designation}
                  onChange={handleUpdateChange}
                  // required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Start Date
                </Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  placeholder="Enter Start Date"
                  value={experience?.startDate}
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  End Date
                </Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  placeholder="Enter End Date"
                  value={
                    experience?.currentlyWorking ? "" : experience?.endDate
                  }
                  onChange={handleUpdateChange}
                  disabled={experience?.currentlyWorking} // Disable if currentlyWorking is checked
                />
              </Form.Group>

              <Form.Group className="d-flex pt-2 justify-content-start">
                <Form.Check
                  type="checkbox"
                  id="currentlyWorkingCheckbox"
                  label="I currently work here"
                  name="currentlyWorking"
                  checked={experience?.currentlyWorking}
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

export default ExperienceSection;
