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

const superAdminSideMenu = {
  primary: [
    { itemName: "Dashboard", icon: <DashboardIcon /> },
    { itemName: "Customers", icon: <CustomersIcon /> },
  ],
  secondary: [
    { itemName: "Profile", icon: <ProfileIcon /> },
    { itemName: "Logout", icon: <LogoutIcon /> },
  ],
};
const customerAdminSideMenu = {
  primary: [
    { itemName: "Dashboard", icon: <DashboardIcon /> },
    { itemName: "Users", icon: <CustomersIcon /> },
  ],
  secondary: [
    { itemName: "Profile", icon: <ProfileIcon /> },
    { itemName: "Logout", icon: <LogoutIcon /> },
  ],
};
const supervisorSideMenu = {
  primary: [
    { itemName: "Dashboard", icon: <DashboardIcon /> },
    { itemName: "Users", icon: <CustomersIcon /> },
  ],
  secondary: [
    { itemName: "Profile", icon: <ProfileIcon /> },
    { itemName: "Logout", icon: <LogoutIcon /> },
  ],
};

const userSideMenu = {
  primary: [{ itemName: "Dashboard", icon: <DashboardIcon /> }],
  secondary: [
    { itemName: "Profile", icon: <ProfileIcon /> },
    { itemName: "Logout", icon: <LogoutIcon /> },
  ],
};

const sideMenu = {
  "super-admin": superAdminSideMenu,
  "customer-admin": customerAdminSideMenu,
  supervisor: supervisorSideMenu,
  user: userSideMenu,
};

const DrawerContent = () => {
  const userType = "super-admin";
  return (
    <Box>
      <Toolbar />
      <Divider />
      <List>
        {sideMenu[userType].primary.map(({ itemName, icon }, index) => (
          <ListItem key={itemName} disablePadding>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={itemName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {sideMenu[userType].secondary.map(({ itemName, icon }, index) => (
          <ListItem key={itemName} disablePadding>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={itemName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
