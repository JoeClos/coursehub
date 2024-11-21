import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, TextField, Container, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import AuthContext from "../context/AuthContext";
import PasswordInput from "./PasswordInput";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const login = useContext(AuthContext);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (credentials) => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    console.log("🚀 ~ loginUser ~ baseUrl:", baseUrl);
    const fullUrl = `${baseUrl}/api/login`;
    try {
      const response = await axios.post(fullUrl, credentials);
      console.log("API response:", response.data); // Log the response to verify structure

      const { token, user } = response.data; // Extract token and user from response
      login.login({ token, email: user.email, role: user.role, firstName: user.firstName, id: user._id }); // Pass token and user data
      console.log("🚀 ~ loginUser ~ user:", user);
      if (user.role === "admin") {
        console.log("🚀 ~ loginUser ~ user.role:", user.role);
        navigate("/dashboard"); // Redirect to dashboard for admin
      } else {
        navigate("/"); // Redirect to home page for non-admin users
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid credentials or server error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(credentials);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
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
          <Typography>
            <Link to="/forgot-password">Forgot Password?</Link>
          </Typography>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
