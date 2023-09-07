import React from "react";
import ListCard from "../Cards/ListCard";
import CustomerCountCard from "../Cards/CountCard";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";
import ErrorPageTemplate from "../../../Layouts/ErrorPages/ErrorPageTemplate";
import { HttpStatusCode } from "axios";

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

