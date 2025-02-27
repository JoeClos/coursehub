// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { Button, TextField, Container, Typography, Box } from "@mui/material";
// import Grid from "@mui/material/Grid2";
// import AuthContext from "../context/AuthContext";
// import PasswordInput from "./PasswordInput";
// import { loginUser } from "../utils/api";

// const Login = () => {
//   const [credentials, setCredentials] = useState({
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const login = useContext(AuthContext);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors
//     try {
//       const { token, user } = await loginUser(credentials);
//       login.login({
//         token,
//         email: user.email,
//         role: user.role,
//         firstName: user.firstName,
//         id: user._id,
//       }); // Update AuthContext with user data
//       if (user.role === "admin") {
//         navigate("/dashboard");
//       } else {
//         navigate("/");
//       }
//     } catch (err) {
//       console.log(err);
//       setError("Invalid credentials or server error.");
//     }
//   };

//   console.log("Rendering Login Component");
//   return (
//     <Container maxWidth="sm">
//       <Box mt={5}>
//         <Box mb={2}>
//           <Typography variant="h4" style={{ color: "red" }}>
//             Login 1
//           </Typography>
//         </Box>
//         <Box>
//           <Typography variant="h4" style={{ color: "blue" }}>
//             Login 2
//           </Typography>
//         </Box>

//         {/* <Typography variant="h4" gutterBottom  style={{ color: "red" }}>
//           Login
//         </Typography>
//         <Typography variant="h4" gutterBottom  style={{ color: "blue" }}>
//           Login
//         </Typography> */}
//         {error && <Typography color="error">{error}</Typography>}
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing={2}>
//             <Grid size={12}>
//               <TextField
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 fullWidth
//                 required
//                 value={credentials.email}
//                 onChange={handleChange}
//               />
//             </Grid>
//             <Grid size={12}>
//               <PasswordInput
//                 label="Password"
//                 name="password"
//                 value={credentials.password}
//                 onChange={(e) =>
//                   setCredentials({ ...credentials, password: e.target.value })
//                 }
//               />
//             </Grid>
//             <Grid size={12}>
//               <Button
//                 type="submit"
//                 variant="contained"
//                 color="primary"
//                 fullWidth
//               >
//                 Login
//               </Button>
//             </Grid>
//           </Grid>
//           <Typography>
//             <Link to="/forgot-password">Forgot Password?</Link>
//           </Typography>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default Login;
