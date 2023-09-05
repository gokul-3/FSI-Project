import React from "react";
import SuperAdminCountCard from "../Cards/CountCard";
import TierCard from "../Cards/ActivityCard";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, redirect, useLoaderData } from "react-router-dom";
import axios from "../../../axios";
import store from "../../../Store/index";

const UNAUTHORISED_ERROR = 400;
const SuperAdminDashboard = () => {
  // const { userRole } = useSelector((state) => state.profile);
  const superDashboardData = useLoaderData();
  console.log(superDashboardData);
  // if (userRole !== "superAdmin") return <Navigate to="/login" />;
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
          totalCustomers={{ header: "Total Customers", count: superDashboardData.customerCount }}
          recentlyActive={{ header: `Activity last 7 days`, count: superDashboardData.activeStatus }}
        />
        <Box
          display="flex"
          flexWrap="wrap"
          gap="3rem"
          justifyContent="center"
          marginBottom="5rem"
        >
          <TierCard title="Top Customers" customerData={superDashboardData.mostUsers} />
          <TierCard title="Emerging Customers" customerData={superDashboardData.leastUsers} />
        </Box>
      </Box>
    </>
  );
};
export const superAdminDashboardLoader = async () => {
  try {
    const superAdminDashboardData = await axios.get("http://192.168.53.116:5000/dashboard/getSuperAdminData");
    console.log(superAdminDashboardData);
    return superAdminDashboardData.data;
  } catch (error) {
    const statusCode = error.response.status;
    if(statusCode === UNAUTHORISED_ERROR) {
      return redirect("/login");
    }
  }
  
  
};
export default SuperAdminDashboard;