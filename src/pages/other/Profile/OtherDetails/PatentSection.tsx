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

interface PatentInfo {
  title: string;
  inventors: string;
  applicantName: string;
  applicationNumber: string;
  patentNumber: string;
  country: string;
  subjectCategory: string;
  fillingDate: string;
  publicationDate: string;
  status: string;
  _id?: string;
}

interface PatentInfoProps {
  item: PatentInfo;
  handlePatentsSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: PatentInfo
  ) => Promise<void>;
  setPatents: React.Dispatch<React.SetStateAction<PatentInfo>>;
  isApiHit: boolean;
  patentsData: PatentInfo[];
}

const PatentSection = ({
  item,
  handlePatentsSubmit,
  setPatents,
  isApiHit,
  patentsData,
}: PatentInfoProps) => {
  const [newTaskModal, setNewTaskModal] = useState<boolean>(false);
  const [profileItemId, setProfileItemId] = useState<string>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [patents, setPatentsInfo] = useState<PatentInfo>({
    title: "",
    inventors: "",
    applicantName: "",
    applicationNumber: "",
    patentNumber: "",
    country: "",
    subjectCategory: "",
    fillingDate: "",
    publicationDate: "",
    status: "",
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

  const section = "patents";

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
        setPatentsInfo(data?.data);

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
      setPatents((prevData) => ({ ...prevData, [name]: checked }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setPatents((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setPatents((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setPatents((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleUpdateChange = (e: React.ChangeEvent<any>) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      // If the input type is a checkbox, update the state with the checked status
      setPatentsInfo((prevData) => ({ ...prevData, [name]: checked }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setPatentsInfo((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setPatentsInfo((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setPatentsInfo((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handlePatentsUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
    patentsInfo: PatentInfo
  ) => {
    event.preventDefault();
    const {
      title,
      inventors,
      applicantName,
      applicationNumber,
      patentNumber,
      country,
      subjectCategory,
      fillingDate,
      publicationDate,
      status,
    } = patentsInfo;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("title", title);
    formData.append("inventors", inventors);
    formData.append("applicantName", applicantName);
    formData.append("applicationNumber", applicationNumber);
    formData.append("patentNumber", patentNumber);
    formData.append("country", country);
    formData.append("subjectCategory", subjectCategory);
    formData.append("fillingDate", fillingDate);
    formData.append("publicationDate", publicationDate);
    formData.append("status", status);

    const section = "patents";

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
        alert("Patents Updated Successfully");
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
                onSubmit={(e) => handlePatentsSubmit(e, item)}
              >
                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Title of the Patent<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Title of the Patent"
                    value={item?.title}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Inventor(s)<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="inventors"
                    placeholder="Patent Creator(s)"
                    value={item?.inventors}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Applicant Name <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="applicantName"
                    placeholder="Person Name/ Organisation Name"
                    value={item?.applicantName}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Application Number <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="applicationNumber"
                    placeholder="Application Number"
                    value={item?.applicationNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Patent Number <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="patentNumber"
                    placeholder="Patent Number"
                    value={item?.patentNumber}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Filing Country
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    placeholder="Enter country"
                    value={item?.country}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Subject Category
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="subjectCategory"
                    placeholder="Enter Category"
                    value={item?.subjectCategory}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Filing Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="fillingDate"
                    placeholder="Filing Date"
                    value={item?.fillingDate}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Publication Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="publicationDate"
                    placeholder="Publication Date"
                    value={item?.publicationDate}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3 mt-2" onChange={handleChange}>
                  <Form.Label>
                    Status <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Select name="status" required>
                    <option value="" disabled>
                      Select Status
                    </option>
                    <option value="filed">Filed</option>
                    <option value="published">Published</option>
                    <option value="granted">Granted</option>
                  </Form.Select>
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

      {patentsData?.length >= 1 ? (
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
                      <th>Applicant Name</th>
                      <th>Status</th>
                      <th>Action</th>
                      {/* {Role.Role === "Chess" ? <th>Action</th> : ""} */}
                    </tr>
                  </thead>
                  <tbody>
                    {patentsData?.length >= 1
                      ? patentsData?.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item?.title}</td>
                            <td>{item?.applicantName}</td>
                            <td>{item?.status}</td>
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
            <h4 className="modal-title">Edit Patents</h4>
          </Modal.Header>
          <Modal.Body>
            <Form
              style={{ width: "100%" }}
              onSubmit={(e) => handlePatentsUpdate(e, patents)}
            >
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Title of the Patent<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Title of the Patent"
                  value={patents?.title}
                  required
                  onChange={handleUpdateChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Inventor(s)<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="inventors"
                  placeholder="Patent Creator(s)"
                  value={patents?.inventors}
                  required
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Applicant Name <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="applicantName"
                  placeholder="Person Name/ Organisation Name"
                  value={patents?.applicantName}
                  required
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Application Number <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="applicationNumber"
                  placeholder="Application Number"
                  value={patents?.applicationNumber}
                  onChange={handleUpdateChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Patent Number <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="patentNumber"
                  placeholder="Patent Number"
                  value={patents?.patentNumber}
                  onChange={handleUpdateChange}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Filing Country
                </Form.Label>
                <Form.Control
                  type="text"
                  name="country"
                  placeholder="Enter country"
                  value={patents?.country}
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Subject Category
                </Form.Label>
                <Form.Control
                  type="text"
                  name="subjectCategory"
                  placeholder="Enter Category"
                  value={patents?.subjectCategory}
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Filing Date
                </Form.Label>
                <Form.Control
                  type="date"
                  name="fillingDate"
                  placeholder="Filing Date"
                  value={patents?.fillingDate}
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Publication Date
                </Form.Label>
                <Form.Control
                  type="date"
                  name="publicationDate"
                  placeholder="Publication Date"
                  value={patents?.publicationDate}
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group className="mb-3 mt-2" onChange={handleUpdateChange}>
                <Form.Label>
                  Status <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select name="status" required value={patents?.status}>
                  <option value="" disabled>
                    Select Status
                  </option>
                  <option value="filed">Filed</option>
                  <option value="published">Published</option>
                  <option value="granted">Granted</option>
                </Form.Select>
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

export default PatentSection;
