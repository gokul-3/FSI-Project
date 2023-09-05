import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Navbar from "./Navbar";
import { MobileDrawer, PermanentDrawer } from "./Drawer";
import axios from "../../axios";
import { useDispatch } from "react-redux";
import { profileActions } from "../../Store/profile-slice";

const UNAUTHORISED_ERROR = 400;
const drawerWidth = 240;

const RootLayout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate();
  useEffect(() => {
    profileLoader();
  }, []);
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

const profileLoader = async () => {
  try {
    const profile = await axios.get("auth/getUserData").catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        const statusCode = error.response.status;
        if (statusCode === UNAUTHORISED_ERROR) {
          // navigate("/login");
        }
      }
    });

    dispatch(
      profileActions.setProfileInfo({
        userType: profile.data.role,
        email: profile.data.email,
        name: profile.data.name,
        id: profile.data.id,
      })
    );
    navigate(`/${profile.data.role}`);
  } catch (error) {
    console.log(error);
  }
};
