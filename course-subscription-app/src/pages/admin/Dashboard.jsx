// const Dashboard = () => {
//     return (
//         <div><h1>This is the Admin&#39;s Dashboard</h1></div>
//     )
// }

// export default Dashboard;

import {
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <Box>
      <Typography variant="h4" noWrap>
        Admin Dashboard
      </Typography>
      <Box sx={{ display: "flex" }}>

        <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}>
          <List>
            <ListItem button component={Link} to="users">
              <ListItemText primary="Manage Users" />
            </ListItem>
            <ListItem button component={Link} to="subscriptions">
              <ListItemText primary="Manage Subscriptions" />
            </ListItem>
            <ListItem button component={Link} to="courses">
              <ListItemText primary="Manage Courses" />
            </ListItem>
            <ListItem button component={Link} to="analytics">
              <ListItemText primary="Analytics" />
            </ListItem>
          </List>
        </Box>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
