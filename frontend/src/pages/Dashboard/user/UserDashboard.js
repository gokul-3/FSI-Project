import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import UserTable from "../UserList/Table";

const UserDashboard = () => {
  const { userRole } = useSelector((state) => state.profile);
  if (userRole !== "operator") return <Navigate to="/login" />;
  return <>Hello user!!!</>;
};

export default UserDashboard;
