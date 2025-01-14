import { useContext, useState } from "react";
import { AuthContext } from "../store/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Button,
  Typography,
  Badge,
  List,
  ListItemButton,
  Avatar,
  ListItemText,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { useCart } from "../store/CartContext";
import { ShoppingCart } from "@mui/icons-material";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { deepOrange } from "@mui/material/colors";
import SearchBar from "./SearchBar";
import PropTypes from "prop-types";

const Navbar = ({ onSearch }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { subscriptions } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navItems = () => {
    if (!token) {
      return [
        { label: "Home", link: "/" },
        { label: "Login", link: "/login" },
        { label: "Register", link: "/register" },
      ];
    } else if (user?.role === "admin") {
      return [
        { label: "Home", link: "/" },
        { label: "Dashboard", link: "/dashboard" },
        {
          label: "Logout",
          icon: <LogoutIcon />,
          action: handleLogout,
        },
      ];
    } else {
      return [
        { label: "Home", link: "/" },
        {
          label: (
            <Badge
              badgeContent={subscriptions.length}
              color="secondary"
              sx={{
                "& .MuiBadge-badge": { backgroundColor: deepOrange[500] },
              }}
            >
              <ShoppingCart />
            </Badge>
          ),
          link: "/my-courses",
        },
        {
          label: "Logout",
          icon: <LogoutIcon />,
          action: handleLogout,
        },
      ];
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Course Hub
      </Typography>
      <Divider />
      {user && user.role !== "admin" ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <Avatar sx={{ bgcolor: deepOrange[500] }}>
            {user?.firstName?.[0]}
            {user?.lastName?.[0]}
          </Avatar>
        </Box>
      ) : user?.role === "admin" ? (
        <Typography variant="h6" sx={{ my: 2 }}>
          Admin Page
        </Typography>
      ) : null}
      <Divider />

      <List
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          paddingX: 8,
          paddingTop: 8,
        }}
      >
        {/* For non-logged-in users */}
        {!user && (
          <>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
                width: "100%",
              }}
            >
              <ListItemText
                primary="Home"
                sx={{ margin: 0, textAlign: "left" }}
              />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/login"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
                width: "100%",
              }}
            >
              <ListItemText
                primary="Login"
                sx={{ margin: 0, textAlign: "left" }}
              />
              {/* <ExitToApp fontSize="small" /> */}
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/register"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
                width: "100%",
              }}
            >
              <ListItemText
                primary="Register"
                sx={{ margin: 0, textAlign: "left" }}
              />
              {/* <ExitToApp fontSize="small" /> */}
            </ListItemButton>
          </>
        )}

        {/* For non-admin users */}
        {user && user.role !== "admin" && (
          <>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
                width: "100%",
              }}
            >
              <ListItemText
                primary="Home"
                sx={{ margin: 0, textAlign: "left" }}
              />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/my-courses"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
                width: "100%",
              }}
            >
              <ListItemText
                primary="Cart"
                sx={{ margin: 0, textAlign: "left" }}
              />
              <Badge
                badgeContent={subscriptions.length}
                color="secondary"
                sx={{
                  "& .MuiBadge-badge": { backgroundColor: deepOrange[500] },
                }}
              >
                <ShoppingCart fontSize="small" />
              </Badge>
            </ListItemButton>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
                width: "100%",
              }}
            >
              <ListItemText
                primary="Logout"
                sx={{ margin: 0, textAlign: "left" }}
              />
              <LogoutIcon fontSize="small" />
            </ListItemButton>
          </>
        )}

        {/* For admin users */}
        {/* {user?.role === "admin" && (
          <>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
                width: "100%",
              }}
            >
              <ListItemText
                primary="Home"
                sx={{ margin: 0, textAlign: "left" }}
              />
            </ListItemButton>
            <ListItemButton
              component={Link}
              to="/dashboard"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
                width: "100%",
              }}
            >
              <ListItemText
                primary="Dashboard"
                sx={{ margin: 0, textAlign: "left" }}
              />
            </ListItemButton>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
                width: "100%",
              }}
            >
              <ListItemText
                primary="Logout"
                sx={{ margin: 0, textAlign: "left" }}
              />
              <ExitToApp fontSize="small" />
            </ListItemButton>
          </>
        )} */}
      </List>
    </Box>
  );

  if (user?.role === "admin") return null;

  return (
    <Box className="navbar">
      <CssBaseline />
      <AppBar id="nav-appbar">
        <Toolbar>
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
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Course Hub
          </Typography>

          <SearchBar onSearch={onSearch} />
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 3,
              pr: 1,
            }}
          >
            {navItems().map((item, index) =>
              item.action ? (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    alignItems: "center", 
                    gap: 2, 
                  }}
                >
                  {user && user.role !== "admin" && (
                    <Avatar
                      sx={{
                        bgcolor: deepOrange[500],
                        width: 28,
                        height: 28,
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      {user?.firstName?.[0]}
                      {user?.lastName?.[0]}
                    </Avatar>
                  )}
                  <Button color="inherit" onClick={item.action}>
                    {item.label}
                    {item.icon && <Box sx={{ ml: 1 }}>{item.icon}</Box>}
                  </Button>
                </Box>
              ) : (
                <Button
                  key={index}
                  color="inherit"
                  component={Link}
                  to={item.link}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.label}
                  {item.icon && <Box sx={{ ml: 1 }}>{item.icon}</Box>}
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
};

Navbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Navbar;
