import store from '../../../store/store';


const admin = [
  {
    header: "Menu",
    i18n: "Menu",
  },
  {
    url: "/apps/dashboard",
    name: "Dashboard",
    slug: "dashboard",
    icon: "HomeIcon",
    i18n: "Dashboard",
  },
  {
    url: "/apps/ticket",
    name: "Ticket",
    slug: "ticket",
    icon: "InboxIcon",
    i18n: "Ticket",
  },
  {
    url: "/apps/user",
    name: "User",
    slug: "user",
    icon: "UsersIcon",
    i18n: "User",
  },
  // {
  //   url: null,
  //   name: "Configurations",
  //   slug: "todo",
  //   icon: "SettingsIcon",
  //   i18n: "Configuration",
  //   submenu: [
  //     {
  //       url: "/apps/config/category",
  //       name: "Category",
  //       slug: "category",
  //       icon: "CalendarIcon",
  //       i18n: "Master Category",
  //     },
  //     {
  //       url: "/apps/config/priority",
  //       name: "Priority",
  //       slug: "priority",
  //       icon: "CalendarIcon",
  //       i18n: "Master Priority",
  //     }
  //   ]
  // }
];

const manager = [
  {
    header: "Menu",
    i18n: "Menu",
  },
  {
    url: "/apps/dashboard",
    name: "Dashboard",
    slug: "dashboard",
    icon: "HomeIcon",
    i18n: "Dashboard",
  },
  {
    url: "/apps/ticket",
    name: "Ticket",
    slug: "ticket",
    icon: "InboxIcon",
    i18n: "Ticket",
  },
  {
    url: "/apps/user",
    name: "User",
    slug: "user",
    icon: "UsersIcon",
    i18n: "User",
  }
];

const userAndStaff = [
  {
    header: "Menu",
    i18n: "Menu",
  },
  {
    url: "/apps/dashboard",
    name: "Dashboard",
    slug: "dashboard",
    icon: "HomeIcon",
    i18n: "Dashboard",
  },
  {
    url: "/apps/ticket",
    name: "Ticket",
    slug: "ticket",
    icon: "InboxIcon",
    i18n: "Ticket",
  }
]

// let role;
// if (store.state.auth.user.roles[0].name.toLowerCase() == 'admin'){
//     role = admin;
// }else if(store.state.auth.user.roles[0].name.toLowerCase() == "manager"){
//   role = manager;
// }else if(store.state.auth.user.roles[0].name.toLowerCase() == "staff" || store.state.auth.user.roles[0].name.toLowerCase() == "user"){
//   role = userAndStaff;
// }

// export default role;

export {
    admin,
    manager,
    userAndStaff
};