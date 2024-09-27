import { useContext, useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { FaCartShopping, FaCircleUser } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const { subscribedCourses } = useCart(); // Access subscribed courses from context
  // console.log("🚀 ~ Navbar ~ subscribedCourses:", subscribedCourses);

  const handleMobileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Course Hub
          </Typography>

          {/* Desktop View */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Button component={Link} to="/">
              <IoHome style={{ fontSize: "1.6rem", color: "#FFFFFF" }} />
            </Button>

            {user ? (
              <Tooltip title={user.name}>
                <IconButton>
                  <FaCircleUser
                    style={{ fontSize: "1.6rem", color: "#FFFFFF" }}
                  />
                </IconButton>
              </Tooltip>
            ) : (
              <p>Loading user...</p>
            )}

            {/* Show number of subscribed courses */}
            <Button color="inherit" component={Link} to="/my-courses">
              <Tooltip title="My subscriptions">
                <IconButton>
                  <Badge badgeContent={subscribedCourses.length} color="error">
                    <FaCartShopping
                      style={{ fontSize: "1.6rem", color: "#FFFFFF" }}
                    />
                  </Badge>
                </IconButton>
              </Tooltip>
            </Button>
          </Box>

          {/* Mobile View */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls="mobile-menu"
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <IoMdMore />
            </IconButton>
          </Box>

          {/* Mobile Menu */}
          <Menu
            id="mobile-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMobileMenuClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMobileMenuClose}>
              <Button component={Link} to="/" style={{ gap: "1rem" }}>
                <IoHome style={{ fontSize: "1.3rem" }} />
                <p>Home</p>
              </Button>
            </MenuItem>

            {user ? (
              <MenuItem onClick={handleMobileMenuClose}>
                <Button component={Box} style={{ gap: "1rem" }}>
                  <FaCircleUser style={{ fontSize: "1.3rem" }} />
                  <p>{user.name}</p>
                </Button>
              </MenuItem>
            ) : (
              <MenuItem>Loading user...</MenuItem>
            )}

            <MenuItem onClick={handleMobileMenuClose}>
              <Button component={Link} to="/my-courses" style={{ gap: "1rem" }}>
                <FaCartShopping style={{ fontSize: "1.3rem" }} />
                <Badge
                  badgeContent={subscribedCourses.length}
                  color="primary"
                />
                <p>My courses</p>
              </Button>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
