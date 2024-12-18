import { useContext, useState } from "react";
// import PropTypes from "prop-types";
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
import { Link, Outlet, useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import GroupIcon from "@mui/icons-material/Group";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import AuthContext from "../../store/AuthContext";
import { useIsMobile } from "../../utils/useIsMobile";
import ScrollToTopButton from "../../components/ScrollToTopButton";

const drawerWidth = 240;

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation(); // Get current route

  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    { to: "users", icon: <GroupIcon />, text: "Users", title: "Users" },
    {
      to: "subscriptions",
      icon: <SubscriptionsIcon />,
      text: "Subscriptions",
      title: "Subscriptions",
    },
    {
      to: "courses",
      icon: <LibraryBooksIcon />,
      text: "Courses",
      title: "Courses",
    },
    {
      to: "analytics",
      icon: <LeaderboardIcon />,
      text: "Analytics",
      title: "Analytics",
    },
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
            onClick={toggleDrawer}
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
          variant={isMobile ? "temporary" : "permanent"}
          open={!isMobile || drawerOpen}
          onClose={() => setDrawerOpen(false)}
          ModalProps={{
            keepMounted: true, // Improve performance on mobile by keeping the drawer mounted
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              ...(isMobile && { overflowY: "auto" }), // Enable scrolling for mobile
            },
          }}
        >
          <div style={{ height: "100%", overflowY: "auto" }}>{drawer}</div>
        </Drawer>
      </Box>

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
          <Box
            key={item.to}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <IconButton
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
            <Typography variant="caption" sx={{ color: "#201F40", mt: 0.5 }}>
              {item.text}
            </Typography>
          </Box>
        ))}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
          <Typography variant="caption" sx={{ color: "#201F40", mt: 0.5 }}>
            Logout
          </Typography>
        </Box>
      </Box>

      {/* Page Content */}
      <Box
        component="div"
        id="scrollable-container"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: { xs: "56px", sm: 0 },
          marginLeft: { sm: `${drawerWidth}px` },
          transition: "margin-left 0.3s ease",
          overflowY: "auto",
          height: "calc(100vh - 56px)",
        }}
      >
        <Outlet />
      </Box>
      <ScrollToTopButton />
    </Box>
  );
};

export default Dashboard;
