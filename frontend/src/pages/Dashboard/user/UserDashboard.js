import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import UserTable from "../UserList/Table";
import { Typography } from "@mui/material";

const UserDashboard = () => {
  const { userRole, name } = useSelector((state) => state.profile);
  if (userRole !== "operator") return <Navigate to="/login" />;
  return (
    <Typography
      variant="h4"
      textAlign="center"
      margin="1rem"
    >
      Hello, {name || "Operator"}
    </Typography>
  );
};

export default UserDashboard;
