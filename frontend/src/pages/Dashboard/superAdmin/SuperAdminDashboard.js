import React from "react";
import SuperAdminCountCard from "../Cards/CountCard";
import TierCard from "../Cards/ActivityCard";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, redirect } from "react-router-dom";
import axios from "axios";
const UNAUTHORISED_ERROR = 400;
const SuperAdminDashboard = () => {
  const names = ["Emma", "Alexa", "Vika"];
  const count = ["2", "2", "2"];
  const { userRole } = useSelector((state) => state.profile);
  if (userRole !== "superAdmin") return <Navigate to="/login" />;
  return (
    <>
      <Typography
        sx={{ textAlign: { xs: "center", sm: "start" } }}
        variant="h6"
        margin="1rem"
      >
        Hello, Super Admin
      </Typography>
      <Box
        display="flex"
        justifyContent="space-evenly"
        flexDirection="column"
        flexWrap="wrap"
        gap="3rem"
      >
        <SuperAdminCountCard
          totalCustomers={{ header: "Total Customers", count: "12" }}
          recentlyActive={{ header: `Activity last 7 days`, count: "4" }}
        />
        <Box
          display="flex"
          flexWrap="wrap"
          gap="3rem"
          justifyContent="center"
          marginBottom="5rem"
        >
          <TierCard title="Top Customers" names={names} count={count} />
          <TierCard title="Emerging Customers" names={names} count={count} />
        </Box>
      </Box>
    </>
  );
};
const superAdminDashboardLoader = async () => {
  try {
    const superAdminDashboardData = await axios("dashboard/getSuperAdminData");
    
  } catch (error) {
    const statusCode = error.response.status;
    if(statusCode === UNAUTHORISED_ERROR) {
      return redirect("/login");
    }
  }
};
export default SuperAdminDashboard;