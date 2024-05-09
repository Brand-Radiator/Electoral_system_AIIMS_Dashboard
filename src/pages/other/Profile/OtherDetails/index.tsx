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
import PersonalInformation from "./PersonalInfo";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { logoutUser } from "../../../../redux/actions";
import { API_BASE_URL } from "../../../../apiservices/apiService";
import ContactInfo from "./ContactInfo";
import Expertise from "./Expertise";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import HonoursAndAwardSection from "./HonoursAndAwardSection";
import DoctorThesesSection from "./DoctorThesesSection";
import ProfessionalBodies from "./ProfessionalBodies";
import PublicationSection from "./PublicationSection";
import PatentSection from "./PatentSection";
import ResearchProjectsSection from "./ResearchProjectsSection";
import CommitteesSection from "./CommitteesSection";
import DownloadResume from "./DownloadResume";
import AcademicSection from "./AcademicSection";
import SeminarTraining from "./SeminarTrainning";

interface CustomToggleProps {
  children: any;
  eventKey: string;
  containerClass: string;
  linkClass: string;
  callback?: any;
}

interface PersonalInfo {
  title: string;
  name: string;
  designation: string;
  employeeid: string;
  dob: string;
  doj: string;
  gender: string;
  image: string;
}

interface ExpertiseSection {
  expertise: string;
  briefInfo: string;
  subject: string;
}

interface ContactInformation {
  mobileNumber: string;
  emailid: string;
  country: string;
  state: string;
  city: string;
  zip: string;
}

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
}

interface EducationInformation {
  qualification: string;
  institute: string;
  subject: string;
  degree: string;
  passingYear: string;
}

interface HonoursAndAwardsInfo {
  year: string;
  awardName: string;
  awardedBy: string;
}

interface DoctoralThesesInfo {
  researcherName: string;
  role: string;
  title: string;
  institute: string;
  batch: string;
  awardedYear: string;
}

interface ProfessionalMembershipsInfo {
  bodyName: string;
  employeeId: string;
  memberType: string;
  awardedYear: string;
}

interface CommitteeMembershipsInfo {
  committeeName: string;
  role: string;
  year: string;
  endYear: string;
  currentlyWorking: boolean;
}

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
}

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
}

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
}

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
  authors: AuthorInfo[];
  // authors: string;
  url: string;
  doi: string;
  volume: string;
  pageNo: string;
  lastPage: string;
  editor: string;
  publisher: string;
  issues: string;
}

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

interface AcademicInfo {
  orcidId: string;
  scopusId: string;
  researcherId: string;
  googleScholarId: string;
  vidwanId: string;
}

