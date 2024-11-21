import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Get user and logout from context
  console.log("🚀 ~ Navbar ~ user:", user);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    logout(); // Use logout from context to clear user state
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Course Hub
        </Typography>

        {/* Show different links based on login status */}
        {!token ? (
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register">
              Register
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {user?.role === "admin" ? (
              <>
                <Button color="inherit" component={Link} to="/dashboard">
                  Dashboard
                </Button>
              
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/my-courses">
                  Cart
                </Button>
              </>
            )}
            <Typography variant="body1" sx={{ marginLeft: 2 }}>
              Welcome, {user?.firstName || "Guest"}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
