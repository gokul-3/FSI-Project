import React from "react";
import CodeIcon from "@mui/icons-material/Code";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Divider,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  Logout as LogoutIcon,
  Person2 as ProfileIcon,
} from "@mui/icons-material";
import { useNavigate, useNavigation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { profileActions } from "../../Store/profile-slice";
import axios from "../../axios";
import NavigationLoader from "./NavigationLoader";
const INTERNAL_SERVER_ERROR = 500;

const Navbar = ({ handleDrawerToggle, drawerWidth }) => {
  const navigate = useNavigate();
  const { state } = useNavigation();
  const [accountMenuAnchor, setAccountMenuAnchor] = React.useState(null);
  const { userRole } = useSelector((state) => state.profile);
  const openAccountMenu = Boolean(accountMenuAnchor);
  const dispatch = useDispatch();

  const handleMenuClick = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAccountMenuAnchor(null);
  };
  const logoutUser = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      };
      await axios.get("auth/logout", { headers });
      dispatch(profileActions.logout());
      navigate("/login");
    } catch (error) {
      dispatch(profileActions.logout());
      navigate("/login");
    }
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Typography
          noWrap
          display="flex"
          alignItems="center"
          gap="9px"
          component="div"
          fontWeight="500"
          fontSize="26px"
          sx={{ cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
        >
          <CodeIcon fontSize="large" />
          FSI
        </Typography>
        <IconButton onClick={handleMenuClick}>
          <Avatar sx={{ bgcolor: "transparent" }}>
            <AccountCircle fontSize="large" />
          </Avatar>
        </IconButton>
        <Menu
          anchorEl={accountMenuAnchor}
          open={openAccountMenu}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              handleMenuClose();
              navigate("/profile");
            }}
          >
            <ProfileIcon fontSize="medium" color="action" sx={{ mr: 2 }} />
            Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={logoutUser}>
            <LogoutIcon fontSize="medium" color="action" sx={{ mr: 2 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
        {/* <NavigationLoader open={state === "loading"}/> */}
    </AppBar>
  );
};

export default Navbar;
