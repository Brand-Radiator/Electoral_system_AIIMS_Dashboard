import React, { ReactInstance, RefObject, useRef, useState } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { API_BASE_URL } from "../../../../apiservices/apiService";

import userAvatar from "../../../../assets/images/users/admin-avatar.png";
// import cvFormat from "../../../../assets/";
import { AnyARecord } from "dns";
import { useReactToPrint } from "react-to-print";
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
  seminar: any[];
  patents: any[];
  publications: any[];
  academicIdentity: any;
  adminApprovalStatus: any;
  superAdminApprovalStatus: any;
}

const DownloadResume: React.FC<{ resumeData: ResumeData }> = ({
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
    seminar,
    patents,
    publications,
    academicIdentity,
    adminApprovalStatus,
    superAdminApprovalStatus,
  } = resumeData;

  const componentRef: RefObject<HTMLDivElement> = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
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
  console.log(resumeData, "resumeData");
  // Function to convert date format
  function formatDate(dateString: any) {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  }

  const allParagraphs = document.querySelectorAll("p");
  // Now you can loop through the selected elements and manipulate them
  allParagraphs.forEach((paragraph) => {
    // Manipulate each <p> element, for example:
    paragraph.style.fontSize = "1.1rem";
    paragraph.style.margin = "0px";
  });

  // const printPDF = () => {
  //   window.print();
  // };

  const publicationsByWorkType: { [key: string]: any[] } = {};

  publications?.forEach((publication: any) => {
    const workType = publication.workType;
    if (!publicationsByWorkType[workType]) {
      publicationsByWorkType[workType] = [];
    }
    publicationsByWorkType[workType].push(publication);
  });

  return (
    <div>
      <Col
        lg={12}
        className="d-flex justify-content-between align-items-center"
      >
        <h5 className="header-title  mt-0">Faculty Profile</h5>
        <Button
          className=" mt-0"
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

        {viewResume &&
        superAdminApprovalStatus &&
        adminApprovalStatus == "Approved" ? (
          <Button
            className=" mt-0"
            variant="primary"
            // onClick={downloadPDF}
            // onClick={printPDF}
            onClick={handlePrint}
            disabled={!(loader === false)}
          >
            {/* <i className="bi-file-earmark-pdf me-1"></i> */}
            {/* {loader ? <span>Downloading CV</span> : <span>Download CV</span>} */}
            <i className="bi-printer me-1"></i>
            <span>Print</span>
          </Button>
        ) : (
          ""
        )}
      </Col>

      {viewResume && viewResume ? (
        <section className="shop-area section-gap" ref={componentRef}>
          <div
            className="container p-5 resume"
            style={{
              // boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
              pageBreakBefore: "auto",
              // pageSize: "A4",
              // pageBreakBefore: "always",
              // // width: "21cm",  // A4 width
              // minHeight: "29.7cm", // A4 height
              overflow: "hidden",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            {/* <img src="assets/img/rrr.png" alt="" style={{ width: "300px",height:"300px",position:"absolute", top:"69.3%", left:"23.2%" }} /> */}
            {/* <button
              style={{ float: "right" }}
              // onClick={printPDF}
              onClick={handlePrint}
            >
              Print
            </button> */}
            <div className="">
              <div className="row justify-content-center ">
                <div className="col-lg-3 d-flex  justify-content-center">
                  <div className="resumImg">
                    {personalInfo?.image ? (
                      <img
                        src={`${API_BASE_URL}/${personalInfo?.image?.replace(
                          "uploads/images/",
                          "images/"
                        )}`}
                        alt="user-profile-image"
                        // className="avatar-lg rounded-circle"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <img
                        src={userAvatar}
                        alt="user-profile-image"
                        // className="avatar-lg rounded-circle"
                        style={{ width: "100%" }}
                      />
                    )}
                  </div>
                </div>
                <div className="col-lg-9 d-flex justify-content-center align-items-center p-4 resumeTitle">
                  <div>
                    <h2>
                      {personalInfo?.title + ". "}
                      {personalInfo?.name}
                    </h2>

                    <h4 style={{ lineHeight: "1.3", textAlign: "center" }}>
                      {personalInfo?.designation}
                    </h4>
                    <h4 style={{ lineHeight: "1.3", textAlign: "center" }}>
                      {experience[0]?.department}
                    </h4>
                  </div>
                </div>
              </div>
            </div>

            <hr />
            <div className="row justify-content-center">
              <div className="col-xl-3 col-lg-3 ">
                <div>
                  {contactInfo?.emailid ? (
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
                        <p>
                          <i className="bi-envelope-fill me-2"></i>
                          {contactInfo?.emailid}
                        </p>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  <div>
                    {/* <h5
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

                    <p>{expertise?.expertise}</p>
                    <p>{expertise?.briefInfo}</p> */}
                    {expertise?.expertise || expertise?.briefInfo ? (
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
                    ) : (
                      ""
                    )}
                    <p>{expertise?.expertise}</p>
                    <p>{expertise?.briefInfo}</p>

                    {patents?.length > 0 ? (
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
                        Patents : {patents?.length}
                      </h5>
                    ) : (
                      ""
                    )}
                    {researchProjects?.length > 0 ? (
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
                        Research Projects : {researchProjects?.length}
                      </h5>
                    ) : (
                      ""
                    )}
                    {publications?.length > 0 ? (
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
                        Publications : {publications?.length}
                      </h5>
                    ) : (
                      ""
                    )}
                    {publications?.filter(
                      (item) => item.workType === "retracted articles"
                    ).length > 0 ? (
                      <p>
                        Retracted-Articles :{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "retracted articles"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}

                    {publications?.filter(
                      (item) => item.workType === "research article"
                    ).length > 0 ? (
                      <p>
                        Research Article :{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "research article"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}
                    {publications?.filter((item) => item.workType === "aip")
                      .length > 0 ? (
                      <p>
                        Article-in-Press (AiP) :{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "aip"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}
                    {publications?.filter((item) => item.workType === "book")
                      .length > 0 ? (
                      <p>
                        Book:{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "book"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}
                    {publications?.filter(
                      (item) => item.workType === "Book Chapter"
                    ).length > 0 ? (
                      <p>
                        Book Chapter :{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "Book Chapter"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}
                    {publications?.filter(
                      (item) => item.workType === "case study"
                    ).length > 0 ? (
                      <p>
                        Case Study :{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "case study"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}
                    {publications?.filter(
                      (item) => item.workType === "case series"
                    ).length > 0 ? (
                      <p>
                        Case Series:{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "case series"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}

                    {publications?.filter(
                      (item) => item.workType === "conferencepaper"
                    ).length > 0 ? (
                      <p>
                        Conference Paper:{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "conferencepaper"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}

                    {publications?.filter(
                      (item) => item.workType === "conference proceedings"
                    ).length > 0 ? (
                      <p>
                        Conference Proceedings :{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "conference proceedings"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}

                    {publications?.filter(
                      (item) => item.workType === "datapaper"
                    ).length > 0 ? (
                      <p>
                        Data Paper:{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "datapaper"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}

                    {publications?.filter(
                      (item) => item.workType === "editorial"
                    ).length > 0 ? (
                      <p>
                        Editorial:{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "editorial"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}

                    {publications?.filter((item) => item.workType === "erratum")
                      .length > 0 ? (
                      <p>
                        Erratum :{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "erratum"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}

                    {publications?.filter((item) => item.workType === "letter")
                      .length > 0 ? (
                      <p>
                        Letter :{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "letter"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}

                    {publications?.filter((item) => item.workType === "note")
                      .length > 0 ? (
                      <p>
                        Note :{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "note"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}
                    {/* 
                    {publications?.filter(
                      (item) => item.workType === "retracted articles"
                    ).length > 0 ? (
                      <p>
                        Retracted Article :{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "retracted articles"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )} */}

                    {publications?.filter((item) => item.workType === "review")
                      .length > 0 ? (
                      <p>
                        Review :{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "review"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}

                    {publications?.filter(
                      (item) => item.workType === "short survey"
                    ).length > 0 ? (
                      <p>
                        Short Survey :{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "short survey"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}

                    {publications?.filter((item) => item.workType === "other")
                      .length > 0 ? (
                      <p>
                        Other :{" "}
                        {
                          publications?.filter(
                            (item) => item.workType === "other"
                          ).length
                        }
                      </p>
                    ) : (
                      ""
                    )}

                    <hr />
                  </div>

                  {academicIdentity?.orcidId ||
                  academicIdentity?.scopusId ||
                  academicIdentity?.researcherId ||
                  academicIdentity?.googleScholarId ||
                  academicIdentity?.vidwanId ? (
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
                      <p>Orcid Id: {academicIdentity?.orcidId ?? ""}</p>
                      <p>Scopus Id: {academicIdentity?.scopusId ?? ""}</p>
                      <p>
                        Researcher Id: {academicIdentity?.researcherId ?? ""}
                      </p>
                      <p>
                        Google Scholar Id:{" "}
                        {academicIdentity?.googleScholarId ?? ""}
                      </p>
                      <p>Vidwan Id: {academicIdentity?.vidwanId ?? ""}</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="col-xl-8 col-lg-8 ">
                <div>
                  {experience?.length > 0 ? (
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
                      EXPERIENCE
                    </h5>
                  ) : (
                    ""
                  )}
                  {/* <ul style={{ listStyleType: "disc", marginLeft: "15px" }}>
                     <li>Hindi</li>
                     <li>English</li>
                     <li>Bangali</li>
                   </ul> */}
                  {experience?.map((exp) => (
                    <div key={exp?._id}>
                      <h4>{exp?.organization}</h4>
                      <p>
                        {exp?.designation?.charAt(0)?.toUpperCase() +
                          exp?.designation?.slice(1) || ""}{" "}
                        {"("} {formatDate(exp?.startDate)} to{" "}
                        {exp?.endDate
                          ? formatDate(exp?.endDate)
                          : "" || "Present"}
                        {")"}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  {education?.length > 0 ? (
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
                      Qualification
                    </h5>
                  ) : (
                    ""
                  )}
                  {/* <ul style={{ listStyleType: "disc", marginLeft: "15px" }}>
                       <li>Hindi</li>
                       <li>English</li>
                       <li>Bangali</li>
                     </ul> */}
                  {education?.map((edu: any) => (
                    <div key={edu?._id}>
                      <h4>
                        {edu?.degree}
                        {"      "}
                        {"("}
                        {edu?.qualification}
                        {")"}
                      </h4>
                      <p>
                        {edu?.institute} {"("} {edu?.passingYear}
                        {")"}
                      </p>
                      {/* <p>Year: {edu?.passingYear}</p> */}
                    </div>
                  ))}
                </div>
                {honoursAndAwards?.length > 0 ? (
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

                    {honoursAndAwards?.map((award) => (
                      <div key={award?._id}>
                        <h4>{award?.awardName}</h4>
                        {/* <p>Year: {award?.year}</p> */}
                        <p>
                          Awarded By: {award?.awardedBy}
                          {"   "}
                          {"("} {award?.year}
                          {")"}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
                {doctoralTheses?.length > 0 ? (
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
                      Doctoral Thesis Guided
                    </h5>
                    {doctoralTheses?.map((thesis: any) => (
                      <div key={thesis?._id}>
                        <h4>{thesis?.title}</h4>
                        <p>
                          Researcher: {thesis?.researcherName}
                          {"   "}
                          {"(" + thesis?.batch + ")"}
                        </p>
                        <p>
                          Institute: {thesis?.institute}
                          {"   "} {"("}
                          {thesis?.awardedYear}
                          {")"}
                        </p>
                        {/* <p>Year: </p> */}
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}

                {professionalMemberships?.length > 0 ? (
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
                    {professionalMemberships?.map((membership: any) => (
                      <div key={membership?._id}>
                        <h4>{membership?.bodyName}</h4>
                        <p>
                          Member Type: {membership?.memberType}
                          {"    "}
                          {"("} {membership?.awardedYear}
                          {")"}
                        </p>
                        {/* <p>Year: {membership?.awardedYear}</p> */}
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}

                {patents?.length > 0 ? (
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
                    {patents?.map((patent: any) => (
                      <div key={patent?._id}>
                        <h4>{patent?.title}</h4>
                        <p>Application Number: {patent?.applicationNumber}</p>
                        <p>
                          Publication Date:{" "}
                          {formatDate(patent?.publicationDate)}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="ml-5 mr-5 ">
              {committeeMemberships?.length > 0 ? (
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
                  <div className="row justify-content-center">
                    {committeeMemberships?.map(
                      (committee: any, index: number) => (
                        <div key={committee?._id} className="col-lg-6">
                          <h4>
                            {index + 1 + "  "}
                            {committee?.committeeName}
                          </h4>
                          <p>
                            Role: {committee?.role}
                            {"    "}
                            {"("}
                            {committee?.year}
                            {")"}
                          </p>
                          {/* <p>Year: {committee?.year}</p> */}
                        </div>
                      )
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}

              {researchProjects?.length > 0 ? (
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
                  {researchProjects && researchProjects.length > 0 && (
                    <div className="table-responsive">
                      <table className="table text-center table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>SN</th>
                            <th>Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {researchProjects.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.title}</td>
                              <td>{item.startDate}</td>
                              <td>{item.endDate}</td>
                              <td>{item.status}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}

              {seminar?.length > 0 ? (
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
                    Seminar & Training
                  </h5>
                  {seminar && seminar.length > 0 && (
                    <div className="table-responsive">
                      <table className="table text-center table-striped table-bordered">
                        <thead>
                          <tr>
                            <th>SN</th>
                            <th>Activity type</th>
                            <th>Title</th>
                            <th>Organised by</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {seminar.map((item, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                {/* {item.actType && item.actType[0]?.toUpperCase()} */}
                                {/* {item?.actType.charAt[0]?.toUpperCase()}
                                {item?.actType?.slice(1)} */}
                                {item.actType.charAt(0).toUpperCase() +
                                  item.actType.slice(1)}
                              </td>
                              <td>{item.title}</td>
                              <td>{item.orgBy}</td>
                              <td>{item.startDate}</td>
                              <td>{item.endDate ? item.endDate : "Present"}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : (
                ""
              )}

              {/* {publications?.length > 0 ? (
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
                  {Object.entries(publicationsByWorkType).map(
                    ([workType, publications]) => (
                      <div key={workType}>
                        <h5>{workType.toUpperCase()}</h5>
                        {publications.map((publication: any, i: number) => (
                          <div key={i}>
                            <p>
                              {publication?.authors
                                ?.map(
                                  (author: any) =>
                                    `${i + 1}. ${
                                      author?.firstName
                                      
                                    } ${
                                      author?.lastName
                                     
                                    } ${
                                      author?.firstName &&
                                      author?.firstName[0]?.toUpperCase()
                                    }${
                                      author?.middleName &&
                                      author?.middleName[0]?.toUpperCase()
                                    }`
                                )
                                .join(", ")}
                              {". "}
                              {publication?.title}
                              {". "}
                              {publication?.journalBookTitle}
                              {". "}
                              {publication?.year}
                              {";"} {publication?.volume}
                              {"(" + publication?.issues + ")"}
                              {":"}
                              {publication?.pageNo}
                              {"-"}
                              {publication?.lastPage}
                              {"."}
                            </p>
                          </div>
                        ))}
                      </div>
                    )
                  )}
                </div>
              ) : (
                ""
              )} */}

              {publications?.length > 0 && (
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
                  {/* {Object.entries(publicationsByWorkType)
                    .map(([workType, publications]) => ({
                      workType,
                      latestYear: Math.max(
                        ...publications.map((pub) => pub.year)
                      ),
                    }))
                    .sort((a, b) => b.latestYear - a.latestYear)
                    .map(({ workType }) => ( */}

                  {Object.entries(publicationsByWorkType).map(
                    ([workType, publications]) => (
                      <div key={workType}>
                        <h5>{workType.toUpperCase()}</h5>
                        {/* {publicationsByWorkType[workType].map(
                          (publication, i) => ( */}
                        {publications
                          .filter((publication) => publication.year) // Filter out publications without a year
                          .sort((a, b) => b.year - a.year) // Sort publications by year in descending order
                          .map((publication, i) => (
                            <div key={i}>
                              <ul style={{ listStyleType: "none", padding: 0 }}>
                                <li>
                                  {/* {publication.authors?.map(
                                    (author: any, index: number) => (
                                      <span key={index}>
                                        {`${i + 1}. ${author.firstName || ""} ${
                                          author.lastName || ""
                                        }`}
                                        {index !==
                                        publication.authors.length - 1
                                          ? ", "
                                          : ""}
                                      </span>
                                    )
                                  )} */}
                                  {publication?.authors
                                    ?.map(
                                      (author: any) =>
                                        ` ${i + 1}. ${author?.lastName
                                          ?.charAt(0)
                                          ?.toUpperCase()}${author?.lastName?.slice(
                                          1
                                        )} ${
                                          author?.firstName &&
                                          author?.firstName[0]?.toUpperCase()
                                        }${
                                          author?.middleName &&
                                          author?.middleName[0]?.toUpperCase()
                                        }`
                                    )
                                    .join(", ")}
                                  {", "}
                                  {publication.title && (
                                    <>
                                      {publication.title}
                                      {". "}
                                    </>
                                  )}
                                  {publication.journalBookTitle && (
                                    <>
                                      {publication.journalBookTitle}
                                      {". "}
                                    </>
                                  )}
                                  {publication.year && (
                                    <>
                                      {publication.year}
                                      {"; "}
                                    </>
                                  )}
                                  {publication.volume && (
                                    <>
                                      {publication.volume}
                                      {", "}
                                    </>
                                  )}
                                  {publication.issues && (
                                    <>
                                      {publication.issues}
                                      {", "}
                                    </>
                                  )}
                                  {publication.pageNo && publication.lastPage && (
                                    <>
                                      {publication.pageNo}-
                                      {publication.lastPage}
                                    </>
                                  )}
                                  {"."}
                                </li>
                              </ul>
                            </div>
                          ))}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </div>
  );
};

export default DownloadResume;
