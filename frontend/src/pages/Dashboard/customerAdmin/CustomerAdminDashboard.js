import React from "react";
import ListCard from "../Cards/ListCard";
import CustomerCountCard from "../Cards/CountCard";
import { Box, Typography } from "@mui/material";
import { Navigate, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../../../Store/index";
import axios from "../../../axios";
import { profileLoader } from "../../../Layouts/Root/RootLayout";
import { profileActions } from "../../../Store/profile-slice";
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
    const isLoggedIn = profile.isLoggedIn;
    let profileDataId = profile.userId;
    if (!isLoggedIn) {
      const profileData = (await axios.get("http://192.168.53.116:5000/auth/getUserData")).data;
      store.dispatch(
        profileActions.setProfileInfo({
          userRole: profileData.role,
          name: profileData.name,
          email: profileData.email,
          userId: profileData.id,
        })
      );
      profileDataId = profileData.id;
    }
    const customerAdminDashboardData = await axios.get(
      `http://192.168.53.116:5000/dashboard/getCustomerData/${profileDataId}`
    );
    console.log(customerAdminDashboardData.data);
    return customerAdminDashboardData.data;
  } catch (error) {
    console.log(error);
    const statusCode = error.response.status;
    if (statusCode === UNAUTHORISED_ERROR) {
      return redirect("/login");
    }
  }
  return null;
};
