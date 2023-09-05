import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import "./App.css";

import axios from "./axios";
import SuperAdminDashboard, {
  superAdminDashboardLoader,
} from "./pages/Dashboard/superAdmin/SuperAdminDashboard";
import RootLayout, { profileLoader } from "./Layouts/Root/RootLayout";
import CustomerAdminDashboard, {
  customerAdminDashboardLoader,
} from "./pages/Dashboard/customerAdmin/CustomerAdminDashboard";
import SupervisorDashboard from "./pages/Dashboard/supervisor/SupervisorDashboard";
import UserDashboard from "./pages/Dashboard/user/UserDashboard";
import CustomersList from "./pages/Dashboard/superAdmin/Customers/CustomersList";
import URLNotFoundError from "./Layouts/ErrorPages/URLNotFoundError";
import UserProfile from "./pages/profile/userProfile";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
const UNAUTHORISED_ERROR = 400;

const router = createBrowserRouter([
  {
    path: "/",
    // errorElement: <URLNotFoundError />,
    element: <RootLayout />,
    // loader: profileLoader,
    children: [
      { index: true, element: <Navigate to="/login" /> },
      { path: "profile", element: <UserProfile /> },
      {
        path: "superAdmin",
        children: [
          {
            index: true,
            loader: superAdminDashboardLoader,
            element: <SuperAdminDashboard />,
          },
          { path: "customerList", element: <CustomersList /> },
        ],
      },
      {
        path: "customerAdmin",
        children: [
          {
            index: true,
            loader: customerAdminDashboardLoader,
            element: <CustomerAdminDashboard />,
          },
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
  { path: "login", element: <Login /> },
  { path: "forgotpassword", element: <ForgotPassword /> },
  { path: "resetpassword/:token", element: <ResetPassword /> },
]);

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
});
const App = () => {
  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
