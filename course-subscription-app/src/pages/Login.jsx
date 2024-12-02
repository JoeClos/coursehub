import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AuthContext from "../store/AuthContext";
import PasswordInput from "../components/PasswordInput";
import { loginUser } from "../utils/api";
// import { Padding } from "@mui/icons-material";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      const { token, user } = await loginUser(credentials);
      login.login({
        token,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        id: user._id,
      }); // Update AuthContext with user data
      if (user.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#333",
            fontSize: { xs: "1.3rem", sm: "1.5rem", md: "2rem" },
          }}
        >
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                label="Email Address"
                name="email"
                type="email"
                sx={{backgroundColor: "white"}}
                fullWidth
                required
                value={credentials.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <PasswordInput
                label="Password"
                name="password"
                sx={{ backgroundColor: "white" }}
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
            </Grid>
            <Grid size={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Login
              </Button>
            </Grid>
          </Grid>
            <Link to="#" style={{ textDecoration: "none" }}>
              <Typography
                className="forgot-password"
                variant="body1"
                component="p"
                sx={{ paddingTop: "14px", color: "black"}}
              >
                Forgot Password?
              </Typography>
            </Link>
            {/* <Link to="/forgot-password">Forgot Password?</Link> */}
        </form>
      </Box>
    </Container>
  );
};

export default Login;
