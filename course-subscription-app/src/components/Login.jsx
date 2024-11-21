
// import axios from "axios";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PropTypes from "prop-types";

// const Login = ({ setUser }) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const baseUrl = import.meta.env.VITE_API_URL_BASE;
//     try {
//       const response = await axios.post(`${baseUrl}/login`, {
//         email,
//         password,
//       });

//       const { token, user } = response.data;

//       // Save token to localStorage
//       localStorage.setItem("token", token);

//       // Set the logged-in user in state/
//       setUser(user);
//       alert("Login successful!");

//        // Redirect based on user role
//        if (user.role === "admin") {
//         navigate("/dashboard");
//       } else {
//         navigate("/");
//       }

//       //Clear the form after successful login
//       setEmail("");
//       setPassword("");
//       setError("");
//     } catch (error) {
//       setError(error.response?.data?.message || "Login failed!");
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// Login.propTypes = {
//   setUser: PropTypes.func.isRequired,
// };

// export default Login;

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
    try {
      const response = await axios.post(`${baseUrl}/login`, credentials);
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
