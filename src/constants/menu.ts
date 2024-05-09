// import { useSelector, useDispatch } from "react-redux";
// import { RootState, AppDispatch } from ".././redux/store";

export interface MenuItemTypes {
  key: string;
  label: string;
  isTitle?: boolean;
  icon?: string;
  url?: string;
  badge?: {
    variant: string;
    text: string;
  };
  parentKey?: string;
  target?: string;
  children?: MenuItemTypes[];
  visibility?: boolean;
}

// const { user, userLoggedIn, loading, error, userId } = useSelector(
//   (state: RootState) => ({
//     user: state.Auth.user,
//     loading: state.Auth.loading,
//     error: state.Auth.error,
//     userLoggedIn: state.Auth.userLoggedIn,
//     userId: state.Auth._id,
//   })
// );
// const Role :string = user.role? user.role : user.user.role

const MENU_ITEMS: MenuItemTypes[] = [
  { key: "custom", label: "Dashboard", isTitle: true },

  // ---777777777777777777777777777777 employee Start  now in doctor ----------------------

  {
    key: "extra-employees",
    label: "Registration",
    // isTitle: false,
    icon: "user",
    url: "/pages/registration",
    parentKey: "extra-pages",
  },
  {
    key: "extra-employees",
    label: "Candidates",
    // isTitle: false,
    icon: "user",
    url: "/pages/candidates",
    parentKey: "extra-pages",
  },
  {
    key: "extra-employees",
    label: "Students",
    // isTitle: false,
    icon: "user",
    url: "/pages/students",
    parentKey: "extra-pages",
  },
  {
    key: "extra-employees",
    label: "Approved Candidates",
    // isTitle: false,
    icon: "user",
    url: "/pages/approved-candidates",
    parentKey: "extra-pages",
  },
   {
    key: "extra-employees",
    label: "Voter’s",
    // isTitle: false,
    icon: "user",
    url: "/pages/voter’s",
    parentKey: "extra-pages",
  },
  {
    key: "extra-employees",
    label: "Registration",
    isTitle: false,
    icon: "user",
    children: [
      {
        key: "page-employee",
        label: "Profile",
        url: "/pages/doctor",
        parentKey: "extra-pages",
      },
    ],
  },

  // {
  //   key: "extra-employees",
  //   label: "Dashboard",
  //   isTitle: false,
  //   icon: "user",
  //   children: [

  //     {
  //       key: "page-employee",
  //       label: "Profile",
  //       url: "/pages/employee",
  //       parentKey: "extra-pages",
  //     },

  //   ],
  // },

  // { key: "apps", label: "Apps", isTitle: true },
  // {
  //   key: "apps-calendar",
  //   label: "Calendar",
  //   isTitle: false,
  //   icon: "calendar",
  //   url: "/apps/calendar",
  // },
  // {
  //   key: "apps-chat",
  //   label: "Chat",
  //   isTitle: false,
  //   icon: "message-square",
  //   url: "/apps/chat",
  // },
  // {
  //   key: "apps-email",
  //   label: "Email",
  //   isTitle: false,
  //   icon: "mail",
  //   children: [
  //     {
  //       key: "email-inbox",
  //       label: "Inbox",
  //       url: "/apps/email/inbox",
  //       parentKey: "apps-email",
  //     },
  //     {
  //       key: "email-read-email",
  //       label: "Read Email",
  //       url: "/apps/email/details",
  //       parentKey: "apps-email",
  //     },
  //     {
  //       key: "email-compose-email",
  //       label: "Compose Email",
  //       url: "/apps/email/compose",
  //       parentKey: "apps-email",
  //     },
  //   ],
  // },
  // {
  //   key: "apps-projects",
  //   label: "Projects",
  //   isTitle: false,
  //   icon: "briefcase",
  //   children: [
  //     {
  //       key: "project-list",
  //       label: "List",
  //       url: "/apps/projects/list",
  //       parentKey: "apps-projects",
  //     },
  //     {
  //       key: "project-details",
  //       label: "Details",
  //       url: "/apps/projects/details",
  //       parentKey: "apps-projects",
  //     },
  //   ],
  // },
  // {
  //   key: "apps-tasks",
  //   label: "Tasks",
  //   isTitle: false,
  //   icon: "clipboard",
  //   children: [
  //     {
  //       key: "task-list",
  //       label: "List",
  //       url: "/apps/tasks/list",
  //       parentKey: "apps-tasks",
  //     },
  //     {
  //       key: "task-kanban",
  //       label: "Kanban Board",
  //       url: "/apps/tasks/kanban",
  //       parentKey: "apps-tasks",
  //     },
  //   ],
  // },
  // {
  //   key: "apps-file-manager",
  //   label: "File Manager",
  //   isTitle: false,
  //   icon: "file-plus",
  //   url: "/apps/file-manager",
  // },

  // ----------------------------- Home Page Starts-----------------------------------------

  // {
  //   key: "home",
  //   label: "Home",
  //   isTitle: false,
  //   icon: "home",

  //   children: [
  //     {
  //       key: "form-header",
  //       label: "Header",
  //       url: "/forms/header",
  //       parentKey: "forms",
  //     },
  //     // {
  //     //   key: "form-menubar",
  //     //   label: "Menubar",
  //     //   url: "/forms/menubar",
  //     //   parentKey: "forms",
  //     // },
  //     {
  //       key: "form-banner",
  //       label: "Banner",
  //       url: "/forms/banner",
  //       parentKey: "forms",
  //     },
  //     {
  //       key: "form-banner",
  //       label: "Latest Information",
  //       url: "/forms/latestinformation",
  //       parentKey: "forms",
  //     },

  //     {
  //       key: "page-video",
  //       label: "Head Link",
  //       url: "/pages/headlink",
  //       parentKey: "extra-pages",
  //     },

  //     {
  //       key: "form-banner",
  //       label: "International Sporting Events",
  //       url: "/forms/internationalsportingevents",
  //       parentKey: "forms",
  //     },

  //     {
  //       key: "page-service",
  //       label: "Service",
  //       url: "/forms/service",
  //       parentKey: "extra-pages",
  //     },

  //     // {
  //     //   key: "page-servicesection",
  //     //   label: "Service Section",
  //     //   url: "/forms/servicesection",
  //     //   parentKey: "extra-pages",
  //     // },

  //     {
  //       key: "form-marquees",
  //       label: "Marquees",
  //       url: "/forms/marquees",
  //       parentKey: "forms",
  //     },
  //     // {
  //     //   key: "form-achievement",
  //     //   label: "Achievement",
  //     //   url: "/forms/achievement",
  //     //   parentKey: "forms",
  //     // },
  //     {
  //       key: "form-risingstar",
  //       label: "Rising Star",
  //       url: "/forms/risingstar",
  //       parentKey: "forms",
  //     },
  //     {
  //       key: "form-events",
  //       label: "Events",
  //       url: "/forms/events",
  //       parentKey: "forms",
  //     },

  //     {
  //       key: "form-gallery",
  //       label: "Gallery",
  //       url: "/forms/gallery",
  //       parentKey: "forms",
  //     },
  //     {
  //       key: "form-sponsors",
  //       label: "Sponsors",
  //       url: "/forms/sponsors",
  //       parentKey: "forms",
  //     },
  //     {
  //       key: "form-news",
  //       label: "News",
  //       url: "/forms/news",
  //       parentKey: "forms",
  //     },

  //     {
  //       key: "form-footer",
  //       label: "Footer",
  //       url: "/forms/footer",
  //       parentKey: "forms",
  //     },
  //   ],
  // },

  // ---------------------------------Home page ends -----------------------------------------

  // ------------------------------- Page start ----------------------
  //   {
  //     key: "extra-pages",
  //     label: "Pages",
  //     isTitle: false,
  //     icon: "file-text",
  //     children: [
  //       // {
  //       //   key: "page-starter",
  //       //   label: "Starter",
  //       //   url: "/pages/starter",
  //       //   parentKey: "extra-pages",
  //       // },

  //       {
  //         key: "page-introduction",
  //         label: "Introduction",
  //         url: "/pages/introduction",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-internationalachievement",
  //         label: "International.Achievements",
  //         url: "/pages/internationalachievement",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-nationalachievement",
  //         label: "National.Achievements",
  //         url: "/pages/nationalachievement",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-missionandvision",
  //         label: "Mission And Vision",
  //         url: "/pages/missionandvision",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-organizationalstructure",
  //         label: "Organizational Structure",
  //         url: "/pages/organizationalstructure",
  //         parentKey: "extra-pages",
  //       },

  //       // {
  //       //   key: "page-policy",
  //       //   label: "Our Policy",
  //       //   url: "/pages/our-policy",
  //       //   parentKey: "extra-pages",
  //       // },

  //       {
  //         key: "page-sports-recruitment-policy",
  //         label: "Sports Recruitment Policy",
  //         url: "/pages/sports-recruitment-policy",
  //         parentKey: "extra-pages",
  //       },
  //       {
  //         key: "page-khel-samman-samaroh",
  //         label: "Khel Samman Samaroh",
  //         url: "/pages/khel-samman-samaroh",
  //         parentKey: "extra-pages",
  //       },

  //       // {
  //       //   key: "page-Sport Instrument Info",
  //       //   label: "Sport Instrunment Info",
  //       //   url: "/pages/sport-instrument-info",
  //       //   parentKey: "extra-pages",
  //       // },

  //       {
  //         key: "page-sports-welfare-fund",
  //         label: "Sports Welfare Fund",
  //         url: "/pages/sports-welfare-fund",
  //         parentKey: "extra-pages",
  //       },
  //       {
  //         key: "page-sports-federations",
  //         label: "Sports Federations",
  //         url: "/pages/sports-federations",
  //         parentKey: "extra-pages",
  //       },
  //       // {
  //       //   key: "page-sports-instruments-information",
  //       //   label: "Sports Instruments info",
  //       //   url: "/pages/sports-instruments-information",
  //       //   parentKey: "extra-pages",
  //       // },
  //       {
  //         key: "page-sports-scholarship-policy",
  //         label: "Sports Scholarship Policy",
  //         url: "/pages/sports-scholarship-policy",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-prerna",
  //         label: "Prerna Policy",
  //         url: "/pages/prerna-policy",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-saksham",
  //         label: "Saksham Policy",
  //         url: "/pages/saksham-policy",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-Chiefminister",
  //         label: "Chief Minister",
  //         url: "/pages/chiefminister",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-Dyptchiefminister",
  //         label: "DyptChief Minister",
  //         url: "/pages/dyptchiefminister",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-HonableMinister",
  //         label: "Hon'ble Minister",
  //         url: "/pages/honableminister",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-AcsDepartment",
  //         label: "Add. Chief Secretary",
  //         url: "/pages/acsdepartment",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-directorgeneral",
  //         label: "Director General",
  //         url: "/pages/directorgeneral",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-directorcum",
  //         label: "Director Cum",
  //         url: "/pages/directorcum",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-tender",
  //         label: "Tender",
  //         url: "/pages/tender",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-prioritysports",
  //         label: "Priority Sports",
  //         url: "/pages/prioritysport",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-sportlegecy",
  //         label: "Sport Legacy",
  //         url: "/pages/sportlegecy",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-udaan",
  //         label: "Udaan Policy",
  //         url: "/pages/udaan-policy",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-dso-directory",
  //         label: "DSO Directory",
  //         url: "/pages/dso-directory",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-video",
  //         label: "Video",
  //         url: "/pages/video",
  //         parentKey: "extra-pages",
  //       },

  //       {
  //         key: "page-video",
  //         label: "UpcomingEvent",
  //         url: "/pages/upcomingevent",
  //         parentKey: "extra-pages",
  //       },

  //       //

  //       // {
  //       //   key: "page-profile",
  //       //   label: "Profile",
  //       //   url: "/pages/profile",
  //       //   parentKey: "extra-pages",
  //       // },
  //       // {
  //       //   key: "page-activity",
  //       //   label: "Activity",
  //       //   url: "/pages/activity",
  //       //   parentKey: "extra-pages",
  //       // },
  //       // {
  //       //   key: "page-invoice",
  //       //   label: "Invoice",
  //       //   url: "/pages/invoice",
  //       //   parentKey: "extra-pages",
  //       // },
  //       // {
  //       //   key: "page-pricing",
  //       //   label: "Pricing",
  //       //   url: "/pages/pricing",
  //       //   parentKey: "extra-pages",
  //       // },
  //       // {
  //       //   key: "page-maintenance",
  //       //   label: "Maintenance",
  //       //   url: "/maintenance",
  //       //   target: "_blank",
  //       //   parentKey: "extra-pages",
  //       // },
  //       {
  //         key: "page-error-404",
  //         label: "Error - 404",
  //         url: "/error-404",
  //         parentKey: "extra-pages",
  //       },
  //       {
  //         key: "page-error-500",
  //         label: "Error - 500",
  //         url: "/error-500",
  //         parentKey: "extra-pages",
  //       },

  //     ],
  //   },
  // // ------------------------------ Page ends -----------------------

  {
    key: "#",
    label: "",
    isTitle: false,
    icon: "#",
    // badge: { variant: "success", text: "02" },
    // children: [
    //   // {
    //   //   key: "ds-ecommerce",
    //   //   label: "Ecommerce",
    //   //   url: "/dashboard/ecommerce",
    //   //   parentKey: "dashboards",
    //   // },
    //   // {
    //   //   key: "ds-analytics",
    //   //   label: "Analytics",
    //   //   url: "/dashboard/analytics",
    //   //   parentKey: "dashboards",
    //   // },

    // ],
  },

  // --------------------Components start from here-----------------------------------------

  { key: "components", label: "", isTitle: true },
  {
    key: "ui-elements",
    label: "",
    isTitle: false,
    icon: "",
    url: "#",
    visibility: false,
  },
  {
    key: "widgets",
    label: "",
    isTitle: false,
    icon: "",
    url: "#",
    visibility: false,
  },
  {
    key: "icons",
    label: "",
    isTitle: false,
    icon: "#",
    // children: [
    //   {
    //     key: "icon-unicons",
    //     label: "Unicons",
    //     url: "/icons/unicons",
    //     parentKey: "icons",
    //   },
    //   {
    //     key: "icon-feather",
    //     label: "Feather",
    //     url: "/icons/feather",
    //     parentKey: "icons",
    //   },
    //   {
    //     key: "icon-bootstrap",
    //     label: "Bootstrap",
    //     url: "/icons/bootstrap",
    //     parentKey: "icons",
    //   },
    // ],
    visibility: false,
  },
  {
    key: "forms",
    label: "",
    isTitle: false,
    icon: "#",
    // children: [
    //   {
    //     key: "form-basic",
    //     label: "Basic Elements",
    //     url: "/forms/basic",
    //     parentKey: "forms",
    //   },
    //   {
    //     key: "form-advanced",
    //     label: "Advanced",
    //     url: "/forms/advanced",
    //     parentKey: "forms",
    //   },
    //   {
    //     key: "form-validation",
    //     label: "Validation",
    //     url: "/forms/validation",
    //     parentKey: "forms",
    //   },
    //   {
    //     key: "form-Header",
    //     label: "Header",
    //     url: "/forms/Header",
    //     parentKey: "forms",
    //   },
    //   {
    //     key: "form-wizard",
    //     label: "Wizard",
    //     url: "/forms/wizard",
    //     parentKey: "forms",
    //   },
    //   {
    //     key: "form-editors",
    //     label: "Editors",
    //     url: "/forms/editors",
    //     parentKey: "forms",
    //   },
    //   {
    //     key: "form-upload",
    //     label: "File Uploads",
    //     url: "/forms/upload",
    //     parentKey: "forms",
    //   },
    // ],
    visibility: false,
  },
  {
    key: "charts",
    label: "",
    isTitle: false,
    icon: "#",
    url: "#",
    visibility: false,
  },
  {
    key: "tables",
    label: "",
    isTitle: false,
    icon: "#",
    // children: [
    //   {
    //     key: "table-basic",
    //     label: "Basic Tables",
    //     url: "/tables/basic",
    //     parentKey: "tables",
    //   },
    //   {
    //     key: "table-advanced",
    //     label: "Advanced Tables",
    //     url: "/tables/advanced",
    //     parentKey: "tables",
    //   },
    // ],
    visibility: false,
  },
  // {
  //   key: "maps",
  //   label: "Maps",
  //   isTitle: false,
  //   icon: "map",
  //   children: [
  //     {
  //       key: "maps-googlemaps",
  //       label: "Google Maps",
  //       url: "/maps/googlemaps",
  //       parentKey: "maps",
  //     },
  //     {
  //       key: "maps-vectormaps",
  //       label: "Vector Maps",
  //       url: "/maps/vectormaps",
  //       parentKey: "maps",
  //     },
  //   ],
  // },
  // {
  //   key: "menu-levels",
  //   label: "Menu Levels",
  //   isTitle: false,
  //   icon: "share-2",
  //   children: [
  //     {
  //       key: "menu-levels-1-1",
  //       label: "Level 1.1",
  //       url: "/",
  //       parentKey: "menu-levels",
  //       children: [
  //         {
  //           key: "menu-levels-2-1",
  //           label: "Level 2.1",
  //           url: "/",
  //           parentKey: "menu-levels-1-1",
  //           children: [
  //             {
  //               key: "menu-levels-3-1",
  //               label: "Level 3.1",
  //               url: "/",
  //               parentKey: "menu-levels-2-1",
  //             },
  //             {
  //               key: "menu-levels-3-2",
  //               label: "Level 3.2",
  //               url: "/",
  //               parentKey: "menu-levels-2-1",
  //             },
  //           ],
  //         },
  //         {
  //           key: "menu-levels-2-2",
  //           label: "Level 2.2",
  //           url: "/",
  //           parentKey: "menu-levels-1-1",
  //         },
  //       ],
  //     },
  //     {
  //       key: "menu-levels-1-2",
  //       label: "Level 1.2",
  //       url: "/",
  //       parentKey: "menu-levels",
  //     },
  //   ],
  // },
];

