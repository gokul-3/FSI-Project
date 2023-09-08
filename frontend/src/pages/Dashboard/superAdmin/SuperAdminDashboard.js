import React, { useEffect, useState } from "react";
import SuperAdminCountCard from "../Cards/CountCard";
import TierCard from "../Cards/ActivityCard";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ErrorPageTemplate from "../../../Layouts/ErrorPages/ErrorPageTemplate";
import { HttpStatusCode } from "axios";
import axios from "../../../axios";
import { superAdminActions } from "../../../Store/superAdmin-slice";
const SuperAdminDashboard = () => {
  const { userRole, name } = useSelector((state) => state.profile);
  const superDashboardData = useSelector((state) => state.superAdmin);
  const [fetchError, setFetchError] = useState({});
  const dispatch = useDispatch();

  const isAccessTokenPresent = localStorage.getItem("accesstoken") !== null;

  useEffect(() => {
    const fetchSuperAdminDashBoardData = async () => {
      const dashboardData = (await axios.get("dashboard/superAdmin")).data;
      console.log(dashboardData);
      dispatch(
        superAdminActions.setSuperAdminDashboardData({
          customerCount: dashboardData.customerCount,
          activeStatus: dashboardData.activeStatus,
          mostUsers: dashboardData.mostUsers,
          leastUsers: dashboardData.leastUsers,
        })
      );
    };
    try {
      if (isAccessTokenPresent) fetchSuperAdminDashBoardData();
    } catch (error) {
      console.log(error);
      if (error.request) {
        const statusCode = error.request.status;
        if (statusCode === HttpStatusCode.InternalServerError) {
          setFetchError({
            header: "Internal Server Error",
            code: HttpStatusCode.InternalServerError,
          });
        } else if (statusCode === HttpStatusCode.BadRequest) {
          setFetchError({
            header: "Bad Request Error",
            code: HttpStatusCode.BadRequest,
          });
        } else if (statusCode === HttpStatusCode.NotFound) {
          setFetchError({
            header: "Server Not Found",
            code: HttpStatusCode.NotFound,
          });
        } else if (statusCode === HttpStatusCode.Unauthorized) {
          navigate("/login");
        } else {
          console.log(error);
        }
      }
    }
  }, []);
  if (Object.keys(fetchError).length !== 0)
    return (
      <ErrorPageTemplate header={fetchError.header} code={fetchError.code} />
    );
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
        Hello, {name || "Super Admin"}
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
export default SuperAdminDashboard;
