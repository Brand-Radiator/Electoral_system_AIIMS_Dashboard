import React from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";

// components
import PrivateRoute from "./PrivateRoute";
import Introduction from "../pages/other/Introduction";
import CmImage from "../pages/other/CmMessage";
import DyptCmMessage from "../pages/other/DyptCmMessage";
import HonableMinister from "../pages/other/HonableMinMessage";
import News from "../pages/forms/News";
import SportLegecy from "../pages/other/SportLegacy";
import DirectorGeneral from "../pages/other/DirectorGeneral";
import DirectorCum from "../pages/other/DirectorCum";
import Tender from "../pages/other/Tender";
import OrganizationalStructure from "../pages/other/OrgtnalStru";
import PrioritySport from "../pages/other/PrioritySports";
import Statelevelachievement from "../pages/other/Statelevelachievement";
import ServiceSection from "../pages/other/ServiceSectionTwo";
import FooterSection from "../pages/forms/Footer";
import Video from "../pages/other/Video";
import Employee from "../pages/Employees/Employees";
import LatestInformation from "../pages/forms/LatestInformation";
import InternationalSportingEvents from "../pages/forms/InternationalSportingEvent";
import UpcomingEvent from "../pages/other/UpcomingEvent";
import HeadLink from "../pages/other/HeadLink";
import SportInstrumentInfo from "../pages/other/SportsInstrumentsInfo";
import AcsDepartment from "../pages/other/AcsDepartmentMessage";
import Doctors from "../pages/doctor/Doctor";
import Registations from "../pages/registration/Registration";

// import Root from "./Root";

// lazy load all the viewsupdateVideo

// auth
const Login = React.lazy(() => import("../pages/auth/Login"));
const Logout = React.lazy(() => import("../pages/auth/Logout"));
const Confirm = React.lazy(() => import("../pages/auth/Confirm"));
const ForgetPassword = React.lazy(() => import("../pages/auth/ForgetPassword"));
const Register = React.lazy(() => import("../pages/auth/Register"));
const LockScreen = React.lazy(() => import("../pages/auth/LockScreen"));

// landing
const Landing = React.lazy(() => import("../pages/landing/"));

// --------------------------------- different pags routing -----------
const NationalAchievement = React.lazy(
  () => import("../pages/other/NationalAchievement")
);
// const OurPolicy = React.lazy(() => import("../pages/other/OurPolicy"));
const SportsRecruitmentPolicy = React.lazy(
  () => import("../pages/other/SportsRecruitmentPolicy")
);
const KhelSammanSamaroh = React.lazy(
  () => import("../pages/other/KhelSammanSamaroh")
);
const SportsWelfareFund = React.lazy(
  () => import("../pages/other/SportsWelfareFund")
);
const SportsFederation = React.lazy(
  () => import("../pages/other/SportsFederation")
);

const SportsInstruments = React.lazy(
  () => import("../pages/other/SportsInstrumentsInfo")
);
const SportsScholarshipPolicy = React.lazy(
  () => import("../pages/other/SportsScholarshipPolicy")
);

const PrernaPolicy = React.lazy(() => import("../pages/other/PrernaPolicy"));
const SakshamPolicy = React.lazy(() => import("../pages/other/SakshamPolicy"));
const UdaanPolicy = React.lazy(() => import("../pages/other/UdaanPolicy"));
const DsoDirectory = React.lazy(() => import("../pages/other/DsoDirectory"));

// ---------------------------------- dashboard ----------------------------------
const EcommerceDashboard = React.lazy(
  () => import("../pages/dashboard/Ecommerce/")
);
const AnalyticsDashboard = React.lazy(
  () => import("../pages/dashboard/Analytics/")
);

// -----------------------------------------New dashboard imported from here---------------------

const NewDashboard = React.lazy(
  () => import("../pages/dashboard/Newdashboard")
);

const HomeDashboard = React.lazy(
  () => import("../pages/dashboard/Home/HeaderTwo")
);