const HORIZONTAL_MENU_ITEMS: MenuItemTypes[] = [
  {
    key: "dashboards",
    icon: "home",
    label: "Dashboards",
    isTitle: true,
    // children: [
    //   {
    //     key: "ds-ecommerce",
    //     label: "Ecommerce",
    //     url: "/dashboard/ecommerce",
    //     parentKey: "dashboards",
    //   },

    //   {
    //     key: "ds-analytics",
    //     label: "Analytics",
    //     url: "/dashboard/analytics",
    //     parentKey: "dashboards",
    //   },
    //   {
    //     key: "ds-home",
    //     label: "Home",
    //     url: "/dashboard/Home",
    //     parentKey: "home",
    //   },
    // ],
  },
  // {
  //   key: "apps",
  //   icon: "layers",
  //   label: "Apps",
  //   isTitle: true,
  //   children: [
  //     {
  //       key: "apps-calendar",
  //       label: "Calendar",
  //       isTitle: false,
  //       url: "/apps/calendar",
  //       parentKey: "apps",
  //     },
  //     {
  //       key: "apps-chat",
  //       label: "Chat",
  //       isTitle: false,
  //       url: "/apps/chat",
  //       parentKey: "apps",
  //     },
  //     {
  //       key: "apps-email",
  //       label: "Email",
  //       isTitle: false,
  //       parentKey: "apps",
  //       children: [
  //         {
  //           key: "email-inbox",
  //           label: "Inbox",
  //           url: "/apps/email/inbox",
  //           parentKey: "apps-email",
  //         },
  //         {
  //           key: "email-read-email",
  //           label: "Read Email",
  //           url: "/apps/email/details",
  //           parentKey: "apps-email",
  //         },
  //         {
  //           key: "email-compose-email",
  //           label: "Compose Email",
  //           url: "/apps/email/compose",
  //           parentKey: "apps-email",
  //         },
  //       ],
  //     },
  //     {
  //       key: "apps-projects",
  //       label: "Projects",
  //       isTitle: false,
  //       parentKey: "apps",
  //       children: [
  //         {
  //           key: "project-list",
  //           label: "List",
  //           url: "/apps/projects/list",
  //           parentKey: "apps-projects",
  //         },
  //         {
  //           key: "project-details",
  //           label: "Details",
  //           url: "/apps/projects/details",
  //           parentKey: "apps-projects",
  //         },
  //       ],
  //     },
  //     {
  //       key: "apps-tasks",
  //       label: "Tasks",
  //       isTitle: false,
  //       parentKey: "apps",
  //       children: [
  //         {
  //           key: "task-list",
  //           label: "List",
  //           url: "/apps/tasks/list",
  //           parentKey: "apps-tasks",
  //         },
  //         {
  //           key: "task-kanban",
  //           label: "Kanban Board",
  //           url: "/apps/tasks/kanban",
  //           parentKey: "apps-tasks",
  //         },
  //       ],
  //     },
  //     {
  //       key: "apps-file-manager",
  //       label: "File Manager",
  //       isTitle: false,
  //       url: "/apps/file-manager",
  //       parentKey: "apps",
  //     },
  //   ],
  // },

  // {
  //   key: "components",
  //   icon: "briefcase",
  //   label: "Components",
  //   isTitle: true,
  //   children: [
  //     {
  //       key: "ui-elements",
  //       label: "UI Elements",
  //       isTitle: false,
  //       url: "/components/ui-elements",
  //       parentKey: "components",
  //     },
  //     {
  //       key: "widgets",
  //       label: "Widgets",
  //       isTitle: false,
  //       url: "/components/widgets",
  //       parentKey: "components",
  //     },
  //     {
  //       key: "forms",
  //       label: "Forms",
  //       isTitle: false,
  //       parentKey: "components",
  //       children: [
  //         {
  //           key: "form-basic",
  //           label: "Basic Elements",
  //           url: "/forms/basic",
  //           parentKey: "forms",
  //         },
  //         {
  //           key: "form-advanced",
  //           label: "Advanced",
  //           url: "/forms/advanced",
  //           parentKey: "forms",
  //         },
  //         {
  //           key: "form-validation",
  //           label: "Validation",
  //           url: "/forms/validation",
  //           parentKey: "forms",
  //         },
  //         {
  //           key: "form-wizard",
  //           label: "Wizard",
  //           url: "/forms/wizard",
  //           parentKey: "forms",
  //         },
  //         {
  //           key: "form-editors",
  //           label: "Editors",
  //           url: "/forms/editors",
  //           parentKey: "forms",
  //         },
  //         {
  //           key: "form-upload",
  //           label: "File Uploads",
  //           url: "/forms/upload",
  //           parentKey: "forms",
  //         },
  //       ],
  //     },
  //     {
  //       key: "charts",
  //       label: "Charts",
  //       isTitle: false,
  //       url: "/components/charts",
  //       parentKey: "components",
  //     },
  //     {
  //       key: "tables",
  //       label: "Tables",
  //       isTitle: false,
  //       parentKey: "components",
  //       children: [
  //         {
  //           key: "table-basic",
  //           label: "Basic Tables",
  //           url: "/tables/basic",
  //           parentKey: "tables",
  //         },
  //         {
  //           key: "table-advanced",
  //           label: "Advanced Tables",
  //           url: "/tables/advanced",
  //           parentKey: "tables",
  //         },
  //       ],
  //     },
  //     {
  //       key: "icons",
  //       label: "Icons",
  //       isTitle: false,
  //       parentKey: "components",
  //       children: [
  //         {
  //           key: "icon-unicons",
  //           label: "Unicons",
  //           url: "/icons/unicons",
  //           parentKey: "icons",
  //         },
  //         {
  //           key: "icon-feather",
  //           label: "Feather",
  //           url: "/icons/feather",
  //           parentKey: "icons",
  //         },
  //         {
  //           key: "icon-bootstrap",
  //           label: "Bootstrap",
  //           url: "/icons/bootstrap",
  //           parentKey: "icons",
  //         },
  //       ],
  //     },
  //     {
  //       key: "maps",
  //       label: "Maps",
  //       isTitle: false,
  //       parentKey: "components",
  //       children: [
  //         {
  //           key: "maps-googlemaps",
  //           label: "Google Maps",
  //           url: "/maps/googlemaps",
  //           parentKey: "maps",
  //         },
  //         {
  //           key: "maps-vectormaps",
  //           label: "Vector Maps",
  //           url: "/maps/vectormaps",
  //           parentKey: "maps",
  //         },
  //       ],
  //     },
  //   ],
  // },

  {
    key: "extra-pages",
    label: "Pages",
    isTitle: false,
    icon: "file-text",
    children: [
      {
        key: "page-introduction",
        label: "Introduction",
        url: "/pages/introduction",
        parentKey: "extra-pages",
      },
      {
        key: "page-internationalachievement",
        label: "International.Achievements",
        url: "/pages/internationalachievement",
        parentKey: "extra-pages",
      },
      // {
      //   key: "page-starter",
      //   label: "Starter",
      //   url: "/pages/starter",
      //   parentKey: "extra-pages",
      // },
      {
        key: "page-profile",
        label: "Profile",
        url: "/pages/profile",
        parentKey: "extra-pages",
      },
      {
        key: "page-activity",
        label: "Activity",
        url: "/pages/activity",
        parentKey: "extra-pages",
      },
      {
        key: "page-invoice",
        label: "Invoice",
        url: "/pages/invoice",
        parentKey: "extra-pages",
      },
      {
        key: "page-pricing",
        label: "Pricing",
        url: "/pages/pricing",
        parentKey: "extra-pages",
      },
      {
        key: "page-maintenance",
        label: "Maintenance",
        url: "/maintenance",
        target: "_blank",
        parentKey: "extra-pages",
      },
      {
        key: "page-error-404",
        label: "Error - 404",
        url: "/error-404",
        parentKey: "extra-pages",
      },
      {
        key: "page-error-500",
        label: "Error - 500",
        url: "/error-500",
        parentKey: "extra-pages",
      },
    ],
  },
];

