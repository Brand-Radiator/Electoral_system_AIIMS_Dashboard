import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Tab,
  Nav,
  Accordion,
  useAccordionButton,
  AccordionContext,
  Col,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";
// import PersonalInformation from "./PersonalInfo";
import { useSelector, useDispatch } from "react-redux";
// import { AppDispatch, RootState } from "../../../../redux/store";
import { AppDispatch, RootState } from "../../redux/store";
import { logoutUser } from "../../redux/actions";
// import { logoutUser } from "../../../../redux/actions";
import { API_BASE_URL } from "../../apiservices/apiService";

import RegistrationSection from "./RegistrationSection";

interface CustomToggleProps {
  children: any;
  eventKey: string;
  containerClass: string;
  linkClass: string;
  callback?: any;
}

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

interface AuthorInfo {
  firstName: string;
  middleName: string;
  lastName: string;
  _id?: string;
}

const CustomToggle = ({
  children,
  eventKey,
  containerClass,
  linkClass,
  callback,
}: CustomToggleProps) => {
  const { activeEventKey } = useContext(AccordionContext);

  const decoratedOnClick = useAccordionButton(
    eventKey,
    () => callback && callback(eventKey)
  );

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <Link
      to="#"
      className={classNames(linkClass, {
        collapsed: !isCurrentEventKey,
      })}
      onClick={decoratedOnClick}
    >
      <Card.Header>
        <h5 className={containerClass}>{children}</h5>
      </Card.Header>
    </Link>
  );
};

// Custom Accordian for Registration section
const CustomAccordion4 = ({
  formTitle,
  item,
  index,
  length,
  handleRegistrationInfoSubmit, // Pass onSubmit prop
  setRegistration, // Pass setPersonalInfo prop
  isApiHit,
  registrationData,
}: {
  item: RegistrationInformation;
  index: number;
  length: number;
  formTitle: string;
  isApiHit: boolean;
  registrationData: RegistrationInformation[];
  handleRegistrationInfoSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: RegistrationInformation
  ) => Promise<void>;
  setRegistration: React.Dispatch<
    React.SetStateAction<RegistrationInformation>
  >; // Define the setPersonalInfo function type
}) => {
  return (
    <Card
      className={classNames(
        "shadow-none",
        "border",
        index + 1 === length ? "mb-0" : "mb-1"
      )}
    >
      <CustomToggle
        eventKey={String(index)}
        containerClass="m-0 fs-16"
        linkClass="text-dark"
      >
        {/* <span className="float-start">
          <i className="uil uil-angle-down float-end accordion-arrow"></i>
        </span> */}
        {formTitle}
        <span className="float-end">Add/Edit</span>
        <i className="uil uil-angle-down float-end accordion-arrow"></i>
      </CustomToggle>
      <Accordion.Collapse eventKey={String(index)}>
        <Card.Body className="text-muted">
          {/* <ContactInfo
            item={item}
            handleContactInfoSubmit={handleContactInfoSubmit}
            setContactInfo={setContactInfo} // Pass setPersonalInfo prop
            isApiHit={isApiHit}
          /> */}
          <RegistrationSection
            item={item}
            handleRegistrationInfoSubmit={handleRegistrationInfoSubmit}
            setRegistration={setRegistration} // Pass setPersonalInfo prop
            isApiHit={isApiHit}
            registrationData={registrationData}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

const Registations = () => {
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [isApiHit, setIsApiHit] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setactiveTab] = useState<string>("activity");

  const [registration, setRegistration] = useState<RegistrationInformation>({
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
  });

  const [registrationData, setRegistrationData] = useState([]);

  /**
   * handles tab activation
   * @param eventKey currently active tab
   */

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
  let doctorDataProfileId = user?.doctorProfileId;

  const handleSelect = (eventKey: string | null) => {
    setactiveTab(eventKey!);
  };

  // console.log(user, "user ID");
  // console.log(doctorDataProfileId, "DOCTOR PROFILE ID");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDataLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/api/doctor/${profileId}/${Key_Key}`,
          // `${API_BASE_URL}/api/auth/${profileId}/${Key_Key}`,
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

        setRegistrationData(data?.data[0]?.registration);

        setDataLoading(false);
      } catch (error) {
        // Handle fetch error
        setDataLoading(false);
        console.error("Error during fetch:", error);
      }
    };
    if (doctorDataProfileId) {
      fetchData();
    }

    // Call the async function directly
    // Note: You may want to add a cleanup function here if needed
  }, [profileId, Key_Key]); // Include dependencies if needed

  const handleRegistrationInfoSubmit = async (
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
      setIsApiHit(true);
      const response = await fetch(
        `${API_BASE_URL}/api/update/doctor/nested/${profileId}/${Key_Key}/${section}`,

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
        setIsApiHit(false);
        alert("Profile Updated Successfully");
        window.location.reload();
      }
    } catch (error: any) {
      // setIsResponse(error)
      // setShowModal(true)
      console.error("Error during update personal information:", error);
    }
  };

  return (
    <Card>
      <Card.Body>
        <Accordion
          defaultActiveKey="3"
          id="accordion"
          className="custom-accordionwitharrow"
          // style={{ border: "2px solid red" }}
        >
          <>
            {/* Accordian for registration Section */}
            <CustomAccordion4
              key={3}
              formTitle={
                "NOMINATION FORM AIIMS PATNA STUDENTS ASSOCIATION (APSA) "
              }
              item={registration}
              index={3}
              length={12}
              handleRegistrationInfoSubmit={handleRegistrationInfoSubmit}
              setRegistration={setRegistration}
              isApiHit={isApiHit}
              registrationData={registrationData}
            />
          </>
        </Accordion>
        {/* )} */}
      </Card.Body>
    </Card>
  );
};

export default Registations;
