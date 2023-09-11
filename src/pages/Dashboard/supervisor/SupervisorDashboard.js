import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import CustomerAdminDashboard from "../customerAdmin/CustomerAdminDashboard";
import UserTable from "../UserList/Table";

const SupervisorDashboard = () => {
  const { userRole } = useSelector((state) => state.profile);

  return <UserTable/>;
};

export default SupervisorDashboard;
