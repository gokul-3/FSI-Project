import React, { useEffect } from "react";
import {
  Navigate,
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
import moment from "moment";
import BackdropLoader from "./BackdropLoader";
import ErrorPageTemplate from "../ErrorPages/ErrorPageTemplate";

const drawerWidth = 240;
const profileRoute = "auth/getUserData";

const RootLayout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, userId } = useSelector((state) => state.profile);
  const dashboardActions = {
    superAdmin: superAdminActions.setSuperAdminDashboardData,
    customerAdmin: customerAdminActions.setCustomerDashboardData,
  };

  const isAccessTokenPresent = localStorage.getItem("accesstoken") !== null;
  useEffect(() => {
    console.log("rendered");
    const fetchProfileInfo = async () => {
      try {
        const changeToken = async () => {
          const expireTime = new Date(localStorage.getItem("expirydate"));
          setTimeout(async () => {
            const refreshToken = localStorage.getItem("refreshtoken");
            console.log(refreshToken);
            if (!refreshToken) {
              localStorage.clear();
              await axios.post("auth/logout", { id: userId });
              dispatch(profileActions.logout());
              navigate("/login");
            }
            try {
              if (isLoggedIn) {
                const headers = {
                  Authorization: "Bearer " + refreshToken,
                };
                const res = await axios.post("/auth/refresh", {}, { headers });
                localStorage.setItem("accesstoken", res.data.accessToken);
                const expiryDate = moment().add(15, "m").toDate();
                localStorage.setItem("expirydate", expiryDate.toString());
                changeToken();
              }
            } catch (error) {
              localStorage.clear();
              if (error) navigate("/login");
            }
          }, [expireTime - new Date()]);
        };
        changeToken();
        const profileInfo = (await axios.get("/dashboard")).data;
        console.log(profileInfo);
        setProfileInfo(profileInfo);
      } catch (error) {
        console.log(error);
        if (error.request) {
          const statusCode = error.request.status;
          if (statusCode === HttpStatusCode.InternalServerError) {
            navigate("/internal-server-error");
          } else if (statusCode === HttpStatusCode.BadRequest) {
            navigate("/bad-request");
          } else if (statusCode === HttpStatusCode.NotFound) {
            navigate("/server-not-found"); 
          } else if (statusCode === HttpStatusCode.Unauthorized) {
            navigate("/login")
          } else {
            console.log(error);
          }
        }
      }
    };
    if (isAccessTokenPresent) fetchProfileInfo();
    else navigate("/login");
  }, [isAccessTokenPresent, isLoggedIn]);
  if (!isLoggedIn && isAccessTokenPresent) {
    return <BackdropLoader open={true} />;
  }
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
