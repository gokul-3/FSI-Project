import React from "react";
import SuperAdminCountCard from "../Cards/CountCard";
import TierCard from "../Cards/ActivityCard";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import ErrorPageTemplate from "../../../Layouts/ErrorPages/ErrorPageTemplate";
import { HttpStatusCode } from "axios";

const SuperAdminDashboard = () => {
  const { userRole } = useSelector((state) => state.profile);
  const superDashboardData = useSelector((state) => state.superAdmin);
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
export default SuperAdminDashboard;
