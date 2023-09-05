import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SuperAdminDashboard from "./userTypes/superAdmin/SuperAdminDashboard";
import RootLayout from "./layouts/rootLayout/RootLayout";
import { ThemeProvider } from "@emotion/react";
import { Button, createTheme } from "@mui/material";
import CustomerAdminDashboard from "./userTypes/customerAdmin/CustomerAdminDashboard";
import SupervisorDashboard from "./userTypes/supervisor/SupervisorDashboard";
import UserDashboard from "./userTypes/user/UserDashboard";
import CustomersList from "./userTypes/superAdmin/CustomersList";
import { FormModal } from "./components/addUserForm/addUserForm";

const router = createBrowserRouter([
  {
    path: "/",
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
  const [open, setOpen] = useState(false);
  return (
    // <ThemeProvider theme={theme}>
    //   <RouterProvider router={router} />
    // </ThemeProvider>
    <>
    <Button onClick={()=> setOpen(!open)}>model</Button>
    <FormModal openModal={open} setOpenModal={setOpen} firmName="amazon"/></>
  );
};

export default App;
