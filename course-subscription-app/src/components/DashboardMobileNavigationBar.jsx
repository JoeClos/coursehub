import { useCallback } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const DashboardMobileNavigationBar = ({ navItems, handleLogout, location }) => {
  const isActiveRoute = useCallback(
    (path) => {
      if (path === "/") {
        return location.pathname === "/dashboard" || location.pathname === "/";
      }
      return location.pathname.startsWith(`/dashboard/${path}`);
    },
    [location.pathname]
  );

  return (
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
            aria-label={item.text}
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
          <Typography
            variant="caption"
            sx={{
              color: isActiveRoute(item.to) ? "#2F6FEB" : "#201F40",
              mt: 0.5,
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
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
            color: "#FF0000",
            borderRadius: "5px",
            p: "8px",
            "&:hover": { backgroundColor: "#FFE0E0" },
          }}
        >
          <LogoutIcon />
        </IconButton>
        <Typography variant="caption" sx={{ color: "#201F40", mt: 0.5 }}>
          Logout
        </Typography>
      </Box>
    </Box>
  );
};

DashboardMobileNavigationBar.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    })
  ).isRequired,
  handleLogout: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,};

export default DashboardMobileNavigationBar;
