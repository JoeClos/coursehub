import { useContext, useState, useEffect } from "react";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import HomeIcon from "@mui/icons-material/Home";
import AuthContext from "../../store/AuthContext";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import { useUsers } from "../../store/UserContext";
import { useCart } from "../../store/CartContext";
import { useCourses } from "../../store/CourseContext";
import SummarySection from "../../components/SummarySection";
import DashboardNavigationDrawer from "../../components/DashboardNavigationDrawer";
import DashboardMobileNavigationBar from "../../components/DashboardMobileNavigationBar";

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

// const isActiveRoute = (path) => {
//   if (path === "/") {
//     return location.pathname === "/dashboard" || location.pathname === "/";
//   }
//   return location.pathname.startsWith(`/dashboard/${path}`);
// };

const Dashboard = () => {
  const drawerWidth = 240;
  const { logout } = useContext(AuthContext);
  const location = useLocation(); // Get current route
  const { users } = useUsers();
  const { subscriptions } = useCart();
  console.log("🚀 ~ Dashboard ~ subscriptions:", subscriptions)
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

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  const handleLogout = () => {
    logout();
  };

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

      {/* Sidebar Navigation  */}
      <DashboardNavigationDrawer
        drawerWidth={drawerWidth}
        navItems={navItems}
        drawerOpen={drawerOpen}
        toggleDrawer={toggleDrawer}
        location={location}
        handleLogout={handleLogout}
      />

      {/* Mobile navigation bar */}
      <DashboardMobileNavigationBar
        navItems={navItems}
        // isActiveRoute={isActiveRoute}
        location={location}
        handleLogout={handleLogout}
      />

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
