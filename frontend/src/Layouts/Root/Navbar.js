import React from "react";
import CodeIcon from "@mui/icons-material/Code";
import MenuIcon from "@mui/icons-material/Menu";
import { AppBar, Avatar, IconButton, Toolbar, Typography } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

const Navbar = ({ handleDrawerToggle, drawerWidth }) => {
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
        <Avatar sx={{ bgcolor: "transparent" }}>
          <AccountCircle fontSize="large" />
        </Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
