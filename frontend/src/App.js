import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SuperAdminDashboard from "./userTypes/superAdmin/dashboard/SuperAdminDashboard";
import RootLayout from "./layouts/rootLayout/RootLayout";

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

const App = () => {
  // return <SuperAdminDashboard />;
  return <RouterProvider router={superAdminRouter} />;
};

export default App;
