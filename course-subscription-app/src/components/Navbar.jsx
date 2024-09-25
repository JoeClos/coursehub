import { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";

const Navbar = () => {
  const { user } = useContext(UserContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Course Subscription App
        </Typography>
        {user ? <p>Welcome, {user.name}</p> : <p>Loading user...</p>}
        <Button color="inherit" component={Link} to="/my-courses">
          My Courses
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
