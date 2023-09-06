import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import UserTable from "../UserList/Table";

const UserDashboard = () => {
  const { userRole } = useSelector((state) => state.profile);
  if (userRole !== "user") return <Navigate to="/login" />;
  return <UserTable/>;
};

export default UserDashboard;
