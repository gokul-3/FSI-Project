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
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../../Store/profile-slice";
import store from "../../Store";
import { HttpStatusCode } from "axios";
import { superAdminActions } from "../../Store/superAdmin-slice";
import { customerAdminActions } from "../../Store/customerAdmin-slice";
import { setProfileInfo } from "../../Store/profileSetter";

const drawerWidth = 240;
const profileRoute = "auth/getUserData";

const RootLayout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.profile);
  const dashboardActions = {
    superAdmin: superAdminActions.setSuperAdminDashboardData,
    customerAdmin: customerAdminActions.setCustomerDashboardData,
  };
  const isAccessTokenPresent = localStorage.getItem("accesstoken") !== null;
  // setTimeout(()=> {
  // logout
  // }, [expiryDate - new Date()])
  useEffect(() => {
    console.log("rendered");
    const fetchProfileInfo = async () => {
      try {
        const profileInfo = (await axios.get("dashboard")).data;
        setProfileInfo(profileInfo);
      } catch (error) {
        console.log(error);
        if (error.request) {
          const statusCode = error.request.status;
          if (statusCode === HttpStatusCode.InternalServerError) {
            //
          } else if (statusCode === HttpStatusCode.BadRequest) {
            //
          } else if (statusCode === HttpStatusCode.NotFound) {
            //
          } else if (statusCode === HttpStatusCode.Unauthorized) {
            //
          } else {
            console.log(error);
          }
        }
      }
    };
    if (isAccessTokenPresent) fetchProfileInfo();
    else navigate("/login");
  }, [isAccessTokenPresent, isLoggedIn]);
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
          <Box p={1}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default RootLayout;
