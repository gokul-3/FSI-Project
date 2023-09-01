import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      RootLayout
      <Outlet />
    </div>
  );
};

export default RootLayout;
