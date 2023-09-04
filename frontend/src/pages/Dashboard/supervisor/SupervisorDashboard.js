import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SupervisorDashboard = () => {
  const { userType } = useSelector((state) => state.profile);
  if (userType !== "supervisor") return <Navigate to="/login" />;

  return <div>SupervisorDashboard</div>;
};

export default SupervisorDashboard;
