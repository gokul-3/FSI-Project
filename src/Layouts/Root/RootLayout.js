import React, { useEffect } from "react";
import {
  Outlet,
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
import { HttpStatusCode } from "axios";
import moment from "moment";
import BackdropLoader from "./BackdropLoader";

const drawerWidth = 240;

const RootLayout = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, userId } = useSelector((state) => state.profile);

  const isAccessTokenPresent = localStorage.getItem("accesstoken") !== null;
  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const changeToken = async () => {
          const expireTime = new Date(localStorage.getItem("expirydate"));
          setTimeout(async () => {
            const refreshToken = localStorage.getItem("refreshtoken");
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
        const profileInfo = (await axios.get("/user/profile")).data;
        dispatch(
          profileActions.setProfileInfo({
            userRole: profileInfo.role,
            name: profileInfo.name,
            email: profileInfo.email,
            userId: profileInfo.id,
            customerId: profileInfo.customerId,
          })
        );
      } catch (error) {
        if (error.request) {
          const statusCode = error.request.status;
          if (statusCode === HttpStatusCode.InternalServerError) {
            navigate("/internal-server-error");
          } else if (statusCode === HttpStatusCode.BadRequest) {
            navigate("/bad-request");
          } else if (statusCode === HttpStatusCode.NotFound) {
            navigate("/server-not-found");
          } else if (statusCode === HttpStatusCode.Unauthorized) {
            dispatch(profileActions.logout());
            navigate("/login");
          } else {
            console.log(error);
          }
        }
      }
    };
    if (isAccessTokenPresent) fetchProfileInfo();
    else navigate("/login");
  }, [isAccessTokenPresent]);
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
