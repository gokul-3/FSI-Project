import React from "react";
import SuperAdminCountCard from "../Cards/CountCard";
import TierCard from "../Cards/ActivityCard";
import { Box, Typography } from "@mui/material";

const SuperAdminDashboard = () => {
  const names = ["Emma", "Alexa", "Vika"];
  const count = ["2", "2", "2"];
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
          recentlyActive={{ header: "Recently Active (7 days)", count: "4" }}
        />
        <Box
          display="flex"
          flexWrap="wrap"
          gap="3rem"
          justifyContent="center"
          marginBottom="5rem"
        >
          <TierCard title="Most Activity" names={names} count={count} />
          <TierCard title="Least Activity" names={names} count={count} />
        </Box>
      </Box>
    </>
  );
};

export default SuperAdminDashboard;
