import { useState } from "react";
import axios from "axios";
import NotificationModal from "../components/NotificationModal";
import PasswordInput from "../components/PasswordInput";

import { Button, TextField, Container, Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Register = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("error");
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    console.log("🚀 ~ handleSubmit ~ baseUrl:", baseUrl);
    const fullUrl = `${baseUrl}/api/register`;

    try {
      // Send the request and await the response
      const res = await axios.post(fullUrl, formData);
      console.log("Full API URL", fullUrl);

      
      console.log("🚀 ~ handleSubmit ~ baseUrl:", baseUrl)

      // Check if the response status is 201 (Created)
      if (res.status === 201) {
        setMessage("Registration successful!");
        setModalType("success");
        setModalOpen(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
      } else {
        setMessage("Registration failed. Please try again.");
        setModalType("error");
        setModalOpen(true);
      }
    } catch (error) {
      console.error(
        "Error registering user:",
        error.response ? error.response.data : error.message
      );

      // Check if the error response contains a specific message
      // if (error.response?.data?.message) {
      //   setError(error.response.data.message);
      // } else {
      //   setError("Registration failed. Please try again.");
      // }

      // Handle error message
      setMessage(error.response?.data?.message || "Registration failed.");
      setModalType("error");
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        {/* {error && <Typography color="error">{error}</Typography>} */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                label="First Name"
                name="firstName"
                fullWidth
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Last Name"
                name="lastName"
                fullWidth
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                required
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={12}>
              <PasswordInput
                label="Password"
                name="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
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
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>

      <NotificationModal
        open={modalOpen}
        message={message}
        type={modalType}
        onClose={closeModal}
      />
    </Container>
  );
};

export default Register;
