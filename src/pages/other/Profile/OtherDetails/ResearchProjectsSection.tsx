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

interface ResearchProjectsInfo {
  title: string;
  startDate: string;
  endDate: string;
  ongoing: boolean;
  role: string;
  fundingAgency: string;
  grantNo: string;
  status: string;
  amount: string;
  _id?: string;
}

interface ExperienceInfoProps {
  item: ResearchProjectsInfo;
  handleResearchProjectsSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: ResearchProjectsInfo
  ) => Promise<void>;
  setResearchProjects: React.Dispatch<
    React.SetStateAction<ResearchProjectsInfo>
  >;
  isApiHit: boolean;
  researchProjectsData: ResearchProjectsInfo[];
}

const ResearchProjectsSection = ({
  item,
  handleResearchProjectsSubmit,
  setResearchProjects,
  isApiHit,
  researchProjectsData,
}: ExperienceInfoProps) => {
  const [newTaskModal, setNewTaskModal] = useState<boolean>(false);
  const [profileItemId, setProfileItemId] = useState<string>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const [researchProjects, setResearchProjectsInfo] =
    useState<ResearchProjectsInfo>({
      title: "",
      startDate: "",
      endDate: "",
      ongoing: false,
      role: "",
      fundingAgency: "",
      grantNo: "",
      status: "",
      amount: "",
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

  const section = "researchProjects";

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
        setResearchProjectsInfo(data?.data);

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
      setResearchProjects((prevData) => ({ ...prevData, [name]: checked }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setResearchProjects((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setResearchProjects((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setResearchProjects((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleUpdateChange = (e: React.ChangeEvent<any>) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      // If the input type is a checkbox, update the state with the checked status
      setResearchProjectsInfo((prevData) => ({ ...prevData, [name]: checked }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setResearchProjectsInfo((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setResearchProjectsInfo((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setResearchProjectsInfo((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleResearchProjectsUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
    researchProjectsInfo: ResearchProjectsInfo
  ) => {
    event.preventDefault();
    const {
      title,
      startDate,
      endDate,
      ongoing,
      role,
      fundingAgency,
      grantNo,
      status,
      amount,
    } = researchProjectsInfo;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("title", title);
    formData.append("startDate", startDate);
    ongoing
      ? formData.append("endDate", "")
      : formData.append("endDate", endDate);

    formData.append("ongoing", ongoing.toString());
    formData.append("role", role);
    formData.append("fundingAgency", fundingAgency);
    formData.append("grantNo", grantNo);
    formData.append("status", status);
    formData.append("amount", amount);

    const section = "researchProjects";

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
        alert("Research Projects Updated Successfully");
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

  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col lg={6}>
              <Form
                style={{ width: "100%" }}
                onSubmit={(e) => handleResearchProjectsSubmit(e, item)}
              >
                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Title of the Project<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Title of the Project"
                    value={item?.title}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Start date<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="startDate"
                    placeholder="Start date"
                    value={item?.startDate}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    End date<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="endDate"
                    placeholder="End date"
                    value={item?.ongoing ? "" : item?.endDate}
                    required
                    onChange={handleChange}
                    disabled={item?.ongoing} // Disable if ongoing is checked
                  />
                </Form.Group>

                <Form.Group className="d-flex pt-2 justify-content-start">
                  <Form.Check
                    type="checkbox"
                    id="ongoingCheckbox"
                    label="Ongoing"
                    name="ongoing"
                    checked={item?.ongoing}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Role <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="role"
                    placeholder="Enter Role"
                    value={item?.role}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Funding agency
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="fundingAgency"
                    placeholder="Enter Funding Agency"
                    value={item?.fundingAgency}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Grant No.
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="grantNo"
                    placeholder="Enter Grant No."
                    value={item?.grantNo}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3 mt-2" onChange={handleChange}>
                  <Form.Label>
                    Status<span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Select name="status" required>
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Project amount in Rupees(INR)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="amount"
                    placeholder="Enter project amount in Rupees(INR)"
                    value={item?.amount}
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

      {researchProjectsData?.length >= 1 ? (
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
                      <th>Title</th>
                      <th>Start Date</th>
                      <th>Status</th>
                      <th>Action</th>
                      {/* {Role.Role === "Chess" ? <th>Action</th> : ""} */}
                    </tr>
                  </thead>
                  <tbody>
                    {researchProjectsData?.length >= 1
                      ? researchProjectsData?.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item?.title}</td>
                            <td>{item.startDate}</td>
                            <td>{item.status}</td>
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
            <h4 className="modal-title">Edit Research Projects</h4>
          </Modal.Header>
          <Modal.Body>
            <Form
              style={{ width: "100%" }}
              onSubmit={(e) =>
                handleResearchProjectsUpdate(e, researchProjects)
              }
            >
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Title of the Project<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Title of the Project"
                  value={researchProjects?.title}
                  required
                  onChange={handleUpdateChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Start date<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  placeholder="Start date"
                  value={researchProjects?.startDate}
                  required
                  onChange={handleUpdateChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  End date<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  placeholder="End date"
                  value={
                    researchProjects?.ongoing ? "" : researchProjects?.endDate
                  }
                  required
                  onChange={handleUpdateChange}
                  disabled={researchProjects?.ongoing} // Disable if ongoing is checked
                />
              </Form.Group>

              <Form.Group className="d-flex pt-2 justify-content-start">
                <Form.Check
                  type="checkbox"
                  id="ongoingCheckbox"
                  label="Ongoing"
                  name="ongoing"
                  checked={researchProjects?.ongoing}
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Role <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="role"
                  placeholder="Enter Role"
                  value={researchProjects?.role}
                  required
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Funding agency
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="fundingAgency"
                  placeholder="Enter Funding Agency"
                  value={researchProjects?.fundingAgency}
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Grant No.
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="grantNo"
                  placeholder="Enter Grant No."
                  value={researchProjects?.grantNo}
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 mt-2" onChange={handleUpdateChange}>
                <Form.Label>
                  Status<span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select
                  name="status"
                  required
                  value={researchProjects?.status}
                >
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Project amount in Rupees(INR)
                </Form.Label>
                <Form.Control
                  type="text"
                  name="amount"
                  placeholder="Enter project amount in Rupees(INR)"
                  value={researchProjects?.amount}
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

export default ResearchProjectsSection;
