import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SuperAdminDashboard from "./userTypes/superAdmin/dashboard/SuperAdminDashboard";
import RootLayout from "./layouts/rootLayout/RootLayout";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

const superAdminRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [{ index: true, element: <SuperAdminDashboard /> }],
  },
]);
// const customerAdminRouter = createBrowserRouter([{ path: "/" }]);
// const supervisorRouter = createBrowserRouter([{ path: "/" }]);
// const userRouter = createBrowserRouter([{ path: "/" }]);
const theme = createTheme({
  typography: {
    // In Chinese and Japanese the characters are usually larger,
    // so a smaller fontsize may be appropriate.
    fontFamily: "'Montserrat', sans-serif",
  },
});

const App = () => {
  // return <SuperAdminDashboard />;

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={superAdminRouter} />
    </ThemeProvider>
  );
};

export default App;