//------------------------------------- apps  -----------------------------------
const CalendarApp = React.lazy(() => import("../pages/apps/Calendar/"));
const Projects = React.lazy(() => import("../pages/apps/Projects/"));
const ProjectDetail = React.lazy(
  () => import("../pages/apps/Projects/Detail/")
);
// ----------------------------------------- chat  ---------------------------------
const ChatApp = React.lazy(() => import("../pages/apps/Chat/"));
// - email
const Inbox = React.lazy(() => import("../pages/apps/Email/Inbox"));
const EmailDetail = React.lazy(() => import("../pages/apps/Email/Detail"));
const EmailCompose = React.lazy(() => import("../pages/apps/Email/Compose"));
// - tasks
const TaskList = React.lazy(() => import("../pages/apps/Tasks/List/"));
const Kanban = React.lazy(() => import("../pages/apps/Tasks/Board/"));
// - file
const FileManager = React.lazy(() => import("../pages/apps/FileManager"));

// extra pages
const Error404 = React.lazy(() => import("../pages/error/Error404"));
const Error500 = React.lazy(() => import("../pages/error/Error500"));
// -other
const Starter = React.lazy(() => import("../pages/other/Starter"));
const Profile = React.lazy(() => import("../pages/other/Profile"));
const Activity = React.lazy(() => import("../pages/other/Activity"));
const Invoice = React.lazy(() => import("../pages/other/Invoice"));
const Maintenance = React.lazy(() => import("../pages/other/Maintenance"));
const Pricing = React.lazy(() => import("../pages/other/Pricing"));

// ---------------------------------------- Pages ------------------------
const Gallery = React.lazy(() => import("../pages/forms/Gallery"));
const InternationalAchievement = React.lazy(
  () => import("../pages/other/InternationalAchievement")
);
const MissionAndVision = React.lazy(
  () => import("../pages/other/MissionAndVision")
);

// uikit
const UIElements = React.lazy(() => import("../pages/uikit"));

// widgets
const Widgets = React.lazy(() => import("../pages/widgets/"));

// icons
const Unicons = React.lazy(() => import("../pages/icons/Unicons"));
const FeatherIcons = React.lazy(() => import("../pages/icons/Feather/"));
const BootstrapIcon = React.lazy(() => import("../pages/icons/Bootstrap/"));

// forms
const BasicForms = React.lazy(() => import("../pages/forms/Basic"));
const FormAdvanced = React.lazy(() => import("../pages/forms/Advanced"));
const FormValidation = React.lazy(() => import("../pages/forms/Validation"));
const FormWizard = React.lazy(() => import("../pages/forms/Wizard"));
const FileUpload = React.lazy(() => import("../pages/forms/FileUpload"));
const Editors = React.lazy(() => import("../pages/forms/Editors"));

//-------------------------------------------  inside home   -----------------
const Header = React.lazy(() => import("../pages/forms/Header"));
const Marquees = React.lazy(() => import("../pages/forms/Marquees"));
const Risingstar = React.lazy(() => import("../pages/forms/RisingStarBihar"));
const Sponsors = React.lazy(() => import("../pages/forms/Sponsor"));
const Service = React.lazy(() => import("../pages/other/ServiceSection"));
const Events = React.lazy(() => import("../pages/forms/Events"));
const Banner = React.lazy(() => import("../pages/forms/Banner"));
// const Menubar = React.lazy(()=> import ('../pages/forms/Menubar'))
const Achievement = React.lazy(() => import("../pages/forms/Achievement"));

// charts
const Charts = React.lazy(() => import("../pages/charts/"));

// tables
const BasicTables = React.lazy(() => import("../pages/tables/Basic"));
const AdvancedTables = React.lazy(() => import("../pages/tables/Advanced"));

// maps
const GoogleMaps = React.lazy(() => import("../pages/maps/GoogleMaps"));
const VectorMaps = React.lazy(() => import("../pages/maps/VectorMaps"));

export interface RoutesProps {
  path: RouteProps["path"];
  name?: string;
  element?: RouteProps["element"];
  route?: any;
  exact?: boolean;
  icon?: string;
  header?: string;
  roles?: string[];
  children?: RoutesProps[];
}

