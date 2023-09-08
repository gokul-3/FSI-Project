import React, { useEffect, useState } from "react";
import ListCard from "../Cards/ListCard";
import CustomerCountCard from "../Cards/CountCard";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ErrorPageTemplate from "../../../Layouts/ErrorPages/ErrorPageTemplate";
import { HttpStatusCode } from "axios";
import { customerAdminActions } from "../../../Store/customerAdmin-slice";
import { useNavigate } from "react-router-dom";
import axios from "../../../axios";

const CustomerAdminDashboard = () => {
  const { userRole, name, customerId } = useSelector((state) => state.profile);
  const customerAdminData = useSelector((state) => state.customerAdmin);
  const [fetchError, setFetchError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCustomerAdminDashBoardData = async () => {
      const dashboardData = (
        await axios.get(`dashboard/customerAdmin/${customerId}`)
      ).data;
      dispatch(
        customerAdminActions.setCustomerDashboardData({
          userCount: dashboardData.userCount,
          activeUsers: dashboardData.activeUsers,
          newUsers: dashboardData.newUsers,
        })
      );
    };
    try {
      if (customerId) fetchCustomerAdminDashBoardData();
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

  if (userRole !== "customerAdmin")
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
        Hello, {name || "Customer"}
      </Typography>
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
