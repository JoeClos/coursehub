// const Dashboard = () => {
//     return (
//         <div><h1>This is the Admin&#39;s Dashboard</h1></div>
//     )
// }

// export default Dashboard;

// import {
//   Box,
//   Toolbar,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
// } from "@mui/material";
// import { Link, Outlet } from "react-router-dom";

// const DashboardLayout = () => {
//   return (
//     <Box>
//       <Typography variant="h4" noWrap>
//         Admin Dashboard
//       </Typography>
//       <Box sx={{ display: "flex" }}>

//         <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
//           <List>
//             <ListItem button component={Link} to="users">
//               <ListItemText primary="Manage Users" />
//             </ListItem>
//             <ListItem button component={Link} to="subscriptions">
//               <ListItemText primary="Manage Subscriptions" />
//             </ListItem>
//             <ListItem button component={Link} to="courses">
//               <ListItemText primary="Manage Courses" />
//             </ListItem>
//             <ListItem button component={Link} to="analytics">
//               <ListItemText primary="Analytics" />
//             </ListItem>
//           </List>
//         </Box>
//         <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
//           <Toolbar />
//           <Outlet />
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default DashboardLayout;

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
  ListItem,
  ListItemText,
  ListItemButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import { ExitToApp } from "@mui/icons-material";
import AuthContext from "../../store/AuthContext";

const drawerWidth = 240;

const Dashboard = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button="true" component={Link} to="users">
          <ListItemText primary="Manage Users" />
        </ListItem>
        <ListItem button="true" component={Link} to="subscriptions">
          <ListItemText primary="Manage Subscriptions" />
        </ListItem>
        <ListItem button="true" component={Link} to="courses">
          <ListItemText primary="Manage Courses" />
        </ListItem>
        <ListItem button="true" component={Link} to="analytics">
          <ListItemText primary="Analytics" />
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex"}}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, padding: "11px", backgroundColor: "#201F40"}}
      >
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
            noWrap
            component="div"
            sx={{ mr: 4, display: { sx: "none" } }}
          >
            Admin Dashboard
          </Typography>

          <ListItemButton
            onClick={handleLogout}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 1,
            }}
          >
            <Typography variant="h6" noWrap component="div">
              Logout
            </Typography>
            {/* <ListItemText
              primary="Logout"
              variant="h6" noWrap component="div" 
            /> */}
            <ExitToApp fontSize="small" />
          </ListItemButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

Dashboard.propTypes = { window: PropTypes.func };

export default Dashboard;
