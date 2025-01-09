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
  Grid2,
  Card,
  CardContent,
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
import { useUsers } from "../../store/UserContext";
import { useCart } from "../../store/CartContext";
import { useCourses } from "../../store/CourseContext";

const drawerWidth = 240;

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
      const fetchedSummary = {
        users: users.length,
        subscriptions: subscriptions.length,
        courses: courses.length,
        analytics: "",
      };
      setSummary(fetchedSummary);
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
              borderRadius: "5px",
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

  // Define card styles

  const cardStyles = {
    width: { xs: "100%", sm: "200px", md: "300px" },
    maxWidth: "100%",
    height: "250px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardContentStyles = {
    color: "#fff",
    fontSize: { xs: "20px", md: "28px" },
    fontWeight: "bold",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

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
        }}
      >
        {/* Conditionally render the Summary section */}
        {!shouldHideSummary && (
          <Box
            sx={{
              flexGrow: 1,
              p: { xs: 3, sm: 0, xl: 0 },
              mt: { xs: 3, sm: 0, xl: 0 },
            }}
          >
            <Grid2
              container
              spacing={3}
              justifyContent="center"
              sx={{
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              {/* Users Summary Card */}
              <Grid2 item xs={12} sm={6} md={6}>
                <Card
                  sx={{
                    ...cardStyles,
                    backgroundColor: "#FFEB3B", // Yellow
                  }}
                >
                  <CardContent sx={cardContentStyles}>
                    <GroupIcon sx={{ fontSize: { xs: 60, md: 100 } }} />
                    <Typography variant="h4">{summary.users}</Typography>
                    <Typography variant="h6">Users</Typography>
                  </CardContent>
                </Card>
              </Grid2>

              {/* Subscriptions Summary Card */}
              <Grid2 item xs={12} sm={6} md={6}>
                <Card
                  sx={{
                    ...cardStyles,
                    backgroundColor: "#4CAF50", // Green
                  }}
                >
                  <CardContent sx={cardContentStyles}>
                    <SubscriptionsIcon sx={{ fontSize: { xs: 60, md: 100 } }} />
                    <Typography variant="h4">
                      {summary.subscriptions}
                    </Typography>
                    <Typography variant="h6">Subscriptions</Typography>
                  </CardContent>
                </Card>
              </Grid2>

              {/* Courses Summary Card */}
              <Grid2 item xs={12} sm={6} md={6}>
                <Card
                  sx={{
                    ...cardStyles,
                    backgroundColor: "#2196F3", // Blue
                  }}
                >
                  <CardContent sx={cardContentStyles}>
                    <LibraryBooksIcon sx={{ fontSize: { xs: 60, md: 100 } }} />
                    <Typography variant="h4">{summary.courses}</Typography>
                    <Typography variant="h6">Courses</Typography>
                  </CardContent>
                </Card>
              </Grid2>

              {/* Analytics Summary Card */}
              <Grid2 item xs={12} sm={6} md={6}>
                <Card
                  sx={{
                    ...cardStyles,
                    backgroundColor: "#FF5722", // Red
                  }}
                >
                  <CardContent sx={cardContentStyles}>
                    <LeaderboardIcon sx={{ fontSize: { xs: 60, md: 100 } }} />
                    <Typography variant="h4">{summary.analytics}</Typography>
                    <Typography variant="h6">Analytics</Typography>
                  </CardContent>
                </Card>
              </Grid2>
            </Grid2>
          </Box>
        )}

        {/* Render the content of the selected route */}
        <Outlet />
      </Box>

      <ScrollToTopButton />
    </Box>
  );
};

export default Dashboard;