// ------------------------------------dashboards --------------------------------
const dashboardRoutes: RoutesProps = {
  path: "/dashboard",
  name: "Dashboards",
  icon: "airplay",
  header: "Navigation",
  children: [
    // {
    //   path: "/",
    //   name: "Root",
    //   element: <Navigate to="/dashboard/ecommerce" />,
    //   route: PrivateRoute,
    // },
    // // NewDashboard
    // {
    //   path: "/dashboard/ecommerce",
    //   name: "Ecommerce",
    //   element: <EcommerceDashboard />,
    //   route: PrivateRoute,
    // },
    // {
    //   path: "/dashboard/analytics",
    //   name: "Analytics",
    //   element: <AnalyticsDashboard />,
    //   route: PrivateRoute,
    // },
    {
      path: "/",
      name: "Root",
      element: <Navigate to="/dashboard" />,
      route: PrivateRoute,
    },
    // NewDashboard
    {
      path: "/dashboard",
      name: "Dashboard",
      element: <NewDashboard />,
      route: PrivateRoute,
    },
  ],
};

const calendarAppRoutes: RoutesProps = {
  path: "/apps/calendar",
  name: "Calendar",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "calendar",
  element: <CalendarApp />,
  header: "Apps",
};

const chatAppRoutes: RoutesProps = {
  path: "/apps/chat",
  name: "Chat",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "message-square",
  element: <ChatApp />,
};

const emailAppRoutes: RoutesProps = {
  path: "/apps/email",
  name: "Email",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "mail",
  children: [
    {
      path: "/apps/email/inbox",
      name: "Inbox",
      element: <Inbox />,
      route: PrivateRoute,
    },
    {
      path: "/apps/email/details",
      name: "Email Details",
      element: <EmailDetail />,
      route: PrivateRoute,
    },
    {
      path: "/apps/email/compose",
      name: "Compose Email",
      element: <EmailCompose />,
      route: PrivateRoute,
    },
  ],
};

const projectAppRoutes: RoutesProps = {
  path: "/apps/projects",
  name: "Projects",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "uil-briefcase",

  children: [
    {
      path: "/apps/projects/list",
      name: "List",
      element: <Projects />,
      route: PrivateRoute,
    },
    {
      path: "/apps/projects/details",
      name: "Detail",
      element: <ProjectDetail />,
      route: PrivateRoute,
    },
  ],
};

const taskAppRoutes: RoutesProps = {
  path: "/apps/tasks",
  name: "Tasks",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "clipboard",
  children: [
    {
      path: "/apps/tasks/list",
      name: "Task List",
      element: <TaskList />,
      route: PrivateRoute,
    },

    {
      path: "/apps/tasks/kanban",
      name: "Kanban",
      element: <Kanban />,
      route: PrivateRoute,
    },
  ],
};

const fileAppRoutes: RoutesProps = {
  path: "/apps/file-manager",
  name: "File Manager",
  route: PrivateRoute,
  roles: ["Admin"],
  icon: "folder-plus",
  element: <FileManager />,
};

const appRoutes = [
  calendarAppRoutes,
  chatAppRoutes,
  emailAppRoutes,
  projectAppRoutes,
  taskAppRoutes,
  fileAppRoutes,
];

