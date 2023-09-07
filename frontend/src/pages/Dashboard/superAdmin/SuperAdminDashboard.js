import React from "react";
import SuperAdminCountCard from "../Cards/CountCard";
import TierCard from "../Cards/ActivityCard";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Navigate, redirect, useLoaderData } from "react-router-dom";
import axios from "../../../axios";
import store from "../../../Store/index";
import { profileActions } from "../../../Store/profile-slice";
import ErrorPageTemplate from "../../../Layouts/ErrorPages/ErrorPageTemplate";
import { HttpStatusCode } from "axios";

<<<<<<< HEAD
const UNAUTHORISED_ERROR = 401;
=======
>>>>>>> emman-rc
const SuperAdminDashboard = () => {
  const { userRole } = useSelector((state) => state.profile);
  const superDashboardData = useSelector((state) => state.superAdmin);
  console.log(userRole);
  if (userRole !== "superAdmin")
    return (
      <ErrorPageTemplate
        header={"Unauthorised Error"}
        code={HttpStatusCode.Unauthorized}
      />
    );
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
          totalCustomers={{
            header: "Total Customers",
            count: superDashboardData.customerCount,
          }}
          recentlyActive={{
            header: `Activity last 7 days`,
            count: superDashboardData.activeCustomers,
          }}
        />
        <Box
          display="flex"
          flexWrap="wrap"
          gap="3rem"
          justifyContent="center"
          marginBottom="5rem"
        >
          <TierCard
            title="Top Customers"
            customerData={superDashboardData.mostUsers}
          />
          <TierCard
            title="Emerging Customers"
            customerData={superDashboardData.leastUsers}
          />
        </Box>
      </Box>
    </>
  );
};
<<<<<<< HEAD
export const superAdminDashboardLoader = async () => {
  try {
    const accessToken = localStorage.getItem('accesstoken');
    const headers = {
      "Authorization": "Bearer " + accessToken
    }
    const superAdminDashboardData = await axios.get(
      "/dashboard/getSuperAdminData", { headers }
    );
    console.log(superAdminDashboardData);
    return superAdminDashboardData.data;
  } catch (error) {
    console.log(error);
    const statusCode = error.response.status;
    if (statusCode === UNAUTHORISED_ERROR) {
      const refreshToken = localStorage.getItem('refreshtoken')
      return redirect('/login')
      // if (!refreshToken) {
      //   return redirect("/login");
      // } else
      //   return redirect("/");

    }
  }
};
=======
// export const superAdminDashboardLoader = async () => {
//   try {
//     const { profile } = store.getState();

//     const accessToken = localStorage.getItem("accesstoken");
//     const headers = {
//       Authorization: "Bearer " + accessToken,
//     };
//     let profileRole = profile.userRole;
//     if (!profile.isLoggedIn) {
//       const profileData = (await axios.get("/auth/getUserData", { headers }))
//         .data;
//       store.dispatch(
//         profileActions.setProfileInfo({
//           userRole: profileData.role,
//           name: profileData.name,
//           email: profileData.email,
//           userId: profileData.id,
//         })
//       );
//       profileRole = profileData.role;
//     }
//     if (profileRole !== "superAdmin") return redirect("/login");
//     const superAdminDashboardData = await axios.get(
//       "/dashboard/getSuperAdminData",
//       { headers }
//     );
//     return superAdminDashboardData.data;
//   } catch (error) {
//     console.log(error);
//     const statusCode = error.response.status;
//     if (statusCode === UNAUTHORISED_ERROR) {
//       return redirect("/login");
//     }
//   }
// };
>>>>>>> emman-rc
export default SuperAdminDashboard;