const TWO_COl_MENU_ITEMS: MenuItemTypes[] = [
  {
    key: "dashboards",
    label: "Dashboards",
    isTitle: true,
    icon: "home",
    // children: [
    //   {
    //     key: "ds-ecommerce",
    //     label: "Ecommerce",
    //     url: "/dashboard/ecommerce",
    //     parentKey: "dashboards",
    //   },
    //   {
    //     key: "ds-analytics",
    //     label: "Analytics",
    //     url: "/dashboard/analytics",
    //     parentKey: "dashboards",
    //   },
    //   {
    //     key: "ds-home",
    //     label: "Home",
    //     url: "/dashboard/home",
    //     parentKey: "home",
    //   },
    // ],
  },
  // {
  //   key: "apps",
  //   icon: "grid",
  //   label: "Apps",
  //   isTitle: true,
  //   children: [
  //     {
  //       key: "apps-calendar",
  //       label: "Calendar",
  //       isTitle: false,
  //       icon: "calendar",
  //       url: "/apps/calendar",
  //       parentKey: "apps",
  //     },
  //     {
  //       key: "apps-chat",
  //       label: "Chat",
  //       isTitle: false,
  //       icon: "message-square",
  //       url: "/apps/chat",
  //       parentKey: "apps",
  //     },
  //     {
  //       key: "apps-email",
  //       label: "Email",
  //       isTitle: false,
  //       icon: "mail",
  //       parentKey: "apps",
  //       children: [
  //         {
  //           key: "email-inbox",
  //           label: "Inbox",
  //           url: "/apps/email/inbox",
  //           parentKey: "apps-email",
  //         },
  //         {
  //           key: "email-read-email",
  //           label: "Read Email",
  //           url: "/apps/email/details",
  //           parentKey: "apps-email",
  //         },
  //         {
  //           key: "email-compose-email",
  //           label: "Compose Email",
  //           url: "/apps/email/compose",
  //           parentKey: "apps-email",
  //         },
  //       ],
  //     },
  //     {
  //       key: "apps-projects",
  //       label: "Projects",
  //       isTitle: false,
  //       icon: "briefcase",
  //       parentKey: "apps",
  //       children: [
  //         {
  //           key: "project-list",
  //           label: "List",
  //           url: "/apps/projects/list",
  //           parentKey: "apps-projects",
  //         },
  //         {
  //           key: "project-details",
  //           label: "Details",
  //           url: "/apps/projects/details",
  //           parentKey: "apps-projects",
  //         },
  //       ],
  //     },
  //     {
  //       key: "apps-tasks",
  //       label: "Tasks",
  //       isTitle: false,
  //       icon: "clipboard",
  //       parentKey: "apps",
  //       children: [
  //         {
  //           key: "task-list",
  //           label: "List",
  //           url: "/apps/tasks/list",
  //           parentKey: "apps-tasks",
  //         },
  //         {
  //           key: "task-kanban",
  //           label: "Kanban Board",
  //           url: "/apps/tasks/kanban",
  //           parentKey: "apps-tasks",
  //         },
  //       ],
  //     },
  //     {
  //       key: "apps-file-manager",
  //       label: "File Manager",
  //       isTitle: false,
  //       icon: "file-plus",
  //       url: "/apps/file-manager",
  //       parentKey: "apps",
  //     },
  //   ],
  // },
  {
    key: "extra-pages",
    icon: "file-text",
    label: "Pages",
    isTitle: true,
    children: [
      {
        key: "page-introduction",
        label: "Introduction",
        url: "/pages/introduction",
        parentKey: "extra-pages",
      },
      {
        key: "page-internationalachievement",
        label: "International.Achievements",
        url: "/pages/internationalachievement",
        parentKey: "extra-pages",
      },
      // {
      //   key: "page-starter",
      //   label: "Starter",
      //   url: "/pages/starter",
      //   parentKey: "extra-pages",
      // },
      {
        key: "page-profile",
        label: "Profile",
        url: "/pages/profile",
        parentKey: "extra-pages",
      },
      {
        key: "page-activity",
        label: "Activity",
        url: "/pages/activity",
        parentKey: "extra-pages",
      },
      {
        key: "page-invoice",
        label: "Invoice",
        url: "/pages/invoice",
        parentKey: "extra-pages",
      },
      {
        key: "page-pricing",
        label: "Pricing",
        url: "/pages/pricing",
        parentKey: "extra-pages",
      },
      {
        key: "page-maintenance",
        label: "Maintenance",
        url: "/maintenance",
        target: "_blank",
        parentKey: "extra-pages",
      },
      {
        key: "page-error-404",
        label: "Error - 404",
        url: "/error-404",
        parentKey: "extra-pages",
      },
      {
        key: "page-error-500",
        label: "Error - 500",
        url: "/error-500",
        parentKey: "extra-pages",
      },
    ],
  },
  // {
  //   key: "components",
  //   icon: "package",
  //   label: "Components",
  //   isTitle: true,
  //   children: [
  //     {
  //       key: "base-ui",
  //       label: "UI Elements",
  //       isTitle: false,
  //       icon: "package",
  //       url: "/components/ui-elements",
  //       parentKey: "components",
  //     },
  //     {
  //       key: "icons",
  //       label: "Icons",
  //       isTitle: false,
  //       icon: "cpu",
  //       parentKey: "components",
  //       children: [
  //         {
  //           key: "icon-unicons",
  //           label: "Unicons",
  //           url: "/icons/unicons",
  //           parentKey: "icons",
  //         },
  //         {
  //           key: "icon-feather",
  //           label: "Feather",
  //           url: "/icons/feather",
  //           parentKey: "icons",
  //         },
  //         {
  //           key: "icon-bootstrap",
  //           label: "Bootstrap",
  //           url: "/icons/bootstrap",
  //           parentKey: "icons",
  //         },
  //       ],
  //     },
  //     {
  //       key: "charts",
  //       label: "Charts",
  //       isTitle: false,
  //       icon: "bar-chart-2",
  //       url: "/components/charts",
  //       parentKey: "components",
  //     },
  //     {
  //       key: "forms",
  //       label: "Forms",
  //       isTitle: false,
  //       icon: "bookmark",
  //       parentKey: "components",
  //       children: [
  //         {
  //           key: "form-basic",
  //           label: "Basic Elements",
  //           url: "/forms/basic",
  //           parentKey: "forms",
  //         },
  //         {
  //           key: "form-advanced",
  //           label: "Advanced",
  //           url: "/forms/advanced",
  //           parentKey: "forms",
  //         },
  //         {
  //           key: "form-validation",
  //           label: "Validation",
  //           url: "/forms/validation",
  //           parentKey: "forms",
  //         },
  //         {
  //           key: "form-wizard",
  //           label: "Wizard",
  //           url: "/forms/wizard",
  //           parentKey: "forms",
  //         },
  //         {
  //           key: "form-editors",
  //           label: "Editors",
  //           url: "/forms/editors",
  //           parentKey: "forms",
  //         },
  //         {
  //           key: "form-upload",
  //           label: "File Uploads",
  //           url: "/forms/upload",
  //           parentKey: "forms",
  //         },
  //       ],
  //     },
  //     {
  //       key: "tables",
  //       label: "Tables",
  //       isTitle: false,
  //       icon: "grid",
  //       parentKey: "components",
  //       children: [
  //         {
  //           key: "table-basic",
  //           label: "Basic Tables",
  //           url: "/tables/basic",
  //           parentKey: "tables",
  //         },
  //         {
  //           key: "table-advanced",
  //           label: "Advanced Tables",
  //           url: "/tables/advanced",
  //           parentKey: "tables",
  //         },
  //       ],
  //     },
  //     {
  //       key: "maps",
  //       label: "Maps",
  //       isTitle: false,
  //       icon: "map",
  //       parentKey: "components",
  //       children: [
  //         {
  //           key: "maps-googlemaps",
  //           label: "Google Maps",
  //           url: "/maps/googlemaps",
  //           parentKey: "maps",
  //         },
  //         {
  //           key: "maps-vectormaps",
  //           label: "Vector Maps",
  //           url: "/maps/vectormaps",
  //           parentKey: "maps",
  //         },
  //       ],
  //     },
  //     {
  //       key: "menu-levels",
  //       label: "Menu Levels",
  //       isTitle: false,
  //       icon: "share-2",
  //       parentKey: "components",
  //       children: [
  //         {
  //           key: "menu-levels-1-1",
  //           label: "Level 1.1",
  //           url: "/",
  //           parentKey: "menu-levels",
  //           children: [
  //             {
  //               key: "menu-levels-2-1",
  //               label: "Level 2.1",
  //               url: "/",
  //               parentKey: "menu-levels-1-1",
  //               children: [
  //                 {
  //                   key: "menu-levels-3-1",
  //                   label: "Level 3.1",
  //                   url: "/",
  //                   parentKey: "menu-levels-2-1",
  //                 },
  //                 {
  //                   key: "menu-levels-3-2",
  //                   label: "Level 3.2",
  //                   url: "/",
  //                   parentKey: "menu-levels-2-1",
  //                 },
  //               ],
  //             },
  //             {
  //               key: "menu-levels-2-2",
  //               label: "Level 2.2",
  //               url: "/",
  //               parentKey: "menu-levels-1-1",
  //             },
  //           ],
  //         },
  //         {
  //           key: "menu-levels-1-2",
  //           label: "Level 1.2",
  //           url: "/",
  //           parentKey: "menu-levels",
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   key: "widgets",
  //   label: "Widgets",
  //   isTitle: false,
  //   icon: "gift",
  //   url: "/components/widgets",
  // },
];

export { MENU_ITEMS, TWO_COl_MENU_ITEMS, HORIZONTAL_MENU_ITEMS };
