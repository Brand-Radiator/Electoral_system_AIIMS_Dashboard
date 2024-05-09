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

interface SeminarTrainingInformation {
  actType: string;
  title: string;
  orgBy: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  _id?: string;
}

interface SeminarTrainingInfoProps {
  item: SeminarTrainingInformation;
  handleSeminarTrainingInfoSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: SeminarTrainingInformation
  ) => Promise<void>;
  setSeminarTraining: React.Dispatch<
    React.SetStateAction<SeminarTrainingInformation>
  >;
  isApiHit: boolean;
  seminarTrainingData: SeminarTrainingInformation[];
}

const SeminarTraining = ({
  item,
  handleSeminarTrainingInfoSubmit,
  setSeminarTraining,
  isApiHit,
  seminarTrainingData,
}: SeminarTrainingInfoProps) => {
  const [newTaskModal, setNewTaskModal] = useState<boolean>(false);
  const [profileItemId, setProfileItemId] = useState<string>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [seminar, setSeminarTrainingInfo] =
    useState<SeminarTrainingInformation>({
      actType: "",
      title: "",
      orgBy: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
    });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      // If the input type is a checkbox, update the state with the checked status
      setSeminarTraining((prevData) => ({ ...prevData, [name]: checked }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setSeminarTraining((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setSeminarTraining((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setSeminarTraining((prevData) => ({ ...prevData, [name]: value }));
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

  const section = "seminar";

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
        setSeminarTrainingInfo(data?.data);

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
      setSeminarTrainingInfo((prevData) => ({ ...prevData, [name]: checked }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setSeminarTrainingInfo((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setSeminarTrainingInfo((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setSeminarTrainingInfo((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleExperienceInfoUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
    experienceInfo: SeminarTrainingInformation
  ) => {
    event.preventDefault();

    const { actType, title, orgBy, startDate, endDate, currentlyWorking } =
      experienceInfo;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("actType", actType);
    formData.append("title", title);
    formData.append("orgBy", orgBy);
    formData.append("startDate", startDate);
    currentlyWorking
      ? formData.append("endDate", "")
      : formData.append("endDate", endDate);

    formData.append("currentlyWorking", currentlyWorking.toString());
    const section = "seminar";

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
        alert("Activity Details Updated Successfully");
        toggleNewTaskModal();
        window.location.reload();
      }
    } catch (error: any) {
      // setIsResponse(error)
      // setShowModal(true)
      console.error("Error during update Activity information:", error);
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
                onSubmit={(e) => handleSeminarTrainingInfoSubmit(e, item)}
              >
                <Form.Group className="mb-3 mt-2" onChange={handleChange}>
                  <Form.Label>
                    Activity Type
                    {/* <span style={{ color: "red" }}>*</span> */}
                  </Form.Label>
                  <Form.Select
                    name="actType"
                    //  required
                  >
                    <option value="" disabled>
                      Select Activity type
                    </option>
                    <option value="seminar">Seminar</option>
                    <option value="cme">CME</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="training">Training</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Title
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    value={item?.title}
                    // required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Organised by
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="orgBy"
                    placeholder="Enter name.."
                    value={item?.orgBy}
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
                    label="Activity currently Running here"
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

      {seminarTrainingData?.length >= 1 ? (
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
                      <th>Activity type</th>
                      <th>Title</th>
                      <th> Organised by</th>
                      <th>Action</th>
                      {/* {Role.Role === "Chess" ? <th>Action</th> : ""} */}
                    </tr>
                  </thead>
                  <tbody>
                    {seminarTrainingData?.length >= 1
                      ? seminarTrainingData?.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item?.actType}</td>
                            <td>{item.title}</td>
                            <td>{item.orgBy}</td>
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
            <h4 className="modal-title">Edit Activity</h4>
          </Modal.Header>
          <Modal.Body>
            <Form
              style={{ width: "100%" }}
              onSubmit={(e) => handleExperienceInfoUpdate(e, seminar)}
            >
              <Form.Group className="mb-3 mt-2" onChange={handleUpdateChange}>
                <Form.Label>
                  Activity Type
                  {/* <span style={{ color: "red" }}>*</span> */}
                </Form.Label>
                <Form.Select
                  name="actType"
                  // required
                  value={seminar?.actType}
                >
                  <option value="" disabled>
                    Select Activity type
                  </option>
                  <option value="seminar">Seminar</option>
                  <option value="cme">CME</option>
                  <option value="conference">Conference</option>
                  <option value="workshop">Workshop</option>
                  <option value="training">Training</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Title
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  value={seminar?.title}
                  // required
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Organised by
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="orgBy"
                  placeholder="Enter name.."
                  value={seminar?.orgBy}
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
                  value={seminar?.startDate}
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
                  value={seminar?.currentlyWorking ? "" : seminar?.endDate}
                  onChange={handleUpdateChange}
                  disabled={seminar?.currentlyWorking} // Disable if currentlyWorking is checked
                />
              </Form.Group>

              <Form.Group className="d-flex pt-2 justify-content-start">
                <Form.Check
                  type="checkbox"
                  id="currentlyWorkingCheckbox"
                  label="I currently work here"
                  name="currentlyWorking"
                  checked={seminar?.currentlyWorking}
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

export default SeminarTraining;
