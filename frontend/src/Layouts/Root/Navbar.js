import React from "react";
import CodeIcon from "@mui/icons-material/Code";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  AccountCircle,
  Logout as LogoutIcon,
  Person2 as ProfileIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = ({ handleDrawerToggle, drawerWidth }) => {
  const navigate = useNavigate();
  const [accountMenuAnchor, setAccountMenuAnchor] = React.useState(null);
  const openAccountMenu = Boolean(accountMenuAnchor);
  const handleMenuClick = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAccountMenuAnchor(null);
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
          sx={{ display: "flex", alignItems: "center", gap: "9px" }}
          noWrap
          component="div"
          fontWeight="500"
          fontSize="26px"
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
              navigate('/profile');
            }}
          >
            <ProfileIcon fontSize="medium" color="action" sx={{ mr: 2 }} />
            Profile
          </MenuItem>
          <Divider />
          <MenuItem>
            <LogoutIcon fontSize="medium" color="action" sx={{ mr: 2 }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
