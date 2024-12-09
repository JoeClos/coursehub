import { useContext, useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, Outlet, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon from "@mui/icons-material/Group";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AuthContext from "../../store/AuthContext";

const drawerWidth = 240;

const Dashboard = (props) => {
  // const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useContext(AuthContext);
  const location = useLocation(); // Get current route

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { to: "users", icon: <GroupIcon />, text: "Users" },
    { to: "subscriptions", icon: <SubscriptionsIcon />, text: "Subscriptions" },
    { to: "courses", icon: <LibraryBooksIcon />, text: "Courses" },
    { to: "analytics", icon: <LeaderboardIcon />, text: "Analytics" },
  ];

  const drawer = (
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
              bordeRadius: "5px",
              margin: " 5px",
              justifyContent: { xs: "center", sm: "flex-start" },
              backgroundColor: location.pathname.includes(item.to) && "#E0F2FE",
              "&:hover": { backgroundColor: "#E0F2FE" },
            }}
          >
            <ListItemIcon
              sx={{
                color: location.pathname.includes(item.to)
                  ? "#2F6FEB"
                  : "inherit",
              }}
            >
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                display: { xs: "none", sm: "block" },
                color: location.pathname.includes(item.to)
                  ? "#2F6FEB"
                  : "#201F40",
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
          color: "inherit",
        }}
      >
        <ListItemIcon sx={{ color: "inherit" }}>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText
          primary="Logout"
          sx={{
            display: { xs: "none", sm: "block" },
          }}
        />
      </ListItemButton>
    </div>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          padding: "11px",
          backgroundColor: "#201F40",
          maxWidth: { xs: "100%", sm: drawerWidth },
          left: { xs: 0 },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            // onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          ></IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, textAlign: "center" }}
          >
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation drawer"
      >
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Mobile Navigation */}
      <Box
        sx={{
          position: "fixed",
          top: 75,
          zIndex: 1400,
          display: { xs: "flex", sm: "none" },
          justifyContent: "space-around",
          alignItems: "center",
          width: "100%",
          py: 1,
          backgroundColor: "#fff",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {navItems.map((item) => (
          <IconButton
            key={item.to}
            component={Link}
            to={item.to}
            sx={{
              backgroundColor: location.pathname.includes(item.to)
                ? "#E0F2FE"
                : "transparent",
              "&:hover": { backgroundColor: "#E0F2FE" },
              color: location.pathname.includes(item.to)
                ? "#2F6FEB"
                : "#201F40",
              borderRadius: "5px",
              p: "8px",
            }}
          >
            {item.icon}
          </IconButton>
        ))}
        <IconButton
          onClick={handleLogout}
          sx={{
            color: "#201F40",
            borderRadius: "5px",
            p: "8px",
            "&:hover": { backgroundColor: "#E0F2FE" },
          }}
        >
          <LogoutIcon />
        </IconButton>
      </Box>

      {/* Page Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: { xs: "56px", sm: 0 },
          marginLeft: { sm: `${drawerWidth}px` },
          transition: "margin-left 0.3s ease",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

Dashboard.propTypes = { window: PropTypes.func };

export default Dashboard;
