import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const SupervisorDashboard = () => {
  const { userRole } = useSelector((state) => state.profile);
  if (userRole !== "supervisor") return <Navigate to="/login" />;

  return <div>SupervisorDashboard</div>;
};

export default SupervisorDashboard;