// pages
const extrapagesRoutes: RoutesProps = {
  // ------------------------------- Pages section --------------------

  path: "/pages",
  name: "Pages",
  icon: "package",
  header: "Custom",
  children: [
    // {
    //   path: "/pages/starter",
    //   name: "Starter",
    //   element: <Starter />,
    //   route: PrivateRoute,
    // },
    {
      path: "/pages/introduction",
      name: "Introduction",
      element: <Introduction />,
      route: PrivateRoute,
    },

    {
      path: "/pages/chiefminister",
      name: "ChiefMinister",
      element: <CmImage />,
      route: PrivateRoute,
    },

    {
      path: "/pages/dyptchiefminister",
      name: "DyptChiefMinister",
      element: <DyptCmMessage />,
      route: PrivateRoute,
    },

    {
      path: "/pages/honableminister",
      name: "HonableMinister",
      element: <HonableMinister />,
      route: PrivateRoute,
    },

    {
      path: "/pages/acsdepartment",
      name: "Add. Chief Secretary",
      element: <AcsDepartment />,
      route: PrivateRoute,
    },

    {
      path: "/pages/directorgeneral",
      name: "DirectorGeneral",
      element: <DirectorGeneral />,
      route: PrivateRoute,
    },

    {
      path: "/pages/directorcum",
      name: "DirectorCum",
      element: <DirectorCum />,
      route: PrivateRoute,
    },
    {
      path: "/pages/organizationalstructure",
      name: "Organizational Structure",
      element: <OrganizationalStructure />,
      route: PrivateRoute,
    },

    {
      path: "/pages/prioritysport",
      name: "Priority Sport",
      element: <PrioritySport />,
      route: PrivateRoute,
    },
    {
      path: "/pages/sport-instrument-info",
      name: "Sport Instrument Info",
      element: <SportInstrumentInfo />,
      route: PrivateRoute,
    },

    {
      path: "/pages/tender",
      name: "Tender",
      element: <Tender />,
      route: PrivateRoute,
    },

    {
      path: "/forms/gallery",
      name: "Gallery",
      element: <Gallery />,
      route: PrivateRoute,
    },
    {
      path: "/pages/sportlegecy",
      name: "Sport Legecy",
      element: <SportLegecy />,
      route: PrivateRoute,
    },

    {
      path: "/pages/internationalachievement",
      name: "InternationalAchievement",
      element: <InternationalAchievement />,
      route: PrivateRoute,
    },
    {
      path: "/pages/nationalAchievement",
      name: "NationalAchievement",
      element: <NationalAchievement />,
      route: PrivateRoute,
    },

    {
      path: "/pages/missionandvision",
      name: "MissionAndVision",
      element: <MissionAndVision />,
      route: PrivateRoute,
    },
    // {
    //   path: "/pages/our-policy",
    //   name: "Our Policy",
    //   element: <OurPolicy />,
    //   route: PrivateRoute,
    // },
    {
      path: "/pages/sports-recruitment-policy",
      name: "Sports Recruitment Policy",
      element: <SportsRecruitmentPolicy />,
      route: PrivateRoute,
    },
    {
      path: "/pages/khel-samman-samaroh",
      name: "Khel Samman Samaroh",
      element: <KhelSammanSamaroh />,
      route: PrivateRoute,
    },
    {
      path: "/pages/sports-welfare-fund",
      name: "Sports Welfare Fund",
      element: <SportsWelfareFund />,
      route: PrivateRoute,
    },
    {
      path: "/pages/sports-federations",
      name: "Sports Federations",
      element: <SportsFederation />,
      route: PrivateRoute,
    },
    {
      path: "/pages/sports-instruments-information",
      name: "Sports Instruments Information",
      element: <SportsInstruments />,
      route: PrivateRoute,
    },
    {
      path: "/pages/sports-scholarship-policy",
      name: "Sports Scholarship Policy",
      element: <SportsScholarshipPolicy />,
      route: PrivateRoute,
    },
    {
      path: "/pages/prerna-policy",
      name: "Prerna Policy",
      element: <PrernaPolicy />,
      route: PrivateRoute,
    },
    {
      path: "/pages/saksham-policy",
      name: "Saksham Policy",
      element: <SakshamPolicy />,
      route: PrivateRoute,
    },
    {
      path: "/pages/udaan-policy",
      name: "Udaan Policy",
      element: <UdaanPolicy />,
      route: PrivateRoute,
    },
    {
      path: "/pages/dso-directory",
      name: "DSO Directory",
      element: <DsoDirectory />,
      route: PrivateRoute,
    },
    //
    {
      path: "/pages/video",
      name: "Video",
      element: <Video />,
      route: PrivateRoute,
    },

    {
      path: "/pages/upcomingevent",
      name: "UpcomingEvent",
      element: <UpcomingEvent />,
      route: PrivateRoute,
    },
  ],
};

