import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import "./App.css";

import SuperAdminDashboard from "./Dashboard/superAdmin/SuperAdminDashboard";
import RootLayout from "./Layouts/Root/RootLayout";
import CustomerAdminDashboard from "./Dashboard/customerAdmin/CustomerAdminDashboard";
import SupervisorDashboard from "./Dashboard/supervisor/SupervisorDashboard";
import UserDashboard from "./Dashboard/user/UserDashboard";
import CustomersList from "./Dashboard/superAdmin/CustomersList";
import URLNotFoundError from "./Layouts/ErrorPages/URLNotFoundError";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <URLNotFoundError />,
    element: <RootLayout />,
    children: [
      {
        path: "superAdmin",
        children: [
          { index: true, element: <SuperAdminDashboard /> },
          { path: "customerList", element: <CustomersList /> },
        ],
      },
      {
        path: "customer",
        children: [
          { index: true, element: <CustomerAdminDashboard /> },
          { path: "customerAdminList", element: <></> },
          { path: "userList", element: <></> },
          { path: "supervisorList", element: <></> },
        ],
      },
      {
        path: "user",
        children: [{ index: true, element: <UserDashboard /> }],
      },
      {
        path: "supervisor",
        children: [
          { index: true, element: <SupervisorDashboard /> },
          { path: "userList", element: <></> },
        ],
      },
    ],
  },
]);

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
});
const App = () => {
  useEffect(() => {});
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
