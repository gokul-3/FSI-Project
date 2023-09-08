import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import "./App.css";

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
import ErrorPageTemplate from "./Layouts/ErrorPages/ErrorPageTemplate";
import UserProfile from "./pages/profile/userProfile";
import Login from "./pages/Auth/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import RedirectToDashboard from "./pages/Auth/RedirectToDashboard";
import UserTable from "./pages/Dashboard/UserList/Table";
import Dashboard from "./pages/Dashboard/Dashboard";
import { HttpStatusCode } from "axios";
const UNAUTHORISED_ERROR = 401;

// const router = createBrowserRouter([
//   {
//     path: "/",
//     // errorElement: <URLNotFoundError />,
//     element: <RootLayout />,
//     loader: profileLoader,
//     children: [
//       { index: true, element: <RedirectToDashboard /> },
//       { path: "profile", element: <UserProfile /> },
//       {
//         path: "superAdmin",
//         children: [
//           {
//             index: true,
//             loader: superAdminDashboardLoader,
//             element: <SuperAdminDashboard />,
//           },
//           { path: "customers", element: <CustomersList /> },
//           {path:"customers/:customerId",element:<UserTable/>}
//         ],
//       },
//       {
//         path: "customerAdmin",
//         children: [
//           {
//             index: true,
//             loader: customerAdminDashboardLoader,
//             element: <CustomerAdminDashboard />,
//           },
//           { path: "operator",

//            element: <UserTable/> },
//         ],
//       },
//       {
//         path: "operator",
//         children: [{ index: true, element: <UserDashboard /> }],
//       },
//       {
//         path: "supervisor",
//         children: [
//           { index: true, element: <SupervisorDashboard /> },
//           { path: "operator", element: <UserTable/> },
//         ],
//       },
//     ],
//   },
//   { path: "login", element: <Login /> },
//   { path: "forgotpassword", element: <ForgotPassword /> },
//   { path: "resetpassword/:token", element: <ResetPassword /> },
// ]);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "/customers",
        element: <CustomersList />,
      },
      {
        path: "/users",
        element: <UserTable />,
      },
      {
        path: "/customers/:customerId/",
        element: <UserTable />,
      },
      { path: "/profile", element: <UserProfile /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  { path : '/internal-server-error', element: <ErrorPageTemplate code={HttpStatusCode.InternalServerError} header={"Internal server Error"}/>},
  { path : '/server-not-found', element: <ErrorPageTemplate code={HttpStatusCode.NotFound} header={"Server Not Found"}/>},
  { path : '/bad-request', element: <ErrorPageTemplate code={HttpStatusCode.BadRequest} header={"Bad Request Error"}/>},
  { path : '*', element: <ErrorPageTemplate code={HttpStatusCode.NotFound} header={"Page not found"}/>},
  { path: "/forgotpassword", element: <ForgotPassword /> },
  { path: "/resetpassword/:token", element: <ResetPassword /> },
]);

const theme = createTheme({
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
});
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
