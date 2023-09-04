import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserDashboard = () => {
  const { userType } = useSelector((state) => state.profile);
  if (userType !== "user") return <Navigate to="/login" />;
  return <div>UserDashboard</div>;
};

export default UserDashboard;
