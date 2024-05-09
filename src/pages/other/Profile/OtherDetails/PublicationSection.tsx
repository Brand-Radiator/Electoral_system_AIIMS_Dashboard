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

interface AuthorInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  _id?: string;
}

interface PublicationsInfo {
  workType: string;
  title: string;
  journalBookTitle: string;
  year: string;
  // authors: [AuthorInfo];
  authors: AuthorInfo[]; // Remove the square brackets here
  url: string;
  doi: string;
  volume: string;
  pageNo: string;
  lastPage: string;
  editor: string;
  publisher: string;
  issues: string;
  _id?: string;
}

interface PublicationsInfoProps {
  item: PublicationsInfo;
  handlePublicationsSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: PublicationsInfo
  ) => Promise<void>;
  setPublications: React.Dispatch<React.SetStateAction<PublicationsInfo>>;
  isApiHit: boolean;
  publicationsData: PublicationsInfo[];
}

const PublicationSection = ({
  item,
  handlePublicationsSubmit,
  setPublications,
  isApiHit,
  publicationsData,
}: PublicationsInfoProps) => {
  const [newTaskModal, setNewTaskModal] = useState<boolean>(false);
  const [profileItemId, setProfileItemId] = useState<string>();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const [publications, setPublicationsInfo] = useState<PublicationsInfo>({
    workType: "",
    title: "",
    journalBookTitle: "",
    year: "",
    authors: [{ firstName: "", middleName: "", lastName: "" }],
    url: "",
    doi: "",
    volume: "",
    pageNo: "",
    lastPage: "",
    editor: "",
    publisher: "",
    issues: "",
  });

  // Author add and remove functionality for Add Publication

  const [authors, setAuthors] = useState([
    { firstName: "", middleName: "", lastName: "" },
  ]);

  const handleAuthorChange = (e: any, index: any) => {
    const { name, value } = e.target;
    const updatedAuthors = [...authors];
    updatedAuthors[index] = { ...updatedAuthors[index], [name]: value };
    setAuthors(updatedAuthors);
  };

  const handleAddAuthor = () => {
    setAuthors([...authors, { firstName: "", middleName: "", lastName: "" }]);
  };

  const handleRemoveAuthor = (index: any) => {
    const updatedAuthors = [...authors];
    updatedAuthors.splice(index, 1);
    setAuthors(updatedAuthors);
  };

  // Author add and remove functionality for Update Publication

  const [newAuthors, setUpdateAuthors] = useState([
    { firstName: "", middleName: "", lastName: "" },
  ]);

  const handleUpdateAuthorChange = (e: any, index: any) => {
    const { name, value } = e.target;
    const updatedAuthors = [...newAuthors];
    updatedAuthors[index] = { ...updatedAuthors[index], [name]: value };
    setUpdateAuthors(updatedAuthors);
  };

  const handleUpdateAddAuthor = () => {
    setUpdateAuthors([
      ...newAuthors,
      { firstName: "", middleName: "", lastName: "" },
    ]);
  };

  const handleRemoveUpdateAuthor = (index: any) => {
    const updatedAuthors = [...newAuthors];
    updatedAuthors.splice(index, 1);
    setUpdateAuthors(updatedAuthors);
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

  let profileId = user?._id;
  const Key_Key = user?.moniterd_ttl;

  const section = "publications";

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
        setPublicationsInfo(data?.data);
        setUpdateAuthors(data?.data.authors);

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
      setPublications((prevData) => ({ ...prevData, [name]: checked }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setPublications((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setPublications((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setPublications((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleUpdateChange = (e: React.ChangeEvent<any>) => {
    const { name, value, files, type, checked } = e.target;

    if (type === "checkbox") {
      // If the input type is a checkbox, update the state with the checked status
      setPublicationsInfo((prevData) => ({ ...prevData, [name]: checked }));
    } else if (files && files.length > 0) {
      // If the input type is file, update the state with the file and its name
      setPublicationsInfo((prevData) => ({
        ...prevData,
        [name]: files[0],
        // image: files[0].name,
      }));
    } else if (type === "select-one") {
      // If the input type is select-one (dropdown), update the state with the selected value
      setPublicationsInfo((prevData) => ({ ...prevData, [name]: value }));
    } else {
      // If the input type is not a file or checkbox, update the state as usual
      setPublicationsInfo((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handlePublicationsUpdate = async (
    event: React.FormEvent<HTMLFormElement>,
    publicationInfo: PublicationsInfo
  ) => {
    event.preventDefault();
    const {
      workType,
      title,
      journalBookTitle,
      year,
      authors,
      url,
      doi,
      volume,
      pageNo,
      lastPage,
      editor,
      publisher,
      issues,
    } = publicationInfo;
    const formData = new FormData(); // append every thing one by one inside this form data

    formData.append("workType", workType);
    formData.append("title", title);
    formData.append("journalBookTitle", journalBookTitle);
    formData.append("year", year);
    // Append each author's information separately
    authors.forEach((author, index) => {
      formData.append(`authors[${index}][firstName]`, author.firstName);
      formData.append(`authors[${index}][middleName]`, author.middleName);
      formData.append(`authors[${index}][lastName]`, author.lastName);
    });
    // formData.append("authors", authors);
    formData.append("url", url);
    formData.append("doi", doi);
    formData.append("volume", volume);
    formData.append("issues", issues);
    formData.append("pageNo", pageNo);
    formData.append("lastPage", lastPage);
    formData.append("editor", editor);
    formData.append("publisher", publisher);

    const section = "publications";

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
        alert("Publication Updated Successfully");
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

  // Convert authors to the correct type
  const authorsWithType: AuthorInfo[] = authors.map((author) => ({
    firstName: author.firstName,
    middleName: author.middleName,
    lastName: author.lastName,
  }));

  // Include authors in the item object
  const updatedItem: PublicationsInfo = { ...item, authors: authorsWithType };

  // Convert authors to the correct type for update
  const authorsWithUpdateType: AuthorInfo[] = newAuthors.map((author) => ({
    firstName: author.firstName,
    middleName: author.middleName,
    lastName: author.lastName,
  }));

  // Include authors in the publications object
  const updatedPublication: PublicationsInfo = {
    ...publications,
    authors: authorsWithUpdateType,
  };

  // console.log(publicationsData, 'dpublicationsData');

  return (
    <>
      <Card>
        <Card.Body>
          <Row>
            <Col lg={12}>
              <Form
                style={{ width: "100%" }}
                onSubmit={(e) => handlePublicationsSubmit(e, updatedItem)}
              >
                <Form.Group className="mb-3 mt-2" onChange={handleChange}>
                  <Form.Label>
                    Work Type <span style={{ color: "red" }}>*</span>
                  </Form.Label>
                  <Form.Select name="workType" required value={item?.workType}>
                    <option value="" disabled>
                      Select Publications Type
                    </option>
                    <option value="research article">Research Article</option>
                    <option value="aip">Article-in-Press (AiP)</option>
                    <option value="book">Book</option>
                    <option value="book chapter">Book Chapter</option>
                    <option value="case study">Case Study</option>
                    <option value="case series">Case Series</option>
                    <option value="conferencepaper">Conference Paper</option>
                    <option value="conference proceedings">
                      Conference Proceedings
                    </option>
                    <option value="datapaper">Data Paper</option>
                    <option value="editorial">Editorial</option>
                    <option value="erratum">Erratum</option>
                    <option value="letter">Letter</option>
                    <option value="note">Note</option>
                    <option value="retracted articles">
                      Retracted Article
                    </option>
                    <option value="review">Review</option>
                    <option value="short survey">Short Survey</option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Title/Chapter<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    placeholder="Title of the Publication"
                    value={item?.title}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Journal/Book Title<span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="journalBookTitle"
                    placeholder="Enter Journal/Book Title"
                    value={item?.journalBookTitle}
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
                    name="year"
                    value={item?.year}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select Year
                    </option>
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

                {/* <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Author <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="authors"
                    placeholder="Enter Author"
                    value={item?.authors}
                    onChange={handleChange}
                    required
                  />
                </Form.Group> */}

                <Row>
                  {authors.map((author, index) => (
                    <>
                      <Col lg={3} key={index}>
                        <Form.Group>
                          <Form.Label className="d-flex pt-2 justify-content-start font-weight-bold">
                            {`Author ${index + 1} Name`}{" "}
                            <span style={{ color: "red" }}> *</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={author.firstName}
                            onChange={(e) => handleAuthorChange(e, index)}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col lg={3}>
                        <Form.Group>
                          <Form.Label className="d-flex pt-2 justify-content-start font-weight-bold">
                            Middle Name
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="middleName"
                            placeholder="Middle Name"
                            value={author.middleName}
                            onChange={(e) => handleAuthorChange(e, index)}
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={3}>
                        <Form.Group>
                          <Form.Label className="d-flex pt-2 justify-content-start font-weight-bold">
                            Last Name <span style={{ color: "red" }}> *</span>
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={author.lastName}
                            onChange={(e) => handleAuthorChange(e, index)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col lg={3}>
                        <Form.Group className="pt-4 pb-2  mb-0 d-flex gap-2">
                          <Button
                            variant="danger"
                            onClick={() => handleRemoveAuthor(index)}
                            disabled={authors.length === 1}
                          >
                            <i className="uil uil-trash-alt me-1"></i>
                            Remove
                          </Button>
                        </Form.Group>
                      </Col>
                    </>
                  ))}
                  <Col lg={12} className="d-flex justify-content-end">
                    <Button variant="primary" onClick={handleAddAuthor}>
                      + Add Author
                    </Button>
                  </Col>
                </Row>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Url <span style={{ color: "red" }}> *</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="url"
                    placeholder="Enter Url"
                    value={item?.url}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                    Doi
                    {/* <span style={{ color: "red" }}> *</span> */}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="doi"
                    placeholder="Enter Doi"
                    value={item?.doi}
                    onChange={handleChange}
                    // required
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Volume
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="volume"
                    placeholder="Enter Volume"
                    value={item?.volume}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Issue
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="issues"
                    placeholder="Enter Issue"
                    value={item?.issues}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Page No.(from)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="pageNo"
                    placeholder="Enter Page No."
                    value={item?.pageNo}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Page No. (to)
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="lastPage"
                    placeholder="Enter Page No."
                    value={item?.lastPage}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Editor
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="editor"
                    placeholder="Enter Editor Name"
                    value={item?.editor}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="d-flex pt-2 justify-content-start">
                    Publisher
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="publisher"
                    placeholder="Enter Publisher Name"
                    value={item?.publisher}
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

      {publicationsData?.length >= 1 ? (
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
                      <th>Work Type</th>
                      <th>Title</th>
                      <th>Year</th>
                      <th>Action</th>
                      {/* {Role.Role === "Chess" ? <th>Action</th> : ""} */}
                    </tr>
                  </thead>
                  <tbody>
                    {publicationsData?.length >= 1
                      ? publicationsData?.map((item, i) => (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{item?.workType}</td>
                            <td>{item.title}</td>
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
            <h4 className="modal-title">Edit Publications</h4>
          </Modal.Header>
          <Modal.Body>
            <Form
              style={{ width: "100%" }}
              onSubmit={(e) => handlePublicationsUpdate(e, updatedPublication)}
            >
              <Form.Group className="mb-3 mt-2" onChange={handleUpdateChange}>
                <Form.Label>
                  Work Type <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Select
                  name="workType"
                  required
                  value={publications?.workType}
                >
                  <option value="" disabled>
                    Select Publications Type
                  </option>
                  <option value="research article">Research Article</option>
                  <option value="aip">Article-in-Press (AiP)</option>
                  <option value="book">Book</option>
                  <option value="book chapter">Book Chapter</option>
                  <option value="case study">Case Study</option>
                  <option value="case series">Case Series</option>
                  <option value="conferencepaper">Conference Paper</option>
                  <option value="conference proceedings">
                    Conference Proceedings
                  </option>
                  <option value="datapaper">Data Paper</option>
                  <option value="editorial">Editorial</option>
                  <option value="erratum">Erratum</option>
                  <option value="letter">Letter</option>
                  <option value="note">Note</option>
                  <option value="retracted articles">Retracted Article</option>
                  <option value="review">Review</option>
                  <option value="short survey">Short Survey</option>
                  <option value="other">Other</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Title/Chapter<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Title of the Publication"
                  value={publications?.title}
                  required
                  onChange={handleUpdateChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Journal/Book Title<span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="journalBookTitle"
                  placeholder="Enter Journal/Book Title"
                  value={publications?.journalBookTitle}
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
                  name="year"
                  value={publications?.year}
                  onChange={handleUpdateChange}
                  required
                >
                  <option value="" disabled>
                    Select Year
                  </option>
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
                  value={publications?.year}
                  required
                  onChange={handleUpdateChange}
                />
              </Form.Group> */}

              <Row>
                {newAuthors?.map((author, index) => (
                  <>
                    <Col lg={3} key={index}>
                      <Form.Group>
                        <Form.Label className="d-flex pt-2 justify-content-start font-weight-bold">
                          {`Author ${index + 1} Name`}{" "}
                          <span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          placeholder="First Name"
                          value={author.firstName}
                          onChange={(e) => handleUpdateAuthorChange(e, index)}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col lg={3}>
                      <Form.Group>
                        <Form.Label className="d-flex pt-2 justify-content-start font-weight-bold">
                          Middle Name
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="middleName"
                          placeholder="Middle Name"
                          value={author.middleName}
                          onChange={(e) => handleUpdateAuthorChange(e, index)}
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={3}>
                      <Form.Group>
                        <Form.Label className="d-flex pt-2 justify-content-start font-weight-bold">
                          Last Name <span style={{ color: "red" }}> *</span>
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          placeholder="Last Name"
                          value={author.lastName}
                          onChange={(e) => handleUpdateAuthorChange(e, index)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col lg={3}>
                      <Form.Group className="pt-4 pb-2  mb-0 d-flex gap-2">
                        <Button
                          variant="danger"
                          onClick={() => handleRemoveUpdateAuthor(index)}
                          disabled={newAuthors.length === 1}
                        >
                          <i className="uil uil-trash-alt me-1"></i>
                          Remove
                        </Button>
                      </Form.Group>
                    </Col>
                  </>
                ))}
                <Col lg={12} className="d-flex justify-content-end">
                  <Button variant="primary" onClick={handleUpdateAddAuthor}>
                    + Add Author
                  </Button>
                </Col>
              </Row>

              {/* <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Author <span style={{ color: "red" }}> *</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="authors"
                  placeholder="Enter Author"
                  // value={publications?.authors}
                  onChange={handleUpdateChange}
                  required
                />
              </Form.Group> */}

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Url
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="url"
                  placeholder="Enter Url"
                  value={publications?.url}
                  onChange={handleUpdateChange}
                  // required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex  pt-2 justify-content-start font-weight-bold">
                  Doi
                  {/* <span style={{ color: "red" }}> *</span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  name="doi"
                  placeholder="Enter Doi"
                  value={publications?.doi}
                  onChange={handleUpdateChange}
                  // required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Volume
                </Form.Label>
                <Form.Control
                  type="text"
                  name="volume"
                  placeholder="Enter Volume"
                  value={publications?.volume}
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Issue
                </Form.Label>
                <Form.Control
                  type="text"
                  name="issues"
                  placeholder="Enter Issue"
                  value={publications?.issues}
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Page No.(from)
                </Form.Label>
                <Form.Control
                  type="text"
                  name="pageNo"
                  placeholder="Enter Page No."
                  value={publications?.pageNo}
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Page No. (to)
                </Form.Label>
                <Form.Control
                  type="text"
                  name="lastPage"
                  placeholder="Enter Page No."
                  value={publications?.lastPage}
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              {/*
              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Editor
                </Form.Label>
                <Form.Control
                  type="text"
                  name="editor"
                  placeholder="Enter Editor Name"
                  value={publications?.editor}
                  onChange={handleUpdateChange}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label className="d-flex pt-2 justify-content-start">
                  Publisher
                </Form.Label>
                <Form.Control
                  type="text"
                  name="publisher"
                  placeholder="Enter Publisher Name"
                  value={publications?.publisher}
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

export default PublicationSection;
