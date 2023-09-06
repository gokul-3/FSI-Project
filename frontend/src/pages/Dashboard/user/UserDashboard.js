import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import UserTable from "../UserList/Table";

const UserDashboard = () => {
  const { userRole, name } = useSelector((state) => state.profile);
  if (userRole !== "user") return <Navigate to="/login" />;
  return <div><h1>Hello User, {name}</h1></div>;
};

export default UserDashboard;
