import { LuLayoutDashboard, LuClipboardCheck, LuLogOut } from "react-icons/lu";
import { MdDashboard, MdCreateNewFolder } from "react-icons/md";
import { FaTasks, FaSignOutAlt } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: MdDashboard,
    path: "/admin/dashboard",
  },
  {
    id: "03",
    label: "Create Task",
    icon: MdCreateNewFolder,
    path: "/admin/create-task",
  },
  {
    id: "02",
    label: "Manage Tasks",
    icon: FaTasks,
    path: "/admin/tasks",
  },
  {
    id: "04",
    label: "Manage Users",
    icon: FaUsersGear,
    path: "/admin/users",
  },
  {
    id: "05",
    label: "Logout",
    icon: FaSignOutAlt,
    path: "logout",
  },
];

export const SIDE_MENU_USER_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/user/dashboard",
  },
  {
    id: "02",
    label: "My Tasks",
    icon: LuClipboardCheck,
    path: "/user/tasks",
  },
  {
    id: "05",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];

export const PRIORITY_DATA = [
  { label: "Low", value: "Low" },
  { label: "Medium", value: "Medium" },
  { label: "High", value: "High" },
];

export const STATUS_DATA = [
  { label: "Pending", value: "Pending" },
  { label: "Progress", value: "Progress" },
  { label: "Complete", value: "Complete" },
];
