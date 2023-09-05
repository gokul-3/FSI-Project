import React from "react";
import ListCard from "../Cards/ListCard";
import CustomerCountCard from "../Cards/CountCard";
import { Box, Typography } from "@mui/material";
import { Navigate, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../../../Store/index";
import axios from "../../../axios";
const UNAUTHORISED_ERROR = 400;

const CustomerAdminDashboard = () => {
  const { userRole } = useSelector((state) => state.profile);

  if (userRole !== "customerAdmin") return <Navigate to="/login" />;
  const customerDashboardData = useLoaderData();

  return (
    <>
      <Typography
        sx={{ textAlign: { xs: "center", sm: "start" } }}
        variant="h6"
        margin="1rem"
      >
        Hello, Customer
      </Typography>
      <Box
        display="flex"
        justifyContent="space-evenly"
        flexWrap="wrap"
        flexDirection="column"
        gap="3rem"
        marginBottom="3rem"
      >
        <CustomerCountCard
          totalCustomers={{
            header: "Total Users",
            count: customerDashboardData.userCount,
          }}
          recentlyActive={{
            header: "Recently Active (7 days)",
            count: customerDashboardData.activeUsers,
          }}
        />
        {console.log(customerDashboardData.newUsers)}
        <ListCard userData={customerDashboardData.newUsers} />
      </Box>
    </>
  );
};

export default CustomerAdminDashboard;

export const customerAdminDashboardLoader = async () => {
  try {
    const { profile } = store.getState();
    console.log("CustomerId",profile)
    const customerAdminDashboardData = await axios(
      `dashboard/getCustomerData/${profile.userId}`
    );
    return customerAdminDashboardData.data;
  } catch (error) {
    const statusCode = error.response.status;
    if (statusCode === UNAUTHORISED_ERROR) {
      return redirect("/login");
    }
  }
};
