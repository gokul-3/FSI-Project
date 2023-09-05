import React, { useEffect } from "react";
import {
  Outlet,
  json,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "./Navbar";
import { MobileDrawer, PermanentDrawer } from "./Drawer";
import axios from "../../axios";
import { useDispatch } from "react-redux";
import { profileActions } from "../../Store/profile-slice";
import store from "../../Store";

const UNAUTHORISED_ERROR = 401;
const drawerWidth = 240;

const RootLayout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navbar {...{ handleDrawerToggle, drawerWidth }} />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <MobileDrawer {...{ handleDrawerToggle, mobileOpen, drawerWidth }} />
          <PermanentDrawer {...{ drawerWidth }} />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </div>
  );
};

export default RootLayout;

export const profileLoader = async () => {
  try {
    const state = store.getState();
    const isLoggedIn = state.profile.isLoggedIn;
    if (!isLoggedIn) {
      const profile = await axios.get("http://localhost:5000/auth/getUserData");
      store.dispatch(
        profileActions.setProfileInfo({
          userRole: profile.data.role,
          name: profile.data.name,
          email: profile.data.email,
          userId: profile.data.id,
        })
      );
      console.log(profile);
      return profile.data;
    }
  } catch (error) {
    const statusCode = error?.response?.status;

    if (statusCode === UNAUTHORISED_ERROR) {
      return redirect("/login");
    }
  }
  return null;
};
