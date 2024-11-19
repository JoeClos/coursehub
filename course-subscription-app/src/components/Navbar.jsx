// import { useContext, useState } from "react";
// import {
//   Box,
//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Tooltip,
//   IconButton,
//   Badge,
//   Menu,
//   MenuItem,
// } from "@mui/material";
// import { Link } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
// import { FaCartShopping, FaCircleUser } from "react-icons/fa6";
// import { IoMdMore } from "react-icons/io";
// import { IoHome } from "react-icons/io5";
// import { useCart } from "../context/CartContext";

// const Navbar = () => {
//   const { user, setUser } = useContext(AuthContext);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const { subscribedCourses } = useCart();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("token")
//     setUser(null);
//   };

//   const handleMobileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMobileMenuClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" style={{ flexGrow: 1 }}>
//             Course Hub
//           </Typography>

//           {/* Desktop View */}
//           <Box sx={{ display: { xs: "none", md: "flex" } }}>
//             <Button component={Link} to="/">
//               <IoHome style={{ fontSize: "1.6rem", color: "#FFFFFF" }} />
//             </Button>

//             {user ? (
//               <Tooltip title={user.firstName}>
//                 <Box sx={{ display: "flex", alignItems: "center" }}>
//                   <IconButton>
//                     <FaCircleUser
//                       style={{ fontSize: "1.6rem", color: "#FFFFFF" }}
//                     />
//                   </IconButton>
//                   <Button onClick={handleLogout} sx={{ color: "#FFFFFF" }}>
//                     Logout
//                   </Button>
//                 </Box>
//               </Tooltip>
//             ) : (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 component={Link}
//                 to="/login"
//                 sx={{ textTransform: "none" }}
//               >
//                 Login
//               </Button>
//             )}

//             {/* Show number of subscribed courses */}
//             <Button color="inherit" component={Link} to="/my-courses">
//               <Tooltip title="My subscriptions">
//                 <IconButton>
//                   <Badge badgeContent={subscribedCourses.length} color="error">
//                     <FaCartShopping
//                       style={{ fontSize: "1.6rem", color: "#FFFFFF" }}
//                     />
//                   </Badge>
//                 </IconButton>
//               </Tooltip>
//             </Button>
//           </Box>

//           {/* Mobile View */}
//           <Box sx={{ display: { xs: "flex", md: "none" } }}>
//             <IconButton
//               size="large"
//               aria-label="show more"
//               aria-controls="mobile-menu"
//               aria-haspopup="true"
//               onClick={handleMobileMenuOpen}
//               color="inherit"
//             >
//               <IoMdMore />
//             </IconButton>
//           </Box>

//           {/* Mobile Menu */}
//           <Menu
//             id="mobile-menu"
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleMobileMenuClose}
//             anchorOrigin={{ vertical: "top", horizontal: "right" }}
//             transformOrigin={{ vertical: "top", horizontal: "right" }}
//           >
//             <MenuItem onClick={handleMobileMenuClose}>
//               <Button component={Link} to="/" style={{ gap: "1rem" }}>
//                 <IoHome style={{ fontSize: "1.3rem" }} />
//                 <p>Home</p>
//               </Button>
//             </MenuItem>

//             {user ? (
//               <MenuItem onClick={handleMobileMenuClose}>
//                 <Button component={Box} style={{ gap: "1rem" }}>
//                   <FaCircleUser style={{ fontSize: "1.3rem" }} />
//                   <p>{user.firstName}</p>
//                   <button onClick={handleLogout}>Logout</button>
//                 </Button>
//               </MenuItem>
//             ) : (
//               <MenuItem>
//                 {" "}
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   component={Link}
//                   to="/login"
//                   sx={{ textTransform: "none" }}
//                 >
//                   Login
//                 </Button>
//               </MenuItem>
//             )}

//             <MenuItem onClick={handleMobileMenuClose}>
//               <Button component={Link} to="/my-courses" style={{ gap: "1rem" }}>
//                 <FaCartShopping style={{ fontSize: "1.3rem" }} />
//                 <Badge
//                   badgeContent={subscribedCourses.length}
//                   color="primary"
//                 />
//                 <p>My courses</p>
//               </Button>
//             </MenuItem>
//           </Menu>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// };

// export default Navbar;

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography } from "@mui/material";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Get user and logout from context
  console.log("🚀 ~ Navbar ~ user:", user)
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
                {/* <Button color="inherit" component={Link} to="/create-product">
                  Create Product
                </Button> */}
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/cart">
                  Cart
                </Button>
                <Button color="inherit" component={Link} to="/checkout">
                  Checkout
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
