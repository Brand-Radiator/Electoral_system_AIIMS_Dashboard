import React, { useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { API_BASE_URL } from "../../../../apiservices/apiService";

import userAvatar from "../../../../assets/images/users/admin-avatar.png";
// import cvFormat from "../../../../assets/";
import { AnyARecord } from "dns";
interface ResumeData {
  personalInfo: any;
  expertise: any;
  contactInfo: any;
  experience: any[];
  education: any[];
  honoursAndAwards: any[];
  doctoralTheses: any[];
  professionalMemberships: any[];
  committeeMemberships: any[];
  researchProjects: any[];
  patents: any[];
  publications: any[];
  academicIdentity: any;
}

const DownloadResumeBackup: React.FC<{ resumeData: ResumeData }> = ({
  resumeData,
}) => {
  const [loader, setLoader] = useState(false);
  const [viewResume, setViewResume] = useState(false);
  const {
    personalInfo,
    expertise,
    contactInfo,
    experience,
    education,
    honoursAndAwards,
    doctoralTheses,
    professionalMemberships,
    committeeMemberships,
    researchProjects,
    patents,
    publications,
    academicIdentity,
  } = resumeData;

  const downloadPDF = () => {
    const capture = document.querySelector(".resume");

    if (!capture) {
      console.error("Could not find .resume element");
      return;
    }

    setLoader(true);

    html2canvas(capture as HTMLElement).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");
      // console.log(imgData, "IMAGE DATA");

      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      // Add image

      let imageURL = `${API_BASE_URL}/${personalInfo?.image?.replace(
        "uploads/images/",
        "images/"
      )}`;
      // doc.addImage(imageURL, "JPEG", 15, 40, 180, 180);
      // doc.addImage(imageURL, "PNG", 15, 40, 180, 180);

      doc.setFontSize(16);

      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);
      setLoader(false);
      doc.save("mycv.pdf");
    });
  };

  // const printPDF = () => {
  //   window.print();
  // };

  return (
    <div>
      <Col
        lg={12}
        className="d-flex justify-content-between align-items-center"
      >
        <h5 className="header-title mb-3 mt-0">Faculty Profile</h5>
        <Button
          className="mb-3 mt-0"
          variant="primary"
          onClick={() => setViewResume(!viewResume)}
        >
          {viewResume ? <span>Hide CV</span> : <span>View CV</span>}
          {/* <span>
            <a
              href="https://facultycv.tiiny.site/"
              target="_blank"
              style={{ color: "white" }}
            >
              {" "}
              View CV
            </a>
          </span> */}
        </Button>

        {viewResume && viewResume ? (
          <Button
            className="mb-3 mt-0"
            variant="primary"
            onClick={downloadPDF}
            // onClick={printPDF}
            disabled={!(loader === false)}
          >
            <i className="bi-file-earmark-pdf me-1"></i>
            {loader ? <span>Downloading CV</span> : <span>Download CV</span>}
          </Button>
        ) : (
          ""
        )}
      </Col>

      {viewResume && viewResume ? (
        <div
          className="container mt-5 mb-5 resume"
          style={{
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            border: "1px solid gray",
          }}
        >
          <div className=" pt-3 mb-3">
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-3 d-flex justify-content-center">
                <div className="resumImg">
                  {personalInfo?.image ? (
                    <Image
                      src={`${API_BASE_URL}/${personalInfo?.image?.replace(
                        "uploads/images/",
                        "images/"
                      )}`}
                      alt="user-profile"
                      className="avatar-lg rounded-circle"
                    />
                  ) : (
                    <Image
                      src={userAvatar}
                      alt="user-profile"
                      className="rounded-circle"
                    />
                  )}
                </div>
              </div>
              <div className="col-lg-9 d-flex justify-content-center align-items-center p-4 resumeTitle">
                <div>
                  <h2>{personalInfo?.name}</h2>
                  <h5 style={{ lineHeight: "1.3" }}>
                    {personalInfo?.designation}
                  </h5>
                </div>
              </div>
            </div>

            {/* <div className="row justify-content-center align-item-center ">
              <div className="col-lg-3 d-flex  justify-content-center">
                <div className="resumImg">
                  {personalInfo?.image ? (
                    <Image
                      src={`${API_BASE_URL}/${personalInfo?.image?.replace(
                        "uploads/images/",
                        "images/"
                      )}`}
                      alt="user-profile"
                      className="avatar-lg rounded-circle"
                      // roundedCircle
                    />
                  ) : (
                    <Image
                      // style={{ width: "100%" }}
                      src={userAvatar}
                      alt="user-profile"
                      className="rounded-circle"
                      // roundedCircle
                    />
                  )}
                </div>
              </div>
              <div className="col-lg-9 d-flex justify-content-center align-items-center p-4 resumeTitle">
                <div>
                  <h2>{personalInfo?.name}</h2>
                  <h5 style={{ lineHeight: "1.3" }}>
                    {personalInfo?.designation}
                  </h5>
                </div>
              </div>
            </div> */}
          </div>

          <hr />
          <div className="row justify-content-center">
            <div className="col-xl-3 col-lg-3 ">
              <div>
                <h5
                  className="text-center"
                  style={{
                    background: "#27384C",
                    borderRadius: "20px",
                    padding: "5px 0px",
                    color: "white",
                    marginTop: "20px",
                  }}
                >
                  About Me
                </h5>
                <div className="mt-3">
                  {expertise?.briefInfo ? (
                    <div style={{ marginBottom: "15px" }}>
                      <p style={{ marginBottom: "2px" }}>
                        {expertise?.briefInfo}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}

                  {contactInfo && contactInfo ? (
                    <div>
                      {contactInfo?.emailid ? (
                        <p style={{ marginTop: "2px", marginBottom: "2px" }}>
                          <i className="bi-envelope-fill me-2"></i>
                          {contactInfo?.emailid}
                        </p>
                      ) : (
                        ""
                      )}

                      {contactInfo?.mobileNumber ? (
                        <p style={{ marginTop: "2px", marginBottom: "2px" }}>
                          <i className="bi-telephone-outbound-fill me-2"></i>
                          {contactInfo?.mobileNumber}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                {/* <div>
              <h5
                className="text-center"
                style={{
                  background: "#27384C",
                  borderRadius: "20px",
                  padding: "5px 0px",
                  color: "white",
                  marginTop: "20px",
                }}
              >
                LANGUAGE
              </h5>
              <ul style={{ listStyleType: "disc", marginLeft: "15px" }}>
                <li>Hindi</li>
                <li>English</li>
                <li>Bangali</li>
              </ul>
            </div> */}

                <div>
                  <h5
                    className="text-center"
                    style={{
                      background: "#27384C",
                      borderRadius: "20px",
                      padding: "5px 0px",
                      color: "white",
                      marginTop: "20px",
                    }}
                  >
                    Expertise
                  </h5>
                  <ul style={{ listStyleType: "disc", marginLeft: "15px" }}>
                    <li>{expertise?.expertise}</li>
                  </ul>
                </div>

                {education && education.length > 0 ? (
                  <div>
                    <h5
                      className="text-center"
                      style={{
                        background: "#27384C",
                        borderRadius: "20px",
                        padding: "5px 0px",
                        color: "white",
                        marginTop: "20px",
                      }}
                    >
                      Education
                    </h5>
                    <div style={{ marginLeft: "15px" }}>
                      {education.map((edu: any, index: any) => (
                        <div key={index} style={{ marginBottom: "8px" }}>
                          <div
                            style={{ fontWeight: "bold", marginBottom: "2px" }}
                          >
                            {edu?.qualification}
                          </div>
                          <div
                            style={{ marginTop: "2px", marginBottom: "2px" }}
                          >
                            {edu?.institute}
                          </div>
                          <div
                            style={{ marginTop: "2px", marginBottom: "2px" }}
                          >
                            {edu?.subject}
                          </div>
                          <div
                            style={{ marginTop: "2px", marginBottom: "2px" }}
                          >
                            Year: {edu?.passingYear}
                          </div>
                          <hr style={{ border: "", margin: "2px 0" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {honoursAndAwards && honoursAndAwards.length > 0 ? (
                  <div>
                    <h5
                      className="text-center"
                      style={{
                        background: "#27384C",
                        borderRadius: "20px",
                        padding: "5px 0px",
                        color: "white",
                        marginTop: "20px",
                      }}
                    >
                      Honors and Awards
                    </h5>
                    <div style={{ marginLeft: "15px" }}>
                      {honoursAndAwards.map((award: any, index: any) => (
                        <div key={index} style={{ marginBottom: "8px" }}>
                          <div
                            style={{ fontWeight: "bold", marginBottom: "2px" }}
                          >
                            {award?.awardName}
                          </div>
                          <div
                            style={{ marginTop: "2px", marginBottom: "2px" }}
                          >
                            Year: {award?.year}
                          </div>
                          <div
                            style={{ marginTop: "2px", marginBottom: "2px" }}
                          >
                            Awarded By: {award?.awardedBy}
                          </div>
                          <hr style={{ border: "", margin: "2px 0" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {academicIdentity && academicIdentity ? (
                  <div>
                    <h5
                      className="text-center"
                      style={{
                        background: "#27384C",
                        borderRadius: "20px",
                        padding: "5px 0px",
                        color: "white",
                        marginTop: "20px",
                      }}
                    >
                      Academic Identity
                    </h5>
                    <div style={{ marginLeft: "15px" }}>
                      {academicIdentity?.orcidId ? (
                        <p style={{ marginTop: "2px", marginBottom: "2px" }}>
                          Orcid Id: {academicIdentity?.orcidId}
                        </p>
                      ) : (
                        ""
                      )}

                      {academicIdentity?.scopusId ? (
                        <p style={{ marginTop: "2px", marginBottom: "2px" }}>
                          Scopus Id: {academicIdentity?.scopusId}
                        </p>
                      ) : (
                        ""
                      )}

                      {academicIdentity?.researcherId ? (
                        <p style={{ marginTop: "2px", marginBottom: "2px" }}>
                          Researcher Id: {academicIdentity?.researcherId}
                        </p>
                      ) : (
                        ""
                      )}

                      {academicIdentity?.googleScholarId ? (
                        <p style={{ marginTop: "2px", marginBottom: "2px" }}>
                          Google Scholar Id: {academicIdentity?.googleScholarId}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {committeeMemberships && committeeMemberships.length > 0 ? (
                  <div>
                    <h5
                      className="text-center"
                      style={{
                        background: "#27384C",
                        borderRadius: "20px",
                        padding: "5px 0px",
                        color: "white",
                        marginTop: "20px",
                      }}
                    >
                      Committee Memberships
                    </h5>
                    <ul
                      style={{
                        listStyleType: "none",
                        marginLeft: "15px",
                        paddingInlineStart: "0",
                      }}
                    >
                      {committeeMemberships.map(
                        (committee: any, index: any) => (
                          <div key={index} style={{ marginBottom: "8px" }}>
                            <div
                              style={{
                                fontWeight: "bold",
                                marginBottom: "2px",
                              }}
                            >
                              {committee?.committeeName}
                            </div>
                            <div
                              style={{ marginTop: "2px", marginBottom: "2px" }}
                            >
                              Role: {committee?.role}
                            </div>
                            <div
                              style={{ marginTop: "2px", marginBottom: "2px" }}
                            >
                              Year: {committee?.year}
                            </div>
                            <hr style={{ border: "", margin: "2px 0" }} />
                          </div>
                        )
                      )}
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="col-xl-8 col-lg-8 ">
              {experience && experience.length > 0 ? (
                <div>
                  <h5
                    className="text-center"
                    style={{
                      background: "#27384C",
                      borderRadius: "20px",
                      padding: "5px 0px",
                      color: "white",
                      marginTop: "20px",
                    }}
                  >
                    Experience
                  </h5>
                  <ul
                    style={{
                      listStyleType: "none",
                      marginLeft: "15px",
                      paddingInlineStart: "0",
                    }}
                  >
                    {experience.map((exp: any, index: any) => (
                      <div key={index} style={{ marginBottom: "8px" }}>
                        <div
                          style={{ fontWeight: "bold", marginBottom: "2px" }}
                        >
                          {exp?.organization}
                        </div>
                        <div style={{ marginTop: "2px", marginBottom: "2px" }}>
                          {exp?.designation}
                        </div>
                        <div style={{ marginTop: "2px", marginBottom: "2px" }}>
                          {exp?.startDate} - {exp?.endDate || "Present"}
                        </div>
                        <hr style={{ border: "", margin: "2px 0" }} />
                      </div>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}

              {doctoralTheses && doctoralTheses.length > 0 ? (
                <div>
                  <h5
                    className="text-center"
                    style={{
                      background: "#27384C",
                      borderRadius: "20px",
                      padding: "5px 0px",
                      color: "white",
                      marginTop: "20px",
                    }}
                  >
                    Doctoral Thesis
                  </h5>
                  <ul
                    style={{
                      listStyleType: "none",
                      marginLeft: "15px",
                      paddingInlineStart: "0",
                    }}
                  >
                    {doctoralTheses.map((thesis: any, index: any) => (
                      <div key={index} style={{ marginBottom: "8px" }}>
                        <div
                          style={{ fontWeight: "bold", marginBottom: "2px" }}
                        >
                          {thesis?.title }
                        </div>
                        <div style={{ marginTop: "2px", marginBottom: "2px" }}>
                          Researcher: {thesis?.researcherName} {"   "}{"("+thesis?.batch +")" }
                        </div>
                        <div style={{ marginTop: "2px", marginBottom: "2px" }}>
                          Institute: {thesis?.institute}
                        </div>
                        <div style={{ marginTop: "2px", marginBottom: "2px" }}>
                          Year: {thesis?.awardedYear}
                        </div>
                        <hr style={{ border: "", margin: "2px 0" }} />
                      </div>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}

              {researchProjects && researchProjects.length > 0 ? (
                <div>
                  <h5
                    className="text-center"
                    style={{
                      background: "#27384C",
                      borderRadius: "20px",
                      padding: "5px 0px",
                      color: "white",
                      marginTop: "20px",
                    }}
                  >
                    Research Projects
                  </h5>
                  <ul
                    style={{
                      listStyleType: "none",
                      marginLeft: "15px",
                      paddingInlineStart: "0",
                    }}
                  >
                    {researchProjects.map((project: any, index: any) => (
                      <div key={index} style={{ marginBottom: "8px" }}>
                        <div
                          style={{ fontWeight: "bold", marginBottom: "2px" }}
                        >
                          {project?.title}
                        </div>
                        <div style={{ marginTop: "2px", marginBottom: "2px" }}>
                          Start Date: {project?.startDate}
                        </div>
                        <div style={{ marginTop: "2px", marginBottom: "2px" }}>
                          End Date: {project?.endDate || "Ongoing"}
                        </div>
                        <hr style={{ margin: "2px 0" }} />
                      </div>
                    ))}
                  </ul>
                </div>
              ) : (
                ""
              )}

              {professionalMemberships && professionalMemberships.length > 0 ? (
                <div>
                  <h5
                    className="text-center"
                    style={{
                      background: "#27384C",
                      borderRadius: "20px",
                      padding: "5px 0px",
                      color: "white",
                      marginTop: "20px",
                    }}
                  >
                    Professional Memberships
                  </h5>
                  <ul
                    style={{
                      listStyleType: "none",
                      marginLeft: "15px",
                      paddingInlineStart: "0",
                    }}
                  >
                    {professionalMemberships.map(
                      (membership: any, index: any) => (
                        <div key={index} style={{ marginBottom: "8px" }}>
                          <div
                            style={{ fontWeight: "bold", marginBottom: "2px" }}
                          >
                            {membership?.bodyName}
                          </div>
                          <div
                            style={{ marginTop: "2px", marginBottom: "2px" }}
                          >
                            Member Type: {membership?.memberType}
                          </div>
                          <div
                            style={{ marginTop: "2px", marginBottom: "2px" }}
                          >
                            Year: {membership?.awardedYear}
                          </div>
                          <hr style={{ margin: "2px 0" }} />
                        </div>
                      )
                    )}
                  </ul>
                </div>
              ) : (
                ""
              )}

              {patents && patents ? (
                <div>
                  <h5
                    className="text-center"
                    style={{
                      background: "#27384C",
                      borderRadius: "20px",
                      padding: "5px 0px",
                      color: "white",
                      marginTop: "20px",
                    }}
                  >
                    Patents
                  </h5>
                  <ul
                    style={{
                      listStyleType: "none",
                      marginLeft: "15px",
                      paddingInlineStart: "0",
                    }}
                  >
                    {patents &&
                      patents?.map((patent: any, index: any) => (
                        <div key={index} style={{ marginBottom: "8px" }}>
                          <div
                            style={{ fontWeight: "bold", marginBottom: "2px" }}
                          >
                            {patent?.title}
                          </div>
                          <div
                            style={{ marginTop: "2px", marginBottom: "2px" }}
                          >
                            Application Number: {patent?.applicationNumber}
                          </div>
                          <div
                            style={{ marginTop: "2px", marginBottom: "2px" }}
                          >
                            Publication Date: {patent?.publicationDate}
                          </div>
                          <hr style={{ margin: "2px 0" }} />
                        </div>
                      ))}
                  </ul>
                </div>
              ) : (
                ""
              )}

              {publications && publications ? (
                <div>
                  <h5
                    className="text-center"
                    style={{
                      background: "#27384C",
                      borderRadius: "20px",
                      padding: "5px 0px",
                      color: "white",
                      marginTop: "20px",
                    }}
                  >
                    Publications
                  </h5>
                  <ul
                    style={{
                      listStyleType: "none",
                      marginLeft: "15px",
                      paddingInlineStart: "0",
                    }}
                  >
                    {publications &&
                      publications?.map((publication: any, index: any) => (
                        <div key={index} style={{ marginBottom: "8px" }}>
                          <p
                            style={{ fontWeight: "bold", marginBottom: "2px" }}
                          >
                            {publication?.title}
                          </p>
                          <div
                            style={{ marginTop: "2px", marginBottom: "2px" }}
                          >
                            Year: {publication?.year}
                          </div>
                          <div
                            style={{ marginTop: "2px", marginBottom: "2px" }}
                          >
                            Authors:{" "}
                            {publication?.authors
                              .map(
                                (author: any) =>
                                  `${author?.lastName} ${
                                    author?.firstName &&
                                    author?.firstName[0].toUpperCase()
                                  }${
                                    author?.middleName &&
                                    author?.middleName[0].toUpperCase()
                                  }`
                              )
                              .join(", ")}
                            {/* {publication?.authors
                              .map((author: any) => author?.firstName)
                              .join(", ")} */}
                          </div>
                          <hr style={{ margin: "2px 0" }} />
                        </div>
                      ))}
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DownloadResumeBackup;
