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
  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const expireTime = new Date(localStorage.getItem('expirydate'))
        setTimeout(async () => {
          const refreshToken = localStorage.getItem('refreshtoken')
          if (!refreshToken) {
            localStorage.clear()
             navigate('/login')
          }
          try {
            const headers = {
              'Authorization' :"Bearer "+ refreshToken
            }
            const { accessToken } = await axios.post('/auth/refresh', {}, {headers})
            localStorage.setItem('accesstoken', accessToken)
            const expiryDate = moment().add(15, "m").toDate();
            localStorage.setItem("expirydate", expiryDate.toString());
          } catch (error) {
            localStorage.clear()
             navigate('/login')
          }
    
        }, [expireTime - new Date()])

        const profileInfo = (await axios.get("auth/user-data")).data;
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
// export const profileLoader = async () => {
//   try {
//     const state = store.getState();
//     const isLoggedIn = state.profile.isLoggedIn;

//     if (!isLoggedIn) {
//       const headers = {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
//       };
//       const profile = await axios.get("/auth/getUserData", { headers });
//       store.dispatch(
//         profileActions.setProfileInfo({
//           userRole: profile.data.role,
//           name: profile.data.name,
//           email: profile.data.email,
//           userId: profile.data.id,
//           customerId: profile.data.customerId,
//         })
//       );
//       return profile.data;
//     }
//   } catch (error) {
//     const statusCode = error?.response?.status;
//     if (statusCode === UNAUTHORISED_ERROR) {
//       try {
//         const refreshToken = localStorage.getItem("refreshtoken");
//         if (!refreshToken) {
//           return redirect("/login");
//         }
//         const headers = {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${refreshToken}`,
//         };
//         await axios
//           .post("auth/refresh", { headers })
//           .then((res) => {
//             console.log(res);
//           })
//           .catch((err) => {
//             console.log(err);
//           });
//         localStorage.setItem("accesstoken", accessToken);
//         const getHeaders = {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${accessToken}`,
//         };
//         const profile = await axios.get("/auth/getUserData", {
//           headers: getHeaders,
//         });
//         store.dispatch(
//           profileActions.setProfileInfo({
//             userRole: profile.data.role,
//             name: profile.data.name,
//             email: profile.data.email,
//             userId: profile.data.id,
//             customerId: profile.data.customerId,
//           })
//         );
//         return profile.data;
//       } catch (error) {
//         redirect("/login");
//       }
//     }
//   }
//   return null;
// };
