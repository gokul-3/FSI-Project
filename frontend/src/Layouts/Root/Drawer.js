import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import {
  Groups2 as CustomersIcon,
  AccountCircle as ProfileIcon,
  Logout as LogoutIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { useNavigate } from "react-router";

export const MobileDrawer = ({
  mobileOpen = false,
  handleDrawerToggle = () => {},
  drawerWidth,
}) => {
  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: "block", sm: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
    >
      <DrawerContent />
    </Drawer>
  );
};
export const PermanentDrawer = ({ drawerWidth }) => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: "none", sm: "block" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
        },
      }}
      open
    >
      <DrawerContent />
    </Drawer>
  );
};

const superAdminSideMenu = [
  { itemName: "Dashboard", icon: <DashboardIcon />, link: "/superAdmin" },
  { itemName: "Customers", icon: <CustomersIcon />, link: "customerList" },
];
const customerAdminSideMenu = [
  { itemName: "Dashboard", icon: <DashboardIcon />, link: "/customer" },
  { itemName: "Users", icon: <CustomersIcon />, link: "/userList" },
];
const supervisorSideMenu = [
  { itemName: "Dashboard", icon: <DashboardIcon />, link: "/supervisor" },
  { itemName: "Users", icon: <CustomersIcon />, link: "/userList" },
];

const userSideMenu = [
  { itemName: "Dashboard", icon: <DashboardIcon />, link: "/user" },
];

const sideMenu = {
  superAdmin: superAdminSideMenu,
  customerAdmin: customerAdminSideMenu,
  supervisor: supervisorSideMenu,
  user: userSideMenu,
};

const DrawerContent = () => {
  const { userType } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        {sideMenu[userType].map(({ itemName, icon, link }, index) => (
          <Fragment key={index}>
            <ListItem key={itemName} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(link);
                }}
                sx={{ py: 1.5 }}
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={itemName} />
              </ListItemButton>
            </ListItem>
            {/* <Divider /> */}
          </Fragment>
        ))}
      </List>
    </Box>
  );
};
