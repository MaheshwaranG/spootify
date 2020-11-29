import { RouterPropsIF } from "./types";
import Login from "../screens/login/Login";
import DashBoard from "../screens/dashboard/Dashboard";

const PrivatePathList: RouterPropsIF[] = [
  {
    component: Login,
    exact: true,
    loggedIn: false,
    path: "/",
    redirectPath: "/app/dashboard",
    redirect: true,
    redirectCondition: true,
  },
  {
    component: Login,
    exact: true,
    loggedIn: false,
    path: "/login",
    redirectPath: "/app/dashboard",
    redirect: true,
    redirectCondition: true,
  },
  {
    component: DashBoard,
    exact: true,
    loggedIn: false,
    path: "/app/dashboard",
    redirectPath: "/login",
    redirect: true,
    redirectCondition: false,
  },
];

export default PrivatePathList;
