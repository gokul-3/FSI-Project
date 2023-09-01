import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SuperAdminDashboard from "./userTypes/superAdmin/SuperAdminDashboard";
import RootLayout from "./layouts/rootLayout/RootLayout";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import CustomerAdminDashboard from "./userTypes/customerAdmin/CustomerAdminDashboard";
import SupervisorDashboard from "./userTypes/supervisor/SupervisorDashboard";
import UserDashboard from "./userTypes/user/UserDashboard";
import CustomersList from "./userTypes/superAdmin/CustomersList";

const superAdminRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <SuperAdminDashboard /> },
      { path: "customers", element: <CustomersList /> },
    ],
  },
]);
const customerAdminRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <CustomerAdminDashboard /> }],
  },
]);
const supervisorRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <SupervisorDashboard /> }],
  },
]);
const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <UserDashboard /> }],
  },
]);
const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
});

const routers = {
  "super-admin": superAdminRouter,
  "customer-admin": customerAdminRouter,
  user: userRouter,
  supervisor: supervisorRouter,
};

const App = () => {
  const userType = "super-admin";
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={routers[userType]} />
    </ThemeProvider>
  );
};

export default App;
