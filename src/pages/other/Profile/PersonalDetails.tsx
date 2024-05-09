import React, { useEffect, useState } from "react";
import { Card, ProgressBar, Button } from "react-bootstrap";
// import userAvatar from "../../../assets/images/users/avatar-7.jpg";
import userAvatar from "../../../assets/images/users/profilepicdummy.jpg";

// types
import { UserInfoTypes } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { logoutUser } from "../../../redux/actions";
import { API_BASE_URL } from "../../../apiservices/apiService";
import { log } from "console";

interface PersonalDetailsProps {
  userInfo: UserInfoTypes;
}

interface PersonalInfo {
  name: string;
  designation: string;
  employeeid: string;
  dob: string;
  doj: string;
  gender: string;
  image: string;
  title: string;
}

interface ExpertiseSection {
  expertise: string;
  briefInfo: string;
}

interface ContactInformation {
  mobileNumber: string;
  emailid: string;
  country: string;
  state: string;
  city: string;
  zip: string;
}

const PersonalDetails = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>();
  const [expertise, setExpertise] = useState<ExpertiseSection>();
  const [contactInfo, setContactInfo] = useState<ContactInformation>();
  const dispatch = useDispatch<AppDispatch>();
  const [dataLoading, setDataLoading] = useState(false);
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
  let doctorDepartment = user?.department;
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

        setPersonalInfo(data?.data[0]?.personalInfo);
        setExpertise(data?.data[0]?.expertise);
        setContactInfo(data?.data[0]?.contactInfo);

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
console.log(personalInfo, "personalInfo");



  return (
    <Card
    //  style={{ border: "2px solid green" }}
    >
      <Card.Body>
        <div className="text-center mt-2">
          {personalInfo?.image ? (
            <img
              src={`${API_BASE_URL}/${personalInfo?.image?.replace(
                "uploads/images/",
                "images/"
              )}`}
              alt="user-profile"
              className="avatar-lg rounded-circle"
            />
          ) : (
            <img
              src={userAvatar}
              alt="user-profile"
              className="avatar-lg rounded-circle"
            />
          )}

          <h4 className="mt-2 mb-0">{personalInfo?.title}{"."} {personalInfo?.name}</h4>
          <h6 className="text-muted fw-normal mt-2 mb-0">
            {/* Designation :  */}
            {personalInfo?.designation}
          </h6>
          <h6 className="text-muted fw-normal mt-1 mb-3">
            {/* UPUMS Biometric I'd : {personalInfo?.employeeid} */}
            {doctorDepartment}
          </h6>

          {/* <ProgressBar
            variant="success"
            now={userInfo.profileProgress}
            label={
              <span className="fs-12 fw-bold">
                Your Profile is{" "}
                <span className="fs-11">{userInfo.profileProgress}%</span>{" "}
                completed
              </span>
            }
            className="mb-3"
            style={{ height: "14px" }}
          /> */}

          {/* <Button variant="primary" className="btn-sm me-1">
            Follow
          </Button>
          <Button variant="white" className="btn-sm">
            Message
          </Button> */}
        </div>

        {/* profile */}
        <div className="mt-4 pt-2 border-top">
          <h4 className="mb-3 fs-15">About</h4>
          <p className="text-muted mb-3">{expertise?.briefInfo}</p>
        </div>
        <div className="mt-3 pt-2 border-top">
          <h4 className="mb-2 fs-15">Contact Information</h4>
          <div className="table-responsive">
            <table className="table table-borderless mb-0 text-muted">
              <tbody>
                <tr>
                  <th scope="row">Email</th>
                  <td>{contactInfo?.emailid}</td>
                </tr>
                <tr>
                  <th scope="row">Phone</th>
                  <td>{contactInfo?.mobileNumber}</td>
                </tr>
                {/* <tr>
                  <th scope="row">Address</th>
                  <td>{contactInfo?.state}</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
        {/* <div className="mt-2 pt-2 border-top">
          <h4 className="mb-3 fs-15">Skills</h4>
          {(userInfo.skills || []).map((skill, index) => {
            return (
              <label key={index} className="badge badge-soft-primary me-1">
                {" "}
                {skill}
              </label>
            );
          })}
        </div> */}
      </Card.Body>
    </Card>
  );
};

export default PersonalDetails;
