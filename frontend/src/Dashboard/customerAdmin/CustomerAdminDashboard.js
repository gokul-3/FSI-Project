import React from "react";
import ListCard from "../Cards/ListCard";
import CustomerCountCard from "../Cards/CountCard";
import { Box, Typography } from "@mui/material";
const CustomerAdminDashboard = () => {
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
          totalCustomers={{ header: "Total Customers", count: "12" }}
          recentlyActive={{ header: "Recently Active (7 days)", count: "4" }}
        />
        <ListCard />
      </Box>
    </>
  );
};

export default CustomerAdminDashboard;