interface SeminarTrainingInformation {
  actType: string;
  title: string;
  orgBy: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
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

const CustomAccordion1 = ({
  formTitle,
  item,
  index,
  length,
  handleSubmit, // Pass onSubmit prop
  setPersonalInfo, // Pass setPersonalInfo prop
  isApiHit,
}: {
  item: PersonalInfo;
  index: number;
  length: number;
  formTitle: string;
  isApiHit: boolean;
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: PersonalInfo
  ) => Promise<void>;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>; // Define the setPersonalInfo function type
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
          <PersonalInformation
            item={item}
            handleSubmit={handleSubmit}
            setPersonalInfo={setPersonalInfo} // Pass setPersonalInfo prop
            isApiHit={isApiHit}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

// Custom Accordian for expertise
const CustomAccordion2 = ({
  formTitle,
  item,
  index,
  length,
  handleExpertiseSubmit, // Pass onSubmit prop
  setExpertise, // Pass setPersonalInfo prop
  isApiHit,
}: {
  item: ExpertiseSection;
  index: number;
  length: number;
  formTitle: string;
  isApiHit: boolean;
  handleExpertiseSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: ExpertiseSection
  ) => Promise<void>;
  setExpertise: React.Dispatch<React.SetStateAction<ExpertiseSection>>; // Define the setPersonalInfo function type
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
          <Expertise
            item={item}
            handleExpertiseSubmit={handleExpertiseSubmit}
            setExpertise={setExpertise} // Pass setPersonalInfo prop
            isApiHit={isApiHit}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

// Custom Accordian for Contact Information
const CustomAccordion3 = ({
  formTitle,
  item,
  index,
  length,
  handleContactInfoSubmit, // Pass onSubmit prop
  setContactInfo, // Pass setPersonalInfo prop
  isApiHit,
}: {
  item: ContactInformation;
  index: number;
  length: number;
  formTitle: string;
  isApiHit: boolean;
  handleContactInfoSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: ContactInformation
  ) => Promise<void>;
  setContactInfo: React.Dispatch<React.SetStateAction<ContactInformation>>; // Define the setPersonalInfo function type
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
          <ContactInfo
            item={item}
            handleContactInfoSubmit={handleContactInfoSubmit}
            setContactInfo={setContactInfo} // Pass setPersonalInfo prop
            isApiHit={isApiHit}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

// Custom Accordian for Experience section
const CustomAccordion4 = ({
  formTitle,
  item,
  index,
  length,
  handleExperienceInfoSubmit, // Pass onSubmit prop
  setExperience, // Pass setPersonalInfo prop
  isApiHit,
  experienceData,
}: {
  item: ExperienceInformation;
  index: number;
  length: number;
  formTitle: string;
  isApiHit: boolean;
  experienceData: ExperienceInformation[];
  handleExperienceInfoSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: ExperienceInformation
  ) => Promise<void>;
  setExperience: React.Dispatch<React.SetStateAction<ExperienceInformation>>; // Define the setPersonalInfo function type
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
          <ExperienceSection
            item={item}
            handleExperienceInfoSubmit={handleExperienceInfoSubmit}
            setExperience={setExperience} // Pass setPersonalInfo prop
            isApiHit={isApiHit}
            experienceData={experienceData}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

// Custom Accordian for Experience section
const CustomAccordion5 = ({
  formTitle,
  item,
  index,
  length,
  handleEducationInfoSubmit, // Pass onSubmit prop
  setEducation, // Pass setPersonalInfo prop
  isApiHit,
  educationData,
}: {
  item: EducationInformation;
  index: number;
  length: number;
  formTitle: string;
  isApiHit: boolean;
  educationData: EducationInformation[];
  handleEducationInfoSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: EducationInformation
  ) => Promise<void>;
  setEducation: React.Dispatch<React.SetStateAction<EducationInformation>>; // Define the setPersonalInfo function type
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
          <EducationSection
            item={item}
            handleEducationInfoSubmit={handleEducationInfoSubmit}
            setEducation={setEducation} // Pass setPersonalInfo prop
            isApiHit={isApiHit}
            educationData={educationData}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

//Custom Accordian for Honours and Awards

const CustomAccordion6 = ({
  formTitle,
  item,
  index,
  length,
  handleHonoursAndAwardSubmit, // Pass onSubmit prop
  setHonoursAndAwards, // Pass setPersonalInfo prop
  isApiHit,
  honoursAndAwardData,
}: {
  item: HonoursAndAwardsInfo;
  index: number;
  length: number;
  formTitle: string;
  isApiHit: boolean;
  honoursAndAwardData: HonoursAndAwardsInfo[];
  handleHonoursAndAwardSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: HonoursAndAwardsInfo
  ) => Promise<void>;
  setHonoursAndAwards: React.Dispatch<
    React.SetStateAction<HonoursAndAwardsInfo>
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
          <HonoursAndAwardSection
            item={item}
            handleHonoursAndAwardSubmit={handleHonoursAndAwardSubmit}
            setHonoursAndAwards={setHonoursAndAwards} // Pass setPersonalInfo prop
            isApiHit={isApiHit}
            honoursAndAwardData={honoursAndAwardData}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

//Custom Accordian for Theses Guided
const CustomAccordion7 = ({
  formTitle,
  item,
  index,
  length,
  handleDoctoralThesesSubmit, // Pass onSubmit prop
  setDoctoralTheses, // Pass setPersonalInfo prop
  isApiHit,
  doctoralThesesData, // paas the data for mapping in sub component you will get data in array
}: {
  item: DoctoralThesesInfo;
  index: number;
  length: number;
  formTitle: string;
  isApiHit: boolean;
  doctoralThesesData: DoctoralThesesInfo[];
  handleDoctoralThesesSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: DoctoralThesesInfo
  ) => Promise<void>;
  setDoctoralTheses: React.Dispatch<React.SetStateAction<DoctoralThesesInfo>>; // Define the setPersonalInfo function type
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
          <DoctorThesesSection
            item={item}
            handleDoctoralThesesSubmit={handleDoctoralThesesSubmit}
            setDoctoralTheses={setDoctoralTheses} // Pass setPersonalInfo prop
            isApiHit={isApiHit}
            doctoralThesesData={doctoralThesesData}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

//Custom Accordian for Membership in Professional Bodies
const CustomAccordion8 = ({
  formTitle,
  item,
  index,
  length,
  handleProfessionalMembershipsSubmit, // Pass onSubmit prop
  setProfessionalMemberships, // Pass setPersonalInfo prop
  isApiHit,
  professionalMembershipsData,
}: {
  item: ProfessionalMembershipsInfo;
  index: number;
  length: number;
  formTitle: string;
  isApiHit: boolean;
  professionalMembershipsData: ProfessionalMembershipsInfo[];
  handleProfessionalMembershipsSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: ProfessionalMembershipsInfo
  ) => Promise<void>;
  setProfessionalMemberships: React.Dispatch<
    React.SetStateAction<ProfessionalMembershipsInfo>
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
          <ProfessionalBodies
            item={item}
            handleProfessionalMembershipsSubmit={
              handleProfessionalMembershipsSubmit
            }
            setProfessionalMemberships={setProfessionalMemberships} // Pass setPersonalInfo prop
            isApiHit={isApiHit}
            professionalMembershipsData={professionalMembershipsData}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

//Custom Accordian for Membership in Committees
const CustomAccordion9 = ({
  formTitle,
  item,
  index,
  length,
  handleCommitteeMembershipsSubmit, // Pass onSubmit prop
  setCommitteeMemberships, // Pass setPersonalInfo prop
  isApiHit,
  committeeMembershipsData,
}: {
  item: CommitteeMembershipsInfo;
  index: number;
  length: number;
  formTitle: string;
  isApiHit: boolean;
  committeeMembershipsData: CommitteeMembershipsInfo[];
  handleCommitteeMembershipsSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: CommitteeMembershipsInfo
  ) => Promise<void>;
  setCommitteeMemberships: React.Dispatch<
    React.SetStateAction<CommitteeMembershipsInfo>
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
          <CommitteesSection
            item={item}
            handleCommitteeMembershipsSubmit={handleCommitteeMembershipsSubmit}
            setCommitteeMemberships={setCommitteeMemberships} // Pass setPersonalInfo prop
            isApiHit={isApiHit}
            committeeMembershipsData={committeeMembershipsData}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

//Custom Accordian for Research Projects
const CustomAccordion10 = ({
  formTitle,
  item,
  index,
  length,
  handleResearchProjectsSubmit, // Pass onSubmit prop
  setResearchProjects, // Pass setPersonalInfo prop
  isApiHit,
  researchProjectsData,
}: {
  item: ResearchProjectsInfo;
  index: number;
  length: number;
  formTitle: string;
  isApiHit: boolean;
  researchProjectsData: ResearchProjectsInfo[];
  handleResearchProjectsSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: ResearchProjectsInfo
  ) => Promise<void>;
  setResearchProjects: React.Dispatch<
    React.SetStateAction<ResearchProjectsInfo>
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
          <ResearchProjectsSection
            item={item}
            handleResearchProjectsSubmit={handleResearchProjectsSubmit}
            setResearchProjects={setResearchProjects} // Pass setPersonalInfo prop
            isApiHit={isApiHit}
            researchProjectsData={researchProjectsData}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

//Custom Accordian for Patent
const CustomAccordion11 = ({
  formTitle,
  item,
  index,
  length,
  handlePatentsSubmit, // Pass onSubmit prop
  setPatents, // Pass setPersonalInfo prop
  isApiHit,
  patentsData,
}: {
  item: PatentInfo;
  index: number;
  length: number;
  formTitle: string;
  isApiHit: boolean;
  patentsData: PatentInfo[];
  handlePatentsSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: PatentInfo
  ) => Promise<void>;
  setPatents: React.Dispatch<React.SetStateAction<PatentInfo>>; // Define the setPersonalInfo function type
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
          <PatentSection
            item={item}
            handlePatentsSubmit={handlePatentsSubmit}
            setPatents={setPatents} // Pass setPersonalInfo prop
            isApiHit={isApiHit}
            patentsData={patentsData}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

//Custom Accordian for Publications
const CustomAccordion12 = ({
  formTitle,
  item,
  index,
  length,
  handlePublicationsSubmit, // Pass onSubmit prop
  setPublications, // Pass setPersonalInfo prop
  isApiHit,
  publicationsData,
}: {
  item: PublicationsInfo;
  index: number;
  length: number;
  formTitle: string;
  isApiHit: boolean;
  publicationsData: PublicationsInfo[];
  handlePublicationsSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: PublicationsInfo
  ) => Promise<void>;
  setPublications: React.Dispatch<React.SetStateAction<PublicationsInfo>>; // Define the setPersonalInfo function type
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
          <PublicationSection
            item={item}
            handlePublicationsSubmit={handlePublicationsSubmit}
            setPublications={setPublications} // Pass setPersonalInfo prop
            isApiHit={isApiHit}
            publicationsData={publicationsData}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

//Custom Accordian for Academic Identity

const CustomAccordion13 = ({
  formTitle,
  item,
  index,
  length,
  handleAcademicSubmit, // Pass onSubmit prop
  setAcademicInfo, // Pass setPersonalInfo prop
  isApiHit,
}: {
  item: AcademicInfo;
  index: number;
  length: number;
  formTitle: string;
  isApiHit: boolean;
  handleAcademicSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: AcademicInfo
  ) => Promise<void>;
  setAcademicInfo: React.Dispatch<React.SetStateAction<AcademicInfo>>; // Define the setPersonalInfo function type
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
          <AcademicSection
            item={item}
            handleAcademicSubmit={handleAcademicSubmit}
            setAcademicInfo={setAcademicInfo} // Pass setPersonalInfo prop
            isApiHit={isApiHit}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

// Custom Accordian for Seminar & Training section
const CustomAccordion14 = ({
  formTitle,
  item,
  index,
  length,
  handleSeminarTrainingInfoSubmit, // Pass onSubmit prop
  setSeminarTraining, // Pass setPersonalInfo prop
  isApiHit,
  seminarTrainingData,
}: {
  item: SeminarTrainingInformation;
  index: number;
  length: number;
  formTitle: string;
  isApiHit: boolean;
  seminarTrainingData: SeminarTrainingInformation[];
  handleSeminarTrainingInfoSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    formData: SeminarTrainingInformation
  ) => Promise<void>;
  setSeminarTraining: React.Dispatch<
    React.SetStateAction<SeminarTrainingInformation>
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
          <SeminarTraining
            item={item}
            handleSeminarTrainingInfoSubmit={handleSeminarTrainingInfoSubmit}
            setSeminarTraining={setSeminarTraining} // Pass setPersonalInfo prop
            isApiHit={isApiHit}
            seminarTrainingData={seminarTrainingData}
          />
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

const OtherDetails = () => {
  const [dataLoading, setDataLoading] = useState<boolean>(true);
  const [isApiHit, setIsApiHit] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const [activeTab, setactiveTab] = useState<string>("activity");
  const [resumeData, setResumeData] = useState<ResumeData>();
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    title: "",
    name: "",
    designation: "",
    employeeid: "",
    dob: "",
    doj: "",
    gender: "",
    image: "",
  });
  const [expertise, setExpertise] = useState<ExpertiseSection>({
    expertise: "",
    briefInfo: "",
    subject: "",
  });
  const [contactInfo, setContactInfo] = useState<ContactInformation>({
    mobileNumber: "",
    emailid: "",
    country: "",
    state: "",
    city: "",
    zip: "",
  });

  const [experience, setExperience] = useState<ExperienceInformation>({
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

  const [experienceData, setExperienceData] = useState([]);

  const [education, setEducation] = useState<EducationInformation>({
    qualification: "",
    institute: "",
    subject: "",
    degree: "",
    passingYear: "",
  });

  const [educationData, setEducationData] = useState([]);

  const [honoursAndAwards, setHonoursAndAwards] =
    useState<HonoursAndAwardsInfo>({
      year: "",
      awardName: "",
      awardedBy: "",
    });

  const [honoursAndAwardData, setHonoursAndAwardData] = useState([]);

  const [doctoralTheses, setDoctoralTheses] = useState<DoctoralThesesInfo>({
    researcherName: "",
    role: "",
    title: "",
    institute: "",
    batch: "",
    awardedYear: "",
  });
  const [doctoralThesesData, setDoctoralThesesData] = useState([]);

  const [professionalMemberships, setProfessionalMemberships] =
    useState<ProfessionalMembershipsInfo>({
      bodyName: "",
      employeeId: "",
      memberType: "",
      awardedYear: "",
    });
  const [professionalMembershipsData, setProfessionalMembershipsData] =
    useState([]);

  const [committeeMemberships, setCommitteeMemberships] =
    useState<CommitteeMembershipsInfo>({
      committeeName: "",
      role: "",
      year: "",
      endYear: "",
      currentlyWorking: false,
    });
  const [committeeMembershipsData, setCommitteeMembershipsData] = useState([]);

  const [researchProjects, setResearchProjects] =
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
  const [researchProjectsData, setResearchProjectsData] = useState([]);

  const [patents, setPatents] = useState<PatentInfo>({
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
  const [patentsData, setPatentsData] = useState([]);

  const [publications, setPublications] = useState<PublicationsInfo>({
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
  const [publicationsData, setPublicationsData] = useState([]);

  const [academicInfo, setAcademicInfo] = useState<AcademicInfo>({
    orcidId: "",
    scopusId: "",
    researcherId: "",
    googleScholarId: "",
    vidwanId: "",
  });

  const [seminar, setSeminarTraining] = useState<SeminarTrainingInformation>({
    actType: "",
    title: "",
    orgBy: "",
    startDate: "",
    endDate: "",
    currentlyWorking: false,
  });

  const [seminarTrainingData, setseminarTrainingData] = useState([]);

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
        setResumeData(data?.data[0]);
        setPersonalInfo(data?.data[0]?.personalInfo);
        setExpertise(data?.data[0]?.expertise);
        setContactInfo(data?.data[0]?.contactInfo);
        setExperienceData(data?.data[0]?.experience);
        setEducationData(data?.data[0]?.education);
        setHonoursAndAwardData(data?.data[0]?.honoursAndAwards);
        setDoctoralThesesData(data?.data[0]?.doctoralTheses);
        setProfessionalMembershipsData(data?.data[0]?.professionalMemberships);
        setCommitteeMembershipsData(data?.data[0]?.committeeMemberships);
        setResearchProjectsData(data?.data[0]?.researchProjects);
        setPatentsData(data?.data[0]?.patents);
        setPublicationsData(data?.data[0]?.publications);
        setAcademicInfo(data?.data[0]?.academicIdentity);
        setseminarTrainingData(data?.data[0]?.seminar);
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

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    personalInfo: PersonalInfo
  ) => {
    event.preventDefault();
    const { title, name, designation, employeeid, dob, doj, gender, image } =
      personalInfo;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("title", title);
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("employeeid", employeeid);
    formData.append("dob", dob);
    formData.append("doj", doj);
    formData.append("gender", gender);
    if (image) {
      formData.append("image", image);
    }

    const bodyData = { personalInfo };

    const section = "personalInfo";

    try {
      setIsApiHit(true);
      const response = await fetch(
        `${API_BASE_URL}/api/update/doctor/${profileId}/${Key_Key}/${section}`,

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

  const handleExpertiseSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    expertiseInfo: ExpertiseSection
  ) => {
    event.preventDefault();
    const { expertise, briefInfo, subject } = expertiseInfo;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("expertise", expertise);
    formData.append("briefInfo", briefInfo);
    formData.append("subject", subject);

    const section = "expertise";

    try {
      setIsApiHit(true);
      const response = await fetch(
        `${API_BASE_URL}/api/update/doctor/${profileId}/${Key_Key}/${section}`,

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

  const handleContactInfoSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    contactInfos: ContactInformation
  ) => {
    event.preventDefault();
    const { mobileNumber, emailid, country, state, city, zip } = contactInfos;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("mobileNumber", mobileNumber);
    formData.append("emailid", emailid);
    formData.append("country", country);
    formData.append("state", state);
    formData.append("city", city);
    formData.append("zip", zip);

    const section = "contactInfo";

    try {
      setIsApiHit(true);
      const response = await fetch(
        `${API_BASE_URL}/api/update/doctor/${profileId}/${Key_Key}/${section}`,

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

  const handleExperienceInfoSubmit = async (
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

  const handleEducationInfoSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    educationInfo: EducationInformation
  ) => {
    event.preventDefault();
    const { qualification, institute, subject, degree, passingYear } =
      educationInfo;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("qualification", qualification);
    formData.append("institute", institute);
    formData.append("subject", subject);
    formData.append("degree", degree);
    formData.append("passingYear", passingYear);

    const section = "education";

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

  const handleHonoursAndAwardSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    honoursAward: HonoursAndAwardsInfo
  ) => {
    event.preventDefault();
    const { year, awardName, awardedBy } = honoursAward;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("year", year);
    formData.append("awardName", awardName);
    formData.append("awardedBy", awardedBy);

    const section = "honoursAndAwards";

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

  const handleDoctoralThesesSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    doctoralThesesInfo: DoctoralThesesInfo
  ) => {
    event.preventDefault();
    const { researcherName, role, title, institute, batch, awardedYear } =
      doctoralThesesInfo;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("researcherName", researcherName);
    formData.append("role", role);
    formData.append("title", title);
    formData.append("institute", institute);
    formData.append("batch", batch);
    formData.append("awardedYear", awardedYear);

    const section = "doctoralTheses";

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

  const handleProfessionalMembershipsSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    professionalInfo: ProfessionalMembershipsInfo
  ) => {
    event.preventDefault();
    const { bodyName, memberType, awardedYear, employeeId } = professionalInfo;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("bodyName", bodyName);
    formData.append("employeeId", employeeId);
    formData.append("memberType", memberType);
    formData.append("awardedYear", awardedYear);

    const section = "professionalMemberships";

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

  const handleCommitteeMembershipsSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    committeeInfo: CommitteeMembershipsInfo
  ) => {
    event.preventDefault();
    const { committeeName, role, year, endYear } = committeeInfo;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("committeeName", committeeName);
    formData.append("role", role);
    formData.append("year", year);
    formData.append("endYear", endYear);

    const section = "committeeMemberships";

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

  const handleResearchProjectsSubmit = async (
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
    formData.append("endDate", endDate);
    formData.append("ongoing", ongoing.toString());
    formData.append("role", role);
    formData.append("fundingAgency", fundingAgency);
    formData.append("grantNo", grantNo);
    formData.append("status", status);
    formData.append("amount", amount);

    const section = "researchProjects";

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

  const handlePatentsSubmit = async (
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

  const handlePublicationsSubmit = async (
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

  // handle Academic Identity submit

  const handleAcademicSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    academicInfo: AcademicInfo
  ) => {
    event.preventDefault();
    const { orcidId, scopusId, researcherId, googleScholarId, vidwanId } =
      academicInfo;
    const formData = new FormData(); // append every thing one by one inside this form data
    formData.append("orcidId", orcidId);
    formData.append("scopusId", scopusId);
    formData.append("researcherId", researcherId);
    formData.append("googleScholarId", googleScholarId);
    formData.append("vidwanId", vidwanId);

    const section = "academicIdentity";

    try {
      setIsApiHit(true);
      const response = await fetch(
        `${API_BASE_URL}/api/update/doctor/${profileId}/${Key_Key}/${section}`,

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

  const handleSeminarTrainingInfoSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    seminarInfo: SeminarTrainingInformation
  ) => {
    event.preventDefault();
    const { actType, title, orgBy, startDate, endDate, currentlyWorking } =
      seminarInfo;
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
        alert("Activity Updated Successfully");
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
        {/* <Col
          lg={12}
          className="d-flex justify-content-between align-items-center"
        >
          <h5 className="header-title mb-3 mt-0">Doctor Profile</h5>
          <Button className="mb-3 mt-0" variant="primary">
            <i className="bi-file-earmark-pdf me-1"></i>
            Download
          </Button>
        </Col> */}

        {resumeData ? (
          <DownloadResume resumeData={resumeData} />
        ) : (
          <div>Loading or No data available</div>
        )}
        {/* <DownloadResume resumeData={resumeData} /> */}

        <Accordion
          // defaultActiveKey="0"
          id="accordion"
          className="custom-accordionwitharrow"
          // style={{ border: "2px solid red" }}
        >
          <>
            {/* Accordian for personal information  */}
            <CustomAccordion1
              key={0}
              formTitle={"Personal Information"}
              item={personalInfo}
              index={0}
              length={12}
              handleSubmit={handleSubmit}
              setPersonalInfo={setPersonalInfo}
              isApiHit={isApiHit}
            />

            {/* Accordian for expertise */}
            <CustomAccordion2
              key={1}
              formTitle={"Expertise"}
              item={expertise}
              index={1}
              length={12}
              handleExpertiseSubmit={handleExpertiseSubmit}
              setExpertise={setExpertise}
              isApiHit={isApiHit}
            />

            {/* Accordian for Contact Information */}
            <CustomAccordion3
              key={2}
              formTitle={"Contact Information"}
              item={contactInfo}
              index={2}
              length={12}
              handleContactInfoSubmit={handleContactInfoSubmit}
              setContactInfo={setContactInfo}
              isApiHit={isApiHit}
            />

            {/* Accordian for Experience Section */}
            <CustomAccordion4
              key={3}
              formTitle={"Experience"}
              item={experience}
              index={3}
              length={12}
              handleExperienceInfoSubmit={handleExperienceInfoSubmit}
              setExperience={setExperience}
              isApiHit={isApiHit}
              experienceData={experienceData}
            />

            {/* Accordian for Education Section */}
            <CustomAccordion5
              key={4}
              formTitle={"Educational Qualification"}
              item={education}
              index={4}
              length={12}
              handleEducationInfoSubmit={handleEducationInfoSubmit}
              setEducation={setEducation}
              isApiHit={isApiHit}
              educationData={educationData}
            />

            {/* Accordian for Honours and Awards Section */}
            <CustomAccordion6
              key={5}
              formTitle={"Honours and Awards"}
              item={honoursAndAwards}
              index={5}
              length={12}
              handleHonoursAndAwardSubmit={handleHonoursAndAwardSubmit}
              setHonoursAndAwards={setHonoursAndAwards}
              isApiHit={isApiHit}
              honoursAndAwardData={honoursAndAwardData}
            />

            {/* Accordian for Doctor Theses Section */}
            <CustomAccordion7
              key={6}
              formTitle={"Thesis Guided"}
              item={doctoralTheses}
              index={6}
              length={12}
              handleDoctoralThesesSubmit={handleDoctoralThesesSubmit}
              setDoctoralTheses={setDoctoralTheses}
              isApiHit={isApiHit}
              doctoralThesesData={doctoralThesesData}
            />

            {/* Accordian for Professional Boddies Section */}
            <CustomAccordion8
              key={7}
              formTitle={"Membership in Professional Bodies"}
              item={professionalMemberships}
              index={7}
              length={12}
              handleProfessionalMembershipsSubmit={
                handleProfessionalMembershipsSubmit
              }
              setProfessionalMemberships={setProfessionalMemberships}
              isApiHit={isApiHit}
              professionalMembershipsData={professionalMembershipsData}
            />

            {/* Accordian for Membership in Committees Section */}
            <CustomAccordion9
              key={8}
              formTitle={"Membership in Committees"}
              item={committeeMemberships}
              index={8}
              length={12}
              handleCommitteeMembershipsSubmit={
                handleCommitteeMembershipsSubmit
              }
              setCommitteeMemberships={setCommitteeMemberships}
              isApiHit={isApiHit}
              committeeMembershipsData={committeeMembershipsData}
            />

            {/* Accordian for Research Projects Section */}
            <CustomAccordion10
              key={9}
              formTitle={"Research Projects"}
              item={researchProjects}
              index={9}
              length={12}
              handleResearchProjectsSubmit={handleResearchProjectsSubmit}
              setResearchProjects={setResearchProjects}
              isApiHit={isApiHit}
              researchProjectsData={researchProjectsData}
            />

            {/* Accordian for Patent Section */}
            <CustomAccordion11
              key={10}
              formTitle={"Patent"}
              item={patents}
              index={10}
              length={12}
              handlePatentsSubmit={handlePatentsSubmit}
              setPatents={setPatents}
              isApiHit={isApiHit}
              patentsData={patentsData}
            />

            {/* Accordian for Publications Section */}
            <CustomAccordion12
              key={11}
              formTitle={"Publications"}
              item={publications}
              index={11}
              length={12}
              handlePublicationsSubmit={handlePublicationsSubmit}
              setPublications={setPublications}
              isApiHit={isApiHit}
              publicationsData={publicationsData}
            />

            {/* Accordian for Academic Identity  */}
            <CustomAccordion13
              key={12}
              formTitle={"Academic Identity "}
              item={academicInfo}
              index={12}
              length={12}
              handleAcademicSubmit={handleAcademicSubmit}
              setAcademicInfo={setAcademicInfo}
              isApiHit={isApiHit}
            />

            {/* Accordian for Experience Section */}
            <CustomAccordion14
              key={3}
              formTitle={"Seminar & training"}
              item={seminar}
              index={13}
              length={12}
              handleSeminarTrainingInfoSubmit={handleSeminarTrainingInfoSubmit}
              setSeminarTraining={setSeminarTraining}
              isApiHit={isApiHit}
              seminarTrainingData={seminarTrainingData}
            />
          </>
        </Accordion>
        {/* )} */}
      </Card.Body>
    </Card>
  );
};

export default OtherDetails;
