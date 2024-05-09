import React, { useContext, useState } from "react";
import {
  Card,
  Tab,
  Nav,
  Accordion,
  useAccordionButton,
  AccordionContext,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";

// components
import Activity from "./Activity";
import Messages from "./Messages";
import Projects from "./Projects";
import Tasks from "./Tasks";
import Files from "./Files";

// dummy data
import { projects } from "../../../apps/Projects/data";
import { todayTasks, upcomingTasks } from "../../../apps/Tasks/List/data";

import { activityTimeline, messages, files } from "./data";
import BasicForm from "./BasicForm";
import DynamicForm from "./DynamicForm";

interface Field {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  options?: { value: string; label: string }[];
}
interface ContentType {
  id: number;
  formtitle: string;
  icon?: string;
  text?: string;
  formData?: Object;
  personalInfo?: Object;
  expertise?: Object;
  contactInfo?: Object;
  experience?: Array<Object>;
  education?: Array<Object>;
  honoursAndAwards?: Array<Object>;
  doctoralTheses?: Array<Object>;
  professionalMemberships?: Array<Object>;
  committeeMemberships?: Array<Object>;
  researchProjects?: Array<Object>;
  patents?: Array<Object>;
  publications?: Array<Object>;
  objectKey?: string;
  fields?: Field[] | undefined;
}

interface CustomToggleProps {
  children: any;
  eventKey: string;
  containerClass: string;
  linkClass: string;
  callback?: any;
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
  item,
  index,
  length,
}: {
  item: ContentType;
  index: number;
  length: number;
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
        <span className="float-start">
          <i className="uil uil-angle-down float-end accordion-arrow"></i>
        </span>
        {item?.formtitle}
        <span className="float-end">Add/Edit</span>
        <i className="uil uil-angle-down float-end accordion-arrow"></i>
      </CustomToggle>
      <Accordion.Collapse eventKey={String(index)}>
        <Card.Body className="text-muted">
          <DynamicForm item={item} />
          {/* <BasicForm item={item} /> */}
          {/* {item.text} */}
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
};

const OtherDetails = () => {
  const [activeTab, setactiveTab] = useState<string>("activity");

  /**
   * handles tab activation
   * @param eventKey currently active tab
   */
  const handleSelect = (eventKey: string | null) => {
    setactiveTab(eventKey!);
  };

  const accordianContent: ContentType[] = [
    {
      id: 1,
      formtitle: "Personal Information",

      objectKey: "personalInfo",
      fields: [
        {
          label: "Name",
          name: "personalInfo.name",
          type: "text",
          placeholder: "Enter Name",
        },
        {
          label: "Designation",
          name: "personalInfo.designation",
          type: "text",
          placeholder: "Enter Designation",
        },
        {
          label: "Employee I'd / Biometric I'd",
          name: "personalInfo.employeeid",
          type: "text",
          placeholder: "Enter Employee I'd / Biometric I'd",
        },
        {
          label: "Date of Birth",
          name: "personalInfo.dob",
          type: "date",
          placeholder: "Date of Birth",
        },
        {
          label: "Date of Joining",
          name: "personalInfo.dob",
          type: "date",
          placeholder: "Date of Joining",
        },
        {
          label: "Gender",
          name: "personalInfo.gender",
          type: "text",
          placeholder: "Gender",
        },
      ],
    },
    {
      id: 2,
      formtitle: "Expertise",
      objectKey: "expertise",
      fields: [
        // {
        //   label: "WOSsubject",
        //   name: "expertise.WOSsubject",
        //   type: "text",
        //   placeholder: "Enter WOS Subject",
        // },
        {
          label: "Expertise",
          name: "expertise.expertise",
          type: "text",
          placeholder: "Enter Expertise",
        },
        {
          label: "Brief Info",
          name: "expertise.briefInfo",
          type: "text",
          placeholder: "Enter Brief Info",
        },
      ],
    },

    {
      id: 3,
      formtitle: "Contact Information",
      objectKey: "contactInfo",
      fields: [
        {
          label: "Mobile Number",
          name: "contactInfo.mobileNumber",
          type: "text",
          placeholder: "Date of Birth",
        },
        // {
        //   label: "Phone Number",
        //   name: "contactInfo.phoneNumber",
        //   type: "text",
        //   placeholder: "Date of Joining",
        // },
        // {
        //   label: "Web URL",
        //   name: "contactInfo.webURL",
        //   type: "text",
        //   placeholder: "Enter WebURL",
        // },
        {
          label: "Email id",
          name: "contactInfo.emailid",
          type: "text",
          placeholder: "Enter Email id",
        },
        {
          label: "Country",
          name: "contactInfo.country",
          type: "text",
          placeholder: "Enter country",
        },
        {
          label: "State",
          name: "contactInfo.state",
          type: "text",
          placeholder: "Enter state",
        },
        {
          label: "City",
          name: "contactInfo.city",
          type: "text",
          placeholder: "Enter city",
        },
        {
          label: "Zip",
          name: "contactInfo.zip",
          type: "text",
          placeholder: "Enter zip",
        },
      ],
    },
    {
      id: 4,
      formtitle: "Experience",
      objectKey: "experience",

      fields: [
        {
          label: "Institute",
          name: "experience.organization",
          type: "text",
          placeholder: "Enter Organisation",
        },
        {
          label: "Department",
          name: "experience.department",
          type: "text",
          placeholder: "Enter Department",
        },
        {
          label: "Organisation Type",
          name: "experience.orgType",
          type: "select",
          placeholder: "Enter Organisation Type",
          options: [
            { value: "government", label: "Government" },
            { value: "private", label: "Private" },
            { value: "autonomous", label: "Autonomous" },
            { value: "others", label: "Others" },
          ],
        },
        {
          label: "Organisation Url",
          name: "experience.orgURL",
          type: "text",
          placeholder: "Enter Organisation URL",
        },
        {
          label: "District",
          name: "experience.district",
          type: "text",
          placeholder: "Enter District",
        },
        // {
        //   label: "ISNI",
        //   name: "experience.isni",
        //   type: "text",
        //   placeholder: "Ex. 0000 0001 0153 2859",
        // },
        {
          label: "Designation",
          name: "experience.designation",
          type: "text",
          placeholder: "Enter Designation",
        },
        {
          label: "Start Date",
          name: "experience.startDate",
          type: "text",
          placeholder: "Enter Start Date",
        },
        {
          label: "End Date",
          name: "experience.endDate",
          type: "text",
          placeholder: "Enter End Date",
        },
        {
          label: "I currently work here",
          name: "experience.currentlyWorking",
          type: "checkbox",
          placeholder: "",
        },
      ],
    },
    {
      id: 5,
      formtitle: "Education Qualification",
      objectKey: "education",
      fields: [
        {
          label: "Qualification",
          name: "education.qualification",
          type: "text",
          placeholder: "Ex:Ph.D",
        },
        {
          label: "Institute",
          name: "education.institute",
          type: "text",
          placeholder: "Enter Department",
        },
        {
          label: "Organisation Type",
          name: "education.subject",
          type: "text",
          placeholder: "Enter Organisation Type",
        },
        {
          label: "Passing Year",
          name: "education.passingYear",
          type: "text",
          placeholder: "Enter Passing Year",
        },
      ],
    },
    {
      id: 6,
      formtitle: "Honours and Awards",
      objectKey: "honoursAndAwards",

      fields: [
        {
          label: "Awarded year",
          name: "honoursAndAwards.year",
          type: "text",
          placeholder: "Year",
        },
        {
          label: "Award name",
          name: "honoursAndAwards.awardName",
          type: "text",
          placeholder: "Awards and Honours",
        },
        {
          label: "Awarded by",
          name: "honoursAndAwards.awardedBy",
          type: "text",
          placeholder: "Awards By",
        },
      ],
    },
    {
      id: 7,
      formtitle: "Theses Guided",
      objectKey: "doctoralTheses",
      fields: [
        {
          label: "Name",
          name: "doctoralTheses.researcherName",
          type: "text",
          placeholder: "Enter Researcher's Name",
        },
        {
          label: "Theses Title",
          name: "doctoralTheses.title",
          type: "text",
          placeholder: "Enter Theses Title",
        },
        {
          label: "Institute",
          name: "doctoralTheses.institute",
          type: "text",
          placeholder: "Enter Theses Award Institute",
        },
        {
          label: "Batch/Semester",
          name: "doctoralTheses.batch",
          type: "text",
          placeholder: "Enter Batch/Semester Name",
        },
        {
          label: "Year",
          name: "doctoralTheses.awardedYear",
          type: "text",
          placeholder: "Awards By",
        },
      ],
    },
    {
      id: 8,
      formtitle: "Membership in Professional Bodies",
      objectKey: "professionalMemberships",

      fields: [
        {
          label: "Name",
          name: "professionalMemberships.bodyName",
          type: "text",
          placeholder: "Enter Professional Body Name",
        },
        {
          label: "Member type",
          name: "professionalMemberships.memberType",
          type: "text",
          placeholder: "Member type",
        },
        {
          label: "Year",
          name: "professionalMemberships.awardedYear",
          type: "text",
          placeholder: "Year",
        },
      ],
    },
    {
      id: 9,
      formtitle: "Membership in Committees",
      objectKey: "committeeMemberships",

      fields: [
        {
          label: "Name",
          name: "committeeMemberships.committeeName",
          type: "text",
          placeholder: "Enter Name of the Committee",
        },
        {
          label: "Designation",
          name: "committeeMemberships.role",
          type: "text",
          placeholder: "Enter Designation",
        },
        {
          label: "Year",
          name: "committeeMemberships.year",
          type: "text",
          placeholder: "Year",
        },
      ],
    },
    {
      id: 10,
      formtitle: "Research Projects",
      objectKey: "researchProjects",

      fields: [
        {
          label: "Title of the Project",
          name: "researchProjects.title",
          type: "text",
          placeholder: "Title of the Project",
        },
        {
          label: "Start date",
          name: "researchProjects.startDate",
          type: "date",
          placeholder: "Start date",
        },
        {
          label: "End date",
          name: "researchProjects.endDate",
          type: "date",
          placeholder: "End date",
        },
        {
          label: "Ongoing",
          name: "researchProjects.ongoing",
          type: "checkbox",
          placeholder: "",
        },
        {
          label: "Role",
          name: "researchProjects.role",
          type: "text",
          placeholder: "Enter Role",
        },
        {
          label: "Funding agency",
          name: "researchProjects.fundingAgency",
          type: "text",
          placeholder: "Enter Funding Agency",
        },
        {
          label: "Grant No.",
          name: "researchProjects.grantNo",
          type: "text",
          placeholder: "Enter Grant No.",
        },
        {
          label: "Status",
          name: "researchProjects.status",
          type: "text",
          placeholder: "Ongoing/completed",
        },
        {
          label: "Amount",
          name: "researchProjects.amount",
          type: "text",
          placeholder: "Enter Amount",
        },
      ],
    },
    {
      id: 11,
      formtitle: "Patent",
      objectKey: "patents",

      fields: [
        {
          label: "Title of the Patent",
          name: "patents.title",
          type: "text",
          placeholder: "Title of the Patent",
        },
        {
          label: "Inventor(s)",
          name: "patents.inventors",
          type: "text",
          placeholder: "Patent Creator(s)",
        },
        {
          label: "Applicant Name",
          name: "patents.applicantName",
          type: "text",
          placeholder: "Person Name/ Organisation Name",
        },
        {
          label: "Application Number",
          name: "patents.applicationNumber",
          type: "text",
          placeholder: "Application Number",
        },
        {
          label: "Patent Number",
          name: "patents.patentNumber",
          type: "text",
          placeholder: "Patent Number",
        },
        {
          label: "Filing Country",
          name: "patents.country",
          type: "text",
          placeholder: "Enter country",
        },
        {
          label: "Subject Category",
          name: "patents.subjectCategory",
          type: "text",
          placeholder: "Enter Category",
        },
        {
          label: "Filing Date",
          name: "patents.fillingDate",
          type: "date",
          placeholder: "Filing Date",
        },
        {
          label: "Publication Date",
          name: "patents.publicationDate",
          type: "date",
          placeholder: "Publication Date",
        },
        {
          label: "Status",
          name: "patents.status",
          type: "text",
          placeholder: "Filed/Published/Granted",
        },
      ],
    },
    {
      id: 12,
      formtitle: "Publications",
      objectKey: "publications",
      fields: [
        {
          label: "Work Type",
          name: "publications.workType",
          type: "select",
          placeholder: "Type",
          options: [
            { value: "article", label: "Article" },
            { value: "aip", label: "Article-in-Press (AiP)" },
            { value: "book", label: "Book" },
            { value: "book chapter", label: "Book Chapter" },
            { value: "conferencepaper", label: "Conference Paper" },
            {
              value: "conference proceedings",
              label: "Conference Proceedings",
            },
            { value: "datapaper", label: "Data Paper" },
            { value: "editorial", label: "Editorial" },
            { value: "erratum", label: "Erratum" },
            { value: "letter", label: "Letter" },
            { value: "note", label: "Note" },
            { value: "retracted articles", label: "Retracted Article" },
            { value: "review", label: "Review" },
            { value: "short survey", label: "Short Survey" },
            { value: "other", label: "Other" },
          ],
        },
        {
          label: "Title/Chapter",
          name: "publications.title",
          type: "text",
          placeholder: "Title of the Publication",
        },
        {
          label: "Journal/Book Title",
          name: "publications.journalBookTitle",
          type: "text",
          placeholder: "Enter Journal/Book Title",
        },
        {
          label: "Year",
          name: "publications.year",
          type: "text",
          placeholder: "Year",
        },
        {
          label: "Author",
          name: "publications.authors",
          type: "text",
          placeholder: "Enter Author",
        },
        {
          label: "Url",
          name: "publications.url",
          type: "text",
          placeholder: "Enter Url",
        },
        {
          label: "Doi",
          name: "publications.doi",
          type: "text",
          placeholder: "Enter Doi",
        },
        {
          label: "Volume",
          name: "publications.volume",
          type: "text",
          placeholder: "Enter Volume",
        },
        {
          label: "Page No.",
          name: "publications.pageNo",
          type: "text",
          placeholder: "Enter Page No.",
        },
        {
          label: "Editor",
          name: "publications.editor",
          type: "text",
          placeholder: "Enter Editor Name",
        },
        {
          label: "Publisher",
          name: "publications.publisher",
          type: "text",
          placeholder: "Enter Publisher Name",
        },
      ],
    },
  ];

  return (
    <Card>
      <Card.Body>
        <h5 className="header-title mb-3 mt-0">Doctor Profile</h5>

        <Accordion
          defaultActiveKey="0"
          id="accordion"
          className="custom-accordionwitharrow"
          style={{ border: "2px solid red" }}
        >
          {(accordianContent || []).map((item, index) => {
            return (
              <CustomAccordion1
                key={index}
                item={item}
                index={index}
                length={accordianContent.length}
              />
            );
          })}
        </Accordion>

        {/* <Nav
          as="ul"
          variant="pills"
          justify
          className="navtab-bg p-1"
          activeKey={activeTab}
          onSelect={handleSelect}
        >
          <Nav.Item as="li">
            <Nav.Link eventKey="activity">Activity</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="messages">Messages</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="projects">Projects</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="tasks">Tasks</Nav.Link>
          </Nav.Item>
          <Nav.Item as="li">
            <Nav.Link eventKey="files">Files</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane active={activeTab === "activity"} eventKey="activity">
            <Activity activityTimeline={activityTimeline} />
          </Tab.Pane>
          <Tab.Pane active={activeTab === "messages"} eventKey="messages">
            <Messages messages={messages} />
          </Tab.Pane>
          <Tab.Pane active={activeTab === "projects"} eventKey="projects">
            <Projects projects={projects} />
          </Tab.Pane>
          <Tab.Pane active={activeTab === "tasks"} eventKey="tasks">
            <Tasks tasks={[...todayTasks, ...upcomingTasks]} />
          </Tab.Pane>
          <Tab.Pane active={activeTab === "files"} eventKey="files">
            <Files files={files} />
          </Tab.Pane>
        </Tab.Content> */}
      </Card.Body>
    </Card>
  );
};

export default OtherDetails;
