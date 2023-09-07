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
import { useNavigate, useLocation } from "react-router";

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
  { itemName: "Dashboard", icon: <DashboardIcon />, link: "/" },
  { itemName: "Customers", icon: <CustomersIcon />, link: "/customers" },
];
const customerAdminSideMenu = [
  { itemName: "Dashboard", icon: <DashboardIcon />, link: "/" },
  { itemName: "Users", icon: <CustomersIcon />, link: "/users" },
];
const supervisorSideMenu = [
  { itemName: "Users", icon: <CustomersIcon />, link: "/" },
];
// const superAdminSideMenu = [
//   { itemName: "Dashboard", icon: <DashboardIcon />, link: "/superAdmin" },
//   { itemName: "Customers", icon: <CustomersIcon />, link: "/superAdmin/customers" },
// ];
// const customerAdminSideMenu = [
//   { itemName: "Dashboard", icon: <DashboardIcon />, link: "/customerAdmin" },
//   { itemName: "Users", icon: <CustomersIcon />, link: "/customerAdmin/users" },
// ];
// const supervisorSideMenu = [
//   // { itemName: "Dashboard", icon: <DashboardIcon />, link: "/supervisor" },
//   { itemName: "Users", icon: <CustomersIcon />, link: "/supervisor" },
// ];

const operatorSideMenu = [
  { itemName: "Dashboard", icon: <DashboardIcon />, link: "/" },
];

const sideMenu = {
  superAdmin: superAdminSideMenu,
  customerAdmin: customerAdminSideMenu,
  supervisor: supervisorSideMenu,
  operator: operatorSideMenu,
};

const DrawerContent = () => {
  const { userRole } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const location = useLocation()
  if(!userRole){return navigate('/login')};
  return (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        {sideMenu[userRole].map(({ itemName, icon, link }, index) => (
          <Fragment key={index}>
            <ListItem key={itemName} disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate(link);
                }}
                sx={{ py: 1.5, bgcolor:  link === location.pathname ? "#80808054" : "white"}}
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
