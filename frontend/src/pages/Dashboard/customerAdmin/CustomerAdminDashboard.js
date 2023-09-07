import React from "react";
import ListCard from "../Cards/ListCard";
import CustomerCountCard from "../Cards/CountCard";
import { Box, Typography } from "@mui/material";
import { redirect, useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../../../Store/index";
import axios from "../../../axios";
import { profileLoader } from "../../../Layouts/Root/RootLayout";
import { profileActions } from "../../../Store/profile-slice";
import ErrorPageTemplate from "../../../Layouts/ErrorPages/ErrorPageTemplate";
import { HttpStatusCode } from "axios";
const UNAUTHORISED_ERROR = 401;

const CustomerAdminDashboard = () => {
  const { userRole, name } = useSelector((state) => state.profile);
  const customerAdminData = useSelector((state) => state.customerAdmin);
  console.log(customerAdminData);
  console.log("hello");
  if (userRole !== "customerAdmin")
    return (
      <ErrorPageTemplate
        header={"Unauthorised Error"}
        code={HttpStatusCode.Unauthorized}
      />
    );

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-evenly"
        flexWrap="wrap"
        flexDirection="column"
        gap="3rem"
        marginBottom="3rem"
        marginTop="3rem"
      >
        <CustomerCountCard
          totalCustomers={{
            header: "Total Users",
            count: customerAdminData.userCount,
          }}
          recentlyActive={{
            header: "Recently Active (7 days)",
            count: customerAdminData.activeUsers,
          }}
        />
        <ListCard userData={customerAdminData.newUsers} />
      </Box>
    </>
  );
};

export default CustomerAdminDashboard;

// export const customerAdminDashboardLoader = async () => {
//   try {
//     const { profile } = store.getState();

//     const isLoggedIn = profile.isLoggedIn;
//     let profileDataId = profile.userId;
//     let profileRole = profile.userRole;
//     const accessToken = localStorage.getItem("accesstoken");
//     const headers = {
//       Authorization: "Bearer " + accessToken,
//     };

//     if (!isLoggedIn) {
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
//       profileDataId = profileData.id;
//     }
//     if (profileRole !== "customerAdmin") return redirect("/login");
//     const customerAdminDashboardData = await axios.get(
//       `/dashboard/getCustomerData/${profileDataId}`,
//       { headers }
//     );
//     return customerAdminDashboardData.data;
//   } catch (error) {
//     const statusCode = error.response.status;
//     if (statusCode === UNAUTHORISED_ERROR) {
//       return redirect("/login");
//     }
//   }
//   // return null;
// };
