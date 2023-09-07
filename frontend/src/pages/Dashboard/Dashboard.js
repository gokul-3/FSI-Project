import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SuperAdminDashboard from "./superAdmin/SuperAdminDashboard";
import CustomerAdminDashboard from "./customerAdmin/CustomerAdminDashboard";
import UserTable from "./UserList/Table";
import axios from "./../../axios";
import { HttpStatusCode } from "axios";
import { profileActions } from "../../Store/profile-slice";

const Dashboard = () => {
  const profile = useSelector((state) => state.profile);
  const dashboardElement = {
    superAdmin: <SuperAdminDashboard />,
    customerAdmin: <CustomerAdminDashboard />,
    supervisor: <UserTable />,
  };
  if (dashboardElement[profile.userRole] === undefined) return <></>;

  
  return dashboardElement[profile.userRole];
};

export default Dashboard;