// ui
const uiRoutes: RoutesProps = {
  path: "/components",
  name: "Components",
  icon: "package",
  header: "UI Elements",
  children: [
    {
      path: "/components/ui-elements",
      name: "UIElements",
      element: <UIElements />,
      route: PrivateRoute,
    },
    {
      path: "/components/widgets",
      name: "Widgets",
      element: <Widgets />,
      route: PrivateRoute,
    },
    {
      path: "/icons",
      name: "Icons",
      children: [
        {
          path: "/icons/unicons",
          name: "Unicons",
          element: <Unicons />,
          route: PrivateRoute,
        },
        {
          path: "/icons/feather",
          name: "Feather",
          element: <FeatherIcons />,
          route: PrivateRoute,
        },
        {
          path: "/icons/bootstrap",
          name: "Bootstrap Icon",
          element: <BootstrapIcon />,
          route: PrivateRoute,
        },
      ],
    },

    // ---------------------------------insert data inside home section -------------------

    {
      path: "/forms",
      name: "Forms",
      children: [
        {
          path: "/forms/basic",
          name: "Basic Elements",
          element: <BasicForms />,
          route: PrivateRoute,
        },
        // {
        //   path: "/forms/menubar",
        //   name: "Menubar",
        //   element: <Menubar />,
        //   route: PrivateRoute,
        // },

        {
          path: "/forms/banner",
          name: "Banner",
          element: <Banner />,
          route: PrivateRoute,
        },
        {
          path: "/forms/advanced",
          name: "Form Advanced",
          element: <FormAdvanced />,
          route: PrivateRoute,
        },
        {
          path: "/forms/validation",
          name: "Form Validation",
          element: <FormValidation />,
          route: PrivateRoute,
        },

        {
          path: "/forms/latestinformation",
          name: "Form Latest Information",
          element: <LatestInformation />,
          route: PrivateRoute,
        },

        {
          path: "/forms/internationalsportingevents",
          name: "Form International Sporting Events",
          element: <InternationalSportingEvents />,
          route: PrivateRoute,
        },

        {
          path: "/forms/header",
          name: "Form header",
          element: <Header />,
          route: PrivateRoute,
        },

        {
          path: "/pages/headlink",
          name: "Form Head Link",
          element: <HeadLink />,
          route: PrivateRoute,
        },

        {
          path: "/forms/marquees",
          name: "Form marquees",
          element: <Marquees />,
          route: PrivateRoute,
        },
        {
          path: "/forms/risingstar",
          name: "Form risingstar",
          element: <Risingstar />,
          route: PrivateRoute,
        },
        {
          path: "/forms/footer",
          name: "Form footer",
          element: <FooterSection />,
          route: PrivateRoute,
        },

        // {
        //   path: "/forms/achievement",
        //   name: "Form Achievement",
        //   element: <Achievement />,
        //   route: PrivateRoute,
        // },
        {
          path: "/forms/events",
          name: "Events",
          element: <Events />,
          route: PrivateRoute,
        },

        {
          path: "/forms/sponsors",
          name: "Form header",
          element: <Sponsors />,
          route: PrivateRoute,
        },
        {
          path: "/forms/news",
          name: "Form news",
          element: <News />,
          route: PrivateRoute,
        },
        {
          path: "/forms/service",
          name: "Form service",
          element: <Service />,
          route: PrivateRoute,
        },

        // {
        //   path: "/forms/servicesection",
        //   name: "Form service Section",
        //   element: <ServiceSection />,
        //   route: PrivateRoute,
        // },

        {
          path: "/forms/wizard",
          name: "Form Wizard",
          element: <FormWizard />,
          route: PrivateRoute,
        },
        {
          path: "/forms/upload",
          name: "File Upload",
          element: <FileUpload />,
          route: PrivateRoute,
        },
        {
          path: "/forms/editors",
          name: "Editors",
          element: <Editors />,
          route: PrivateRoute,
        },
      ],
    },

    {
      path: "/pages",
      name: "Pages",
      icon: "user",
      header: "Custom",
      children: [
        {
          path: "/pages/registration",
          name: "Registations",
          element: <Registations />,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: "/pages",
      name: "Pages",
      icon: "user",
      header: "Custom",
      children: [
        {
          path: "/pages/doctor",
          name: "Profile",
          element: <Doctors />,
          route: PrivateRoute,
        },
      ],
    },

    {
      path: "/pages",
      name: "Pages",
      icon: "package",
      header: "Custom",
      children: [
        {
          path: "/pages/employee",
          name: "Employee",
          element: <Employee />,
          route: PrivateRoute,
        },
      ],
    },

    {
      path: "/components/charts",
      name: "Charts",
      element: <Charts />,
      route: PrivateRoute,
    },
    {
      path: "/tables",
      name: "Tables",
      children: [
        {
          path: "/tables/basic",
          name: "Basic",
          element: <BasicTables />,
          route: PrivateRoute,
        },
        {
          path: "/tables/advanced",
          name: "Advanced",
          element: <AdvancedTables />,
          route: PrivateRoute,
        },
      ],
    },
    {
      path: "/maps",
      name: "Maps",
      children: [
        {
          path: "/maps/googlemaps",
          name: "Google Maps",
          element: <GoogleMaps />,
          route: PrivateRoute,
        },
        {
          path: "/maps/vectorMaps",
          name: "Google Maps",
          element: <VectorMaps />,
          route: PrivateRoute,
        },
      ],
    },
  ],
};

// auth
const authRoutes: RoutesProps[] = [
  {
    path: "/auth/login",
    name: "Login",
    element: <Login />,
    route: Route,
  },
  {
    path: "/auth/register",
    name: "Register",
    element: <Register />,
    route: Route,
  },
  {
    path: "/auth/confirm",
    name: "Confirm",
    element: <Confirm />,
    route: Route,
  },
  {
    path: "/auth/forget-password",
    name: "Forget Password",
    element: <ForgetPassword />,
    route: Route,
  },
  {
    path: "/auth/lock-screen",
    name: "Lock Screen",
    element: <LockScreen />,
    route: Route,
  },
  {
    path: "/auth/logout",
    name: "Logout",
    element: <Logout />,
    route: Route,
  },
];

// public routes
const otherPublicRoutes: RoutesProps[] = [
  {
    path: "/landing",
    name: "landing",
    element: <Landing />,
    route: Route,
  },
  {
    path: "/maintenance",
    name: "Maintenance",
    element: <Maintenance />,
    route: Route,
  },
  {
    path: "/error-404",
    name: "Error - 404",
    element: <Error404 />,
    route: Route,
  },
  {
    path: "/gallery",
    name: "Gallery",
    element: <Gallery />,
    route: Route,
  },
  {
    path: "/error-500",
    name: "Error - 500",
    element: <Error500 />,
    route: Route,
  },
];

// flatten the list of all nested routes
const flattenRoutes = (routes: RoutesProps[]) => {
  let flatRoutes: RoutesProps[] = [];

  routes = routes || [];
  // console.log('routes', routes)
  routes.forEach((item: RoutesProps) => {
    flatRoutes.push(item);

    if (typeof item.children !== "undefined") {
      flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
    }
  });
  return flatRoutes;
};

// All routes
const authProtectedRoutes = [
  dashboardRoutes,
  ...appRoutes,
  extrapagesRoutes,
  uiRoutes,
];
const publicRoutes = [...authRoutes, ...otherPublicRoutes];

const authProtectedFlattenRoutes = flattenRoutes([...authProtectedRoutes]);
const publicProtectedFlattenRoutes = flattenRoutes([...publicRoutes]);

export {
  publicRoutes,
  authProtectedRoutes,
  authProtectedFlattenRoutes,
  publicProtectedFlattenRoutes,
};
