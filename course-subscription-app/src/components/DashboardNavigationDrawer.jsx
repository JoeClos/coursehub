import { useCallback } from "react";
import {
  Box,
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PropTypes from "prop-types";

import { useIsMobile } from "../utils/useIsMobile";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

const DashboardNavigationDrawer = ({
  navItems,
  handleLogout,
  drawerOpen,
  toggleDrawer,
  drawerWidth,
  location,
}) => {
  const isMobile = useIsMobile();
  const isActiveRoute = useCallback(
    (path) => {
      if (path === "/") {
        return location.pathname === "/dashboard" || location.pathname === "/";
      }
      return location.pathname.startsWith(`/dashboard/${path}`);
    },
    [location.pathname]
  );

  // Drawer Content
  const drawerContent = (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar />
      <Divider />
      <List sx={{ flexGrow: 1, py: 8 }}>
        {navItems.map((item) => (
          <ListItemButton
            key={item.to}
            component={Link}
            to={item.to}
            sx={{
              borderRadius: "5px",
              margin: "5px",
              justifyContent: { xs: "center", sm: "flex-start" },
              backgroundColor: isActiveRoute(item.to)
                ? "#E0F2FE"
                : "transparent",
              "&:hover": { backgroundColor: "#E0F2FE" },
            }}
          >
            <ListItemIcon
              sx={{
                color: isActiveRoute(item.to) ? "#2F6FEB" : "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                display: { xs: "none", sm: "block" },
                color: isActiveRoute(item.to) ? "#2F6FEB" : "#201F40",
              }}
            />
          </ListItemButton>
        ))}
      </List>
      <ListItemButton
        onClick={handleLogout}
        sx={{
          justifyContent: { xs: "center", sm: "flex-start" },
          mt: "auto",
          gap: 1,
          "&:hover": { backgroundColor: "#FFE0E0" },
        }}
      >
        <ListItemIcon sx={{ color: "#FF0000" }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText
          primary="Logout"
          sx={{ display: { xs: "none", sm: "block" } }}
        />
      </ListItemButton>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="navigation drawer"
    >
      <Drawer
        variant={isMobile ? "temporary" : "permanent"}
        open={!isMobile || drawerOpen}
        onClose={toggleDrawer}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            ...(isMobile && { overflowY: "auto" }),
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

DashboardNavigationDrawer.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    })
  ).isRequired,
  drawerOpen: PropTypes.bool.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
  handleLogout: PropTypes.func.isRequired,
  drawerWidth: PropTypes.number.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,};

export default DashboardNavigationDrawer;
