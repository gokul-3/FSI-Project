import React from "react";
import ListCard from "../Cards/ListCard";
import CustomerCountCard from "../Cards/CountCard";
import { Box, Typography } from "@mui/material";
import { Navigate, redirect, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../../../Store/index";
import axios from "../../../axios";
import { profileLoader } from "../../../Layouts/Root/RootLayout";
import { profileActions } from "../../../Store/profile-slice";
const UNAUTHORISED_ERROR = 401;

const CustomerAdminDashboard = () => {
  const { userRole, name } = useSelector((state) => state.profile);

  console.log('ioside customer admin');

  if (userRole !== "customerAdmin") return <Navigate to="/login" />;
  const customerDashboardData = useLoaderData();

  return (
    <>
      <Typography
        sx={{ textAlign: { xs: "center", sm: "start" } }}
        variant="h6"
        margin="1rem"
      >
        Hello, {name}
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
    const accessToken = localStorage.getItem('accesstoken');
    const headers = {
      "Authorization": "Bearer " + accessToken
    }

    if (!isLoggedIn) {
      const profileData = (
        await axios.get("http://localhost:5000/auth/getUserData", { headers })
      ).data;
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
      `http://localhost:5000/dashboard/getCustomerData/${profileDataId}`, { headers }
    );
    console.log("customer admin dashboard", customerAdminDashboardData);
    return customerAdminDashboardData.data;
  } catch (error) {
    console.log(error);
    const statusCode = error.response.status;
    if (statusCode === UNAUTHORISED_ERROR) {


      // const refreshToken  = axios.get('http://localhost:5000/refresh',{},{header})
      return redirect("/login");
    }
  }
  // return null;
};
