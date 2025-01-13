import { useContext, useState, useEffect } from "react";
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
import HomeIcon from "@mui/icons-material/Home";
import AuthContext from "../../store/AuthContext";
import { useIsMobile } from "../../utils/useIsMobile";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import { useUsers } from "../../store/UserContext";
import { useCart } from "../../store/CartContext";
import { useCourses } from "../../store/CourseContext";
import SummarySection from "../../components/SummarySection";

const drawerWidth = 240;
const navItems = [
  { to: "/", icon: <HomeIcon />, text: "Home", title: "Home" },
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

const isActiveRoute = (path) => {
  if (path === "/") {
    return location.pathname === "/dashboard" || location.pathname === "/";
  }
  return location.pathname.startsWith(`/dashboard/${path}`);
};

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const location = useLocation(); // Get current route
  const { users } = useUsers();
  const { subscriptions } = useCart();
  const { courses } = useCourses();
  const [summary, setSummary] = useState({
    users: 0,
    subscriptions: 0,
    courses: 0,
    analytics: 0,
  });

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const fetchedSummary = {
          users: users.length,
          subscriptions: subscriptions.length,
          courses: courses.length,
          analytics: "",
        };
        setSummary(fetchedSummary);
      } catch (error) {
        console.error("Failed to fetch summary data", error);
      }
    };

    fetchSummaryData();
  }, [users, subscriptions, courses]);

  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
  };

  const drawer = (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Toolbar />
      <Divider />
      {/* <List sx={{ flexGrow: 1, py: 8 }}> */}
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
      {/* </List> */}
      <ListItemButton
        onClick={handleLogout}
        sx={{
          justifyContent: { xs: "center", sm: "flex-start" },
          mt: "auto",
          gap: 1,
          "&:hover": { backgroundColor: "#E0F2FE" },
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

  // Determine whether to show the summary section based on the current path
  const hideSummaryPages = [
    "/dashboard/users",
    "/dashboard/subscriptions",
    "/dashboard/courses",
    "/dashboard/analytics",
    "/dashboard/courses/add",
    "/dashboard/courses/update",
  ];

  const shouldHideSummary = hideSummaryPages.some((path) =>
    location.pathname.startsWith(path)
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
            component={Link}
            to={"/dashboard"}
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              textAlign: "center",
              color: "#FFFFFF",
              textDecoration: "none",
            }}
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
            keepMounted: true,
          }}
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              ...(isMobile && { overflowY: "auto" }),
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
                backgroundColor: isActiveRoute(item.to)
                  ? "#E0F2FE"
                  : "transparent",
                "&:hover": { backgroundColor: "#E0F2FE" },
                color: isActiveRoute(item.to) ? "#2F6FEB" : "#201F40",
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
        }}
      >
        {/* Conditionally render the Summary section */}
        {!shouldHideSummary && <SummarySection summary={summary} />}

        {/* Render the content of the selected route */}
        <Outlet />
      </Box>

      <ScrollToTopButton />
    </Box>
  );
};

export default Dashboard;
